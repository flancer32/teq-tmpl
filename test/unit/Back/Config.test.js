import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../common.js';

test.describe('Fl32_Tmpl_Back_Config', () => {

    test('should project the TEQFW_TMPL namespace from the cfg reader', async () => {
        const container = buildTestContainer();

        container.register('TeqFw_Cli_Config$', {applicationRoot: '/abs/path'});

        container.register('TeqFw_Cfg_Reader$', {
            /** @param {string} namespace */
            get: namespace => {
                assert.strictEqual(namespace, 'TEQFW_TMPL');
                return {
                    ALLOWED_LOCALES: ['en-US', 'fr'],
                    DEFAULT_LOCALE: 'en-US',
                };
            },
        });

        const config = await container.get('Fl32_Tmpl_Back_Config$');

        assert.deepStrictEqual(config.getAvailableLocales(), ['en-US', 'fr']);
        assert.strictEqual(Object.isFrozen(config.getAvailableLocales()), true);
        assert.strictEqual(config.getDefaultLocale(), 'en-US');
        assert.strictEqual(config.getRootPath(), '/abs/path');
    });

    test('should initialize without locale settings', async () => {
        const container = buildTestContainer();

        container.register('TeqFw_Cli_Config$', {applicationRoot: '/abs/path'});

        container.register('TeqFw_Cfg_Reader$', {
            get: () => ({}),
        });

        const config = await container.get('Fl32_Tmpl_Back_Config$');
        assert.deepStrictEqual(config.getAvailableLocales(), []);
        assert.strictEqual(config.getDefaultLocale(), undefined);
        assert.strictEqual(config.getRootPath(), '/abs/path');
    });

    test('should treat an empty default locale as absent', async () => {
        const container = buildTestContainer();
        container.register('TeqFw_Cli_Config$', {applicationRoot: '/abs/path'});
        container.register('TeqFw_Cfg_Reader$', {get: () => ({DEFAULT_LOCALE: '  '})});

        const config = await container.get('Fl32_Tmpl_Back_Config$');
        assert.strictEqual(config.getDefaultLocale(), undefined);
    });

    test('should split, trim, and omit empty values from a string locale list', async () => {
        const container = buildTestContainer();

        container.register('TeqFw_Cli_Config$', {applicationRoot: '/abs/path'});

        container.register('TeqFw_Cfg_Reader$', {
            get: () => ({
                ALLOWED_LOCALES: ' en, es, ,ru ',
                DEFAULT_LOCALE: 'en',
                ROOT_PATH: '/ignored',
            }),
        });

        const config = await container.get('Fl32_Tmpl_Back_Config$');

        assert.deepStrictEqual(config.getAvailableLocales(), ['en', 'es', 'ru']);
    });

    test('should use the CLI application root instead of template settings', async () => {
        const container = buildTestContainer();

        container.register('TeqFw_Cli_Config$', {applicationRoot: '/cli/app/root'});
        container.register('TeqFw_Cfg_Reader$', {
            get: () => ({DEFAULT_LOCALE: 'en', ROOT_PATH: '/ignored'}),
        });

        const config = await container.get('Fl32_Tmpl_Back_Config$');

        assert.strictEqual(config.getRootPath(), '/cli/app/root');
    });
});
