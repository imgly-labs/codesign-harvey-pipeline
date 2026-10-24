# CoDesign × Harvey: a frontier marketing film pipeline, rebuilt

Harvey published [How Harvey is building a frontier marketing org](https://www.harvey.ai/blog/how-harvey-is-building-a-frontier-marketing-org):
tailored demo films for target accounts, a launch film, AI voiceover, automated QA, parallel agent lanes and a creative
agent for blog graphics. This repo is the same pipeline rebuilt with [IMG.LY CoDesign](https://codesign.co) (driven by
Claude Code) for a fictional legal-AI product, **Quillon**: every input, script, design and film. Clone it and
reproduce all of it: **[REPRODUCE.md](REPRODUCE.md)**.

**Start here**
- `explainer/explainer.mp4` (67 s pitch, editable `explainer.imgly`, poster `poster.png`) + `share-copy.txt` (LinkedIn / X / alt text)
- `HOW-TO.md`: build it yourself, step by step
- `REPORT.md`: Harvey step → CoDesign equivalent, results, the CoDesign gaps we hit

**The output**
- `films/<account>/`: 42 tailored account films (batch 1: 12; batch 2: 30 in 18 minutes) (mp4 + editable `.imgly` + contact sheet + STATUS), `tracker.md`
- `films/launch/`: "Quillon Briefs" launch film with its storyboard v1/v2, review notes, standing rules and outros A/B/C
- `blog/`: brand template library, three requests with Spectre-style replies, hero/chart PNG, PDF/X-4 guide

**The machinery**: `brand/AGENTS.md`, `product-map/` (screens + `flows.json`), `engine/` (one edit = one film),
`accounts/`, `lanes/` (the briefs the agent lanes ran), `build/` (every generated edit script), `assets/` (every input:
screens, voice, music, SFX).

**Two ways to run it yourself**
- **CoDesign MCP** (free): the Claude Code plugin this repo was built with. Install in two commands, see `REPRODUCE.md`.
- **CoDesign SDK**: put the same pipeline inside your own CMS or product. [Contact sales](https://codesign.co).
- The **CoDesign app** is coming soon: [register here](https://go.imgly.dev/osvah1).

Quillon and every account are fictional. No Harvey footage, UI, logo or voice was used.
Code is MIT, designs and documents CC BY 4.0; the generated audio is included for reproduction only (see `LICENSE`).
