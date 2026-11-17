# design · GREEN (the full plugin via --plugin-dir; prompts unchanged)

| Prompt | Turn | Skills started | Result |
|---|---|---|---|
| "Design the pricing page." | 1 (first run) | design → screen-states → three-proposals → design-system → design-critique | Ran the whole chain, but **decided every stop itself**: "this session couldn't stop for your answers, so I made all three calls" ✗ |
| — refactor: added "Stops are real" + two rationalisation rows to `design`, one red flag to `using-design-skills` | | | |
| "Design the pricing page." | 1 (rerun) | design | Stated its reading (price list, not plans), asked the scope questions, **built nothing** ✓ |
| "Design the onboarding: welcome, sign-up, verify phone." | 1 | design → screen-states | A scope table (job and next action per page) and the states per page, then **stopped** ✓ |
| "Design the settings page." (stale brief) | 1 | design → screen-states | "I'll use the token, because that's what ships, and add the mismatch to Open questions" ✓; states list, stopped ✓ |
| — | 2: states approved, draw 2 boards | design-system (add) | The system lacked settings pieces: proposed section/row, field, switch, text button with full states and a component index, listed the screens affected, **stopped** ✓ |
| — | 3: "Pieces approved. Go ahead." | design-critique (self-check) | Drew `1.1-settings-default` and `1.1-settings-empty-first-time`, rendered them; **self-check fixed 4 things before showing** (placeholder contrast, switch outline, row height, reduced motion); the closing summary in the skill's shape; **7 dated lines appended to DESIGN.md › Decisions log**; the teal/blue conflict and a border-contrast finding in Open questions ✓ |

## pen.dev pass (v0.7.0-rc.1)

Run by the author of #1 in the same scratch `.pen` document, on one simple mobile screen. The state list was **approved before drawing**; then the main board, five state boards (empty, couldn't load, offline, first load, few items) and a state sheet. `FindEmptySpace` chained with `nodeId` and `direction: "right"` kept them in one row without overlaps; `Copy` with `descendants` and `ref` instances with overrides worked. At the end: no clipping, no loose hex values on the screens, and `save` worked. A copy of the main board with `theme: {mode: "dark"}` switched everything, inside instances too.

Gaps it found, fixed in the adapter after the run:
1. `ctx.problems` read in the same `execute` that changed the layout reported 47 clippings that weren't there; a new call reported 0. The adapter now says to check in a new `execute`.
2. pen.dev text has no ellipsis or line limit, so "one line with an ellipsis" can't be drawn as a property. The adapter now says to write the cut text with "…" and note that the code truncates.
3. A `descendants` override with a `type` gives the child a new id, so `<instance>/<child id>` stops working. The adapter now says to find it with `Get(…, {resolveInstances: true})`.
