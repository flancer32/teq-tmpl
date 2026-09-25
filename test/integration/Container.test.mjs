import test from 'node:test';
import assert from 'node:assert/strict';
import fs, {mkdtemp, mkdir, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import Container from '@teqfw/di';
import NamespaceRegistry from '@teqfw/di/node/registry/namespace';
import nunjucks from 'nunjucks';

const APP_ROOT = path.resolve(import.meta.dirname, '../..');

async function buildPackageContainer(applicationRoot = APP_ROOT) {
    const container = new Container();
    const registry = new NamespaceRegistry({fs, path, appRoot: APP_ROOT});
    for (const {prefix, dirAbs, ext} of await registry.build()) {
        container.addNamespaceRoot(prefix, dirAbs, ext);
    }
    container.enableTestMode();
    container.register('TeqFw_Cli_Config$', Object.freeze({
        applicationRoot,
        cwd: APP_ROOT,
        argv: Object.freeze([]),
        dotenvPath: undefined,
        dotenvExplicit: false,
    }));
    return container;
}

test('resolves the package namespace and representative components', async () => {
    const container = await buildPackageContainer();
    container.register('Fl32_Tmpl_Back_Api_Engine$', {
        /** @param {{template: string, data: {name: string}}} input */
        render: async ({template, data}) => ({
            resultCode: 'SUCCESS',
            content: `${template}:${data.name}`,
        }),
    });

    const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');
    const source = await container.get('TeqFw_Cfg_Source_ProcessEnv$');
    const loader = await container.get('TeqFw_Cfg_Loader$');
    await loader.load([source.create({
        TEQFW_TMPL__ALLOWED_LOCALES: ' en, es, ,ru ',
        TEQFW_TMPL__DEFAULT_LOCALE: 'en',
    })]);
    const config = await container.get('Fl32_Tmpl_Back_Config$');
    const provider = await container.get('TeqFw_Log_Provider$');
    const logger = provider.forSource('Fl32_Tmpl_Back_Integration_Test');

    assert.equal(typeof cast.string, 'function');
    assert.deepEqual(config.getAvailableLocales(), ['en', 'es', 'ru']);
    assert.equal(config.getDefaultLocale(), 'en');
    assert.equal(config.getRootPath(), APP_ROOT);
    assert.equal(typeof logger.info, 'function');

    const render = await container.get('Fl32_Tmpl_Back_Service_Render$');
    assert.deepEqual(await render.perform({template: 'Hello', data: {name: 'Ada'}}), {
        resultCode: 'SUCCESS',
        content: 'Hello:Ada',
    });
});

test('renders an ordinary file through DI and cfg without locale settings', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'teq-tmpl-config-'));
    try {
        const templatePath = path.join(root, 'tmpl', 'text', 'greeting.txt');
        const includePath = path.join(root, 'tmpl', 'web', 'fragment.njk');
        await mkdir(path.dirname(templatePath), {recursive: true});
        await mkdir(path.dirname(includePath), {recursive: true});
        await writeFile(templatePath, 'Hello');
        await writeFile(includePath, 'from include');

        const container = await buildPackageContainer(root);
        container.register('npm:nunjucks', nunjucks);
        container.register('Fl32_Tmpl_Back_Api_Engine$', {
            /** @param {{template: string, data: {name: string}}} input */
            render: async ({template, data}) => ({
                resultCode: 'SUCCESS',
                content: `${template}:${data.name}`,
            }),
        });
        const loader = await container.get('TeqFw_Cfg_Loader$');
        await loader.load([]);
        const config = await container.get('Fl32_Tmpl_Back_Config$');
        assert.deepEqual(config.getAvailableLocales(), []);
        assert.equal(config.getDefaultLocale(), undefined);

        const render = await container.get('Fl32_Tmpl_Back_Service_Render$');
        assert.deepEqual(await render.perform({
            target: {type: 'text', name: 'greeting.txt'},
            data: {name: 'Ada'},
        }), {resultCode: 'SUCCESS', content: 'Hello:Ada'});

        const nunjucksEngine = await container.get('Fl32_Tmpl_Back_Service_Engine_Nunjucks$');
        assert.deepEqual(await nunjucksEngine.render({
            template: '{% include "fragment.njk" %}', options: {},
        }), {resultCode: 'SUCCESS', content: 'from include'});
    } finally {
        await rm(root, {recursive: true, force: true});
    }
});

test('uses an explicit default locale for Nunjucks includes through cfg and DI', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'teq-tmpl-config-'));
    try {
        const web = path.join(root, 'tmpl', 'web');
        await mkdir(path.join(web, 'en'), {recursive: true});
        await writeFile(path.join(web, 'fragment.njk'), 'base');
        await writeFile(path.join(web, 'en', 'fragment.njk'), 'en');

        const container = await buildPackageContainer(root);
        container.register('npm:nunjucks', nunjucks);
        const source = await container.get('TeqFw_Cfg_Source_ProcessEnv$');
        const loader = await container.get('TeqFw_Cfg_Loader$');
        await loader.load([source.create({TEQFW_TMPL__DEFAULT_LOCALE: 'en'})]);
        const config = await container.get('Fl32_Tmpl_Back_Config$');
        assert.equal(config.getDefaultLocale(), 'en');

        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Nunjucks$');
        assert.deepEqual(await engine.render({
            template: '{% include "fragment.njk" %}', options: {locale: 'fr'},
        }), {resultCode: 'SUCCESS', content: 'en'});
    } finally {
        await rm(root, {recursive: true, force: true});
    }
});
