import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, rm, symlink, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import nunjucks from 'nunjucks';
import {buildTestContainer} from '../common.js';

/** @param {string} root @param {string | undefined} defaultLocale */
async function buildEngine(root, defaultLocale) {
    const container = buildTestContainer();
    container.register('node:path', path);
    container.register('npm:nunjucks', nunjucks);
    container.register('Fl32_Tmpl_Back_Config$', {
        getRootPath: () => root,
        getDefaultLocale: () => defaultLocale,
    });
    return container.get('Fl32_Tmpl_Back_Service_Engine_Nunjucks$');
}

test('Nunjucks includes work without a default locale', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'teq-tmpl-nunjucks-'));
    try {
        const web = path.join(root, 'tmpl', 'web');
        await mkdir(path.join(web, 'fr'), {recursive: true});
        await writeFile(path.join(web, 'ordinary.njk'), 'base');
        await writeFile(path.join(web, 'fr', 'localized.njk'), 'fr');

        const engine = await buildEngine(root, undefined);
        assert.deepEqual(await engine.render({
            template: '{% include "ordinary.njk" %}', options: {},
        }), {resultCode: 'SUCCESS', content: 'base'});
        assert.deepEqual(await engine.render({
            template: '{% include "ordinary.njk" %}', options: {locale: 'fr'},
        }), {resultCode: 'SUCCESS', content: 'base'});
        assert.deepEqual(await engine.render({
            template: '{% include "localized.njk" %}', options: {locale: 'fr'},
        }), {resultCode: 'SUCCESS', content: 'fr'});
    } finally {
        await rm(root, {recursive: true, force: true});
    }
});

test('Nunjucks includes fall back from requested to default to unlocalized templates', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'teq-tmpl-nunjucks-'));
    try {
        const web = path.join(root, 'tmpl', 'web');
        await mkdir(path.join(web, 'en'), {recursive: true});
        await mkdir(path.join(web, 'fr'), {recursive: true});
        await writeFile(path.join(web, 'fallback.njk'), 'base');
        await writeFile(path.join(web, 'en', 'fallback.njk'), 'en');
        await writeFile(path.join(web, 'en', 'preferred.njk'), 'en');
        await writeFile(path.join(web, 'fr', 'preferred.njk'), 'fr');
        await writeFile(path.join(web, 'ordinary.njk'), 'base only');

        const engine = await buildEngine(root, 'en');
        assert.deepEqual(await engine.render({
            template: '{% include "fallback.njk" %}', options: {locale: 'fr'},
        }), {resultCode: 'SUCCESS', content: 'en'});
        assert.deepEqual(await engine.render({
            template: '{% include "preferred.njk" %}', options: {locale: 'fr'},
        }), {resultCode: 'SUCCESS', content: 'fr'});
        assert.deepEqual(await engine.render({
            template: '{% include "fallback.njk" %}', options: {},
        }), {resultCode: 'SUCCESS', content: 'en'});
        assert.deepEqual(await engine.render({
            template: '{% include "ordinary.njk" %}', options: {locale: 'fr'},
        }), {resultCode: 'SUCCESS', content: 'base only'});
        assert.deepEqual(await engine.render({
            template: '{% include "ordinary.njk" %}', options: {},
        }), {resultCode: 'SUCCESS', content: 'base only'});
        assert.deepEqual(await engine.render({
            template: '{% include "preferred.njk" %}', options: {locale: 'en'},
        }), {resultCode: 'SUCCESS', content: 'en'});
        assert.deepEqual(await engine.render({
            template: '{% include "ordinary.njk" %}', options: {locale: 'en'},
        }), {resultCode: 'SUCCESS', content: 'base only'});
    } finally {
        await rm(root, {recursive: true, force: true});
    }
});

test('package targets resolve nested templates with isolated overrides and locale fallbacks', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'teq-tmpl-package-'));
    try {
        /** @param {string} name @param {string} content */
        const put = async (name, content) => {
            const file = path.join(root, name);
            await mkdir(path.dirname(file), {recursive: true});
            await writeFile(file, content);
        };
        const pkg = '@fixture/one';
        const original = `node_modules/${pkg}/tmpl/web`;
        const adapt = `tmpl/adapt/${pkg}/web`;
        await put(`${original}/leaf.njk`, '{% extends "layouts/base.njk" %}');
        await put(`${original}/layouts/base.njk`, 'base:{% include "part.njk" %}:{{ value }}');
        await put(`${original}/ru/part.njk`, 'original ru');
        await put(`${adapt}/part.njk`, 'adapted');
        await put(`${original}/ru/locale.njk`, 'ru');
        await put(`${original}/en/locale.njk`, 'en');
        await put('tmpl/web/part.njk', 'wrong host');
        await put('node_modules/@fixture/two/tmpl/web/part.njk', 'second');
        const container = buildTestContainer();
        container.register('node:path', path);
        container.register('npm:nunjucks', nunjucks);
        container.register('Fl32_Tmpl_Back_Config$', {getRootPath: () => root, getDefaultLocale: () => 'en'});
        /** @type {any} */
        let engine;
        container.register('Fl32_Tmpl_Back_Api_Engine$', {render: /** @param {any} input */ input => engine.render(input)});
        engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Nunjucks$');
        const render = await container.get('Fl32_Tmpl_Back_Service_Render$');
        const target = {pkg, type: 'web', name: 'leaf.njk', locales: {user: 'ru-RU', app: 'en'}};
        assert.deepEqual(await render.perform({target, data: {value: '<safe>'}}),
            {resultCode: 'SUCCESS', content: 'base:adapted:&lt;safe&gt;'});
        await put(`${adapt}/leaf.njk`, '{% extends "layouts/base.njk" %}');
        assert.equal((await render.perform({target, data: {value: 'ok'}})).content, 'base:adapted:ok');
        /** @param {string} name @param {any} context */
        const nested = async (name, context) => engine.render({template: `{% include "${name}" %}`, options: {target: context}});
        assert.equal((await nested('locale.njk', target)).content, 'ru');
        assert.equal((await nested('locale.njk', {...target, locales: {user: 'de', app: 'en'}})).content, 'en');
        assert.equal((await nested('part.njk', {...target, pkg: '@fixture/two'})).content, 'second');
        assert.equal((await nested('part.njk', {...target, type: 'email'})).resultCode, 'UNKNOWN_ERROR');
        await symlink(path.join(root, 'tmpl/web/part.njk'), path.join(root, original, 'escape.njk'));
        assert.equal((await nested('escape.njk', target)).resultCode, 'UNKNOWN_ERROR');
        assert.equal((await nested('missing.njk', target)).resultCode, 'UNKNOWN_ERROR');
        assert.equal((await nested('../part.njk', target)).resultCode, 'UNKNOWN_ERROR');
        assert.equal((await nested('/part.njk', target)).resultCode, 'UNKNOWN_ERROR');
        assert.equal((await engine.render({template: '{% include "part.njk" %}', options: {}})).content, 'wrong host');
        assert.equal((await render.perform({template: '{% include "part.njk" %}', target})).content, 'wrong host');
    } finally {
        await rm(root, {recursive: true, force: true});
    }
});
