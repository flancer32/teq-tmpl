import {describe, it} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../../../common.js';

describe('Fl32_Tmpl_Back_Service_File_Load', () => {

    describe('run', () => {
        const container = buildTestContainer();

        // Mocks
        const fileContent = 'template {{data}}';
        let requestedPath = null;

        container.register('node:fs/promises', {
            readFile: async (path) => {
                requestedPath = path;
                if (path.endsWith('missing.html')) {
                    const err = new Error('ENOENT');
                    err.code = 'ENOENT';
                    throw err;
                }
                return fileContent;
            },
        });

        const log = {info: [], error: []};
        container.register('Fl32_Tmpl_Back_Logger$', {
            info: (...args) => log.info.push(args),
            error: (...args) => log.error.push(args),
        });

        it('should return file content for existing template', async () => {
            /** @type {Fl32_Tmpl_Back_Service_File_Load} */
            const service = await container.get('Fl32_Tmpl_Back_Service_File_Load$');

            const result = await service.run({path: 'tmpl/en/index.html'});

            assert.strictEqual(result.content, fileContent);
            assert.strictEqual(requestedPath, 'tmpl/en/index.html');
        });

        it('should return null and log error for missing template', async () => {
            const service = await container.get('Fl32_Tmpl_Back_Service_File_Load$');

            const result = await service.run({path: 'tmpl/en/missing.html'});

            assert.strictEqual(result.content, null);
            assert.strictEqual(log.error.at(-1)[0], 'Failed to load template: tmpl/en/missing.html');
        });
    });
});
