import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../common.js';

test.describe('Fl32_Tmpl_Back_Helper_Locale', () => {

    test.describe('generateUniqueLocales', () => {
        test('should return unique and ordered locale variants', async () => {
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

        test('should handle empty values', async () => {
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

        test('should not duplicate short and full forms if already present', async () => {
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
