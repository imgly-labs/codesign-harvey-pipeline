// New product screens for the launch: s8 (the Brief: a finished client alert) and s9 (three Briefs from one matter).
// Built at @2x (3200×2000) in the product-map chrome; coordinates authored in 1600×1000 space and doubled by S().
const X = 2, S = (v) => v * X;
const C = { ink:{r:0.067,g:0.075,b:0.094,a:1}, paper:{r:0.953,g:0.937,b:0.902,a:1}, graphite:{r:0.357,g:0.373,b:0.408,a:1},
  mist:{r:0.663,g:0.675,b:0.706,a:1}, rule:{r:0.847,g:0.824,b:0.769,a:1}, seal:{r:0.761,g:0.255,b:0.176,a:1}, white:{r:1,g:1,b:1,a:1},
  main:{r:0.98,g:0.973,b:0.957,a:1}, tint:{r:0.761,g:0.255,b:0.176,a:0.12}, panel:{r:0.949,g:0.933,b:0.898,a:1}, btn:{r:0.929,g:0.91,b:0.871,a:1} };
const NIB = 'M50,12 L80,52 L57,90 L43,90 L20,52 Z';
const T = (name, string, o = {}) => ({ type: 'text', name, props: { text: { string,
  font: { family: o.family || 'Inter', weight: o.weight || 'normal' }, fontSize: S(o.size) + 'px', color: o.color || C.ink,
  lineHeight: { visual: o.lh || (o.case ? 1.0 : o.family === 'Fraunces' ? 1.15 : 1.35) }, horizontalAlignment: o.align || 'Left',
  ...(o.case ? { case: o.case, letterSpacing: 0.12 } : {}), ...(o.ps ? { paragraphSpacing: o.ps } : {}),
  ...(o.ranges ? { ranges: o.ranges.map((r) => ({ ...r, ...(r.size ? { size: S(r.size) + 'px' } : {}) })) } : {}) },
  widthMode: o.w ? 'Absolute' : 'Auto', heightMode: 'Auto', ...(o.w ? { width: S(o.w) } : {}), position: { x: S(o.x || 0), y: S(o.y || 0) },
  ...(o.bg ? { backgroundColor: { enabled: true, color: o.bg, cornerRadius: S(o.bgr ?? 8), paddingLeft: S(o.px ?? 12), paddingRight: S(o.px ?? 12), paddingTop: S(o.py ?? 6), paddingBottom: S(o.py ?? 6) } } : {}) } });
const R = (name, o) => ({ type: 'graphic', name, props: { shape: { type: o.ellipse ? 'ellipse' : 'rect', ...(o.ellipse ? {} : { rect: { cornerRadiusTL: S(o.r || 0), cornerRadiusTR: S(o.r || 0), cornerRadiusBL: S(o.r || 0), cornerRadiusBR: S(o.r || 0) } }) },
  width: S(o.w), height: S(o.h), position: { x: S(o.x), y: S(o.y) }, fill: { type: 'color', color: { value: o.color } },
  ...(o.shadow ? { dropShadow: { enabled: true, color: { r: 0.07, g: 0.07, b: 0.1, a: 0.08 }, offset: { x: 0, y: S(6) }, blurRadius: { x: S(24), y: S(24) } } } : {}),
  ...(o.stroke ? { stroke: { enabled: true, color: o.stroke, width: S(1.5), position: 'Inner' } } : {}) } });
const rangesOf = (s, needles, style) => needles.flatMap((n) => { const out = []; let i = s.indexOf(n); while (i >= 0) { out.push({ from: i, to: i + n.length, ...style }); i = s.indexOf(n, i + n.length); } return out; });

// product-map chrome: sidebar, nav, matter header
const chrome = (p, matter, crumb) => [
  R(`${p}/main`, { x: 0, y: 0, w: 1600, h: 1000, color: C.main }),
  R(`${p}/side`, { x: 0, y: 0, w: 264, h: 1000, color: C.paper }),
  R(`${p}/sideRule`, { x: 263, y: 0, w: 1, h: 1000, color: C.rule }),
  R(`${p}/mark`, { x: 32, y: 32, w: 34, h: 34, r: 7.5, color: C.seal }),
  { type: 'graphic', name: `${p}/nib`, props: { shape: { type: 'vector_path', vector_path: { path: NIB, width: 100, height: 100, fillRule: 'NonZero' } },
    width: S(24), height: S(24), position: { x: S(37), y: S(37) }, fill: { type: 'color', color: { value: C.paper } } } },
  T(`${p}/word`, 'Quillon', { family: 'Fraunces', weight: 'semiBold', size: 28, x: 78, y: 30 }),
  T(`${p}/navOn`, 'Assistant', { size: 18, x: 44, y: 119, bg: C.white, px: 14, py: 8, bgr: 8 }),
  ...['Vault', 'Workflows', 'Library', 'History'].map((n, i) => T(`${p}/nav${i}`, n, { size: 18, color: C.graphite, x: 44, y: 171 + i * 52 })),
  T(`${p}/wsL`, 'Workspace', { size: 13, weight: 'semiBold', color: C.graphite, case: 'Uppercase', x: 32, y: 902 }),
  T(`${p}/wsV`, 'Meridian Holdings', { size: 17, x: 32, y: 925 }),
  T(`${p}/mL`, 'Matter', { size: 13, weight: 'semiBold', color: C.graphite, case: 'Uppercase', x: 312, y: 38 }),
  T(`${p}/mV`, matter, { size: 19, weight: 'medium', x: 312, y: 57 }),
  R(`${p}/hdRule`, { x: 264, y: 100, w: 1336, h: 1, color: C.rule }),
  T(`${p}/crumb`, crumb, { size: 16, color: C.graphite, x: 328, y: 132 })
];

const stack = (await engine.design.findByType('stack'))[0] || (engine.scene.create('VerticalStack'), (await engine.design.findByType('stack'))[0]);
for (const n of ['s8-brief', 's9-briefs']) for (const old of await engine.design.findByName(n)) await engine.design.destroy(old);

// ---------- s8: the Brief — a finished client alert, every sentence cited ----------
const body = 'Four of the six Meridian Holdings credit agreements treat a sale by the Sponsor as a Change of Control [1]. In each, the trigger is the Sponsor and its Affiliates ceasing to hold at least 50.1% of the aggregate ordinary voting power of the Borrower [2].\n' +
  '1.  What triggers\n' +
  'The Senior Credit Agreement, the First Amendment, the Incremental Facility and the Revolver Extension trigger on a sponsor sale [3]. Term Loan B and the Swingline Facility set a 35% threshold and exclude Permitted Holders, so a sale alone does not trigger them [4].\n' +
  '2.  What to do now\n' +
  'Seek lender consent before signing. The cure period is 30 days under three agreements and 15 days under the Incremental Facility [5].';
const bodyRanges = [...rangesOf(body, ['[1]', '[2]', '[3]', '[4]', '[5]'], { color: C.seal }),
  ...rangesOf(body, ['1.  What triggers', '2.  What to do now'], { weight: 'semiBold', size: 17 })];
const quote = '“Change of Control” means the Sponsor and its Affiliates cease to own, directly or indirectly, at least 50.1% of the aggregate ordinary voting power of the Borrower.';
const sources = [['Senior Credit Agreement', '§ 1.01 “Change of Control”, p. 14'], ['First Amendment', '§ 2(c), p. 3'], ['Incremental Facility', '§ 1.01, p. 9'],
  ['Term Loan B', '§ 8.01(k), p. 112'], ['Revolver Extension', '§ 1.01, p. 11']];
await engine.design.create({ type: 'page', name: 's8-brief', props: { width: S(1600), height: S(1000), fill: { type: 'color', color: { value: C.main } } }, children: [
  { type: 'group', name: 's8/chrome', children: chrome('s8', 'Meridian Holdings — Revolving credit facility', 'Assistant   ›   Brief') },
  { type: 'group', name: 's8/titlebar', children: [
    T('s8/title', 'Client alert · 2 pages', { family: 'Fraunces', weight: 'semiBold', size: 34, x: 328, y: 160 }),
    T('s8/chip', 'Drafted in 41 s · 5 sources cited', { size: 15, weight: 'medium', color: C.seal, x: 328, y: 214, bg: C.tint, px: 12, py: 6, bgr: 13 }),
    T('s8/btnPdf', 'Export PDF', { size: 16, weight: 'medium', x: 1180, y: 172, bg: C.btn, px: 16, py: 9, bgr: 8 }),
    T('s8/btnWord', 'Open in Word', { size: 16, weight: 'semiBold', color: C.white, x: 1320, y: 172, bg: C.ink, px: 16, py: 9, bgr: 8 }) ] },
  { type: 'group', name: 's8/doc', children: [
    R('s8/sheet', { x: 328, y: 268, w: 760, h: 760, r: 6, color: C.white, stroke: C.rule, shadow: true }),
    T('s8/lh', 'Client alert', { size: 12, weight: 'semiBold', color: C.seal, case: 'Uppercase', x: 384, y: 312 }),
    T('s8/date', '23 October 2026', { size: 13, color: C.graphite, x: 940, y: 310 }),
    R('s8/lhRule', { x: 384, y: 338, w: 648, h: 1, color: C.rule }),
    T('s8/docTitle', 'Change of control across the Meridian credit facilities', { family: 'Fraunces', weight: 'semiBold', size: 28, x: 384, y: 362, w: 600, lh: 1.12 }),
    T('s8/docMeta', 'For the board and treasury of Meridian Holdings · from 6 agreements in Vault', { size: 13, color: C.graphite, x: 384, y: 436, w: 648 }),
    T('s8/body', body, { family: 'Fraunces', size: 16, x: 384, y: 474, w: 648, lh: 1.55, ps: 0.55, ranges: bodyRanges }),
    R('s8/fnRule', { x: 384, y: 900, w: 160, h: 1, color: C.mist }),
    T('s8/fn', '[1] Senior Credit Agreement (2021), § 1.01, p. 14   [2] First Amendment (2022), § 2(c), p. 3', { size: 12, color: C.graphite, x: 384, y: 912, w: 648, lh: 1.5,
      ranges: rangesOf('[1] Senior Credit Agreement (2021), § 1.01, p. 14   [2] First Amendment (2022), § 2(c), p. 3', ['[1]', '[2]'], { color: C.seal }) }) ] },
  { type: 'group', name: 's8/sources', children: [
    R('s8/panel', { x: 1136, y: 268, w: 432, h: 702, r: 20, color: C.panel }),
    T('s8/srcL', 'Sources', { size: 13, weight: 'semiBold', color: C.graphite, case: 'Uppercase', x: 1164, y: 296 }),
    R('s8/card', { x: 1152, y: 324, w: 400, h: 262, r: 12, color: C.white, stroke: C.rule }),
    R('s8/cardBar', { x: 1152, y: 324, w: 4, h: 262, color: C.seal }),
    R('s8/b0', { x: 1172, y: 344, w: 22, h: 22, ellipse: true, color: C.seal }),
    T('s8/n0', '1', { size: 12, weight: 'semiBold', color: C.white, x: 1179, y: 348 }),
    T('s8/s0', sources[0][0], { size: 17, weight: 'medium', x: 1210, y: 344 }),
    T('s8/r0', sources[0][1], { size: 14, color: C.graphite, x: 1210, y: 368 }),
    T('s8/quote', quote, { family: 'Fraunces', size: 16, x: 1210, y: 406, w: 318, lh: 1.5, ranges: rangesOf(quote, ['50.1%'], { color: C.seal, weight: 'semiBold' }) }),
    ...sources.slice(1).flatMap(([s, r], i) => [
      R(`s8/b${i + 1}`, { x: 1172, y: 614 + i * 84, w: 22, h: 22, ellipse: true, color: C.graphite }),
      T(`s8/n${i + 1}`, String(i + 2), { size: 12, weight: 'semiBold', color: C.white, x: 1179, y: 618 + i * 84 }),
      T(`s8/s${i + 1}`, s, { size: 17, weight: 'medium', x: 1210, y: 614 + i * 84 }),
      T(`s8/r${i + 1}`, r, { size: 14, color: C.graphite, x: 1210, y: 638 + i * 84 }) ]) ] }
] }, { parent: stack });
// right-align the buttons and the date by measurement
const id = async (n) => (await engine.design.findByName(n))[0];
const wOf = async (n) => (await engine.design.measure(await id(n))).width;
const wordW = await wOf('s8/btnWord'), pdfW = await wOf('s8/btnPdf');
await engine.design.setProps(await id('s8/btnWord'), { position: { x: S(1530) - wordW - S(16) } });
await engine.design.setProps(await id('s8/btnPdf'), { position: { x: S(1530) - wordW - S(16) - S(32) - S(16) - pdfW - S(16) } });
await engine.design.setProps(await id('s8/date'), { position: { x: S(1032) - await wOf('s8/date') } });

// ---------- s9: three Briefs from one matter ----------
const thumbs = [
  { name: 'Client alert', meta: '2 pages · firm style · 5 sources', head: 'Client alert', title: 'Change of control across the Meridian credit facilities', kind: 'alert' },
  { name: 'Board memo', meta: '4 pages · for the directors · 9 sources', head: 'Memorandum to the board', title: 'Sponsor sale: lender consents needed before signing', kind: 'memo' },
  { name: 'Chronology exhibit', meta: '86 events · each cited to its exhibit', head: 'Exhibit C', title: 'Meridian v. Calder Estates: chronology', kind: 'chrono' }];
const events = [['12 Jan 2021', 'Lease signed: Harbour Point, Unit 4', 'EX-0012'], ['03 Aug 2023', 'Calder Estates notifies rent review', 'EX-0214'],
  ['19 Sep 2023', 'Meridian disputes open-market figure', 'EX-0231'], ['02 Feb 2024', 'Surveyor’s report delivered', 'EX-0388'],
  ['15 Feb 2024', 'Landlord serves Section 146 notice', 'EX-0412'], ['28 Mar 2024', 'Without-prejudice offer: £1.2m', 'EX-0455']];
const kids = [];
thumbs.forEach((t, i) => {
  const x = 328 + i * 410, y = 268, w = 380, p = `s9/t${i}`;
  const inner = [R(`${p}/sheet`, { x, y, w, h: 520, r: 6, color: C.white, stroke: C.rule, shadow: true }),
    T(`${p}/head`, t.head, { size: 11, weight: 'semiBold', color: C.seal, case: 'Uppercase', x: x + 32, y: y + 34 }),
    R(`${p}/rule`, { x: x + 32, y: y + 56, w: w - 64, h: 1, color: C.rule }),
    T(`${p}/title`, t.title, { family: 'Fraunces', weight: 'semiBold', size: 21, x: x + 32, y: y + 74, w: w - 64, lh: 1.15 })];
  if (t.kind === 'chrono') events.forEach(([d, e, ex], j) => inner.push(
    R(`${p}/dot${j}`, { x: x + 120, y: y + 162 + j * 54, w: 9, h: 9, ellipse: true, color: j === 4 ? C.seal : C.ink }),
    T(`${p}/d${j}`, d, { size: 11, color: C.graphite, x: x + 32, y: y + 158 + j * 54 }),
    T(`${p}/e${j}`, e, { size: 12, x: x + 144, y: y + 156 + j * 54, w: 200 }),
    T(`${p}/x${j}`, ex, { size: 10, weight: 'medium', color: j === 4 ? C.seal : C.graphite, x: x + 144, y: y + 176 + j * 54 })));
  else for (let j = 0; j < 11; j++) inner.push(R(`${p}/ln${j}`, { x: x + 32, y: y + 168 + j * 26 + (j > 4 ? 22 : 0), w: (j % 4 === 3 ? 0.6 : 1) * (w - 64), h: 5, r: 2.5, color: j === 5 && t.kind === 'memo' ? C.graphite : C.rule }));
  if (t.kind !== 'chrono') inner.push(T(`${p}/cite`, t.kind === 'alert' ? '[1] Senior Credit Agreement, § 1.01, p. 14' : '[3] Incremental Facility, § 1.01, p. 9',
    { size: 10, color: C.graphite, x: x + 32, y: y + 476, ranges: [{ from: 0, to: 3, color: C.seal }] }));
  inner.push(T(`${p}/name`, t.name, { size: 19, weight: 'semiBold', x, y: y + 548 }), T(`${p}/meta`, t.meta, { size: 15, color: C.graphite, x, y: y + 576 }));
  kids.push({ type: 'group', name: p, children: inner });
});
await engine.design.create({ type: 'page', name: 's9-briefs', props: { width: S(1600), height: S(1000), fill: { type: 'color', color: { value: C.main } } }, children: [
  { type: 'group', name: 's9/chrome', children: chrome('s9', 'Meridian Holdings — Revolving credit facility', 'Assistant   ›   Briefs for this matter') },
  { type: 'group', name: 's9/titlebar', children: [
    T('s9/title', 'Three Briefs, one matter', { family: 'Fraunces', weight: 'semiBold', size: 34, x: 328, y: 160 }),
    T('s9/chip', 'Each cited to the record', { size: 15, weight: 'medium', color: C.seal, x: 328, y: 214, bg: C.tint, px: 12, py: 6, bgr: 13 }) ] },
  ...kids
] }, { parent: stack });
return { type: 'text', text: 'screens built' };
