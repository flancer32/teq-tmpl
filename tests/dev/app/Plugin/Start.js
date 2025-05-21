export default class App_Plugin_Start {
    /**
     * @param {typeof import('node:path')} path
     * @param {typeof import('node:url')} url
     */
    constructor(
        {
            'node:path': path,
            'node:url': url,
        }
    ) {
        // VARS
        const {dirname, join} = path;
        const {fileURLToPath} = url;

        // MAIN
        /* Resolve a path to the root folder. */
        const metaUrl = new URL(import.meta.url);
        const script = fileURLToPath(metaUrl);
        const cur = dirname(script);
        const root = join(cur, '..', '..');
        const webRoot = join(root, 'web');

        return async function () {
            debugger
        };
    }
}