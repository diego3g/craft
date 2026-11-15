# craft v0.4: the rename

Date: 2026-11-15 · Status: approved.
Amends the earlier specs. Nothing changes in what the skills do; only names.

Claude already has commands with "design" in the name (Claude Design), so the project is now **craft** (plugin, marketplace and repo), and its skills drop the `design-` prefix. In Claude Code they're invoked as `craft:<name>`.

| Before 0.4.0 | Now |
|---|---|
| `using-design-skills` | `using-craft` (entry, loaded by the hook) |
| `design` (`/design`) | `craft:make` |
| `design-setup` | `craft:setup` |
| `design-system` | `craft:system` |
| `design-system-sync` | `craft:sync` |
| `screen-states` | `craft:states` |
| `three-proposals` | `craft:explore` |
| `design-critique` | `craft:critique` |

Kept: `DESIGN.md` and `design-sync.json` (files in the person's project, not commands).
The older specs and the test records in `tests/scenarios/` keep the old names as they were written.
Private check settings moved too: `CRAFT_DENYLIST`, `CRAFT_PRIVATE_TOKENS`, `~/.config/craft/`.
