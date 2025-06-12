import test from 'node:test';
import path from 'node:path';
import assert from 'assert';
import {buildTestContainer} from '../../../common.js';

test.describe('Fl32_Tmpl_Back_Act_File_Find', () => {

    test.describe('run', () => {
        const container = buildTestContainer();

        /** @type {string[]} */
        let checkedPaths = [];

        // Register required mocks
        container.register('node:fs', {
            existsSync: (p) => checkedPaths.includes(p),
        });

        container.register('node:path', {
            join: (...args) => args.join('/'),
            normalize: p => p.replace(/\\/g, '/'),
            relative: (from, to) => path.relative(from, to),
            isAbsolute: p => p.startsWith('/'),
            resolve: p => (p.startsWith('/abs/') ? p : `/abs/${p}`),
        });

        const log = {info: [], error: []};
        container.register('Fl32_Tmpl_Back_Logger$', {
            info: (...args) => log.info.push(args),
            error: (...args) => log.error.push(args),
            trace: (...args) => log.info.push(args),
        });

        container.register('Fl32_Tmpl_Back_Helper_Locale$', {
            generateUniqueLocales: () => ['en-US', 'en'], // simulate fallback
        });

        container.register('Fl32_Tmpl_Back_Config$', {
            getRootPath: () => '/abs/app/root',
        });

        test('should find a template in the application template directory', async () => {
            /** @type {Fl32_Tmpl_Back_Act_File_Find} */
            const service = await container.get('Fl32_Tmpl_Back_Act_File_Find$');

            checkedPaths = [
                '/abs/app/root/tmpl/web/en-US/welcome.html',
            ];

            const result = await service.run({
                target: {
                    type: 'web',
                    name: 'welcome.html',
                    locales: {user: 'en-US'},
                },
            });

            assert.strictEqual(result, '/abs/app/root/tmpl/web/en-US/welcome.html');
        });

        test('should return null and log error if no template is found', async () => {
            const service = await container.get('Fl32_Tmpl_Back_Act_File_Find$');

            checkedPaths = [];

            const result = await service.run({
                target: {
                    type: 'web',
                    name: 'missing.html',
                    locales: {user: 'en-US'},
                },
            });

            assert.strictEqual(result, undefined);
            assert.match(log.info.at(-1)[0], /^Template 'missing.html' not found/);
        });

        test('should find a template in the plugin override directory', async () => {
            const service = await container.get('Fl32_Tmpl_Back_Act_File_Find$');

            checkedPaths = [
                '/abs/app/root/tmpl/adapt/my-plugin/web/en/welcome.html',
            ];

            const result = await service.run({
                target: {
                    type: 'web',
                    name: 'welcome.html',
                    pkg: 'my-plugin',
                    locales: {user: 'en-US'},
                },
            });

            assert.strictEqual(result, '/abs/app/root/tmpl/adapt/my-plugin/web/en/welcome.html');
        });

        test('should find a template in the plugin source directory inside node_modules', async () => {
            const service = await container.get('Fl32_Tmpl_Back_Act_File_Find$');

            checkedPaths = [
                '/abs/app/root/node_modules/my-plugin/tmpl/web/en/welcome.html',
            ];

            const result = await service.run({
                target: {
                    type: 'web',
                    name: 'welcome.html',
                    pkg: 'my-plugin',
                    locales: {user: 'en-US'},
                },
            });

            assert.strictEqual(result, '/abs/app/root/node_modules/my-plugin/tmpl/web/en/welcome.html');
        });
    });
});
