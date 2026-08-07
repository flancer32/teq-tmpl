import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import Container from '@teqfw/di';
import NamespaceRegistry from '@teqfw/di/node/registry/namespace';

const APP_ROOT = path.resolve(import.meta.dirname, '../..');

async function buildPackageContainer() {
    const container = new Container();
    const registry = new NamespaceRegistry({fs, path, appRoot: APP_ROOT});
    for (const {prefix, dirAbs, ext} of await registry.build()) {
        container.addNamespaceRoot(prefix, dirAbs, ext);
    }
    container.enableTestMode();
    return container;
}

test('resolves the package namespace and representative components', async () => {
    const container = await buildPackageContainer();

    const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');
    const source = await container.get('TeqFw_Cfg_Source_ProcessEnv$');
    const loader = await container.get('TeqFw_Cfg_Loader$');
    await loader.load([source.create({
        TEQFW_TMPL__ALLOWED_LOCALES: ' en, es, ,ru ',
        TEQFW_TMPL__DEFAULT_LOCALE: 'en',
        TEQFW_TMPL__ROOT_PATH: APP_ROOT,
    })]);
    const config = await container.get('Fl32_Tmpl_Back_Config$');
    const provider = await container.get('TeqFw_Log_Provider$');
    const logger = provider.forSource('Fl32_Tmpl_Back_Integration_Test');

    assert.equal(typeof cast.string, 'function');
    assert.deepEqual(config.getAvailableLocales(), ['en', 'es', 'ru']);
    assert.equal(config.getDefaultLocale(), 'en');
    assert.equal(typeof logger.info, 'function');
});
