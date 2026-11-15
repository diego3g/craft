import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const run = (env) => JSON.parse(execFileSync('bash', [resolve(root, 'hooks/run-hook.cmd'), 'session-start'],
  { env: { PATH: process.env.PATH, ...env }, encoding: 'utf8' }));

test('Claude Code gets hookSpecificOutput.additionalContext with the entry skill', () => {
  const out = run({ CLAUDE_PLUGIN_ROOT: root });
  assert.equal(out.hookSpecificOutput.hookEventName, 'SessionStart');
  assert.match(out.hookSpecificOutput.additionalContext, /name: using-design-skills/);
});

test('Cursor gets additional_context', () => {
  assert.match(run({ CURSOR_PLUGIN_ROOT: root }).additional_context, /using-design-skills/);
});

test('other agents get the SDK-standard additionalContext', () => {
  assert.match(run({}).additionalContext, /using-design-skills/);
});

test('an unknown hook script exits quietly instead of breaking the session', () => {
  const out = execFileSync('bash', ['-c', `bash "${resolve(root, 'hooks/run-hook.cmd')}" no-such-hook 2>/dev/null; echo "exit=$?"`], { encoding: 'utf8' });
  assert.match(out, /^exit=(127|0)\n$/); // bash reports a missing script as 127; nothing else is printed
});
