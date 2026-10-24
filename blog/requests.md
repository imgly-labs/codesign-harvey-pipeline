# Blog graphics requests (Spectre-style, as they would arrive in Slack)

Template library: `blog/templates.imgly` (pages `tpl/hero`, `tpl/chart`, `tpl/guide-cover`, `tpl/guide-page`).
Each request is handled on a COPY of the template (`import({ source: { uri } })`); the library is never edited.

## R1: blog hero
> @spectre hero for our post "Four of six agreements trigger on a sponsor sale". Use the change-of-control table as the visual.

- Template: `tpl/hero` (2400×1260)
- Output: `blog/r1-hero.imgly`, `blog/r1-hero.png`

## R2: chart card
> @spectre chart: hours per 100 leases reviewed, manual 46 h vs Quillon 1.5 h, and associate-hours saved per quarter at 2,400 leases.

- Template: `tpl/chart` (1600×1000)
- Output: `blog/r2-chart.imgly`, `blog/r2-chart.png`

## R3: PDF guide
> @spectre cover + interior for the PDF guide "The lender-side playbook: 12 positions we hold".

- Template: `tpl/guide-cover` + `tpl/guide-page` (A4, mm/pt)
- Output: `blog/r3-guide.imgly`, `blog/r3-guide.pdf` (PDF/X-4, FOGRA39)
