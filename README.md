# design-skills

**Install once. From then on your agent designs like a careful designer, by itself.**

Ask for "a pricing page" and the agent:
1. sets up a design brief if the project has none;
2. plans the screens;
3. lists every state they can be in;
4. offers options only when the direction is open;
5. uses your design system's pieces;
6. checks its own work before showing it;
7. writes its decisions down for next time.

Each step stops for your "yes" where it matters.

It's for **developers who design with AI**: an agent plus a design tool (Paper, Figma, or plain HTML), wanting complete, consistent screens rather than just the happy path.

## How it works

```
your request
   │
   ▼
using-design-skills ── loaded at session start; routes the request to the right skill
   │
   ├─ no DESIGN.md? ──▶ design-setup ── interview, one question at a time ─▶ DESIGN.md ─▶ foundations
   │                        └─ design system already in code? ─▶ design-system-sync (import) ─▶ guide in your tool
   │
   ▼
design  (/design)
   1. read DESIGN.md + the design system; code beats a stale brief
   2. list the pages/elements ─────────────────────────── stop: confirm scope
   3. for each one:
        screen-states ── every state, in words ───────── stop: approve the list
        three-proposals ── only if the direction is open ─ stop: pick one
        draw with system pieces; new pieces via design-system ── stop: approve them
        design-critique (self-check) ── render, fix, render again
   4. summary + decisions appended to DESIGN.md
```

Each skill also starts on its own when you ask for it directly: "give me options", "review this", "audit the guide". Small edits ("make the button 2px taller") stay small: no process, just the change, and a note when it touches a shared piece.

## The skills

| Skill | Starts when | What it makes the agent do |
|---|---|---|
| `using-design-skills` | every session (hook) | Check whether `DESIGN.md` exists, route the request, and treat stops as real (end the turn with the question, never decide for you) |
| `design-setup` | a design task and no `DESIGN.md`; "set up our design"; `/design-setup` | Read the project first. Interview one question at a time: product, voice, mood and "never like", brand, references (what to take and avoid from each), constraints. Write `DESIGN.md`, then build the foundations |
| `design` | "design / create / redesign a page, screen, flow, element"; `/design` | The front door above |
| `screen-states` | designing a screen; "what states are missing?" | Every state in writing (data, system, activity, people, interaction) with messy realistic data, drawn and named |
| `three-proposals` | "options", "alternatives", "I don't like it" | Three directions that really differ (structure, interaction, density, emphasis, removal; never just a new colour scheme), next to the current design, recommendation first |
| `design-system` | tokens, the style guide, a new component, "audit" | Role-named tokens, interaction rules defined once, a states matrix per component, a component index, and changes listed with the screens they affect before they spread. Audits report and never fix on their own |
| `design-system-sync` | a design system already in code; "bring our components into Paper"; "apply the guide changes to the code" | **Import:** inventory of tokens and components, then you pick what to draw; tokens keep their code names; a component index marks what's drawn or only in code. **Export:** a diff of what changed in the tool since the last sync (asking when both sides changed), applied only after your OK, with your project's checks run |
| `design-critique` | "review", "refine", "make it better", and before showing any design | Render it and look, check hierarchy, space, layout shift, interaction feel, contrast, text, consistency and motion, and rank by impact. Review mode changes nothing |

In Claude Code, skills are also slash commands: `/design-skills:design`, `/design-skills:design-setup`, and so on.

## Already have a design system in code?

If your repo has a UI package, token files or a component library, setup notices it and offers to bring it into your design tool instead of inventing a new one:
1. It shows an inventory.
2. You pick which components to draw now.
3. Your tool's tokens keep the code's names.
4. When a screen later needs a component that is still only in code, `/design` imports just that one first.

Changes you make to the guide in the tool go back as a reviewed diff ("apply the guide changes to the code"), measured against the last sync's commit. When both sides changed, it asks which one wins.

## `DESIGN.md`

`design-setup` writes it and every other skill reads it first. It has eight short sections: Product, Audience and voice, Mood (words and "never like"), Brand, References (take / avoid), Constraints, a dated **Decisions log** and **Open questions**. It's how a design decision made on Monday survives into Thursday's session.

## Your project wins

Every rule about *look* is a default. If your design system says otherwise (hover fills the background, cards carry shadows, two primary buttons on purpose), the agent follows yours and mentions the difference once.

A few rules are firm in every project, because they're about process, not taste:
- cover the states;
- stop for approval at the gates;
- make options that really differ;
- every colour is a token;
- one icon set;
- every interactive piece has a states matrix;
- design and code change together, design first;
- a change to a shared piece is listed with the screens it affects before it spreads.

## Works with any design tool

The skills speak in verbs ("create a board", "read exact values from the design, never from a screenshot", "render and look"). Each skill has adapters that map those verbs to a tool:
- **Paper**, through its MCP server;
- **Figma**, through an MCP server;
- **plain HTML/CSS**, which is also the fallback.

With a tool that has no adapter, the agent does the same verbs in that tool and says which ones it mapped by hand.

## Install

**Claude Code (plugin, recommended).** Gives you the session-start routing:

```
/plugin marketplace add diego3g/design-skills
/plugin install design-skills@design-skills
```

**Other agents (Codex, Cursor and others).** Copy the folders from `skills/` into your project's `.agents/skills/` (or `.claude/skills/`). Without a session-start hook, add this to your `AGENTS.md` so the routing still happens:

```markdown
## Design skills
Before responding to anything that designs, reviews or changes a UI, check this table and use the skill.
First look whether DESIGN.md exists at the project root.
- No DESIGN.md and a design task → design-setup, then design
- Design / create / redesign a page, screen, flow or element → design
- "Options", "alternatives", "I don't like it" → three-proposals
- "Review", "refine", "make it better", or before showing your own design → design-critique
- Tokens, style guide, a component, "audit" → design-system
- "Bring our design system into <tool>", "apply the guide changes to the code" → design-system-sync
- "What states are missing?" → screen-states
Small edits the person described exactly (one value, label or size): just make them.
A stop means ending your turn with the question. Never decide a stop for the person.
```

## How they were tested

Every skill was written test-first:
- **Without the skill:** a fresh agent ran realistic scenarios, to record what goes wrong.
- **With the skill:** the skill was written against those failures, and the same scenarios ran again with the skill installed but never named, so the description also had to trigger it.
- **Workflow runs:** with the whole plugin loaded, a few prompts check that each request reaches the right skill and that small edits stay small.

The records are in [`tests/scenarios/`](tests/scenarios/). The HTML adapter ran with real renders (headless Chrome), and the Paper adapters of the four original skills (`screen-states`, `three-proposals`, `design-system`, `design-critique`) ran against the Paper MCP; the `design` and `design-setup` Paper adapters haven't run yet. **The Figma adapter hasn't been tested yet**: reports and fixes are welcome.

## Credits

The session-start hook and the "one entry skill that routes to the rest" workflow come from [obra/superpowers](https://github.com/obra/superpowers) (MIT), which does this for coding. The hook files carry that credit.

## Contributing

```
npm test        # validator and hook tests
npm run check   # skill format, links that stay inside each skill, no tool names outside adapters
```

Changes to a skill should come with a scenario that fails without the change and passes with it.

## License

MIT
