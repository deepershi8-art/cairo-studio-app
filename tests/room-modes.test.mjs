// Unit tests for the axial room-mode maths used by the Acoustics chapter.
// Run: node --test tests/room-modes.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const src = html.match(/<script id="room-modes-lib">([\s\S]*?)<\/script>/)[1];
const ctx = { window: {} };
vm.runInNewContext(src, ctx);
const M = ctx.window.RoomModes;
const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≈ ${b}`);

test('mode frequency f_n = n·c / 2d with c = 343 m/s', () => {
  assert.equal(M.C, 343);
  close(M.modeFrequency(12, 1), 343 / 24);           // 14.2917 Hz
  close(M.modeFrequency(12, 2), 28.583333333333332);
  close(M.modeFrequency(8.33, 1), 343 / 16.66);       // 20.588 Hz
  close(M.modeFrequency(4.5, 3), 3 * 343 / 9);        // 114.33 Hz
  close(M.modeFrequency(10, 1, 340), 17);
  assert.throws(() => M.modeFrequency(0, 1), { name: "RangeError" });
  assert.throws(() => M.modeFrequency(5, 0), { name: "RangeError" });
  assert.throws(() => M.modeFrequency(5, 1.5), { name: "RangeError" });
});

test('n = 1: one node at the centre, antinodes at both walls', () => {
  assert.deepEqual([...M.nodePositions(12, 1)], [6]);
  assert.deepEqual([...M.antinodePositions(12, 1)], [0, 12]);
});

test('node and antinode positions for n = 2 and 3', () => {
  assert.deepEqual([...M.nodePositions(12, 2)], [3, 9]);
  assert.deepEqual([...M.antinodePositions(12, 2)], [0, 6, 12]);
  const n3 = M.nodePositions(9, 3); [1.5, 4.5, 7.5].forEach((v, i) => close(n3[i], v));
  const a3 = M.antinodePositions(9, 3); [0, 3, 6, 9].forEach((v, i) => close(a3[i], v));
});

test('pressure p(x) = cos(nπx/d): zero at nodes, |p| = 1 at antinodes, walls always antinodes', () => {
  for (const [d, n] of [[12, 1], [8.33, 2], [4.5, 3], [3, 3]]) {
    M.nodePositions(d, n).forEach(x => close(M.pressure(x, d, n), 0, 1e-12));
    M.antinodePositions(d, n).forEach(x => close(Math.abs(M.pressure(x, d, n)), 1, 1e-12));
    close(Math.abs(M.pressure(0, d, n)), 1); close(Math.abs(M.pressure(d, d, n)), 1);
    assert.equal(M.nodePositions(d, n).length, n);
    assert.equal(M.antinodePositions(d, n).length, n + 1);
  }
});

test('resonance response peaks at f_n and falls away (Q = 8, illustrative)', () => {
  assert.equal(M.Q, 8);
  close(M.response(28.58, 28.58), 1);
  const fn = 50;
  assert.ok(M.response(fn * 1.1, fn) < 0.6);
  assert.ok(M.response(fn * 2, fn) < 0.1);
  close(M.response(fn * 1.25, fn), M.response(fn / 1.25, fn), 1e-12); // symmetric on a log axis
  // half-power points at f/fn - fn/f = ±1/Q
  const x = 1 / M.Q, r = (x + Math.sqrt(x * x + 4)) / 2;
  close(M.response(fn * r, fn), Math.SQRT1_2, 1e-12);
  assert.equal(M.response(0, fn), 0);
});

test('wavelength = c / f', () => {
  close(M.wavelength(41.2), 343 / 41.2);
  close(M.wavelength(343), 1);
});
