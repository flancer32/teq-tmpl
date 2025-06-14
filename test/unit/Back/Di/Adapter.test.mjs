import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../common.js';

test.describe('Fl32_Tmpl_Back_Di_Adapter', () => {
    test('should return injected engine instance', async () => {
        const container = buildTestContainer();

        const engine = {id: 'engine'};
        container.register('Fl32_Tmpl_Back_Service_Engine_Simple$', engine);

        const adapter = await container.get('Fl32_Tmpl_Back_Di_Adapter$');

        assert.strictEqual(adapter.getEngine(), engine);
    });
});
