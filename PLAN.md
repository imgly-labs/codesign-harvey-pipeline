# Harvey film pipeline, rebuilt on CoDesign

Source: https://www.harvey.ai/blog/how-harvey-is-building-a-frontier-marketing-org (read 2026-10-23).
Goal: show marketing teams at companies like Harvey that CoDesign alone replaces the stack Harvey describes
(Figma + Figma Motion + Figma Weave + ElevenLabs + their 750-line JS film engine + manual QA).
Audience of the proof: modern B2B marketing orgs.

## Ground rules
- Fictional stand-in product **Quillon** (AI workspace for legal teams) and fictional target accounts.
  No Harvey footage, logo, UI or narrator voice clone.
- Everything through CoDesign (MCP tools, engine, AI gateway). No ffmpeg, Figma, ElevenLabs direct.
- All outputs under the repo root.

## Harvey step → CoDesign equivalent
| # | Harvey | CoDesign |
|---|--------|----------|
| 1 | Figma storyboard as film spec, reviewer comments | Storyboard design (one page per beat) saved as `.imgly`, reviewable in `view`; `storyboard/` |
| 2 | Music retimed to beat drop, SFX, outro options | `asset_generate` music at fixed BPM + engine beat map; SFX model; 3 end-card options |
| 3 | Product Map (app screens rebuilt as components) | `lib/product-map.js`: Quillon screens built from data in the engine; exported PNG screen library |
| 4 | Motion Primitives | `lib/primitives.js`: title card, lower third, text animator, product move (push-in), pointer click |
| 5 | Account research (Enterpret/Gong/Salesforce) | `accounts/*.json` fictional account briefs (stand-in for CRM research; orchestration, out of scope) |
| 6 | Script + cloned voice (ElevenLabs) | Agent-written script; `elevenlabs/eleven-v3-tts` stock voice; `scribe-v2` word timings → captions |
| 7 | 750-line JS film engine | `engine/film.js`: one `edit` turns a script JSON into the full timeline |
| 8 | Automated QA contact sheets + flags | `engine/qa.js` in-engine checks (clipped text, small type, stray pointer) + contact-sheet design PNG |
| 9 | 3 lane files + coordinator, 36 films / 69 min | 3 herdr lanes (separate CoDesign servers) + me as coordinator; time the batch |
| 10 | Claude artifact tracker | `tracker.md` (one row per film) |
| 11 | AGENTS.md brand + Figma library | `brand/AGENTS.md` + `brand/kit.json` (CoDesign brand kit) |
| 12 | Figma Weave image/video gen | `asset_generate` image/video models |
| 13 | Spectre Slack creative agent (blog graphics) | Blog graphics lane via CoDesign; Slack bot itself out of scope |

## Deliverables
1. Brand kit + AGENTS.md
2. Product Map (screens) + Motion Primitives library
3. Film engine + QA
4. Launch film "Quillon Artifacts" (~45 s, 16:9, VO + music)
5. Tailored account films: pilot 5, then batch (target 12+) in parallel lanes, timed
6. Contact sheets per film, tracker
7. Blog graphics (3) on brand
8. `REPORT.md`: side-by-side Harvey vs CoDesign, timings, credits, gaps found

## Status
See tracker.md and the 10-minute status tables.

## Added 2026-10-23 (user)
9. **Explainer / pitch** to share: `explainer.mp4` (60–90 s, made in CoDesign; friendly nudge at Harvey, invite others),
   `HOW-TO.md` (build it yourself), `share-copy.txt`.
10. Everything lands in `imgly-codesign/ads/<ts>_codesign_harvey_pipeline/` (LFS for media), on a branch; ask before push.
