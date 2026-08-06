import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../common.js';

test.describe('Fl32_Tmpl_Back_Config', () => {

    test('should project the TEQFW_TMPL namespace from the cfg reader', async () => {
        const container = buildTestContainer();

        container.register('TeqFw_Cfg_Reader$', {
            /** @param {string} namespace */
            get: namespace => {
                assert.strictEqual(namespace, 'TEQFW_TMPL');
                return {
                    ALLOWED_LOCALES: ['en-US', 'fr'],
                    DEFAULT_LOCALE: 'en-US',
                    ENGINE: 'mustache',
                    ROOT_PATH: '/abs/path',
                };
            },
        });

        const config = await container.get('Fl32_Tmpl_Back_Config$');

        assert.deepStrictEqual(config.getAvailableLocales(), ['en-US', 'fr']);
        assert.strictEqual(config.getDefaultLocale(), 'en-US');
        assert.strictEqual(config.getEngine(), 'mustache');
        assert.strictEqual(config.getRootPath(), '/abs/path');
    });

    test('should require the default locale and root path', async () => {
        const container = buildTestContainer();

        container.register('TeqFw_Cfg_Reader$', {
            get: () => ({
                ALLOWED_LOCALES: ['ru'],
                ENGINE: 'nunjucks',
            }),
        });

        await assert.rejects(
            () => container.get('Fl32_Tmpl_Back_Config$'),
            /TEQFW_TMPL__DEFAULT_LOCALE is required/
        );
    });
});
