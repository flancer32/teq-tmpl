import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../common.js';

test.describe('Fl32_Tmpl_Back_Dto_Locale', () => {

    test('should create DTO with casted string values', async () => {
        const container = buildTestContainer();

        // Register realistic mock for string casting
        container.register('Fl32_Tmpl_Back_Helper_Cast$', {
            string: (value) => {
                if (typeof value === 'string') return value;
                if (typeof value === 'number') return String(value);
                if (typeof value === 'boolean') return value ? 'true' : 'false';
                return undefined;
            },
        });

        const factory = await container.get('Fl32_Tmpl_Back_Dto_Locale$');

        const dto = factory.create({
            app: 'fr',
            pkg: 123,
            user: true,
        });

        assert.strictEqual(dto.app, 'fr');
        assert.strictEqual(dto.pkg, '123');
        assert.strictEqual(dto.user, 'true');
    });

    test('should return undefined for non-convertible values', async () => {
        const container = buildTestContainer();

        container.register('Fl32_Tmpl_Back_Helper_Cast$', {
            string: (value) => {
                if (typeof value === 'string') return value;
                if (typeof value === 'number') return String(value);
                if (typeof value === 'boolean') return value ? 'true' : 'false';
                return undefined;
            },
        });

        const factory = await container.get('Fl32_Tmpl_Back_Dto_Locale$');

        const dto = factory.create({
            app: null,
            pkg: undefined,
            user: {},
        });

        assert.strictEqual(dto.app, undefined);
        assert.strictEqual(dto.pkg, undefined);
        assert.strictEqual(dto.user, undefined);
    });

    test('should handle empty input safely', async () => {
        const container = buildTestContainer();

        container.register('Fl32_Tmpl_Back_Helper_Cast$', {
            string: () => undefined,
        });

        const factory = await container.get('Fl32_Tmpl_Back_Dto_Locale$');

        const dto = factory.create();

        assert.strictEqual(dto.app, undefined);
        assert.strictEqual(dto.pkg, undefined);
        assert.strictEqual(dto.user, undefined);
    });
});
