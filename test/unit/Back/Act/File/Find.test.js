import test from 'node:test';
import path from 'node:path';
import assert from 'assert';
import {buildTestContainer} from '../../../../common.js';

test.describe('Fl32_Tmpl_Back_Act_File_Find', () => {

    test.describe('run', () => {
        const container = buildTestContainer();

        /** @type {string[]} */
        let checkedPaths = [];

        // Register required mocks
        container.register('node:fs', {
            /** @param {string} p */
            existsSync: (p) => checkedPaths.includes(p),
        });

        container.register('node:path', {
            /** @param {...string} args */
            join: (...args) => args.join('/'),
            /** @param {string} p */
            normalize: p => p.replace(/\\/g, '/'),
            /** @param {string} from @param {string} to */
            relative: (from, to) => path.relative(from, to),
            /** @param {string} p */
            isAbsolute: p => p.startsWith('/'),
            /** @param {string} p */
            resolve: p => (p.startsWith('/abs/') ? p : `/abs/${p}`),
        });

        /** @type {{trace: any[], warn: any[], error: any[]}} */
        const log = {trace: [], warn: [], error: []};
        container.register('TeqFw_Log_Provider$', {
            forSource: () => ({
                /** @param {...*} args */
                error: (...args) => log.error.push(args),
                /** @param {...*} args */
                trace: (...args) => log.trace.push(args),
                /** @param {...*} args */
                warn: (...args) => log.warn.push(args),
            }),
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
                    pkg: undefined,
                    locales: {user: 'en-US', app: undefined, pkg: undefined},
                },
            });

            assert.strictEqual(result, '/abs/app/root/tmpl/web/en-US/welcome.html');
        });

        test('should trace an ordinary template lookup miss', async () => {
            const service = await container.get('Fl32_Tmpl_Back_Act_File_Find$');

            checkedPaths = [];

            const result = await service.run({
                target: {
                    type: 'web',
                    name: 'missing.html',
                    pkg: undefined,
                    locales: {user: 'en-US', app: undefined, pkg: undefined},
                },
            });

            assert.strictEqual(result, undefined);
            assert.match(log.trace.at(-1)[0], /^Template 'missing.html' not found/);
            assert.equal(log.warn.length, 0);
            assert.equal(log.error.length, 0);
        });

        test('should trace incomplete targets without warning', async () => {
            const service = await container.get('Fl32_Tmpl_Back_Act_File_Find$');
            for (const target of [
                {type: 'web', name: ''},
                {type: '', name: 'welcome.html'},
            ]) {
                const previousTraceCount = log.trace.length;
                const result = await service.run({target});
                assert.equal(result, undefined);
                assert.equal(log.trace.length, previousTraceCount + 1);
                assert.equal(log.trace.at(-1)[0], 'Template search aborted: target name or type is missing');
            }
            assert.equal(log.warn.length, 0);
            assert.equal(log.error.length, 0);
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
                    locales: {user: 'en-US', app: undefined, pkg: undefined},
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
                    locales: {user: 'en-US', app: undefined, pkg: undefined},
                },
            });

            assert.strictEqual(result, '/abs/app/root/node_modules/my-plugin/tmpl/web/en/welcome.html');
        });
    });
});
