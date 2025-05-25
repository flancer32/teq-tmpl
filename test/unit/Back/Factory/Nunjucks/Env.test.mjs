import {describe, it} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../../../common.js';

describe('Fl32_Tmpl_Back_Factory_Nunjucks_Env', () => {

    it('should create a Nunjucks environment with locale-specific loaders', async () => {
        const container = buildTestContainer();

        /** Track loader constructor calls */
        const loaderCalls = [];

        // Register node:path mock
        container.register('node:path', {
            join: (...args) => args.join('/'),
        });

        // Define FileSystemLoader as constructor
        class MockLoader {
            constructor(path, opts) {
                loaderCalls.push({path, opts});
                this.loaderId = path;
            }
        }

        // Define Environment as a factory function
        function MockEnvironment(loaders, opts) {
            return {
                env: true,
                loaders,
                opts,
            };
        }

        container.register('node:nunjucks', {
            FileSystemLoader: MockLoader,
            Environment: MockEnvironment,
        });

        // Mock config returning root path
        container.register('Fl32_Tmpl_Back_Config$', {
            getRootPath: () => '/root',
        });

        // Get factory and create env
        const factory = await container.get('Fl32_Tmpl_Back_Factory_Nunjucks_Env$');

        const env = factory.create({
            locale: 'fr',
            defaultLocale: 'en',
        });

        // Assertions
        assert.strictEqual(env.env, true);
        assert.deepStrictEqual(env.opts, {autoescape: true});
        assert.strictEqual(loaderCalls.length, 2);
        assert.strictEqual(loaderCalls[0].path, '/root/tmpl/web/fr');
        assert.strictEqual(loaderCalls[1].path, '/root/tmpl/web/en');
    });

    it('should reuse loader from internal cache', async () => {
        const container = buildTestContainer();

        let constructed = 0;

        class MockLoader {
            constructor(path) {
                constructed++;
                this.id = path;
            }
        }

        function MockEnvironment(loaders, opts) {
            return {loaders, opts};
        }

        container.register('node:path', {
            join: (...args) => args.join('/'),
        });

        container.register('node:nunjucks', {
            FileSystemLoader: MockLoader,
            Environment: MockEnvironment,
        });

        container.register('Fl32_Tmpl_Back_Config$', {
            getRootPath: () => '/app',
        });

        const factory = await container.get('Fl32_Tmpl_Back_Factory_Nunjucks_Env$');

        const env1 = factory.create({locale: 'en', defaultLocale: 'en'});
        const env2 = factory.create({locale: 'en', defaultLocale: 'en'});

        assert.strictEqual(constructed, 1);
        assert.deepStrictEqual(env1.loaders, env2.loaders);
    });
});
