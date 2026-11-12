# Room acoustics simulation — specification

Owner: Deeper Shi (message t69u, 12 November 2026, Africa/Cairo). The text below is the specification as relayed to the build agent, saved word for word. It replaces the earlier 3D cube in the Cairo app’s internal acoustics chapter.

---

NEW SPEC from Deeper (t69u). It REPLACES the earlier 3D cube for the Cairo app's internal acoustics chapter. Save it verbatim to docs as ROOM-ACOUSTICS-SIM-SPEC.md. Build it in the Cairo app (in the internal acoustics / knowledge chapter), as a lightweight, real-time 3D room acoustics demo.

Requirements:
1) Room: a transparent rectangular room drawn only with its 12 glowing BLUE edges, on a BLACK background (this panel may be black even in the Cairo palette). A small studio monitor model (a simple box with a woofer circle) as the continuous source. Mouse/touch orbit and zoom. Accurate proportions.
2) Four sliders: Length 3–15 m, Width 3–12 m, Height 2.5–7 m, Frequency 20–300 Hz, with live updates. Default to the flagship's 12.00 × 8.33 × 4.50.
3) Three toggleable layers: Sound Waves (translucent wavefronts expanding from the speaker and reflecting off the boundaries, e.g. image sources/reflected spheres clipped to the room via a shader); Pressure Antinodes (red glow at the maxima of |cos(nπx/d)|); Pressure Nodes (blue glow at its zeros). Positions must be CALCULATED, never random.
4) Physics: f_n = n·c/(2d), c = 343. A mode selector: Length/Width/Height × n = 1, 2, 3. Display the resonance frequency and the node/antinode positions in metres. The visualisation uses p(x) = cos(nπx/d) along the chosen axis. FREQUENCY DEPENDENCE: the pattern strength should be a resonance response such as a Lorentzian/second-order response around f_n, with a modest Q (state the Q as an illustrative assumption). The pattern is strong only near f_n and faint elsewhere. Show a small readout of 'response at current frequency' and a 'snap to resonance' affordance (or make clicking the mode set the frequency). Note in the spec doc that n = 1 has 1 node at the centre and antinodes at the walls; for pressure, walls are always antinodes.
5) Performance: use Three.js; R3F only if the app is React (the Cairo app is single-file HTML, so use plain three.js, inlined or vendored, keeping the single file working offline). Simple lines, meshes and shaders; no particles or physics engines. Use an IntersectionObserver to pause when off-screen and on visibilitychange, cap the DPR at 2, and make it mobile-friendly. Honour prefers-reduced-motion.
6) UX: keep it extremely simple: one room, four sliders, the mode selector, three toggles and a Reset button. Use the app's typography. Add a small educational note: room dimensions influence the modal frequencies, but no rectangular room can eliminate all standing waves; dimensions only spread them more evenly, and treatment/bass trapping manages the rest. Label it 'Illustrative – axial modes only, rectangular room, rigid boundaries'.
Add unit tests for the mode, node and antinode maths. Include it in the same deploy and report.

---

## Physics notes (required by the specification)

- Axial mode frequency: f_n = n · c / (2d), with c = 343 m/s and d the room dimension along the chosen axis.
- Pressure along the axis: p(x) = cos(nπx / d), for 0 ≤ x ≤ d.
- Antinodes (|p| maximum) at x = k · d / n, k = 0 … n. **For pressure, the walls (x = 0 and x = d) are always antinodes.**
- Nodes (p = 0) at x = (2k + 1) · d / (2n), k = 0 … n − 1. **n = 1 has one node, at the centre, and antinodes at the two walls.**
- Frequency dependence (illustrative): the pattern strength is the normalised second-order (band-pass) response
  A(f) = 1 / √(1 + Q² (f/f_n − f_n/f)²), which equals 1 at f = f_n.
- **Q = 8 is an illustrative assumption**, not a measured or predicted value for any real room.

## Implementation (Cairo app, chapter 04 Acoustics)

- Plain three.js r170, inlined in `index.html` (no network needed for the 3D view). No React, no particles, no physics engine.
- Mode maths lives in a small library script (`window.RoomModes`, id `room-modes-lib`) and is unit-tested by `tests/room-modes.test.mjs` (`node --test tests/room-modes.test.mjs`).
- Wavefronts: direct sound plus the six first-order image sources, drawn as expanding spheres clipped to the room in a shader. Wavefront spacing equals the calculated wavelength c / f; the animation speed is slowed for viewing.
- Antinode (red) and node (blue) glows are a ray-marched volume using the calculated cos(nπx/d) pattern, scaled by A(f). Thin outlines mark the exact calculated planes.
- Rendering pauses when the chapter is not shown, when the panel is off-screen and when the tab is hidden. DPR is capped at 2. With prefers-reduced-motion the view is static and redraws only on interaction.
- The 20 Hz slider minimum means some first-order modes (for example the 12 m length, 14.3 Hz) sit below the range; snapping then stops at 20 Hz and the readout says so.
