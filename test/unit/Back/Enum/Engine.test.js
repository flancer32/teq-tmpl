import test from 'node:test';
import assert from 'node:assert/strict';
import Engine from '../../../../src/Back/Enum/Engine.js';

test('engine names are stable and immutable', () => {
    assert.deepEqual(Engine, {MUSTACHE: 'mustache', NUNJUCKS: 'nunjucks'});
    assert.equal(Object.isFrozen(Engine), true);
});
