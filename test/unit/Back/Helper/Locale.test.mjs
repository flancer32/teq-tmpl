import {describe, it} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../../common.js';

describe('Fl32_Tmpl_Back_Helper_Locale', () => {

    describe('generateUniqueLocales', () => {
        it('should return unique and ordered locale variants', async () => {
            const container = buildTestContainer();
            const helper = await container.get('Fl32_Tmpl_Back_Helper_Locale$');
            const locale = {
                user: 'fr-CA',
                app: 'fr',
                pkg: 'en-US',
            };
            const result = helper.generateUniqueLocales(locale);
            assert.deepStrictEqual(result, ['fr-CA', 'fr', 'en-US', 'en']);
        });

        it('should handle empty values', async () => {
            const container = buildTestContainer();
            const helper = await container.get('Fl32_Tmpl_Back_Helper_Locale$');
            const locale = {
                user: '',
                app: null,
                pkg: undefined,
            };
            const result = helper.generateUniqueLocales(locale);
            assert.deepStrictEqual(result, []);
        });

        it('should not duplicate short and full forms if already present', async () => {
            const container = buildTestContainer();
            const helper = await container.get('Fl32_Tmpl_Back_Helper_Locale$');
            const locale = {
                user: 'en',
                app: 'en',
                pkg: 'en-US',
            };
            const result = helper.generateUniqueLocales(locale);
            assert.deepStrictEqual(result, ['en', 'en-US']);
        });
    });
});
