# Penpot adapter scenario

Use a scratch Penpot file connected to the official MCP. In the scratch code project, define `--color-accent` in a source token file and a `Badge` component with Default and Error variants.

1. Ask `craft-sync` to import the design system into Penpot. Confirm the inventory and select Badge. Expect the agreed token, a Guide page and a native component with the two states. Verify that the guide reads back the token value and that the saved sync baseline uses the code name.
2. Ask `craft-states` for the main and empty Orders screens in Penpot. Approve those states. Expect editable boards on the confirmed page, with an instance linked to Badge. Ask `craft-critique` to review the empty state and expect a rendered image and readings from the board's properties.
3. Ask `craft-explore` for alternate layouts of Orders. Expect a separate temporary page with Current and the alternatives. Pick one and verify that the temporary page is removed after the pick is applied.
4. Change the accent token in Penpot and ask `craft-sync` to export. Expect a proposed diff against the source token file and an approval stop before the write.

The packaging test in `test/checks.test.mjs` failed on the original Craft checkout because the workflows had no Penpot adapter. It passes with the seven adapters installed.

A direct MCP smoke test on Penpot and MCP 2.19.1 verified page creation and activation, an editable Flex board, the `--color-accent` value and binding, the empty state clone, PNG export, linked component instances, native variants, and capture and cleanup of the temporary comparison page. The prompts above exercise the agent's workflow end to end.

## Craft workflow run

`craft` ran with a scratch `DESIGN.md` against self-hosted Penpot 2.19.4 through the local MCP. `craft-states` listed the scope and waited for approval before drawing the Orders list, first load, empty and failed states. The four boards reused an existing token and shared one content area size. `craft-critique` inspected the exported PNGs, removed repeated copy, centred the retry label and re-exported the affected boards. The run used the main `craft` workflow with an existing brief and design. The setup interview, exploration and code sync were outside this run.

## Remote MCP acceptance checks

A disposable Penpot 2.19.1 instance connected by MCP key verified the adapter operations for a References page with uploaded media, native Badge variants and linked instances, a four-board exploration with temporary page cleanup, and a CSS token round trip. The fixture's token source stayed unchanged until approval. After export, the CSS and `design-sync.json` matched the Penpot catalog.

Changing a token through the plugin API initially left a board's fill at its old value even after a fresh read. The repeat run detected the mismatch, refreshed just that binding, and confirmed the new fill and token binding in a fresh read. Hosted OAuth sign-in was outside the test.
