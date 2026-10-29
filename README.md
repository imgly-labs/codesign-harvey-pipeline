# CoDesign × Harvey: a frontier marketing film pipeline, rebuilt

## Make one film for your own brand

1. Install [Claude Code](https://claude.com/claude-code), then the CoDesign plugin:

   ```sh
   claude plugin marketplace add imgly/codesign
   claude plugin install codesign@imgly-codesign
   ```

2. Clone the inputs (29 MB):

   ```sh
   GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/imgly-labs/codesign-harvey-pipeline
   cd codesign-harvey-pipeline && git lfs pull --include "assets/**"
   ```

3. Rebuild one film to check your setup (about 4 minutes): [REPRODUCE.md, step 3](REPRODUCE.md#3-rebuild-an-account-film).
4. Add your own account and render its film: [REPRODUCE.md, step 4](REPRODUCE.md#4-make-a-film-for-a-new-account).
   Your own brand and product screens: [HOW-TO.md](HOW-TO.md).

Voice and music use CoDesign's AI gateway: sign in once with the `login` tool and use **FILMS3000** for free credits.
How it works: [codesign.co/films](https://codesign.co/films).

## About this repo

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
- **CoDesign SDK**: put the same pipeline inside your own CMS or product. [Contact sales](https://img.ly/forms/contact-sales/) to get a CoDesign license key.

Quillon and every account are fictional. No Harvey footage, UI, logo or voice was used.
Code is MIT, designs and documents CC BY 4.0; the generated audio is included for reproduction only (see `LICENSE`).
