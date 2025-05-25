import {describe, it} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../../common.js';

describe('Fl32_Tmpl_Back_Dto_Target', () => {

    it('should create Target DTO with properly casted fields and nested locale DTO', async () => {
        const container = buildTestContainer();

        // Register cast helper mock based on actual behavior
        container.register('Fl32_Tmpl_Back_Helper_Cast$', {
            string: (data) => {
                if (typeof data === 'string') return data;
                if (typeof data === 'number') return String(data);
                if (typeof data === 'boolean') return data ? 'true' : 'false';
                return undefined;
            },
        });

        // Register locale DTO factory mock
        container.register('Fl32_Tmpl_Back_Dto_Locale$', {
            create: (data) => ({
                user: data?.user ?? '',
                app: data?.app ?? '',
                pkg: data?.pkg ?? '',
            }),
        });

        const factory = await container.get('Fl32_Tmpl_Back_Dto_Target$');

        const dto = factory.create({
            name: 'email/welcome.html',
            type: 'email',
            pkg: 'some-plugin',
            locales: {
                user: 'ru-RU',
                app: 'ru',
                pkg: 'en-US',
            },
        });

        assert.strictEqual(dto.name, 'email/welcome.html');
        assert.strictEqual(dto.type, 'email');
        assert.strictEqual(dto.pkg, 'some-plugin');

        assert.deepStrictEqual(dto.locales, {
            user: 'ru-RU',
            app: 'ru',
            pkg: 'en-US',
        });
    });

    it('should return undefined for missing fields and empty locale DTO if input is undefined', async () => {
        const container = buildTestContainer();

        container.register('Fl32_Tmpl_Back_Helper_Cast$', {
            string: () => undefined,
        });

        container.register('Fl32_Tmpl_Back_Dto_Locale$', {
            create: () => ({user: '', app: '', pkg: ''}),
        });

        const factory = await container.get('Fl32_Tmpl_Back_Dto_Target$');

        const dto = factory.create();

        assert.strictEqual(dto.name, undefined);
        assert.strictEqual(dto.type, undefined);
        assert.strictEqual(dto.pkg, undefined);
        assert.deepStrictEqual(dto.locales, {
            user: '',
            app: '',
            pkg: '',
        });
    });
});
