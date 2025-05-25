import {describe, it} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../../common.js';

describe('Fl32_Tmpl_Back_Service_Load', () => {

    it('should find and load template file successfully', async () => {
        const container = buildTestContainer();

        // Mocks
        container.register('Fl32_Tmpl_Back_Act_File_Find$', {
            run: async ({target}) => `/templates/${target?.name || 'default'}.html`,
        });

        container.register('Fl32_Tmpl_Back_Act_File_Load$', {
            run: async ({path}) => ({content: `<html>${path}</html>`}),
        });

        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: () => {
                throw new Error('Should not be called');
            },
        });

        const service = await container.get('Fl32_Tmpl_Back_Service_Load$');

        const result = await service.perform({
            target: {name: 'welcome'},
        });

        assert.strictEqual(result.resultCode, 'SUCCESS');
        assert.strictEqual(result.path, '/templates/welcome.html');
        assert.strictEqual(result.template, '<html>/templates/welcome.html</html>');
    });

    it('should return PATH_NOT_FOUND when no file path is resolved', async () => {
        const container = buildTestContainer();

        container.register('Fl32_Tmpl_Back_Act_File_Find$', {
            run: async () => null,
        });

        container.register('Fl32_Tmpl_Back_Act_File_Load$', {
            run: async () => {
                throw new Error('Should not be called');
            },
        });

        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: () => {
                throw new Error('Should not be called');
            },
        });

        const service = await container.get('Fl32_Tmpl_Back_Service_Load$');

        const result = await service.perform({
            target: {name: 'not-found'},
        });

        assert.strictEqual(result.resultCode, 'PATH_NOT_FOUND');
        assert.strictEqual(result.path, null);
        assert.strictEqual(result.template, undefined);
    });

    it('should catch and log exception, returning UNKNOWN_ERROR', async () => {
        const container = buildTestContainer();

        container.register('Fl32_Tmpl_Back_Act_File_Find$', {
            run: async () => {
                throw new Error('File system failure');
            },
        });

        const log = {exception: []};
        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: (...args) => log.exception.push(args),
        });

        container.register('Fl32_Tmpl_Back_Act_File_Load$', {
            run: async () => ({content: ''}), // not called
        });

        const service = await container.get('Fl32_Tmpl_Back_Service_Load$');

        const result = await service.perform({
            target: {name: 'error'},
        });

        assert.strictEqual(result.resultCode, 'UNKNOWN_ERROR');
        assert.strictEqual(result.path, undefined);
        assert.strictEqual(result.template, undefined);
        assert.ok(log.exception.length > 0);
        assert.ok(log.exception[0][0] instanceof Error);
        assert.match(log.exception[0][0].message, /File system failure/);
    });
});
