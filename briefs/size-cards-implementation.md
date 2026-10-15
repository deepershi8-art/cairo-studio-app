# Page 1 size cards: implementation notes

Written in October 2026 alongside `index.html`. The brief is in `briefs/size-cards-brief.md`. Every number below comes from `window.__sizeLog`, logged by the app during a headless run.

## Model (applies to every card)
- **Rooms.** WITHOUT 6.0 × 5.0 × 2.7 m; WITH 10.0 × 9.5 × 5.2 m; Card 8 WITHOUT 7.5 × 8.0 × 3.2 m (60 m²). c = 343 m/s.
- **Impulse response per source → microphone, synthetic and illustrative:**
  1. **Image sources** for a shoebox room (Allen–Berkley) up to 100 ms, using frequency-independent reflection factors √(1−α_mid) per surface.
  2. **Statistical late tail.** Seeded noise in three bands (<250 Hz, 250 Hz–4 kHz, >4 kHz), each decaying at its Sabine RT60. It is energy-matched to the image-source part over 60–100 ms and cross-faded there.
  3. **Modal low end.** A sum of damped room modes (all axial, tangential and oblique modes below 220 Hz, f = (c/2)·√((nx/Lx)²+(ny/Ly)²+(nz/Lz)²)). It is level-matched over 100–160 Hz and crossed over to the upper model in that band with a raised-cosine fade in the frequency domain.
- **Treatment, absorption [low, mid, high].** The same in every room unless the card says otherwise:
  - std: walls .18/.30/.38, floor .08/.10/.14, ceiling .35/.55/.60
  - dry: walls .45/.80/.85, floor .10/.15/.20, ceiling .55/.85/.90
  - live: walls .12/.18/.20, floor .06/.08/.10, ceiling .18/.28/.32
- **Microphones.**
  - Stereo cards use an ORTF-style near-coincident cardioid pair: 0.17 m apart, each mic aimed ±55° off-axis, left mic on the listener's left.
  - The cardioid pattern is applied to every image source. The diffuse tail and the modal part are not direction-weighted.
  - Cards 2 and 3 use one omni measurement point, played identically to both speakers (mono, centred).
- **Sources.** The same samples, notes, timing and gain in both states (the app's CC0/CC-BY recordings; see `audio/CREDITS.md`). Each source is convolved separately with its own IRs in an `OfflineAudioContext` at 44.1 kHz.
- **Loudness method.**
  - Each state's stereo render is measured with ITU-R BS.1770 (K-weighting, 400 ms blocks, −70 LUFS absolute and −10 LU relative gates) and gain-normalised to −20 LUFS.
  - If either state then peaks above −3 dBFS, both states get the same extra cut. Card 4 is the only one this affects (both end at −22.6 LUFS).
  - There is no compression or limiting. Playback goes through a separate output path that bypasses the app's master compressor, and every state ends with a 0.25 s fade.
- **Display.** Waveforms, decay envelopes and responses are drawn from the rendered buffers (the direct-only render for 'Direct signal'). Reflection lanes show the direct waveform delayed and scaled by each calculated path.
- **Playback.** A card ignores taps while it is playing, so taps never overlap. Each state lasts 4.2–5.8 s.

## Card 1 · A volume of air
- Setup: Piano chord: low strings 0.5 m left of centre, treble 0.5 m right; ORTF cardioid pair 1.5 m away at 1.6 m height
- **WITHOUT**: 6.0 × 5.0 × 2.7 m · 30 m² · 81 m³, same studio treatment. RT60 Sabine [low/mid/high] [0.55, 0.35, 0.29] s; T20 from the IR 0.39 s. Axial modes [L/W/H] [[28.6, 57.2, 85.8, 114.3], [34.3, 68.6, 102.9], [63.5]] Hz. Direct path 4.86 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +3.97 ms (-5.6 dB); Ceiling +4.48 ms (-9.1 dB); Side wall +8.84 ms (-10.5 dB); Higher-order (2) +9.85 ms (-13.5 dB); Higher-order (2) +10.70 ms (-12.1 dB); Higher-order (2) +10.99 ms (-15.3 dB)
  - Loudness: -25.11 LUFS before matching, -20.14 LUFS after. Peak -6.01 dBFS. Direct-sound R−L per source: [-3.2, 3.2] dB.
- **WITH**: 10.0 × 9.5 × 5.2 m · 95 m² · 494 m³, same studio treatment. RT60 Sabine [low/mid/high] [1.03, 0.65, 0.54] s; T20 from the IR 0.65 s. Axial modes [L/W/H] [[17.1, 34.3, 51.5, 68.6, 85.8, 102.9], [18.1, 36.1, 54.2, 72.2, 90.3, 108.3], [33, 66, 98.9]] Hz. Direct path 4.86 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +3.97 ms (-5.6 dB); Ceiling +18.33 ms (-17.0 dB); End wall +20.01 ms (-15.7 dB); Higher-order (2) +21.08 ms (-16.5 dB); Side wall +21.55 ms (-16.2 dB); Higher-order (2) +22.56 ms (-17.0 dB)
  - Loudness: -27.53 LUFS before matching, -20.00 LUFS after. Peak -5.29 dBFS. Direct-sound R−L per source: [-3.2, 3.2] dB.
- Matching gain WITH relative to WITHOUT: +2.43 dB. Matched difference: 0.14 dB.

## Card 2 · Bass notes are physically long
- Setup: Bass cabinet near the left end wall, listening position at the same relative place in each room (one mono measurement point)
- **WITHOUT**: 6.0 × 5.0 × 2.7 m · 30 m² · 81 m³, same studio treatment. RT60 Sabine [low/mid/high] [0.55, 0.35, 0.29] s; T20 from the IR 0.39 s. Axial modes [L/W/H] [[28.6, 57.2, 85.8, 114.3], [34.3, 68.6, 102.9], [63.5]] Hz. Direct path 4.97 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +1.44 ms (-2.7 dB); End wall +3.75 ms (-6.4 dB); Higher-order (2) +4.64 ms (-7.7 dB); Side wall +6.51 ms (-8.8 dB); Ceiling +6.95 ms (-11.1 dB); Higher-order (2) +7.20 ms (-9.8 dB)
  - Loudness: -20.57 LUFS before matching, -20.00 LUFS after. Peak -9.16 dBFS. Direct-sound R−L per source: None dB.
- **WITH**: 10.0 × 9.5 × 5.2 m · 95 m² · 494 m³, same studio treatment. RT60 Sabine [low/mid/high] [1.03, 0.65, 0.54] s; T20 from the IR 0.68 s. Axial modes [L/W/H] [[17.1, 34.3, 51.5, 68.6, 85.8, 102.9], [18.1, 36.1, 54.2, 72.2, 90.3, 108.3], [33, 66, 98.9]] Hz. Direct path 7.84 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +0.98 ms (-1.5 dB); End wall +6.45 ms (-6.8 dB); Higher-order (2) +7.01 ms (-7.6 dB); Side wall +13.33 ms (-10.2 dB); Higher-order (2) +13.71 ms (-10.8 dB); Higher-order (2) +16.47 ms (-12.9 dB)
  - Loudness: -22.04 LUFS before matching, -20.00 LUFS after. Peak -9.48 dBFS. Direct-sound R−L per source: None dB.
- Matching gain WITH relative to WITHOUT: +1.47 dB. Matched difference: 0.00 dB.

## Card 3 · Too small, and the bass booms
- Setup: Test-tone sweep 38–85 Hz, loudspeaker at the left wall, measurement point at the same relative position in each room
- **WITHOUT**: 6.0 × 5.0 × 2.7 m · 30 m² · 81 m³, same studio treatment. RT60 Sabine [low/mid/high] [0.55, 0.35, 0.29] s; T20 from the IR 0.40 s. Axial modes [L/W/H] [[28.6, 57.2, 85.8, 114.3], [34.3, 68.6, 102.9], [63.5]] Hz. Direct path 11.15 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +0.71 ms (-1.0 dB); End wall +2.74 ms (-3.5 dB); Higher-order (2) +3.31 ms (-4.3 dB); Ceiling +4.39 ms (-6.4 dB); Higher-order (2) +6.13 ms (-7.7 dB); Side wall +6.25 ms (-5.4 dB)
  - Loudness: -18.00 LUFS before matching, -20.00 LUFS after. Peak -11.86 dBFS. Direct-sound R−L per source: None dB.
- **WITH**: 10.0 × 9.5 × 5.2 m · 95 m² · 494 m³, same studio treatment. RT60 Sabine [low/mid/high] [1.03, 0.65, 0.54] s; T20 from the IR 0.70 s. Axial modes [L/W/H] [[17.1, 34.3, 51.5, 68.6, 85.8, 102.9], [18.1, 36.1, 54.2, 72.2, 90.3, 108.3], [33, 66, 98.9]] Hz. Direct path 18.36 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +0.44 ms (-0.7 dB); End wall +4.61 ms (-3.5 dB); Higher-order (2) +4.96 ms (-4.1 dB); Side wall +12.97 ms (-6.2 dB); Ceiling +13.10 ms (-8.1 dB); Higher-order (2) +13.23 ms (-6.7 dB)
  - Loudness: -22.97 LUFS before matching, -20.00 LUFS after. Peak -8.80 dBFS. Direct-sound R−L per source: None dB.
- Matching gain WITH relative to WITHOUT: +4.97 dB. Matched difference: 0.00 dB.

## Card 4 · Drums need height
- Setup: Snare at 0.7 m, crash at 1.3 m; overhead pair at 1.9 m, 0.5 m in front of the kit (same heights in both rooms)
- **WITHOUT**: 6.0 × 5.0 × 2.7 m · 30 m² · 81 m³, same studio treatment. RT60 Sabine [low/mid/high] [0.55, 0.35, 0.29] s; T20 from the IR 0.38 s. Axial modes [L/W/H] [[28.6, 57.2, 85.8, 114.3], [34.3, 68.6, 102.9], [63.5]] Hz. Direct path 3.80 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +3.92 ms (-6.6 dB); Ceiling +4.50 ms (-10.3 dB); Higher-order (2) +8.54 ms (-14.2 dB); Side wall +11.02 ms (-13.4 dB); Side wall +11.50 ms (-13.7 dB); End wall +12.05 ms (-14.0 dB)
  - Loudness: -28.38 LUFS before matching, -22.64 LUFS after. Peak -4.11 dBFS. Direct-sound R−L per source: [0, 7.4] dB.
- **WITH**: 10.0 × 9.5 × 5.2 m · 95 m² · 494 m³, same studio treatment. RT60 Sabine [low/mid/high] [1.03, 0.65, 0.54] s; T20 from the IR 0.68 s. Axial modes [L/W/H] [[17.1, 34.3, 51.5, 68.6, 85.8, 102.9], [18.1, 36.1, 54.2, 72.2, 90.3, 108.3], [33, 66, 98.9]] Hz. Direct path 3.80 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +3.92 ms (-6.6 dB); Ceiling +18.99 ms (-19.0 dB); End wall +21.23 ms (-17.9 dB); Higher-order (2) +22.12 ms (-18.7 dB); Higher-order (2) +23.06 ms (-20.9 dB); Side wall +23.91 ms (-18.8 dB)
  - Loudness: -30.22 LUFS before matching, -22.63 LUFS after. Peak -3.00 dBFS. Direct-sound R−L per source: [0, 7.4] dB.
- Matching gain WITH relative to WITHOUT: +1.83 dB. Matched difference: 0.01 dB.

## Card 5 · A section needs distance to blend
- Setup: Violin, qanun, oud, cello left to right as drawn; ORTF cardioid pair in front
- **WITHOUT**: 6.0 × 5.0 × 2.7 m · 30 m² · 81 m³, same studio treatment. RT60 Sabine [low/mid/high] [0.55, 0.35, 0.29] s; T20 from the IR 0.38 s. Axial modes [L/W/H] [[28.6, 57.2, 85.8, 114.3], [34.3, 68.6, 102.9], [63.5]] Hz. Direct path 5.64 ms.
  - First image sources (delay after the direct sound, level relative to it): Ceiling +3.18 ms (-7.4 dB); Floor +4.62 ms (-5.7 dB); Side wall +5.87 ms (-7.7 dB); Higher-order (2) +7.72 ms (-12.5 dB); Higher-order (2) +8.71 ms (-10.1 dB); Higher-order (2) +9.35 ms (-12.4 dB)
  - Loudness: -18.33 LUFS before matching, -20.00 LUFS after. Peak -7.40 dBFS. Direct-sound R−L per source: [-7.6, -2.7, 2.8, 6.9] dB.
- **WITH**: 10.0 × 9.5 × 5.2 m · 95 m² · 494 m³, same studio treatment. RT60 Sabine [low/mid/high] [1.03, 0.65, 0.54] s; T20 from the IR 0.69 s. Axial modes [L/W/H] [[17.1, 34.3, 51.5, 68.6, 85.8, 102.9], [18.1, 36.1, 54.2, 72.2, 90.3, 108.3], [33, 66, 98.9]] Hz. Direct path 12.03 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +3.81 ms (-2.8 dB); Side wall +10.19 ms (-6.9 dB); Ceiling +10.29 ms (-8.8 dB); Higher-order (2) +12.46 ms (-8.2 dB); Higher-order (2) +16.54 ms (-11.4 dB); End wall +16.59 ms (-9.1 dB)
  - Loudness: -23.18 LUFS before matching, -20.00 LUFS after. Peak -8.45 dBFS. Direct-sound R−L per source: [-6.8, -2.4, 2.5, 6.5] dB.
- Matching gain WITH relative to WITHOUT: +4.85 dB. Matched difference: 0.00 dB.

## Card 6 · The room answers
- Setup: Short piano chord (released after 0.35 s); same piano and microphone arrangement as card 1
- **WITHOUT**: 6.0 × 5.0 × 2.7 m · 30 m² · 81 m³, same studio treatment. RT60 Sabine [low/mid/high] [0.55, 0.35, 0.29] s; T20 from the IR 0.37 s. Axial modes [L/W/H] [[28.6, 57.2, 85.8, 114.3], [34.3, 68.6, 102.9], [63.5]] Hz. Direct path 4.72 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +4.04 ms (-5.8 dB); Ceiling +4.55 ms (-9.3 dB); Higher-order (2) +9.95 ms (-13.8 dB); Side wall +10.37 ms (-11.6 dB); Side wall +10.84 ms (-11.9 dB); End wall +12.00 ms (-12.5 dB)
  - Loudness: -21.86 LUFS before matching, -20.00 LUFS after. Peak -8.21 dBFS. Direct-sound R−L per source: [0] dB.
- **WITH**: 10.0 × 9.5 × 5.2 m · 95 m² · 494 m³, same studio treatment. RT60 Sabine [low/mid/high] [1.03, 0.65, 0.54] s; T20 from the IR 0.62 s. Axial modes [L/W/H] [[17.1, 34.3, 51.5, 68.6, 85.8, 102.9], [18.1, 36.1, 54.2, 72.2, 90.3, 108.3], [33, 66, 98.9]] Hz. Direct path 4.72 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +4.04 ms (-5.8 dB); Ceiling +18.44 ms (-17.3 dB); End wall +20.13 ms (-16.0 dB); Higher-order (2) +21.20 ms (-16.8 dB); Side wall +23.13 ms (-17.0 dB); Side wall +23.62 ms (-17.1 dB)
  - Loudness: -23.70 LUFS before matching, -20.00 LUFS after. Peak -9.52 dBFS. Direct-sound R−L per source: [0] dB.
- Matching gain WITH relative to WITHOUT: +1.84 dB. Matched difference: 0.00 dB.

## Card 7 · One room, many characters
- Setup: Same 95 m² room, same positions: two snare hits, then a cello and violin chord
- **WITHOUT**: 10.0 × 9.5 × 5.2 m · 95 m² · 494 m³, dry: absorbers and curtains deployed. RT60 Sabine [low/mid/high] [0.52, 0.31, 0.29] s; T20 from the IR 0.16 s. Axial modes [L/W/H] [[17.1, 34.3, 51.5, 68.6, 85.8, 102.9], [18.1, 36.1, 54.2, 72.2, 90.3, 108.3], [33, 66, 98.9]] Hz. Direct path 6.66 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +2.68 ms (-3.6 dB); Ceiling +17.10 ms (-19.3 dB); End wall +19.78 ms (-19.0 dB); Higher-order (2) +20.57 ms (-19.9 dB); Higher-order (2) +21.08 ms (-21.3 dB); Side wall +21.58 ms (-19.5 dB)
  - Loudness: -22.22 LUFS before matching, -20.00 LUFS after. Peak -11.91 dBFS. Direct-sound R−L per source: [0, 4.5] dB.
- **WITH**: 10.0 × 9.5 × 5.2 m · 95 m² · 494 m³, live: reflective panel faces turned out. RT60 Sabine [low/mid/high] [1.69, 1.12, 0.99] s; T20 from the IR 1.15 s. Axial modes [L/W/H] [[17.1, 34.3, 51.5, 68.6, 85.8, 102.9], [18.1, 36.1, 54.2, 72.2, 90.3, 108.3], [33, 66, 98.9]] Hz. Direct path 6.66 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +2.68 ms (-3.3 dB); Ceiling +17.10 ms (-12.5 dB); End wall +19.78 ms (-12.8 dB); Higher-order (2) +20.57 ms (-13.5 dB); Higher-order (2) +21.08 ms (-14.2 dB); Side wall +21.58 ms (-13.4 dB)
  - Loudness: -17.49 LUFS before matching, -20.00 LUFS after. Peak -12.60 dBFS. Direct-sound R−L per source: [0, 4.5] dB.
- Matching gain WITH relative to WITHOUT: -4.73 dB. Matched difference: 0.00 dB.

## Card 8 · Trim it, and it stays trimmed
- Setup: Bass amp left, piano right, ORTF cardioid pair in front; same treatment assumption in both rooms
- **WITHOUT**: 7.5 × 8.0 × 3.2 m · 60 m² · 192 m³, same studio treatment. RT60 Sabine [low/mid/high] [0.71, 0.45, 0.38] s; T20 from the IR 0.45 s. Axial modes [L/W/H] [[22.9, 45.7, 68.6, 91.5, 114.3], [21.4, 42.9, 64.3, 85.8, 107.2], [53.6, 107.2]] Hz. Direct path 7.12 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +1.90 ms (-2.5 dB); Ceiling +6.27 ms (-9.0 dB); Higher-order (2) +8.93 ms (-11.0 dB); End wall +13.28 ms (-10.7 dB); Side wall +13.78 ms (-10.9 dB); Higher-order (2) +14.02 ms (-11.5 dB)
  - Loudness: -25.27 LUFS before matching, -20.00 LUFS after. Peak -8.73 dBFS. Direct-sound R−L per source: [-5, 5] dB.
- **WITH**: 10.0 × 9.5 × 5.2 m · 95 m² · 494 m³, same studio treatment. RT60 Sabine [low/mid/high] [1.03, 0.65, 0.54] s; T20 from the IR 0.68 s. Axial modes [L/W/H] [[17.1, 34.3, 51.5, 68.6, 85.8, 102.9], [18.1, 36.1, 54.2, 72.2, 90.3, 108.3], [33, 66, 98.9]] Hz. Direct path 9.10 ms.
  - First image sources (delay after the direct sound, level relative to it): Floor +1.55 ms (-1.8 dB); Side wall +15.03 ms (-10.0 dB); Higher-order (2) +15.66 ms (-10.7 dB); Ceiling +15.92 ms (-12.3 dB); End wall +18.35 ms (-11.1 dB); Higher-order (2) +18.69 ms (-13.6 dB)
  - Loudness: -27.02 LUFS before matching, -20.00 LUFS after. Peak -8.23 dBFS. Direct-sound R−L per source: [-5.5, 5.2] dB.
- Matching gain WITH relative to WITHOUT: +1.75 dB. Matched difference: 0.00 dB.

## Limits
- These are simulated responses from the stated geometry, not measurements of the future studio.
- Reflection factors are frequency-independent in the image-source part. Mic directivity is applied only to the early part.
- Every IR uses one fixed random seed.
- The source and listening positions for Cards 2 and 3 were chosen as representative points from a 20-position scan:
  - Card 2: at 41.2 Hz the small room sits about 8 dB below average at most positions; the large room about 1–4 dB.
  - Card 3: the small room's level range over 38–85 Hz is about 26 dB, against about 16 dB in the large room.
  - Other positions give different numbers.
