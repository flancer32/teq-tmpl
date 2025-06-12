import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../common.js';

test.describe('Fl32_Tmpl_Back_Helper_Cast', () => {

    test('should cast values to array', async () => {
        const container = buildTestContainer();
        const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');

        assert.deepStrictEqual(cast.array([1, 2]), [1, 2]);
        assert.deepStrictEqual(cast.array('abc'), ['abc']);
        assert.deepStrictEqual(cast.array(null), []);
        assert.deepStrictEqual(cast.array(undefined), []);
    });

    test('should cast values to array with item caster and filtering', async () => {
        const container = buildTestContainer();
        const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');

        const input = ['1', '2', 'bad', '3'];
        const result = cast.array(input, str => {
            const n = parseInt(str);
            return isNaN(n) ? undefined : n;
        });

        assert.deepStrictEqual(result, [1, 2, 3]);
    });

    test('should cast values to decimal', async () => {
        const container = buildTestContainer();
        const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');

        assert.strictEqual(cast.decimal('3.14'), 3.14);
        assert.strictEqual(cast.decimal(42.5), 42.5);
        assert.strictEqual(cast.decimal('bad'), undefined);
        assert.strictEqual(cast.decimal(undefined), undefined);
    });

    test('should cast values to integer', async () => {
        const container = buildTestContainer();
        const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');

        assert.strictEqual(cast.int('42'), 42);
        assert.strictEqual(cast.int(' 15 '), 15);
        assert.strictEqual(cast.int(7), 7);
        assert.strictEqual(cast.int('NaN'), undefined);
    });

    test('should cast values to string', async () => {
        const container = buildTestContainer();
        const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');

        assert.strictEqual(cast.string('abc'), 'abc');
        assert.strictEqual(cast.string(123), '123');
        assert.strictEqual(cast.string(true), 'true');
        assert.strictEqual(cast.string(false), 'false');
        assert.strictEqual(cast.string(null), undefined);
        assert.strictEqual(cast.string([]), undefined);
    });

    test('should cast values to enum without case conversion', async () => {
        const container = buildTestContainer();
        const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');

        const ENUM = {A: 'foo', B: 'bar'};

        assert.strictEqual(cast.enum('foo', ENUM), 'foo');
        assert.strictEqual(cast.enum('baz', ENUM), undefined);
    });

    test('should cast values to enum with lowercase normalization', async () => {
        const container = buildTestContainer();
        const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');

        const ENUM = {X: 'one', Y: 'two'};

        assert.strictEqual(cast.enum('ONE', ENUM, {lower: true}), 'one');
        assert.strictEqual(cast.enum('Two', ENUM, {lower: true}), 'two');
    });

    test('should cast values to enum with uppercase normalization', async () => {
        const container = buildTestContainer();
        const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');

        const ENUM = {U: 'HELLO', V: 'WORLD'};

        assert.strictEqual(cast.enum('hello', ENUM, {upper: true}), 'HELLO');
        assert.strictEqual(cast.enum('World', ENUM, {upper: true}), 'WORLD');
        assert.strictEqual(cast.enum('unknown', ENUM, {upper: true}), undefined);
    });
});
