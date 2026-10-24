# Quillon brand — rules for agents (top level)

Quillon is a fictional AI workspace for legal teams (stand-in for this proof). Every agent that makes a
Quillon asset reads this file first; project folders may add an AGENTS.md that narrows it, never widens it.

## Voice
- Plain, exact, lawyerly. Name the document, the clause, the number. No "unlock", "seamless", "supercharge".
- Claims are checkable: "412 leases reviewed in 9 minutes", not "lightning fast".
- The product is shown doing work; a line never says what the screen can show.

## Colour (one accent, used once per frame)
| role | hex | rgba 0–1 |
|---|---|---|
| ink (dark ground, primary text on paper) | #111318 | 0.067, 0.075, 0.094 |
| paper (light ground, primary text on ink) | #F3EFE6 | 0.953, 0.937, 0.902 |
| graphite (secondary text on paper) | #5B5F68 | 0.357, 0.373, 0.408 |
| mist (secondary text on ink) | #A9ACB4 | 0.663, 0.675, 0.706 |
| rule (hairlines on paper) | #D8D2C4 | 0.847, 0.824, 0.769 |
| seal (THE accent) | #C2412D | 0.761, 0.255, 0.176 |

## Type
- Display: **Fraunces** semiBold (headlines, title cards, end cards). Line height 1.05, tracking −0.01.
- UI / body / captions: **Inter** (normal, medium, semiBold). Body line height 1.45.
- All-caps eyebrows: Inter semiBold, `case: 'Uppercase'`, letterSpacing 0.12.
- Never more than these two families.

## Logo
Wordmark "Quillon" in Fraunces semiBold, preceded by the nib mark: a seal-red rounded square (radius 22%)
holding a paper-coloured nib (vector path in `kit.json`). Mark height = wordmark cap height × 1.35; gap = 0.35 × mark.

## Film grammar (16:9, 1920×1080)
- Margins 120 px. Grounds alternate ink / paper by beat.
- Product UI sits in a window frame with 24 px radius and a soft shadow; never full-bleed raw.
- One line on screen per beat (title or lower third) + captions bottom-centre.
- Cuts land on the music grid; transitions: `push` (Left) between flows, `cross-fade` into end card.
- Pointer: ink arrow with paper outline; click = `pop` ring in seal red.

## Avoid
- Second accent colour, gradients as decoration, stock photos of gavels/scales/handshakes.
- Real firm or client names on screen. On-screen sample company is **Meridian Holdings**.
