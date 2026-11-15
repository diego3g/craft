---
name: design-system-sync
description: Use when a project already has a design system in code (a UI package, design tokens, a component library, guideline docs) and the design tool doesn't mirror it, when asked to import or bring the design system, tokens or components into the design tool, or to apply, push or sync changes from the design tool's guide back to the code.
---

# Design system sync

## Overview

When a design system already lives in code, the design tool should **mirror it, not reinvent it**. **Import** brings the code's tokens and the components the person picks into the tool under the same names. **Export** takes approved changes made in the tool's guide back to the code as a reviewed diff. Code stays the source of truth until the person says otherwise.

## When to use

- A project with tokens or a UI package, no guide in the design tool, and a design task about to start (`design-setup` and `design` hand off to this).
- "Import / bring our design system (tokens, components) into Paper / Figma / the design tool."
- "Apply / push / sync the guide's changes to the code."

## When NOT to use

- No design system in code: `design-system` (create mode) builds one.
- A single token value the person dictated ("make the accent #3d7f69 in code"): make the edit directly and say what it affects.

## Before you start

0. Read `DESIGN.md` if it exists. Its Brand section says where the design system's source is, and its Decisions log has the last sync (with its commit).
1. Pick your tool's adapter in `references/adapters/` (`paper.md`, `figma.md`, `html.md`). If no adapter matches your tool, do the same verbs in your tool and say which you mapped by hand. With no design tool at all, build in HTML (`html.md`). If an image is all you have, say that values read from it are estimates.

## Import (code → design tool)

1. **Detect** with [the signals](references/detect.md): token files, component folders and variant maps, guideline docs. If you find **two UI packages**, list both and ask which one is the source.
2. **Inventory, then stop.** Write the report in [the inventory format](references/inventory.md):
   - tokens grouped by role, with counts and file paths;
   - every component with its variants and path;
   - the guideline docs;
   - the gaps (missing states, values written outside tokens, tokens named by value).

   **Ask which components to draw now**, suggesting the 3–6 that the next screens need. Never draw them all by default. Each import asks again.
3. **Build in the tool** after the pick:
   - register every token **under its code name**, including value-named ones (`--sand-200`); list the missing roles as open questions, and invent no new names;
   - make a foundations guide page using the design-system anatomy (legend, examples), with guideline docs as the legend text;
   - make a **component index** with one row per component: name, variants, code path, status (`drawn` / `in code only`);
   - draw the picked components with their full states matrix, with values read from the code (styles, variant maps). A state the code doesn't define is drawn and marked "proposed", never presented as existing.
4. **Self-check.** Render the guide. If the code can render the component (Storybook, a demo page), render it at the same size and compare. If not, say the values were read from code, unrendered.
5. **Record** in `DESIGN.md` (create the Brand line if the file exists; otherwise tell `design-setup` the source):
   - Brand: "Design system source: code at `<path>`; the <tool> guide mirrors it";
   - Decisions log: "<date> — Imported N tokens, drew A, B (code at commit <sha>)".

   The commit is the base for the next export.

## Export (design tool → code)

1. **Read** the guide's exact values (adapter), the code's current values, and the code at the last sync commit from `DESIGN.md`.
2. **Classify each changed name** with [the diff format](references/export-diff.md):
   - **guide changed** (the code still has the synced value) → propose it;
   - **code changed** (the guide still has the synced value) → nothing to export, offer to update the guide;
   - **both changed** → show the three values and **ask which wins**, never overwrite.
3. **Propose the edits:** each file and line, and what each change affects (components, screens). Check contrast where a colour changed. **Stop. No code edit before approval.**
4. **Apply** only what was approved, update the guide for anything decided the other way, and **run the project's own checks** (lint, typecheck, tests, visual tests). If there are none, say so.
5. **Record** in `DESIGN.md` › Decisions log: "<date> — Synced guide → code: <names> (commit <sha>)", plus any conflict left open under Open questions.

## Rules

| Rule | Why |
|---|---|
| Same names in code and tool; no mapping file | One name per decision; a mapping drifts on its own |
| Inventory and pick before drawing | Big UI packages make "draw everything" slow, and most of it is never needed |
| Values from code, never from screenshots | Screenshots round colours and sizes |
| Missing states are drawn as "proposed", not as existing | The guide must not claim the code does what it doesn't |
| Export proposes, then stops | Code changes ship to users; the person approves the diff |
| Both changed → ask | Overwriting either side loses someone's decision |
| The project's checks run after an export | The codebase's tests know its contracts; this skill doesn't |
| Each sync records its commit | The next export needs a base to tell who changed what |

## Done when

- **Import:** inventory shown and the pick made; tokens registered under code names; foundations, index and picked components in the tool; rendered (or "unrendered" stated); `DESIGN.md` records the source and the commit.
- **Export:** approved edits applied, conflicts decided or left as open questions, the project's checks run (or "none exist" stated), and the sync recorded.

## Common mistakes

| Thought | Reality |
|---|---|
| "The code has the system, so setup only needs the brief" | Offer the import: without it the design tool has no guide and no index, and every screen drifts from the code. |
| "I'll build the foundations and an index, components later" | Show the inventory and **ask which components to draw now**. That's the step people need. |
| "I'll rename `--sand-200` to a role name while importing" | Keep the code's name. Propose a role as an open question. |
| "Hover isn't in the code, I'll draw a nice one" | Draw it as "proposed" so nobody thinks it exists. |
| "The radius changed in the guide, I'll push it" | Check the last sync: if the code changed it too, ask which wins. |
| "The diff is tiny, I'll just apply it" | Propose, stop, then apply and run the project's checks. |
