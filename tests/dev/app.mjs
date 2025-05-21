#!/usr/bin/env node
'use strict';
/**
 * A test script to emulate an app that uses the web server.
 */
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import Container from '@teqfw/di';

// VARS
/* Resolve a path to the root folder. */
const url = new URL(import.meta.url);
const script = fileURLToPath(url);
const cur = dirname(script);
const root = join(cur, '..', '..');

// Create a new instance of the container
const container = new Container();

// Get the resolver from the container
const resolver = container.getResolver();
resolver.addNamespaceRoot('Fl32_Tmpl_', join(root, 'src'));
resolver.addNamespaceRoot('App_', join(cur, 'app'));

// init the app (add the handlers to the Dispatcher)
/** @type {function} */
const appStart = await container.get('App_Plugin_Start$');
await appStart();

debugger
