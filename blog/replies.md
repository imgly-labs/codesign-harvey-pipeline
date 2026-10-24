# Spectre-style replies (one per request in `requests.md`)

Every reply was made on a copy of `blog/templates.imgly`; the template library itself is unchanged.

## R1: hero, "Four of six agreements trigger on a sponsor sale"
Done: `blog/r1-hero.png` (2400×1260), editable `blog/r1-hero.imgly`.

**Changed** (on `tpl/hero`):
- `hero/headline` is now the post title, verbatim. I narrowed the column to 840 px so it sets in 4 lines without a one-word last line.
- `hero/eyebrow`: "Quillon Journal · M&A diligence".
- `hero/standfirst`, as set by the coordinator: "Quillon read the six Meridian credit agreements for change-of-control terms. Four trigger if the sponsor sells." I widened it to 1000 px so it sets in 2 lines.
- `hero/table` was rebuilt from 6 rows of data (the template had 5). The data is the same as product screen `product-map/2x/s2-answer.png`, so the blog matches the films. Columns are Agreement | Threshold | Sponsor sale:
  - 4 rows trigger at 50.1%, each with a seal "Triggers" chip: Senior Credit Agreement (2021), First Amendment (2022), Incremental Facility (2022), Revolver Extension (2024).
  - 2 rows have a 35% threshold and a grey "No trigger" chip: Term Loan B (2023), Swingline Facility (2024).
  - The column positions are computed from the measured widths. The chips are left-aligned by their background edge, as on s2.
- `hero/table/note`: "Source: Quillon Assistant answer across the six Meridian credit agreements, 6 sources."

**Needs review:**
- s2's Cure column (30 / 30 / 15 / — / 30 / —) is left out. There is no room for it at hero size, and the brief asked for three columns.

## R2: chart, manual 46 h vs Quillon 1.5 h, associate-hours saved per quarter at 2,400 leases
Done: `blog/r2-chart.png` (1600×1000), editable `blog/r2-chart.imgly`.

**Changed** (on `tpl/chart`):
- `chart/plot` was rebuilt from the data: 0–50 h axis with 10 h ticks, a graphite bar for Manual review at 46 h and a seal bar for Quillon at 1.5 h.
- `chart/stat`: **1,068** associate-hours saved per quarter. The figure is 24 × (46 h − 1.5 h) at 2,400 leases, and the formula is printed on the `chart/source` line.
- `chart/title`: "Hours per 100 leases reviewed". The eyebrow and subtitle changed to match.

**Needs review:**
- The subtitle ("First-pass review of 100 commercial leases") and the source ("Quillon internal benchmark") are my wording. Confirm what the 46 h actually measures and where it comes from.
- "Associate-hours" assumes all of the 46 h is associate time.

## R3: PDF guide, "The lender-side playbook: 12 positions we hold"
Done: `blog/r3-guide.pdf` (PDF/X-4, FOGRA39, 2 × A4), editable `blog/r3-guide.imgly`.

**Changed** (on `tpl/guide-cover` + `tpl/guide-page`):
- Cover: `cover/title` verbatim. `cover/number` is "12", the guide's single seal accent. `cover/series` is "No. 05". `cover/standfirst` and `cover/meta` are rewritten. The title block was re-stacked up from the footer rule.
- Interior: Position 01 of 12, "A change of control is a mandatory prepayment event". The running head, lead, both columns and the review-note panel are rewritten. "What we hold" is a native 4-item ordered list. I re-centred the note panel between the columns and the footer so there is no empty band.

**Needs review:**
- Legal substance: the four positions (prepayment at par per lender, no portability, notice in 5 business days, 10 + 10 day election/repayment) and the three borrower softenings are a plausible draft, not the finance team's actual playbook. They need sign-off from a lawyer.
- The series number "No. 05" and the folio "04" are placeholders.
- The note panel (`page/note`) cites § 1.01 of the Senior Credit Agreement, the same source as s2 and the R1 hero. The quote is: "…§ 1.01 defines a change of control as the sponsor falling below 50.1% of the voting power". The source line is: "Senior Credit Agreement § 1.01, p. 14". I re-fitted the panel to 4 lines and re-centred it.
- The interior headline treats a change of control as a prepayment event. § 1.01 only defines the term; the prepayment consequence is the playbook's position, not something quoted from the agreement.
