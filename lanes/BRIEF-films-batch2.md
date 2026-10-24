# Lane brief: batch 2, 30 more tailored account films (lanes F–J)

You are a builder lane in a proof that **IMG.LY CoDesign** can run Harvey's marketing film pipeline
(https://www.harvey.ai/blog/how-harvey-is-building-a-frontier-marketing-org: Figma, Figma Motion, Figma Weave,
ElevenLabs, and a 750-line JS film engine; they report 36 films in 69 minutes). Batch 1 made 12 films; this batch makes
30 more, timed. Root: the repo root (read `PLAN.md` and `brand/AGENTS.md` first). The coordinator (another Claude
session) merges your work and reports to the user. Speed matters, but never ship a film with a QA flag or a failed judge.

## Your films
- **Lane F**: ashcombe-reed, calder-mines, fenwick-lowe, meridian-rail, oakhurst-trust, blackthorn-ip
- **Lane G**: harrow-vale, solent-shipping, verity-health, graystone-capital, pemberton-cross, aldermoor-energy
- **Lane H**: kingsley-ward, norrland-telecom, castlegate-retail, devereux-partners, halden-pharma, redfern-sloane
- **Lane I**: auric-payments, whitlock-barnes, tamsin-foods, lachlan-moore, everly-media, stroud-aviation
- **Lane J**: ravensworth-law, quarry-hill-water, sinclair-oduya, northgate-logistics, belmont-croft, larchfield-insurance

## Rules
- CoDesign only (codesign MCP tools). No ffmpeg, Figma, external TTS. Node/Python only for JSON/file plumbing.
- Fictional brand **Quillon** and fictional accounts; never real firm names on screen.
- Never edit `engine/`, `product-map/`, `accounts/accounts.json` or another lane's files. Report engine bugs to the
  coordinator in your pane output and in `films/<id>/STATUS.md`; work around them in your own edit if you must.
- Report **status + ETA** in your pane output after every film and at least every 10 minutes, as a table:
  Task | Description | State | ETA.
- Linear: when your lane is done, comment on CODE-743 (Batch 2: 30 more account films) with your final table. Do not change its status.
- Do not run git commands (no add/commit/push). The coordinator commits.
- CoDesign plugin: this session must run the public **0.5.1** plugin (check the loaded skills path: `.../imgly-codesign/codesign/0.5.1/...`). If it is anything else, stop and report. On 0.5.1, `engine.scene.*` is rejected in edit code; `engine/film.js` already uses `engine.design.create({ type: 'scene' })`.
- Start every film with `import({ title: 'Film — <Account>' })` (save the previous one first). One film at a time.

## Before the first edit (once)
Load the codesign `handbook`, `api` and `judge` skills (the MCP requires it). Skim `engine/film.js`: one `edit`
builds the whole film from a `SCRIPT` object.

## Per film (target ≤ 15 min each)
1. **Script** (none of your accounts has one yet).
   Write `accounts/<id>.script.json` from the account's `notes` + `flows` and `brand/AGENTS.md` voice rules:
   ```json
   { "title": { "eyebrow": "Prepared for <Account>", "headline": "<≤ 7 words, a number from the notes>", "accent": "<substring of headline>" },
     "end": { "line": "Quillon for <Account>’s <team>" },
     "vo": ["<title line, spoken spelling, ~16 words>", "<flow 1 line ~18 words>", "<flow 2>", "<flow 3>", "<AE> will walk your team through it on <weekday> the <ordinal>."],
     "captions": ["<same 5 lines in written spelling: digits, &, real names>"] }
   ```
   Each flow line describes what that flow's screen shows (see `product-map/flows.json` labels and `product-map/2x/*.png`).
   Spoken spelling: numbers as words, "&" as "and". Accounts that already have `vo` in accounts.json: use them as-is.
2. **Voice**: 5 × `asset_generate({ model: 'elevenlabs/eleven-v3-tts', prompt: <vo line>, params: { voice: 'Alice' } })`
   (run them in parallel). Keep `id` + `meta.duration`.
3. **Assemble**: `node engine/make-script.mjs <id> '[{"uri":"…","dur":7.2}, …]'` → `build/<id>-edit.js`.
4. **Build**: `import({ title })`, then ONE `edit` whose `code` is the full content of `build/<id>-edit.js`.
   It returns `{ duration, beats, flags }`. Any flag → fix it (surgical edit), or report it if it is an engine bug.
5. **Judge**: one `edit` (render:false) with `const TIMES = [...]` + `engine/frames.js`. Pick about 9 times from the
   returned beats: 0.8, the title mid, each flow's wideMid and detailMid, the end-card mid. Score the judge axes
   on those frames; fix what fails; then `scorecard({ verdict: 'pass' })`.
6. **Save + deliver**: `export({ format: 'imgly', outPath: films/<id>/<id>.imgly })`, then
   `export({ format: 'mp4', blockId: <page>, outPath: films/<id>/<id>.mp4 })`. Check `audioDuration ≈ duration`.
7. **Contact sheet**: one `edit` with `MP4`, `FILM_ID`, `FLAGS`, `TIMES` (12 entries with labels) + `engine/contact-sheet.js`
   → `export({ format: 'png', blockId: <contact id>, outPath: films/<id>/contact-sheet.png })` → one `edit` removing
   the `contact` page (see the file header).
8. **Track**: write `films/<id>/STATUS.md` (one line: `<id> | <account> | <flows> | done | <duration> s | films/<id>/<id>.mp4 | <start>–<end time> | <notes/flags>`).

When all your films are done, print a final table and stop.
