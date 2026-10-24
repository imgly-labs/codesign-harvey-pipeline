# Build Harvey's marketing film pipeline yourself, with CoDesign

Harvey published [How Harvey is building a frontier marketing org](https://www.harvey.ai/blog/how-harvey-is-building-a-frontier-marketing-org).
It describes a launch film, tailored demo films for hundreds of target accounts, AI voiceover, automated QA, parallel
agent lanes, and a Slack creative agent. Their film stack: Figma, Figma Motion, Figma Weave, ElevenLabs and a ~750-line JS film engine.

We rebuilt the core of that pipeline with **one design tool, [IMG.LY CoDesign](https://codesign.co)** (driven by Claude Code), for a fictional legal-AI
product called **Quillon**:

- 12 tailored account films in **19 minutes** wall-clock across 3 agent lanes, including a fix-and-rebuild pass
  (first pass: 11 films in 12 minutes). Harvey's write-up reports 36 films in 69 minutes.
- A 53 s launch film, with a storyboard, a review pass, a beat drop and three outro options.
- On-brand blog graphics and a print-ready PDF guide.
- The explainer video you may have just watched.

Everything below is what we actually ran. Copy it.

## 0. Install

```sh
claude plugin marketplace add imgly/codesign
claude plugin install codesign@imgly-codesign
```

Sign in once (the `login` tool) to use the AI gateway for voice, music and images. Everything else works without an
account.

## 1. Brand as rules an agent reads (`brand/AGENTS.md`)

Harvey writes a top-level `AGENTS.md`, with per-project files layered on top. Do the same. Our brand file is one page:

- **Voice:** name the document, the clause, the number. No "unlock", no "seamless".
- **Colour:** paper/ink plus **one** accent, used once per frame.
- **Type:** two families, nothing else.
- **Film grammar:** margins, how the product window sits, the pointer style.
- **Avoid list:** stock gavels, a second accent, real client names.

Every agent reads it before it touches a frame. CoDesign's `judge` gate scores each design against typography,
colour, composition and copy rules before anything ships.

## 2. Product Map: rebuild your key screens once (`product-map/`)

Harvey's agents crawled the app and rebuilt the screens as Figma components. We asked Claude to build seven Quillon
screens directly in CoDesign: Assistant, cited answer, Vault review table, Word add-in redline, litigation chronology,
Outlook reply and the firm playbook. Each one is a single `edit` that lays out the UI from data. Then:

- export them @2x (scale the page 2×, export PNG);
- describe each **flow** in `flows.json`: which screen, the 16:9 punch-in region, the pointer's click target.

That is your company-agnostic flow menu. Harvey has 44 flows in 13 categories; we started with 7 in 5.

## 3. The film engine: one `edit` = one film (`engine/film.js`, ~220 lines)

The engine is plain JavaScript run inside a single CoDesign `edit`. It takes a `SCRIPT`:

```js
const SCRIPT = {
  id: 'hallbrook-weir', account: 'Hallbrook & Weir', ae: 'Dana Whitfield', meeting: 'Thu 6 Nov',
  title: { eyebrow: 'Prepared for Hallbrook & Weir', headline: '2,400 leases a quarter. One review table.', accent: '2,400 leases' },
  end: { line: 'Quillon for Hallbrook & Weir’s real estate group' },
  flows: [/* 3 entries from flows.json */],
  vo: [/* 5 voice clips: { uri, dur } */], captions: [/* 5 lines */], music: { uri }
};
```

From that one object it builds the whole timeline:

- **Timing.** Every beat is snapped to the music grid and made long enough for its voice line.
- **Layers.** Four tracks: media, words, pointer and captions. Transitions go on every cut: `push` between flows,
  `cross-zoom` into the punch-in.
- **Camera.** A slow `crop_zoom` on the product window, then a punch-in cut to the flow's detail region.
- **Pointer.** The pointer glides in and clicks, with a seal-red ring that pops.
- **Captions.** Phrase chips, balanced to at most 8 words and timed across each voice line.
- **Cards.** Title card and end card ("Walkthrough with Dana · Thu 6 Nov"), centred by measurement.
- **Audio.** Music bed kept low (0.32) under the voice, with fades.
- **QA.** Clipped text, type under 22 px, text outside the safe area, a stray pointer, caption pace and voice overrun
  are all checked in the same edit, which returns a flag list.

## 4. Voice, music, sound: all through the CoDesign gateway

- **Voice:** `asset_generate({ model: 'elevenlabs/eleven-v3-tts', prompt, params: { voice: 'Alice' } })`, one clip per beat.
  Write the prompt the way it's spoken ("twenty-four hundred"). Captions use the written form ("2,400").
- **Music:** `@falai/sonilo/v1.1/text-to-music` takes an exact `duration`. Ask for the BPM and the drop
  ("100 BPM, beat drop at 25 s"). The `launch-video` skill's beat-map recipe reads the grid from the audio inside the engine.
- **SFX:** `@falai/fal-ai/elevenlabs/sound-effects/v2` for whooshes and hits.

## 5. QA that watches the export

- **Judge:** one `edit` renders ~9 frames inside the engine and returns them as images (`engine/frames.js`).
  Score them, fix, then `scorecard({ verdict: 'pass' })`.
- **Contact sheet:** after the mp4 export, a page of 12 video fills of **the exported mp4**, each trimmed to one moment
  (`engine/contact-sheet.js`) → PNG. If the export went black, you see it.

## 6. Parallel lanes plus a coordinator

Harvey ran three lane files with a builder agent each, plus a coordinator. We ran three Claude Code sessions in
herdr terminal panes, each with its own CoDesign design session (one local server, up to 4 engines) and a one-page brief (`lanes/BRIEF-films.md`).
Per film, each lane:

1. writes the script from the account notes (or uses the one provided);
2. generates five voice lines;
3. assembles `build/<id>-edit.js` and runs it as one `edit`;
4. judges and exports;
5. builds the contact sheet;
6. writes a `STATUS.md` row.

The coordinator rolls the status rows into `tracker.md`, fixes shared bugs the lanes report in the engine, and asks
the lanes to rebuild. The first batch ran 16:00 → 16:12 (lanes reported done in Linear at 16:10–16:12). Rebuilding nine films with engine fixes took until 16:19.

## 7. The launch film: storyboard as spec (`films/launch/`)

1. **Storyboard.** A CoDesign design with one page per beat (frame, words, voice line, motion, transition), exported as PDF.
2. **Review pass.** A critical creative-director pass writes notes ("the proof moment clicks into nothing"). They are
   applied as storyboard v2, and the notes that should always hold become standing rules in `films/launch/AGENTS.md`,
   the way Harvey's agent asks which notes should become rules.
3. **Score.** Music at a fixed BPM with the drop on the proof moment, then the beat map. Every cut lands on the grid,
   and the drop gets 1.2 s with no voice.
4. **Build and outros.** Build from the storyboard. Make three outro options and pick one for the master.

## 8. Blog graphics: Harvey's "Spectre" without the Slack bot (`blog/`)

1. One template library design (hero, chart card, A4 guide), every block named.
2. Each request edits a **copy**: "chart: 46 h manual vs 1.5 h Quillon per 100 leases".
3. The agent replies with what changed and which decisions need a human: invented sample data, legal substance.
4. The guide ships as PDF/X-4.

## What we learned (CoDesign gaps)

- **Group clips on tracks.** A group created with a track as parent lands on the page, and its children's timings are
  re-sequenced. Create it, `appendChild` it to the track, then set the timings (`placeGroup`).
- **In-engine renders can't be stored in the scene.** `engine.block.export` frames can't live in it as image fills
  (`SCENE.DISALLOWED_SCHEMES`), and they render video fills grey. Return them as images for judging; build contact
  sheets from the exported mp4.
- **Re-saving after deleting a video-fill page still bundles the video** in the `.imgly`. Save before the contact sheet.
- **Clips on a hand-timed track must be in time order** as children, or their offsets get rewritten on commit.
- **Slide in-animations** move a text block's glyphs but not its background. Use fade for chips.

## The files

| Path | What |
|---|---|
| `brand/AGENTS.md` | brand rules for agents |
| `product-map/` | 7 screens (`.imgly` + @2x PNG) and `flows.json` |
| `engine/` | `film.js`, `make-script.mjs`, `rebuild.mjs`, `frames.js`, `contact-sheet.js` |
| `accounts/` | account briefs and lane-written scripts |
| `lanes/` | the lane briefs (films, launch, blog) |
| `explainer/` | this pitch video (mp4, poster) |
| `films/<account>/` | mp4, editable `.imgly`, contact sheet, `STATUS.md` |
| `films/launch/` | storyboard v1/v2, review notes, standing rules, launch mp4, outros, contact sheet |
| `blog/` | templates, three requests, replies, hero/chart PNG, PDF/X guide |
| `REPORT.md` | full step-by-step mapping, timings, gaps |

**Your turn.** Point it at your product, your accounts and your brand.
