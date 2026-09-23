import test from 'node:test';
import assert from 'node:assert/strict';
import Type from '../../../../src/Back/Enum/Type.js';

test('template types are stable and immutable', () => {
    assert.deepEqual(Type, {EMAIL: 'email', TEXT: 'text', WEB: 'web'});
    assert.equal(Object.isFrozen(Type), true);
});
