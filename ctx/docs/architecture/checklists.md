# Architecture Checklists

- Path: `ctx/docs/architecture/checklists.md`
- Template Version: `20260702`
- Changed: `20260804`

## Purpose

Provide short recurring checklists for human supervision, diagnosis, and acceptance of architecture-level agent work.

## Drift Diagnosis Checklist

Run these quick checks when an agent appears to move in the wrong architectural direction:

- Did the change add durable state that is not in `state.md`?
- Did the change alter the template layout or locale fallback order without a decision?
- Did the change touch the engine contract or the DI override mechanism without approval?
- Did the change introduce a new external dependency not recorded in `integration.md`?
- Did the change add web-serving, UI, or storage behavior that product scope excludes?

## Approval Checklist

Run these checks before approving architecture expansion:

- Is the change justified by product intent in the product layer?
- Is the new boundary recorded in `structure.md` and `integration.md`?
- Is any new state recorded in `state.md`?
- Are constraints and decisions updated to match?
- Does the change respect the documentation dependency order product → architecture → environment → code?

## Compression Safety Checklist

Run these checks before accepting compression of architecture documents:

- Does compressed text still reflect the current code behavior?
- Are durable decisions and constraints preserved verbatim in meaning?
- Are rejected alternatives still recorded?
- Were no project facts moved into assets?

## Reading Route

After this checklist file, read in order:

- `constraints.md` for non-negotiable restrictions;
- `state.md` for state ownership;
- `decisions.md` for durable choices.
