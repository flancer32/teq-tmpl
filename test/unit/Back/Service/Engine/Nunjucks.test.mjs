import {describe, it} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../../../common.js';

describe('Fl32_Tmpl_Back_Service_Engine_Nunjucks', () => {

    it('should render template using Nunjucks and return SUCCESS', async () => {
        const container = buildTestContainer();

        // Register config mock
        container.register('Fl32_Tmpl_Back_Config$', {
            getDefaultLocale: () => 'en',
        });

        // Register factory mock
        container.register('Fl32_Tmpl_Back_Factory_Nunjucks_Env$', {
            create: ({locale, defaultLocale}) => {
                return {
                    renderString: (tpl, data) => {
                        return `[${tpl.trim()}] for ${locale}/${defaultLocale} with ${JSON.stringify(data)}`;
                    },
                };
            },
        });

        // Register logger mock
        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: () => {
                throw new Error('Should not be called');
            },
        });

        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Nunjucks$');

        const {resultCode, content} = await engine.perform({
            template: 'Hello, {{name}}!',
            data: {name: 'Alice'},
            options: {locale: 'fr'},
        });

        assert.strictEqual(resultCode, 'SUCCESS');
        assert.ok(content.includes('Hello, {{name}}!'));
        assert.ok(content.includes('"name":"Alice"'));
        assert.ok(content.includes('fr/en'));
    });

    it('should return TMPL_IS_EMPTY when template is not provided', async () => {
        const container = buildTestContainer();

        container.register('Fl32_Tmpl_Back_Config$', {
            getDefaultLocale: () => 'en',
        });

        container.register('Fl32_Tmpl_Back_Factory_Nunjucks_Env$', {
            create: () => {
                throw new Error('Factory should not be called');
            },
        });

        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: () => {
                throw new Error('Should not be called');
            },
        });

        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Nunjucks$');

        const {resultCode, content} = await engine.perform({
            template: null,
            data: {},
        });

        assert.strictEqual(resultCode, 'TMPL_IS_EMPTY');
        assert.strictEqual(content, null);
    });

    it('should return UNKNOWN_ERROR and log exception on render failure', async () => {
        const container = buildTestContainer();

        container.register('Fl32_Tmpl_Back_Config$', {
            getDefaultLocale: () => 'en',
        });

        container.register('Fl32_Tmpl_Back_Factory_Nunjucks_Env$', {
            create: () => {
                return {
                    renderString: () => {
                        throw new Error('Render failed');
                    },
                };
            },
        });

        const log = {exception: []};
        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: (...args) => log.exception.push(args),
        });

        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Nunjucks$');

        const {resultCode, content} = await engine.perform({
            template: 'broken {{',
            data: {},
            options: {locale: 'fr'},
        });

        assert.strictEqual(resultCode, 'UNKNOWN_ERROR');
        assert.strictEqual(content, null);
        assert.strictEqual(log.exception.length, 1);
        assert.ok(log.exception[0][0] instanceof Error);
    });
});
