# Testing and Maintenance

Use the package's declared checks and its Node.js built-in test runner. Unit
tests mirror `src/` under `test/unit/`; integration tests live under
`test/integration/` and exercise real TeqFW DI composition.

## Commands

```bash
npm run test:unit
npm run test:integration
npm test
npm run typecheck
npm run lint:md
```

`npm test` runs unit and integration tests. `npm run typecheck` runs
`tsc -p jsconfig.json` without emitting compiled files. Markdown lint covers
the project skill, context, package skill, and root Markdown files.

## Coverage boundary

Tests cover DTO casting, `TEQFW_TMPL` projection and defaults, locale helpers,
file resolution and loading, engine behavior, Nunjucks environment creation,
render result codes, and representative DI composition. The integration test
also verifies the real platform cfg reader and log provider.

## Change checklist

When changing a component:

- preserve the `Fl32_Tmpl_` namespace and `.js` mapping;
- keep dependency declarations in source-attached `__deps__` metadata;
- use public `@teqfw/di` imports;
- update `types.d.ts` when a public type alias changes;
- update the mirrored unit test;
- add an integration assertion when DI composition or platform integration
  changes.

After JavaScript, JSDoc, declaration, or `jsconfig.json` changes, run
`npm run typecheck` and `npm test`. After skill or Markdown changes, run
`npm run lint:md` and inspect `npm pack --dry-run` to confirm the complete
`skills/teqfw-tmpl/` tree is published.
