import {describe, it} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../../common.js';

/**
 * Создаёт тестовый контейнер с возможностью переопределения зависимостей.
 * @param {object} overrides - Карта зависимостей для замены стандартных моков.
 * @returns {{container: object, logger: object}} - Контейнер и ссылка на мок-логгер.
 */
function buildTestContainerWithMocks(overrides = {}) {
    const container = buildTestContainer();
    const logger = {exception: []};

    container.register('node:mustache', overrides.mustache || {
        default: {
            render: (tpl, view, partials) => {
                return `[${tpl.trim()}] with ${JSON.stringify(view)} and ${Object.keys(partials).join(',')}`;
            },
        },
    });

    container.register('Fl32_Tmpl_Back_Act_File_Find$', overrides.find || {
        run: async ({name}) => {
            if (name === 'exists') return {path: 'tmpl/web/en/exists.html'};
            if (name === 'empty') return {path: 'tmpl/web/en/empty.html'};
            return {path: null};
        },
    });

    container.register('Fl32_Tmpl_Back_Act_File_Load$', overrides.load || {
        run: async ({path}) => {
            if (path.includes('exists')) return {content: 'Hello, {{user}}!'};
            if (path.includes('empty')) return {content: ''};
            return {content: null};
        },
    });

    container.register('Fl32_Tmpl_Back_Logger$', overrides.logger || {
        exception: (...args) => logger.exception.push(args),
    });

    return {container, logger};
}

describe('Fl32_Tmpl_Back_Service_Render', () => {

    describe('perform', () => {

        it('should render template successfully', async () => {
            const {container} = buildTestContainerWithMocks();

            const service = await container.get('Fl32_Tmpl_Back_Service_Render$');
            const {resultCode, content} = await service.perform({
                type: 'web',
                name: 'exists',
                locales: {user: 'en'},
                view: {user: 'Alice'},
                partials: {p: 'partial'},
            });

            assert.strictEqual(resultCode, 'SUCCESS');
            assert.ok(content.includes('Hello'));
            assert.ok(content.includes('"user":"Alice"'));
        });

        it('should return TMPL_IS_EMPTY if template content is empty', async () => {
            const {container} = buildTestContainerWithMocks();

            const service = await container.get('Fl32_Tmpl_Back_Service_Render$');
            const {resultCode, content} = await service.perform({
                type: 'web',
                name: 'empty',
            });

            assert.strictEqual(resultCode, 'TMPL_IS_EMPTY');
            assert.strictEqual(content, null);
        });

        it('should return PATH_NOT_FOUND if template does not exist', async () => {
            const {container} = buildTestContainerWithMocks();

            const service = await container.get('Fl32_Tmpl_Back_Service_Render$');
            const {resultCode, content} = await service.perform({
                type: 'web',
                name: 'missing',
            });

            assert.strictEqual(resultCode, 'PATH_NOT_FOUND');
            assert.strictEqual(content, null);
        });

        it('should return UNKNOWN_ERROR and log exception if something fails', async () => {
            const throwingLoad = {
                run: async () => {
                    throw new Error('Simulated failure');
                },
            };

            const {container, logger} = buildTestContainerWithMocks({load: throwingLoad});

            const service = await container.get('Fl32_Tmpl_Back_Service_Render$');
            const {resultCode, content} = await service.perform({
                type: 'web',
                name: 'exists',
            });

            assert.strictEqual(resultCode, 'UNKNOWN_ERROR');
            assert.strictEqual(content, null);
            assert.ok(logger.exception.length > 0);
        });
    });
});
