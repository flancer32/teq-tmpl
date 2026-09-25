import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, rm, writeFile} from 'node:fs/promises';
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
