# Lane brief: on-brand blog graphics (lane E)

Proof that **IMG.LY CoDesign alone replaces Harvey's marketing stack**. Harvey runs "Spectre", a creative agent in
Slack: people ask for blog graphics, it edits Figma brand templates and replies with what changed. Their brand lives
as a Figma library of foundations, grids and templates (charts for blog posts, long-form PDF guides). Reproduce the
**templates + requests** part with CoDesign (the Slack bot itself is out of scope). Root: the repo root;
read `PLAN.md` and `brand/AGENTS.md` (Quillon: ink #111318, paper #F3EFE6, seal accent #C2412D, Fraunces + Inter).

## Rules
- CoDesign only. Load the codesign `handbook`, `api`, `judge`, `brand` skills first. Never edit other lanes' files.
- Report **status + ETA** in your pane output at least every 10 minutes, as a table: Task | Description | State | ETA.
- Your ticket: In Progress at start; when done, comment with the paths and close it.
- Work in `blog/`.

## Steps
1. **Brand template library** (`blog/templates.imgly`): one design with 3 named template pages built from
   the brand rules: (a) blog hero 2400×1260, (b) bar/line chart card 1600×1000 (native shapes, data-driven code), and
   (c) a long-form PDF guide cover + one interior page (A4, print units). Name every block so a later request can
   change it by name.
2. **Three requests**, each handled the way Spectre would: a short request (write it to `blog/requests.md`), then edit
   a COPY of the template (`import({ source: { uri } })`), then a reply naming what changed and which decisions need review:
   - "Hero for our post 'Four of six agreements trigger on a sponsor sale', use the change-of-control table as the visual"
   - "Chart: hours per 100 leases reviewed, manual 46 h vs Quillon 1.5 h, and associate-hours saved per quarter at 2,400 leases"
   - "Cover + interior for the PDF guide 'The lender-side playbook: 12 positions we hold'"
3. Judge each one, `scorecard`, save `.imgly`, export PNG (hero, chart) and PDF/X (guide) to `blog/`.
4. Write `blog/STATUS.md` (one line) and `blog/replies.md` (the three Spectre-style replies).
