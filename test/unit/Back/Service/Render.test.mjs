import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../common.js';

/**
 * Creates a test container with injectable dependency overrides.
 * @param {object} overrides - Optional dependency overrides.
 * @returns {{container: object, logger: object}} - Container instance and reference to mock logger.
 */
function buildTestContainerWithMocks(overrides = {}) {
    const container = buildTestContainer();
    const logger = {exception: []};

    // Mock adapter providing a template engine
    container.register('Fl32_Tmpl_Back_Api_Adapter$', overrides.adapter || {
        getEngine: () => overrides.engine || {
            render: async ({template, data, options}) => {
                if (!template) {
                    return {resultCode: 'TMPL_IS_EMPTY', content: null};
                }
                return {
                    resultCode: 'SUCCESS',
                    content: `Default: ${template.trim()} | ${JSON.stringify(data)} | ${JSON.stringify(options)}`,
                };
            },
        },
    });

    // Mock template finder
    container.register('Fl32_Tmpl_Back_Act_File_Find$', overrides.find || {
        run: async ({target}) => {
            if (target?.name === 'exists') return 'tmpl/web/en/exists.html';
            if (target?.name === 'empty') return 'tmpl/web/en/empty.html';
            return null;
        },
    });

    // Mock template loader
    container.register('Fl32_Tmpl_Back_Act_File_Load$', overrides.load || {
        run: async ({path}) => {
            if (path.includes('exists')) return {content: 'Hello, {{user}}!'};
            if (path.includes('empty')) return {content: ''};
            return {content: null};
        },
    });

    // Mock logger
    container.register('Fl32_Tmpl_Back_Logger$', overrides.logger || {
        exception: (...args) => logger.exception.push(args),
    });



    return {container, logger};
}

test.describe('Fl32_Tmpl_Back_Service_Render', () => {

    test.describe('perform()', () => {

        test('should render a provided raw template using Mustache', async () => {
            const {container} = buildTestContainerWithMocks();

            const service = await container.get('Fl32_Tmpl_Back_Service_Render$');
            const {resultCode, content} = await service.perform({
                template: 'Hello, {{user}}!',
                data: {user: 'Alice'},
            });

            assert.strictEqual(resultCode, 'SUCCESS');
            assert.ok(content.includes('Alice'));
        });

        test('should render a template file using Mustache', async () => {
            const {container} = buildTestContainerWithMocks();

            const service = await container.get('Fl32_Tmpl_Back_Service_Render$');
            const {resultCode, content} = await service.perform({
                target: {
                    type: 'web',
                    name: 'exists',
                    locales: {user: 'en'},
                },
                data: {user: 'Bob'},
            });

            assert.strictEqual(resultCode, 'SUCCESS');
            assert.ok(content.includes('Bob'));
        });

        test('should return TMPL_IS_EMPTY when template content is empty', async () => {
            const {container} = buildTestContainerWithMocks();

            const service = await container.get('Fl32_Tmpl_Back_Service_Render$');
            const {resultCode, content} = await service.perform({
                target: {
                    type: 'web',
                    name: 'empty',
                },
            });

            assert.strictEqual(resultCode, 'TMPL_IS_EMPTY');
            assert.strictEqual(content, null);
        });

        test('should return PATH_NOT_FOUND when template file is missing', async () => {
            const {container} = buildTestContainerWithMocks();

            const service = await container.get('Fl32_Tmpl_Back_Service_Render$');
            const {resultCode, content} = await service.perform({
                target: {
                    type: 'web',
                    name: 'missing',
                },
            });

            assert.strictEqual(resultCode, 'PATH_NOT_FOUND');
            assert.strictEqual(content, null);
        });

        test('should render using a custom engine implementation', async () => {
            const {container} = buildTestContainerWithMocks({
                engine: {
                    render: async ({template, data, options}) => {
                        return {
                            resultCode: 'SUCCESS',
                            content: `Nunjucks: ${template.trim()} | ${JSON.stringify(data)} | ${JSON.stringify(options)}`,
                        };
                    },
                },
            });

            const service = await container.get('Fl32_Tmpl_Back_Service_Render$');
            const {resultCode, content} = await service.perform({
                target: {
                    type: 'web',
                    name: 'exists',
                    locales: {user: 'fr-FR'},
                },
                data: {title: 'Bonjour'},
            });

            assert.strictEqual(resultCode, 'SUCCESS');
            assert.ok(content.includes('Nunjucks'));
            assert.ok(content.includes('Bonjour'));
            assert.ok(content.includes('fr-FR'));
        });

        test('should return UNKNOWN_ERROR and log exception on failure', async () => {
            const failingLoader = {
                run: async () => {
                    throw new Error('Simulated failure');
                },
            };

            const {container, logger} = buildTestContainerWithMocks({load: failingLoader});

            const service = await container.get('Fl32_Tmpl_Back_Service_Render$');
            const {resultCode, content} = await service.perform({
                target: {
                    type: 'web',
                    name: 'exists',
                },
            });

            assert.strictEqual(resultCode, 'UNKNOWN_ERROR');
            assert.strictEqual(content, null);
            assert.ok(logger.exception.length > 0);
        });
    });
});
