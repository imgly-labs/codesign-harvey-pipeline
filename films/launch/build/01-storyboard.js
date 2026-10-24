// Storyboard — Quillon Briefs: one 1920×1080 page per beat (frame sketch + words + VO + motion + transition).
// Run as ONE edit body; set ONLY = [1] for the design-language gate, then ONLY = [2..9] for the rest.
const W = 1920, H = 1080;
const C = { ink:{r:0.067,g:0.075,b:0.094,a:1}, paper:{r:0.953,g:0.937,b:0.902,a:1}, graphite:{r:0.357,g:0.373,b:0.408,a:1},
  mist:{r:0.663,g:0.675,b:0.706,a:1}, rule:{r:0.847,g:0.824,b:0.769,a:1}, seal:{r:0.761,g:0.255,b:0.176,a:1}, white:{r:1,g:1,b:1,a:1},
  sheet:{r:0.988,g:0.984,b:0.973,a:1} };
const NIB = 'M50,12 L80,52 L57,90 L43,90 L20,52 Z';
const ARROW = 'M8,4 L8,78 L28,60 L42,92 L56,86 L42,55 L70,55 Z';
const SCR = { s1: 'workspace://assets/d6251a9c5df8.png', s2: 'workspace://assets/8b9bc22e79d6.png',
  s4: 'workspace://assets/3c612edb9363.png', s5: 'workspace://assets/4571516a8610.png', ...(globalThis.EXTRA_SCR || {}) };
const FX = 120, FY = 150, FW = 1040, FH = 585, K = FW / W;
const fx = (x) => FX + x * K, fy = (y) => FY + y * K;
const WIN = { x: 640, y: 168, w: 1160, h: 725 };
const txt = (name, string, o = {}) => ({ type: 'text', name, props: { text: { string,
  font: { family: o.family || 'Inter', weight: o.weight || 'normal' }, fontSize: o.size + 'px', color: o.color || C.ink,
  lineHeight: { visual: o.lh || (o.case ? 1.0 : o.family === 'Fraunces' ? 1.05 : 1.4) }, horizontalAlignment: o.align || 'Left',
  ...(o.case ? { case: o.case, letterSpacing: 0.12 } : o.family === 'Fraunces' ? { letterSpacing: -0.01 } : {}),
  ...(o.ranges ? { ranges: o.ranges } : {}) },
  widthMode: o.w ? 'Absolute' : 'Auto', heightMode: 'Auto', ...(o.w ? { width: o.w } : {}), position: { x: o.x || 0, y: o.y || 0 } } });
const rect = (name, o) => ({ type: 'graphic', name, props: { shape: { type: 'rect', rect: { cornerRadiusTL: o.r || 0, cornerRadiusTR: o.r || 0, cornerRadiusBL: o.r || 0, cornerRadiusBR: o.r || 0 } },
  width: o.w, height: o.h, position: { x: o.x, y: o.y }, fill: o.fill || { type: 'color', color: { value: o.color } },
  ...(o.shadow ? { dropShadow: { enabled: true, color: { r: 0.07, g: 0.07, b: 0.1, a: 0.16 }, offset: { x: 0, y: 8 }, blurRadius: { x: 28, y: 28 } } } : {}),
  ...(o.stroke ? { stroke: { enabled: true, color: o.stroke, width: o.sw || 2, position: 'Inner' } } : {}) } });
const path = (name, o) => ({ type: 'graphic', name, props: { shape: { type: 'vector_path', vector_path: { path: o.d, width: 100, height: 100, fillRule: 'NonZero' } },
  width: o.w, height: o.h, position: { x: o.x, y: o.y }, fill: { type: 'color', color: { value: o.color } },
  ...(o.stroke ? { stroke: { enabled: true, color: o.stroke, width: o.sw || 2, position: 'Outer' } } : {}) } });
const pointer = (p, x, y) => path(`${p}/arrow`, { d: ARROW, x: fx(x) - 2, y: fy(y) - 1, w: 30, h: 30, color: C.ink, stroke: C.white, sw: 2 });
// a document page drawn as a sketch: title bar + text lines (+ optional footnote rule)
const docSketch = (p, x, y, w, h, label) => [
  rect(`${p}/sheet`, { x, y, w, h, r: 6, color: C.white, shadow: true }),
  rect(`${p}/hd`, { x: x + w * 0.1, y: y + h * 0.09, w: w * 0.5, h: Math.max(6, h * 0.035), color: C.ink }),
  ...[0, 1, 2, 3, 4, 5, 6].map((i) => rect(`${p}/ln${i}`, { x: x + w * 0.1, y: y + h * (0.22 + i * 0.075), w: w * (i % 3 === 2 ? 0.55 : 0.8), h: Math.max(3, h * 0.014), color: C.rule })),
  rect(`${p}/fn`, { x: x + w * 0.1, y: y + h * 0.84, w: w * 0.3, h: 2, color: C.mist }),
  ...(label ? [txt(`${p}/lbl`, label, { size: 20, weight: 'semiBold', color: C.graphite, case: 'Uppercase', x, y: y + h + 14 })] : [])
];

const BEATS = globalThis.BEATS_OVERRIDE || [
  { n: 1, name: 'Hook: name the gap', start: 0, end: 4.2, kind: 'type', words: 'A client alert is not a chat answer.',
    vo: 'A client alert is not a chat answer.', motion: 'Ink ground. Headline fades in word by word on the beat; slow zoom settle.', tr: 'Push left (whoosh)' },
  { n: 2, name: 'The answer, still a chat', start: 4.2, end: 11.4, kind: 'screen', scr: 's2', label: 'Answers cited to the page',
    vo: 'Quillon already finds the answer. Then someone spends the evening formatting it.', motion: 'Answer screen in its window, crop-zoom drift; cross-zoom punch-in on the table.', tr: 'Push left (whoosh)' },
  { n: 3, name: 'Reveal: Quillon Briefs', start: 11.4, end: 15.6, kind: 'title', eyebrow: 'New in Quillon', words: 'Quillon Briefs',
    vo: 'Now Quillon writes the document itself.', motion: 'Eyebrow fades, headline word by word; “Briefs” in seal.', tr: 'Push left (whoosh)' },
  { n: 4, name: 'Ask for the deliverable', start: 15.6, end: 22.2, kind: 'screen', scr: 's1', label: 'Ask for the deliverable', click: [935, 685],
    vo: 'Ask for a two-page client alert on the Meridian facilities, in your firm’s style.', motion: 'Assistant screen drifts; punch-in; pointer glides to “Draft a client alert” and clicks (seal ring pop).', tr: 'Push left (whoosh)' },
  { n: 5, name: 'Build-up to the drop', start: 22.2, end: 26.4, kind: 'cards', words: 'Two pages. / Firm style. / Every line cited.',
    vo: '— (music build, no voice)', motion: 'Three ink cards, 1.2 s each on the half-bar, words pop in. Riser under.', tr: 'Cross-zoom, landing on the drop (hit)' },
  { n: 6, name: 'The drop: the finished alert', start: 26.4, end: 34.2, kind: 'doc', label: 'Client alert · 2 pages · 41 s', click: [1180, 560],
    vo: 'Forty-one seconds later: letterhead, defined terms, every sentence footnoted.', motion: 'BIGGEST MOVE on the drop: the alert lands full-frame, push-in to the body; pointer clicks footnote 1, the cited clause opens.', tr: 'Push left (whoosh)' },
  { n: 7, name: 'One matter, three deliverables', start: 34.2, end: 40.2, kind: 'docs3', label: 'One matter, three deliverables',
    vo: 'The same matter becomes a board memo, or a chronology exhibit.', motion: 'Three documents side by side, drift; punch-in on the chronology exhibit.', tr: 'Push left (whoosh)' },
  { n: 8, name: 'Hand-off to Word', start: 40.2, end: 45.6, kind: 'screen', scr: 's4', label: 'Opens in Word, tracked', click: [1130, 492],
    vo: 'Open it in Word, styles intact, ready for the partner’s pen.', motion: 'Word screen drifts; punch-in on the tracked change; pointer click.', tr: 'Cross-fade into the end card' },
  { n: 9, name: 'End card', start: 45.6, end: 52.8, kind: 'end', words: 'Send the document, not the answer.',
    vo: 'Quillon Briefs. Send the document, not the answer.', motion: 'Nib mark pops, wordmark fades, line fades; hold to the music’s button ending.', tr: '— (end)' }
];
const ONLY = globalThis.ONLY || BEATS.map((b) => b.n);
const TOTAL = BEATS[BEATS.length - 1].end;

let stack = (await engine.design.findByType('stack'))[0];
if (!stack) { await engine.design.create({ type: 'scene' }); stack = (await engine.design.findByType('stack'))[0]; }
const made = [];
for (const b of BEATS.filter((x) => ONLY.includes(x.n))) {
  const p = `sb${b.n}`;
  for (const old of await engine.design.findByName(`sb/b${b.n}`)) await engine.design.destroy(old);
  const dark = ['type', 'title', 'cards', 'end'].includes(b.kind);
  const fg = dark ? C.paper : C.ink;
  // ---- frame sketch (what the film shows at this beat) ----
  const frame = [rect(`${p}/ground`, { x: FX, y: FY, w: FW, h: FH, color: dark ? C.ink : C.paper, stroke: C.rule, sw: 2 })];
  if (b.kind === 'type') frame.push(txt(`${p}/fw`, b.words, { family: 'Fraunces', weight: 'semiBold', size: 56, color: C.paper, x: fx(160), y: fy(440), w: 820 }));
  if (b.kind === 'title') frame.push(
    txt(`${p}/feb`, b.eyebrow, { size: 16, weight: 'semiBold', color: C.mist, case: 'Uppercase', x: fx(160), y: fy(420) }),
    txt(`${p}/fw`, b.words, { family: 'Fraunces', weight: 'semiBold', size: 64, color: C.paper, x: fx(160), y: fy(470),
      ranges: [{ from: 8, to: 14, color: C.seal }] }));
  if (b.kind === 'cards') b.words.split(' / ').forEach((w, i) => {
    const cw = 300, cx = FX + 40 + i * (cw + 30), cy = FY + 200;
    frame.push(rect(`${p}/card${i}`, { x: cx, y: cy, w: cw, h: 169, r: 4, color: { r: 0.11, g: 0.12, b: 0.145, a: 1 }, stroke: C.graphite, sw: 1 }),
      txt(`${p}/cw${i}`, w, { family: 'Fraunces', weight: 'semiBold', size: 30, color: C.paper, x: cx + 22, y: cy + 62 }),
      txt(`${p}/ct${i}`, `${(b.start + i * 1.2).toFixed(1)} s`, { size: 20, weight: 'semiBold', color: C.mist, case: 'Uppercase', x: cx, y: cy + 185 }));
  });
  if (b.kind === 'screen') {
    frame.push(rect(`${p}/win`, { x: fx(WIN.x), y: fy(WIN.y), w: WIN.w * K, h: WIN.h * K, r: 12, shadow: true, fill: { type: 'image', uri: SCR[b.scr] } }),
      txt(`${p}/fl`, b.label, { family: 'Fraunces', weight: 'semiBold', size: 30, color: C.ink, x: fx(120), y: fy(462), w: 250 }));
    if (b.click) frame.push(pointer(p, WIN.x + b.click[0] * WIN.w / 1600, WIN.y + b.click[1] * WIN.h / 1000));
  }
  if (b.kind === 'doc') {
    if (SCR.s8) frame.push(rect(`${p}/win`, { x: fx(WIN.x), y: fy(WIN.y), w: WIN.w * K, h: WIN.h * K, r: 12, shadow: true, fill: { type: 'image', uri: SCR.s8 } }));
    else frame.push(...docSketch(`${p}/d`, fx(760), fy(150), 380, 500, 'New screen s8 · the Brief'));
    frame.push(txt(`${p}/fl`, b.label, { family: 'Fraunces', weight: 'semiBold', size: 30, color: C.ink, x: fx(120), y: fy(462), w: 250 }));
    if (b.click) frame.push(pointer(p, SCR.s8 ? WIN.x + b.click[0] * WIN.w / 1600 : 1180, SCR.s8 ? WIN.y + b.click[1] * WIN.h / 1000 : 820));
  }
  if (b.kind === 'docs3') {
    if (SCR.s9) frame.push(rect(`${p}/win`, { x: fx(WIN.x), y: fy(WIN.y), w: WIN.w * K, h: WIN.h * K, r: 12, shadow: true, fill: { type: 'image', uri: SCR.s9 } }));
    else ['Client alert', 'Board memo', 'Chronology exhibit'].forEach((l, i) => frame.push(...docSketch(`${p}/d${i}`, fx(660 + i * 390), fy(200), 190, 260, l.length > 12 ? 'Exhibit' : l)));
    frame.push(txt(`${p}/fl`, b.label, { family: 'Fraunces', weight: 'semiBold', size: 30, color: C.ink, x: fx(120), y: fy(462), w: 250 }));
  }
  if (b.kind === 'end') {
    const lock = 52;
    frame.push(rect(`${p}/mark`, { x: FX + 360, y: FY + 210, w: lock, h: lock, r: lock * 0.22, color: C.seal }),
      path(`${p}/nib`, { d: NIB, x: FX + 360 + lock * 0.15, y: FY + 210 + lock * 0.15, w: lock * 0.7, h: lock * 0.7, color: C.paper }),
      txt(`${p}/fw`, 'Quillon', { family: 'Fraunces', weight: 'semiBold', size: 60, color: C.paper, x: FX + 360 + lock * 1.3, y: FY + 200 }),
      txt(`${p}/fl`, b.words, { size: 22, color: C.mist, x: FX, y: FY + 300, w: FW, align: 'Center' }));
  }
  // caption chip sketch (VO subtitles sit bottom-centre in the film)
  // ---- page ----
  const notes = [['On-screen words', b.words || b.label || '—'], ['Voice-over (Alice)', b.vo], ['Motion', b.motion], ['Transition out', b.tr]];
  const seg = (FW + 600 + 40) / TOTAL;
  const page = await engine.design.create({ type: 'page', name: `sb/b${b.n}`, props: { width: W, height: H, fill: { type: 'color', color: { value: C.paper } } }, children: [
    { type: 'group', name: `${p}/head`, children: [
      txt(`${p}/eyebrow`, 'Storyboard · Quillon Briefs', { size: 20, weight: 'semiBold', color: C.graphite, case: 'Uppercase', x: 120, y: 84 }),
      txt(`${p}/time`, `${b.start.toFixed(1)}–${b.end.toFixed(1)} s · ${(b.end - b.start).toFixed(1)} s`, { size: 20, weight: 'semiBold', color: C.graphite, case: 'Uppercase', x: 1500, y: 84 }) ] },
    { type: 'group', name: `${p}/frame`, children: frame },
    { type: 'group', name: `${p}/titleblock`, children: [
      txt(`${p}/num`, String(b.n).padStart(2, '0'), { family: 'Fraunces', weight: 'semiBold', size: 52, color: C.seal, x: 120, y: 772 }),
      txt(`${p}/title`, b.name, { family: 'Fraunces', weight: 'semiBold', size: 52, color: C.ink, x: 210, y: 772, w: 950 }) ] },
    { type: 'group', name: `${p}/notes`, children: notes.flatMap(([l, v], i) => [
      txt(`${p}/nl${i}`, l, { size: 18, weight: 'semiBold', color: C.graphite, case: 'Uppercase', x: 1220, y: 150 }),
      txt(`${p}/nv${i}`, v, { size: 26, color: C.ink, x: 1220, y: 180, w: 580, lh: 1.35 }) ]) },
    { type: 'group', name: `${p}/timeline`, children: BEATS.flatMap((x) => [
      rect(`${p}/tl${x.n}`, { x: 120 + x.start * seg + 2, y: 960, w: (x.end - x.start) * seg - 4, h: 8, r: 4, color: x.n === b.n ? C.seal : C.rule }),
      txt(`${p}/tt${x.n}`, `b${x.n}`, { size: 18, weight: x.n === b.n ? 'semiBold' : 'normal', color: x.n === b.n ? C.ink : C.graphite, x: 120 + x.start * seg + 2, y: 984 }) ]) }
  ] }, { parent: stack });
  // right-align the time, stack the notes by measurement, fit the title
  const id = async (n) => (await engine.design.findByName(n))[0];
  const tm = await engine.design.measure(await id(`${p}/time`));
  await engine.design.setProps(await id(`${p}/time`), { position: { x: 1800 - tm.width } });
  let y = 150;
  for (let i = 0; i < notes.length; i++) {
    await engine.design.setProps(await id(`${p}/nl${i}`), { position: { y } });
    const lm = await engine.design.measure(await id(`${p}/nl${i}`));
    await engine.design.setProps(await id(`${p}/nv${i}`), { position: { y: y + lm.height + 10 } });
    const vm = await engine.design.measure(await id(`${p}/nv${i}`));
    y += lm.height + 10 + vm.height + 36;
  }
  made.push({ n: b.n, page, notesBottom: Math.round(y) });
}
return { type: 'text', text: JSON.stringify(made) };
