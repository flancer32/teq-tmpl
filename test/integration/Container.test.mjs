import test from 'node:test';
import assert from 'node:assert/strict';
import {buildTestContainer} from '../unit/common.js';

test('resolves the package namespace and representative components', async () => {
    const container = buildTestContainer();

    const cast = await container.get('Fl32_Tmpl_Back_Helper_Cast$');
    const logger = await container.get('Fl32_Tmpl_Back_Logger$');
    const render = await container.get('Fl32_Tmpl_Back_Service_Render$');

    assert.equal(typeof cast.string, 'function');
    assert.equal(typeof logger.info, 'function');
    assert.equal(typeof render.perform, 'function');
});
