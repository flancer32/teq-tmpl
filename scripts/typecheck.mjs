#!/usr/bin/env node

/**
 * Deterministic CLI type check for the project.
 *
 * Runs `tsc -p jsconfig.json` and reports diagnostics. Diagnostics that
 * originate inside `node_modules/` (dependency source, e.g. `@teqfw/di`) are
 * currently ignored per project decision and do not affect the exit code.
 * Any diagnostic from the project's own files makes the command fail.
 */
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tsc = path.join(root, 'node_modules', 'typescript', 'lib', 'tsc.js');

const res = spawnSync(process.execPath, [tsc, '-p', 'jsconfig.json'], {
    cwd: root,
    encoding: 'utf8',
});

if (res.error) {
    process.stderr.write(`typecheck: failed to run tsc: ${res.error.message}\n`);
    process.exit(2);
}

const out = `${res.stdout ?? ''}\n${res.stderr ?? ''}`;
const lines = out.split('\n');
const kept = [];
let keep = true;
for (const line of lines) {
    if (/ error TS\d+:/.test(line)) {
        keep = !/^node_modules[/\\]/.test(line);
    }
    if (keep && line.trim().length > 0) {
        kept.push(line);
    }
}

if (kept.length > 0) {
    process.stderr.write(kept.join('\n'));
    process.stderr.write('\n');
    process.exit(1);
}
process.exit(0);
