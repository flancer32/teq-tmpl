import test from 'node:test';
import assert from 'node:assert/strict';
import Engine from '../../../../src/Back/Api/Engine.js';

test('engine contract rejects an unimplemented render call', async () => {
    const engine = new Engine();
    await assert.rejects(engine.render({template: '', data: {}, options: {}}), /Method not implemented/);
});
