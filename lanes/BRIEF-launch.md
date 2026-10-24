# Lane brief: Quillon launch film (lane D)

Proof that **IMG.LY CoDesign alone replaces Harvey's marketing film stack**. Harvey built a launch film for
"Harvey Artifacts" in Figma, with a Figma storyboard as the spec, reviewer comments on the canvas, music retimed to a
beat drop, sound design and several outro options. Reproduce that **pipeline** with CoDesign for a fictional launch:
**"Quillon Briefs"**: Quillon now produces finished client deliverables (client alerts, board memos, chronology
exhibits) as formatted documents, not chat answers. Root: the repo root; read `PLAN.md`,
`brand/AGENTS.md`, `engine/film.js` (reuse its helpers and motion grammar) and the product screens in `product-map/2x/`.

## Rules
- CoDesign only (codesign MCP tools: `edit`, `preview`, `export`, `asset_generate`, …). No ffmpeg, Figma, external tools.
- Load the codesign `handbook`, `api`, `judge`, `launch-video` skills and `skill://codesign/handbook/video.md` first.
- Never edit `engine/`, `product-map/` or other lanes' files. Work in `films/launch/`.
- Report **status + ETA** in your pane output at least every 10 minutes, as a table: Task | Description | State | ETA.
- Your ticket: In Progress at start; when done, comment with the paths and close it.

## Steps
1. **Storyboard as spec**: a CoDesign design `Storyboard — Quillon Briefs`, one 1920×1080 page per beat (8–10 beats,
   45–55 s total): frame sketch, on-screen words, VO line, motion note, transition. Export it as PDF
   (`films/launch/storyboard.pdf`) and save the `.imgly`. Then do one **review pass**: write 3–5 reviewer notes to
   `films/launch/review-notes.md` as a critical creative director would (hook strength, proof moment, pacing), apply
   them to the storyboard, and list which notes become standing rules (append those to `films/launch/AGENTS.md`).
2. **Score**: music via `asset_generate` (`@falai/sonilo/v1.1/text-to-music` takes an exact `duration`) at a fixed BPM
   with a clear **beat drop** at the proof moment; run the beat-map recipe from the `launch-video` skill
   (`reference/sound.md`) and snap every cut to the grid; the biggest move lands on the drop. Two SFX (whoosh, hit) via
   `@falai/fal-ai/elevenlabs/sound-effects/v2`. VO with `elevenlabs/eleven-v3-tts` voice `Alice`.
3. **Build** the film as one page per the storyboard (tracks per layer, transitions on cuts, captions, pointer clicks on
   product screens, music ducked under VO). Product UI comes from `product-map/2x/*.png` (uris in `product-map/flows.json`);
   you may also generate one or two new screens of a "Brief" document in CoDesign if the story needs them.
   Note: `engine.design.create` with a group parented to a track lands the group on the page and re-sequences the
   children's playback; use the `placeGroup` helper from `engine/film.js`.
4. **Three outro options** (end-card variants A/B/C) as separate saved designs or pages; pick one for the master,
   export all three as PNGs (`films/launch/outro-{a,b,c}.png`).
5. **Judge** with in-engine frames (`engine/frames.js`), fix, `scorecard`, save `.imgly`, export
   `films/launch/quillon-briefs-launch.mp4` (check `audioDuration`), make a contact sheet (`engine/contact-sheet.js`).
6. Write `films/launch/STATUS.md` with one line of status, plus the paths.
