# RATEENA SOUND 2 → Cairo Studio merge (12 Nov 2026, Africa/Cairo)

Restore point: git tag `pre-rateena-merge` (commit 2a373fd). Local backup: `index.backup-pre-rateena-merge.html`.
RATEENA SOUND 2 (repo, site, local files) is set aside, not deleted.

Structure, look, rail, chapters, Stage 0/1 text and all sound cards (16 Suite cards incl. the 8 size cards) are unchanged.

Added, in the Cairo style:
- Opening page: the official RATEENA logo alone on graphite, no motion, “Tap to enter”; tap / Enter / Space → Prologue. Skipped for deep links.
- 02 Suite, page 1 and 2 key figures: current programme (live 100 m², 4.50 m proposed, up to 25 musicians; 3 booths; control 24.5 m²; ≈245.5 m² net). Notes state the sound cards keep their reference rooms.
- 02 Suite, page 2: design brief, programme table, true-scale plan (1 unit = 1 m) with six proposed control-room windows, clickable rooms and a 7-tab room panel, concept image reference, clarifications. The earlier Stage 1 schematic plan is kept in a collapsed “superseded” panel.
- 03 Isolation: below the six plates, the three-stage construction model, mass / decoupling / floating / box-in-box cards with image slots, wall / floor / ceiling notes.
- 04 Acoustics (now enabled): absorption / diffusion / reflection cards, then a real-time three.js standing-wave simulation (replaces the earlier wireframe cube). Spec: `docs/ROOM-ACOUSTICS-SIM-SPEC.md`. Blue-edged room on black, studio-monitor source, orbit/zoom; sliders L 3–15, W 3–12, H 2.5–7 m, frequency 20–300 Hz (defaults 12.00 × 8.33 × 4.50); mode selector L/W/H × n=1–3; toggles for Sound Waves (image-source shells clipped to the room), Pressure Antinodes (red) and Pressure Nodes (blue), positions calculated from p(x)=cos(nπx/d); f_n = n·c/2d with c = 343 m/s; response readout uses a second-order resonance with Q = 8 (illustrative assumption) and snap-to-resonance. Labelled "Illustrative – axial modes only, rectangular room, rigid boundaries". three.js r170 is inlined so the single file works offline; rendering pauses off-screen / hidden tab, DPR ≤ 2, prefers-reduced-motion renders a static frame. Maths unit tests: `node --test tests/room-modes.test.mjs` (6 pass).
- Image slots store images only in the uploading browser (IndexedDB).

Deep links: `#suite-2-brief`, `#suite-2-plan`, `#isolation-model`, `#acoustics`.
