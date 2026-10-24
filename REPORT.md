# Harvey's frontier marketing pipeline, rebuilt on CoDesign alone

Source: [How Harvey is building a frontier marketing org](https://www.harvey.ai/blog/how-harvey-is-building-a-frontier-marketing-org).
Stand-in brand **Quillon** (fictional legal AI) with fictional accounts.
No Harvey footage, UI, logo or voice clone was used.

## What Harvey uses → what replaced it

| Harvey step | Harvey tooling | CoDesign equivalent | Where |
|---|---|---|---|
| Storyboard as the film spec, reviewer comments, standing rules | Figma | Storyboard design (one page per beat), review notes → `films/launch/AGENTS.md` | `films/launch/` |
| Music cut to a beat drop, SFX, outro options | Manual + agent | `asset_generate` music at exact length/BPM, in-engine beat map, SFX model, 3 outro variants | `films/launch/` |
| Product Map (app screens as components) | Agents → Figma components | 7 Quillon screens built in CoDesign from data (`edit`), exported @2x | `product-map/` |
| Motion Primitives (title cards, lower thirds, text animators, product moves) | Figma Motion | Engine primitives: title card, flow label, punch-in, pointer click, captions, end card | `engine/film.js` |
| 44 company-agnostic flows in 13 categories | Figma | 7 flows in 5 categories (`flows.json`: screen, punch-in region, click target) | `product-map/flows.json` |
| Account research | Enterpret MCP (Gong, Salesforce, Slack) | Account briefs (`notes`): stand-in, orchestration rather than production | `accounts/` |
| Script + cloned narrator | Agent + ElevenLabs MCP | Lane agent writes the script (5 of 12 pre-written in `accounts.json`); `elevenlabs/eleven-v3-tts` via the CoDesign gateway (stock voice) | `accounts/*.script.json` |
| ~750-line JS film engine | Custom JS building each film inside Figma | `engine/film.js` (~220 lines): one `edit` = one finished timeline | `engine/` |
| Contact sheets + flags (clipped text, small type, stray pointers) | Custom | In-engine QA in the same edit + contact sheet built from the exported mp4 | `films/*/contact-sheet.png` |
| 3 lane files + coordinator; 36 films in 69 min | Figma files | 3 herdr lanes (Claude Code sessions sharing one local CoDesign server) + coordinator | `tracker.md` |
| Tracker artifact | Claude artifact | `tracker.md` + per-film `STATUS.md` | |
| Brand guidelines for agents | AGENTS.md + Figma library | `brand/AGENTS.md` + CoDesign template library | `brand/`, `blog/templates.imgly` |
| Image/video generation | Figma Weave | `asset_generate` (image/video models) | |
| Spectre: Slack creative agent for blog graphics | Internal agent + Figma | Template edits by request with Spectre-style replies (the Slack bot itself is out of scope) | `blog/` |

## Results
| | Harvey (their post) | CoDesign rebuild (this run) |
|---|---|---|
| Tools | Figma, Figma Motion, Figma Weave, ElevenLabs (MCP), Enterpret MCP, custom JS engine, Claude | CoDesign MCP + its AI gateway, Claude Code, herdr panes |
| Film engine | ~750 lines of JS | `engine/film.js` ~220 lines, runs as ONE `edit` per film |
| Tailored films | 36 in 69 min (one batch) → ~1.9 min/film | Batch 1: 12 in 19 min incl. a fix-and-rebuild pass (first pass 11 in 12 min) → ~1.6 min/film. Batch 2: 30 in 17 min 56 s (5 lanes, 0.5.1, 14:37:50 → 14:55:45) → ~0.6 min/film. 42 in total. |
| Fix-and-rebuild | not described | 9 films rebuilt with engine fixes in 6 min (16:13 → 16:19) |
| Launch film | Figma storyboard, review comments, beat drop, outro options | `films/launch/`: storyboard v1 → review notes → v2, standing rules, drop at 25 s, outros A/B/C, 52.8 s |
| QA | contact sheets, flags (clipped text, small type, stray pointers) | same flags in-engine + caption pace + voice fit; contact sheet cut from the exported mp4 |
| Blog/brand graphics | Spectre in Slack editing Figma templates | template library + 3 requests with Spectre-style replies; hero, chart PNG, PDF/X-4 guide |
| Generation spend | not stated | ≈ 3,000 gateway credits (estimate, ≈ $3): ~76 voice lines × 27, 3 music tracks (216, 333, launch), SFX |

Every account film and the explainer have a recorded `judge` pass (`scorecard`); the launch film ran the judge loop with fixes (`films/launch/build/README.md`). Each has a contact sheet
and an editable `.imgly`; `tracker.md` lists them.

Caveats: the batch numbers count wall-clock from batch start (`lanes/batch-start.txt`, 16:00) to the lanes' completion reports (16:10–16:12) and the last rebuilt mp4 (16:19); the lanes ran on one laptop sharing one local

Batch 2 caveats: wall-clock from the first lane prompt (`lanes/batch2-start.txt`, 14:37:50) to the last mp4's file time (14:55:45), on one 16-core / 64 GB Mac. It includes about 5 minutes lane G lost waiting on CoDesign's machine-wide 4-engine limit before it was restarted with `IMGLY_MAX_ENGINES=6`. Two of lane G's films were reassigned to idle lanes near the end. Our films run 35–48 s (batch 2: 41–47 s); Harvey's post doesn't give their length, so the per-film numbers aren't like for like.
CoDesign server (up to 4 engines). Quillon's 7 shared screens are law-firm flavoured, so in-house accounts (insurance,
logistics) get a slightly generic product story. A larger flow menu (Harvey has 44) would close that gap, and adding a flow is one
`edit` plus one `flows.json` entry.

## CoDesign gaps found (and workarounds)
1. **`engine.design.create` with a group parented to a track**: the group lands on the page, not the track, and
   its children's `playback.timeOffset` values are re-sequenced back-to-back (an eyebrow at 0.3 s and a headline at
   0.5 s became 0 s and 8.1 s). Workaround: create, `appendChild` to the track, then set the playback of the group and
   each child (`placeGroup` in `engine/film.js`). `video.md` says group clips on tracks are supported, so this is
   either a facade bug or a docs gap.
2. **In-engine rendered frames can't live in a scene**: `engine.block.export` → data/buffer URI image fill makes the
   checkpoint fail with `SCENE.DISALLOWED_SCHEMES "buffer"`. So contact sheets are built from video fills of the
   exported mp4, which also checks the real deliverable. Returning in-engine renders from an `edit` as images works
   and replaces ~9 `preview` calls per film with one.
3. **`export` has no scale option**: hi-res screen PNGs needed a scaled copy of the design (`design.scale(page, 2)`).
4. **Video fills render grey in `engine.block.export`** inside an edit (fine in `preview`/`export`).
5. **Re-saving a `.imgly` after destroying a page with a video fill still bundles the video** (+28 MB).
6. **Slide in-animation moves a text block's glyphs but not its native background** (chip detaches mid-slide).
7. **Every `edit` result repeats the full `names` list** (300+ names for the product map), which costs context on
   large designs.
8. **Clips on a hand-timed track must be in time order** as children; otherwise their `timeOffset` is rewritten on commit.
