import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../../../common.js';

test.describe('Fl32_Tmpl_Back_Act_File_Load', () => {

    test.describe('run', () => {
        const container = buildTestContainer();

        // Mocks
        const fileContent = 'template {{data}}';
        /** @type {string | null} */
        let requestedPath = null;

        container.register('node:fs/promises', {
            /** @param {string} path */
            readFile: async (path) => {
                requestedPath = path;
                if (path.endsWith('missing.html')) {
                    const err = /** @type {Error & {code?: string}} */ (new Error('ENOENT'));
                    err.code = 'ENOENT';
                    throw err;
                }
                return fileContent;
            },
        });

        /** @type {{info: any[], error: any[]}} */
        const log = {info: [], error: []};
        container.register('TeqFw_Log_Provider$', {
            forSource: () => ({
            /** @param {...*} args */
            info: (...args) => log.info.push(args),
            /** @param {...*} args */
            error: (...args) => log.error.push(args),
            }),
        });

        test('should return file content for existing template', async () => {
            /** @type {Fl32_Tmpl_Back_Act_File_Load} */
            const service = await container.get('Fl32_Tmpl_Back_Act_File_Load$');

            const result = await service.run({path: 'tmpl/en/index.html'});

            assert.strictEqual(result.content, fileContent);
            assert.strictEqual(requestedPath, 'tmpl/en/index.html');
        });

        test('should reject and log a file read failure', async () => {
            const service = await container.get('Fl32_Tmpl_Back_Act_File_Load$');

            await assert.rejects(
                () => service.run({path: 'tmpl/en/missing.html'}),
                {code: 'ENOENT'}
            );

            assert.strictEqual(log.error.at(-1)[0], 'Failed to load template: tmpl/en/missing.html');
        });
    });
});
