# films/launch — rules for agents (narrows brand/AGENTS.md, never widens it)

Launch film for **Quillon Briefs** (finished client deliverables — client alerts, board memos, chronology exhibits —
as formatted documents, not chat answers). Read `brand/AGENTS.md` first; everything there still applies.

## Scope
- Work only in `films/launch/`. Never edit `engine/`, `product-map/` or other lanes' files.
- CoDesign tools only (edit, preview, export, asset_generate). Every edit's code is kept in `build/NN-*.js`.
- The storyboard design (`Storyboard — Quillon Briefs`) is the spec: a change to the film starts as a change to its page.

## Film
- 16:9, 100 BPM, 4/4. Every cut on the beat grid in `build/beats.json`; the biggest move lands on the drop.
- Voice: `elevenlabs/eleven-v3-tts`, voice `Alice`. Music ducked to ~0.35 under the voice, full only where no one speaks.
- New product screens (the Brief document views) are built in CoDesign from the product-map chrome, Meridian Holdings data only.

## Standing rules from review
(appended after each review pass — see `review-notes.md`)
- **No type-only openers.** The product (or its output) is on screen from frame one; a hook line sits over it. (review 1, note 1)
- **Every click shows its result within 0.5 s.** A pointer never clicks into an unchanged frame. (review 1, note 2)
- **The drop belongs to the music.** At least 1.2 s with no voice from the drop; the biggest transition and the hit land on it. (review 1, note 3)
- **Every end card carries a direction** — where the viewer gets it, not just the name and a line. (review 1, note 5)
