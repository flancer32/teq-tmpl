import {describe, it} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../common.js';

describe('Fl32_Tmpl_Back_Config', () => {

    it('should initialize configuration and provide access to values', async () => {
        const container = buildTestContainer();

        // Register mocks for dependencies
        container.register('Fl32_Tmpl_Back_Helper_Cast$', {
            string: val => String(val),
            array: (val, castFn) => Array.isArray(val) ? val.map(castFn) : [],
            enum: (val, ENUM, {lower}) => {
                const key = lower ? String(val).toLowerCase() : val;
                return Object.values(ENUM).includes(key) ? key : undefined;
            },
        });

        container.register('Fl32_Tmpl_Back_Enum_Engine$', {
            MUSTACHE: 'mustache',
            NUNJUCKS: 'nunjucks',
        });

        const config = await container.get('Fl32_Tmpl_Back_Config$');

        config.init({
            allowedLocales: ['en-US', 'fr'],
            defaultLocale: 'en-US',
            engine: 'mustache',
            rootPath: '/abs/path',
        });

        assert.deepStrictEqual(config.getAvailableLocales(), ['en-US', 'fr']);
        assert.strictEqual(config.getLocaleBaseWeb(), 'en-US');
        assert.strictEqual(config.getEngine(), 'mustache');
        assert.strictEqual(config.getRootPath(), '/abs/path');
    });

    it('should throw error on repeated initialization', async () => {
        const container = buildTestContainer();

        container.register('Fl32_Tmpl_Back_Helper_Cast$', {
            string: val => String(val),
            array: (val, castFn) => Array.isArray(val) ? val.map(castFn) : [],
            enum: (val, ENUM, {lower}) => {
                const key = lower ? String(val).toLowerCase() : val;
                return Object.values(ENUM).includes(key) ? key : undefined;
            },
        });

        container.register('Fl32_Tmpl_Back_Enum_Engine$', {
            MUSTACHE: 'mustache',
            NUNJUCKS: 'nunjucks',
        });

        const config = await container.get('Fl32_Tmpl_Back_Config$');

        config.init({
            allowedLocales: ['ru'],
            defaultLocale: 'ru',
            engine: 'nunjucks',
            rootPath: '/project/root',
        });

        assert.throws(() => {
            config.init({
                allowedLocales: ['en'],
                defaultLocale: 'en',
                engine: 'mustache',
                rootPath: '/another/root',
            });
        }, /already been initialized/);
    });
});
