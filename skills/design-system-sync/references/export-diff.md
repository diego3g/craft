# The export proposal

Compare three values for every name: the code at the **last sync** (the commit in `DESIGN.md`), the **guide** now, and the **code** now.

| Last sync | Guide now | Code now | Means | Action |
|---|---|---|---|---|
| A | B | A | Guide changed | Propose A → B in code |
| A | A | B | Code changed | Nothing to export; offer to update the guide |
| A | B | C | Both changed | Show A, B, C and **ask which wins** |
| — | B | — | New in guide | Propose adding it (only if the person approved it in the tool) |

## Proposal format

```
Sync guide → code (base: commit 4d4dee4, imported 2026-11-10)

Guide changed
  --color-accent   #2e6b57 → #3d7f69   packages/ui/tokens.css:8
     affects: Button primary (Button.tsx:4) → Home "New entry"
     check: paper text on the new accent ≈ 4.5:1, just AA for 15px text

Both changed: which wins?
  --radius-md      synced 10px · guide 8px · code 12px (commit 7a3b5b5 "Rounder cards")
     affects: every Button (Button.tsx:14)

Code changed (guide is behind): none

Nothing has been edited. Approve the accent, and tell me which radius wins.
```

After approval:
- apply only the approved lines;
- update the guide for anything decided in the code's favour;
- run the project's checks;
- record the sync with its new commit.
