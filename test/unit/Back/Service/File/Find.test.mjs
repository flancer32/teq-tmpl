import {describe, it} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../../../common.js';

describe('Fl32_Tmpl_Back_Service_File_Find', () => {

    describe('init', () => {
        // Create and configure the container
        const container = buildTestContainer();

        // Minimal mocks for this test
        container.register('node:fs', {}); // not used in init()
        container.register('node:path', {
            resolve: p => `/abs/${p}`,
        });

        const log = {info: [], error: []};
        container.register('Fl32_Tmpl_Back_Logger$', {
            info: (...args) => log.info.push(args),
            error: (...args) => log.error.push(args),
        });

        it('should initialize ROOT_DIR only once and log error on repeated attempt', async () => {
            const service = await container.get('Fl32_Tmpl_Back_Service_File_Find$');

            service.init({root: 'test/root'});
            assert.deepStrictEqual(log.info[0], ['ROOT_DIR initialized:', '/abs/test/root']);

            service.init({root: 'another/path'});
            assert.deepStrictEqual(log.error[0], ['ROOT_DIR is already set and cannot be redefined:', '/abs/test/root']);
        });
    });

    describe('perform', () => {
        const container = buildTestContainer();

        let checkedPaths = [];

        container.register('node:fs', {
            existsSync: (p) => checkedPaths.includes(p),
        });

        container.register('node:path', {
            join: (...args) => args.join('/'),
            normalize: p => p.replace(/\\/g, '/'),
            resolve: p => (p.startsWith('/abs/') ? p : `/abs/${p}`),
        });

        const log = {info: [], error: []};
        container.register('Fl32_Tmpl_Back_Logger$', {
            info: (...args) => log.info.push(args),
            error: (...args) => log.error.push(args),
        });

        container.register('Fl32_Tmpl_Back_Helper_Locale$', {
            generateUniqueLocales: () => ['en-US', 'en'], // simulate fallback
        });

        it('should find a template in application tmpl dir', async () => {
            /** @type {Fl32_Tmpl_Back_Service_File_Find} */
            const service = await container.get('Fl32_Tmpl_Back_Service_File_Find$');

            service.init({root: 'app/root'});

            checkedPaths = [
                '/abs/app/root/tmpl/web/en-US/welcome.html',
            ];

            const result = await service.perform({
                type: 'web',
                name: 'welcome.html',
                locales: {user: 'en-US'},
            });

            assert.strictEqual(result, '/abs/app/root/tmpl/web/en-US/welcome.html');
        });

        it('should return undefined and log error if no template found', async () => {
            const service = await container.get('Fl32_Tmpl_Back_Service_File_Find$');

            checkedPaths = []; // no paths exist

            const result = await service.perform({
                type: 'web',
                name: 'missing.html',
                locales: {user: 'en-US'},
            });

            assert.strictEqual(result, null);
            assert.strictEqual(log.error.at(-1)[0].startsWith('Template \'missing.html\' not found'), true);
        });
    });
});