import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {dirname, join} from 'node:path';
import {buildTestContainer} from '../common.js';

test('resolves ordinary files, locale fallback, and package adaptations on disk', async () => {
    const sandboxRoot = await mkdtemp(join(tmpdir(), 'teq-tmpl-resolution-'));
    const root = join(sandboxRoot, 'app');
    try {
        const appFile = join(root, 'tmpl', 'text', 'receipt.txt');
        const adaptation = join(root, 'tmpl', 'adapt', 'demo', 'text', 'receipt.txt');
        const original = join(root, 'node_modules', 'demo', 'tmpl', 'text', 'fr-CA', 'receipt.txt');
        const outside = join(sandboxRoot, 'secret.txt');
        for (const file of [appFile, adaptation, original]) {
            await mkdir(dirname(file), {recursive: true});
            await writeFile(file, file);
        }
        await writeFile(outside, 'outside application root');

        const container = buildTestContainer();
        container.register('Fl32_Tmpl_Back_Config$', {getRootPath: () => root});
        const finder = await container.get('Fl32_Tmpl_Back_Act_File_Find$');

        assert.equal(await finder.run({target: {type: 'text', name: 'receipt.txt'}}), appFile);
        assert.equal(await finder.run({
            target: {type: 'text', name: 'receipt.txt', locales: {user: 'fr-FR'}},
        }), appFile);
        assert.equal(await finder.run({
            target: {type: 'text', name: 'receipt.txt', pkg: 'demo', locales: {user: 'fr-CA'}},
        }), adaptation);

        await rm(adaptation);
        assert.equal(await finder.run({
            target: {type: 'text', name: 'receipt.txt', pkg: 'demo', locales: {user: 'fr-CA'}},
        }), original);
        assert.equal(await finder.run({
            target: {type: 'text', name: '../../../secret.txt'},
        }), undefined);
    } finally {
        await rm(sandboxRoot, {recursive: true, force: true});
    }
});

test('distinguishes missing, empty, and unreadable templates through public services', async () => {
    const root = await mkdtemp(join(tmpdir(), 'teq-tmpl-read-'));
    try {
        const directory = join(root, 'tmpl', 'text');
        await mkdir(join(directory, 'unreadable.txt'), {recursive: true});
        await writeFile(join(directory, 'empty.txt'), '');

        const container = buildTestContainer();
        container.register('Fl32_Tmpl_Back_Config$', {getRootPath: () => root});
        container.register('Fl32_Tmpl_Back_Api_Engine$', {
            /** @param {{template: string}} input */
            render: async ({template}) => ({resultCode: 'SUCCESS', content: template}),
        });
        const render = await container.get('Fl32_Tmpl_Back_Service_Render$');
        const load = await container.get('Fl32_Tmpl_Back_Service_Load$');
        /** @param {string} name */
        const target = name => ({type: 'text', name});

        assert.deepEqual(await render.perform({target: target('missing.txt')}), {
            resultCode: 'PATH_NOT_FOUND', content: null,
        });
        assert.equal((await load.perform({target: target('missing.txt')})).resultCode, 'PATH_NOT_FOUND');
        assert.deepEqual(await render.perform({target: target('empty.txt')}), {
            resultCode: 'TMPL_IS_EMPTY', content: null,
        });
        assert.deepEqual(await load.perform({target: target('empty.txt')}), {
            resultCode: 'SUCCESS', template: '', path: join(directory, 'empty.txt'),
        });
        assert.deepEqual(await render.perform({target: target('unreadable.txt')}), {
            resultCode: 'UNKNOWN_ERROR', content: null,
        });
        const unreadable = await load.perform({target: target('unreadable.txt')});
        assert.equal(unreadable.resultCode, 'UNKNOWN_ERROR');
        assert.equal(unreadable.template, undefined);
        assert.equal(unreadable.path, join(directory, 'unreadable.txt'));
    } finally {
        await rm(root, {recursive: true, force: true});
    }
});
