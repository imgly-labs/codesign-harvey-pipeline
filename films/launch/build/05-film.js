const SCRIPT = {"note":"v2 beats from storyboard.pdf; starts snapped to the 0.6 s beat grid (100 BPM)","beats":[{"kind":"type","start":0,"len":4.194,"lead":0.4,"words":"A client alert is not a chat answer.","accent":"not","bgUri":"workspace://assets/8b9bc22e79d6.png"},{"kind":"flow","start":4.194,"len":7.134,"lead":0.4,"wideLen":2.973,"flow":{"category":"Today","label":"The answer. Not yet a document.","screenUri":"workspace://assets/8b9bc22e79d6.png","detail":{"x":300,"y":120,"w":1280,"h":720},"click":null}},{"kind":"title","start":11.328,"len":4.161,"lead":0.4,"eyebrow":"New in Quillon","words":"Quillon Briefs","accent":"Briefs"},{"kind":"flow","start":15.489,"len":5.945,"lead":0.3,"wideLen":2.378,"flow":{"category":"Assistant","label":"Ask for the deliverable","screenUri":"workspace://assets/d6251a9c5df8.png","detail":{"x":380,"y":280,"w":1120,"h":630},"click":[935,685]}},{"kind":"cards","start":21.434,"len":3.567,"lead":0,"cards":["Two pages.","Firm style.","Every line cited."],"cardLen":1.189,"accent":"cited","trOut":"cross-zoom"},{"kind":"flow","start":25.001,"len":8.323,"lead":1.189,"wideLen":2.973,"drop":true,"flow":{"category":"Quillon Briefs","label":"Client alert · 2 pages · 41 s","screenUri":"workspace://assets/39677c53b6a5.png","detail":{"x":340,"y":290,"w":1200,"h":675},"click":[660,505],"popover":{"text":"[1] Senior Credit Agreement, § 1.01\n“Change of Control” means the Sponsor and its Affiliates cease to own at least 50.1% of the voting power of the Borrower.","x":620,"y":560,"w":700,"ranges":[{"from":0,"to":3,"color":{"r":0.761,"g":0.255,"b":0.176,"a":1},"weight":"semiBold"},{"from":115,"to":120,"color":{"r":0.761,"g":0.255,"b":0.176,"a":1},"weight":"semiBold"}]}}},{"kind":"flow","start":33.324,"len":5.945,"lead":0.4,"wideLen":2.378,"flow":{"category":"Quillon Briefs","label":"One matter, three deliverables","screenUri":"workspace://assets/490b8de39fa5.png","detail":{"x":700,"y":240,"w":900,"h":506},"click":null}},{"kind":"flow","start":39.269,"len":5.351,"lead":0.4,"wideLen":2.378,"trOut":"cross-fade","flow":{"category":"Word","label":"Opens in Word, tracked","screenUri":"workspace://assets/3c612edb9363.png","detail":{"x":160,"y":140,"w":1400,"h":788},"click":[1130,492]}},{"kind":"end","start":44.62,"len":8.18,"lead":0.4,"words":"Send the document, not the answer.","direction":"In Quillon Assistant from today · quillon.example/briefs"}],"captions":["A client alert is not a chat answer.","Quillon already finds the answer. Then someone spends the evening formatting it.","Now Quillon writes the document itself.","Ask for a two-page client alert on the Meridian facilities, in your firm’s style.","","Forty-one seconds later: letterhead, defined terms, every sentence footnoted.","The same matter becomes a board memo, or a chronology exhibit.","Open it in Word, styles intact, ready for the partner’s pen.","Quillon Briefs. Send the document, not the answer."],"sfx":[{"kind":"whoosh","t":4.044},{"kind":"whoosh","t":11.178},{"kind":"whoosh","t":15.339},{"kind":"whoosh","t":21.284},{"kind":"whoosh","t":33.174},{"kind":"whoosh","t":39.119},{"kind":"hit","t":25.001}],"endCardCode":"end-card.js","musicSegments":[{"page":[0,14.3],"src":0,"vol":0.35},{"page":[14.3,16.678],"src":11.922,"vol":0.35},{"page":[16.678,19.056],"src":11.922,"vol":0.35},{"page":[19.056,21.434],"src":11.922,"vol":0.35},{"page":[21.434,26.19],"src":11.922,"vol":0.85},{"page":[26.19,39.269],"src":16.678,"vol":0.35},{"page":[39.269,52.8],"src":39.269,"vol":0.35,"fadeOut":2}],"musicUri":"workspace://assets/02506e85b455.m4a","vo":[{"uri":"workspace://assets/71ad9c73947a.mp3","dur":2.926},{"uri":"workspace://assets/88c6f5d0c246.mp3","dur":5.956},{"uri":"workspace://assets/e17aa16e98b0.mp3","dur":2.508},{"uri":"workspace://assets/a8d9498e2495.mp3","dur":5.407},null,{"uri":"workspace://assets/059627bb126b.mp3","dur":6.426},{"uri":"workspace://assets/ac185f3e1c94.mp3","dur":4.754},{"uri":"workspace://assets/8a378e9b523e.mp3","dur":4.362},{"uri":"workspace://assets/5d73da7faae0.mp3","dur":3.396}],"sfxUri":{"whoosh":{"uri":"workspace://assets/649d0b22b966.mp3","dur":0.836},"hit":{"uri":"workspace://assets/2ff02fb13c12.mp3","dur":1.515}}};
// Quillon Briefs launch film: ONE edit builds the whole film page from SCRIPT (prepended by make-launch.mjs).
// Derived from engine/film.js (helpers, motion grammar, placeGroup, captions, QA) with the beat kinds the launch
// story needs: type (kinetic hook), flow (window → punch-in → pointer), title, cards (drop build-up), end (outro).
// Expects the page 'film' with the music bed already on it (03-music edit); rebuilds everything else.

const W = 1920, H = 1080, D = 0.5;
const C = { ink:{r:0.067,g:0.075,b:0.094,a:1}, paper:{r:0.953,g:0.937,b:0.902,a:1}, mist:{r:0.663,g:0.675,b:0.706,a:1},
  graphite:{r:0.357,g:0.373,b:0.408,a:1}, seal:{r:0.761,g:0.255,b:0.176,a:1}, white:{r:1,g:1,b:1,a:1}, capBg:{r:0.067,g:0.075,b:0.094,a:0.88} };
const NIB = 'M50,12 L80,52 L57,90 L43,90 L20,52 Z';
const ARROW = 'M8,4 L8,78 L28,60 L42,92 L56,86 L42,55 L70,55 Z';
const txt = (name, string, o = {}) => ({ type: 'text', name, props: { text: { string,
  font: { family: o.family || 'Inter', weight: o.weight || 'normal' }, fontSize: o.size + 'px', color: o.color || C.paper,
  lineHeight: { visual: o.lh || (o.case ? 1.0 : o.family === 'Fraunces' ? 1.05 : 1.35) }, horizontalAlignment: o.align || 'Left',
  ...(o.case ? { case: o.case, letterSpacing: 0.12 } : o.family === 'Fraunces' ? { letterSpacing: -0.01 } : {}),
  ...(o.ranges ? { ranges: o.ranges } : {}) },
  widthMode: o.w ? 'Absolute' : 'Auto', heightMode: 'Auto', ...(o.w ? { width: o.w } : {}),
  position: { x: o.x || 0, y: o.y || 0 },
  ...(o.bg ? { backgroundColor: { enabled: true, color: o.bg, cornerRadius: o.bgr ?? 10, paddingLeft: o.px ?? 20, paddingRight: o.px ?? 20, paddingTop: o.py ?? 10, paddingBottom: o.py ?? 10 } } : {}),
  ...(o.time ? { playback: o.time } : {}), ...(o.anim ? { animations: o.anim } : {}) } });
const rect = (name, o) => ({ type: 'graphic', name, props: { shape: { type: 'rect', rect: { cornerRadiusTL: o.r || 0, cornerRadiusTR: o.r || 0, cornerRadiusBL: o.r || 0, cornerRadiusBR: o.r || 0 } },
  width: o.w, height: o.h, position: { x: o.x, y: o.y }, fill: o.fill,
  ...(o.shadow ? { dropShadow: { enabled: true, color: { r: 0.07, g: 0.07, b: 0.1, a: 0.18 }, offset: { x: 0, y: 18 }, blurRadius: { x: 60, y: 60 } } } : {}),
  ...(o.stroke ? { stroke: { enabled: true, color: o.stroke, width: 2, position: 'Inner' } } : {}),
  ...(o.time ? { playback: o.time } : {}), ...(o.anim ? { animations: o.anim } : {}) } });
const path = (name, o) => ({ type: 'graphic', name, props: { shape: { type: 'vector_path', vector_path: { path: o.d, width: 100, height: 100, fillRule: 'NonZero' } },
  width: o.w, height: o.h, position: { x: o.x, y: o.y }, fill: { type: 'color', color: { value: o.color } },
  ...(o.stroke ? { stroke: { enabled: true, color: o.stroke, width: o.sw || 3, position: 'Outer' } } : {}),
  ...(o.time ? { playback: o.time } : {}), ...(o.anim ? { animations: o.anim } : {}) } });
const solid = (c) => ({ type: 'color', color: { value: c } });

// Group clips: create, re-parent, then time (CoDesign gap, see engine/film.js).
const placeGroup = async (spec, parentTrack) => {
  const times = {};
  for (const c of spec.children) if (c.props.playback) { times[c.name] = c.props.playback; delete c.props.playback; }
  const g = await engine.design.create(spec, { parent: parentTrack });
  if ((await engine.design.getParent(g)) !== parentTrack) await engine.design.appendChild(parentTrack, g);
  await engine.design.setProps(g, { playback: spec.props.playback });
  for (const [n, pb] of Object.entries(times)) await engine.design.setProps((await engine.design.findByName(n))[0], { playback: pb });
  return g;
};
const id = async (n) => (await engine.design.findByName(n))[0];

// ---------- 1. timing comes from the storyboard, snapped to the beat map (SCRIPT.beats[i].start / len) ----------
const beats = SCRIPT.beats.map((b, i) => ({ ...b, vo: SCRIPT.vo[i], caption: SCRIPT.captions[i] }));
const TOTAL = beats[beats.length - 1].start + beats[beats.length - 1].len;

// ---------- 2. page: keep the page + music from the music edit, clear everything else ----------
const [page] = await engine.design.findByName('film');
await engine.design.setProps(page, { playback: { duration: TOTAL }, fill: solid(C.paper) });
for (const c of await engine.design.getChildren(page)) await engine.design.destroy(c);
// music retimed to the drop: bar-aligned segments of one track (build/beats.json), ducked under the voice
for (const [j, m] of SCRIPT.musicSegments.entries())
  await engine.design.create({ type: 'audio', name: `audio/music${j}`, props: { audio: { fileURI: SCRIPT.musicUri },
    playback: { timeOffset: m.page[0], duration: m.page[1] - m.page[0], trimOffset: m.src, volume: m.vol, ...(m.fadeOut ? { fadeOut: { duration: m.fadeOut } } : {}) } } }, { parent: page });
const track = async (name) => { const t = await engine.design.create({ type: 'track', name }, { parent: page });
  engine.block.setBool(t, 'track/automaticallyManageBlockOffsets', false); // engine.block: no track/* props path
  return t; };
const media = await track('layer/media');
const words = await track('layer/words');
const pointer = await track('layer/pointer');
const caps = await track('layer/captions');

// ---------- 3. media layer ----------
const mediaClips = [];
const WIN = { x: 640, y: 168, w: 1160, h: 725 };
for (const [i, b] of beats.entries()) {
  const end = b.start + b.len, ov = i < beats.length - 1 ? D : 0;
  if (b.kind !== 'flow') {
    const g = await engine.design.create(rect(`b${i}/ground`, { x: 0, y: 0, w: W, h: H, fill: b.bgUri ? { type: 'image', uri: b.bgUri } : solid(C.ink),
      time: { timeOffset: b.start, duration: b.len + ov },
      ...(b.bgUri ? { anim: { in: { type: 'crop_zoom', duration: b.len + ov, easing: 'Linear', crop_zoom: { fade: false, scale: 1.08 } } } } : {}) }), { parent: media });
    if (b.bgUri) await engine.design.setProps(g, { contentFill: { mode: 'Cover' }, blur: { type: 'uniform', uniform: { intensity: 0.25 } },
      effects: [{ type: 'duotone_filter', duotone_filter: { darkColor: C.ink, lightColor: { r: 0.30, g: 0.31, b: 0.34, a: 1 }, intensity: 1 } }] });
    mediaClips.push({ id: g, tr: b.trOut || 'push' });
    continue;
  }
  const f = b.flow;
  b.wideLen = b.wideLen || Math.round(b.len * 0.5 / 0.6) * 0.6;
  b.detailStart = b.start + b.wideLen;
  const wide = await engine.design.create(rect(`b${i}/wide`, { ...WIN, r: 22, shadow: true,
    fill: { type: 'image', uri: f.screenUri }, time: { timeOffset: b.start, duration: b.wideLen + D },
    anim: { in: { type: 'crop_zoom', duration: b.wideLen + D, easing: 'Linear', crop_zoom: { fade: false, scale: b.drop ? 1.14 : 1.06 } } } }), { parent: media });
  await engine.design.setProps(wide, { contentFill: { mode: 'Cover' } });
  mediaClips.push({ id: wide, tr: 'cross-zoom' });
  const k = W / f.detail.w;
  const detail = await engine.design.create(rect(`b${i}/detail`, { x: -f.detail.x * k, y: -f.detail.y * k, w: 1600 * k, h: 1000 * k,
    fill: { type: 'image', uri: f.screenUri }, time: { timeOffset: b.detailStart, duration: end - b.detailStart + ov },
    anim: { in: { type: 'crop_zoom', duration: end - b.detailStart + ov, easing: 'Linear', crop_zoom: { fade: false, scale: 1.04 } } } }), { parent: media });
  mediaClips.push({ id: detail, tr: b.trOut || 'push' });
  b.k = k;
}
for (let i = 0; i < mediaClips.length - 1; i++) {
  const tr = engine.block.createTransition(mediaClips[i].tr);
  await engine.design.setProps(tr, { playback: { duration: D } });
  if (mediaClips[i].tr === 'push') engine.block.setEnum(tr, 'transition/push/direction', 'Left'); // engine.block: transition options have no facade path
  engine.block.setEnum(tr, 'animationEasing', 'EaseInOutQuint'); // engine.block: no facade path
  engine.block.setTransition(mediaClips[i].id, tr);
}

// ---------- 4. words layer ----------
const centreStack = async (names, gap, shiftY = -30) => {
  const ms = []; for (const n of names) ms.push(await engine.design.measure(await id(n)));
  const total = ms.reduce((s, m) => s + m.height, 0) + gap * (ms.length - 1);
  let y = (H - total) / 2 + shiftY;
  for (const [j, n] of names.entries()) { await engine.design.setProps(await id(n), { position: { y } }); y += ms[j].height + gap; }
};
for (const [i, b] of beats.entries()) {
  if (b.kind === 'type') {
    const a = b.words.indexOf(b.accent);
    await placeGroup({ type: 'group', name: `b${i}/hook`, props: { playback: { timeOffset: b.start, duration: b.len } }, children: [
      txt(`b${i}/headline`, b.words, { family: 'Fraunces', weight: 'semiBold', size: 112, x: 160, y: 380, w: 1500,
        ranges: a >= 0 ? [{ from: a, to: a + b.accent.length, color: C.seal }] : undefined,
        time: { timeOffset: 0.15, duration: b.len - 0.15 },
        anim: { in: { type: 'fade', writingStyle: 'Word', overlap: 0.45, duration: 1.4, easing: 'EaseOut' } } })
    ] }, words);
    await centreStack([`b${i}/headline`], 0, -20);
  }
  if (b.kind === 'title') {
    const a = b.words.indexOf(b.accent);
    await placeGroup({ type: 'group', name: `b${i}/title`, props: { playback: { timeOffset: b.start, duration: b.len } }, children: [
      txt(`b${i}/eyebrow`, b.eyebrow, { size: 28, weight: 'semiBold', color: C.mist, case: 'Uppercase', x: 160, y: 330,
        time: { timeOffset: 0.2, duration: b.len - 0.2 }, anim: { in: { type: 'fade', duration: 0.5, easing: 'EaseOut' } } }),
      txt(`b${i}/headline`, b.words, { family: 'Fraunces', weight: 'semiBold', size: 168, x: 160, y: 390, w: 1600,
        ranges: a >= 0 ? [{ from: a, to: a + b.accent.length, color: C.seal }] : undefined,
        time: { timeOffset: 0.35, duration: b.len - 0.35 }, anim: { in: { type: 'fade', writingStyle: 'Word', overlap: 0.4, duration: 0.9, easing: 'EaseOut' } } })
    ] }, words);
    await centreStack([`b${i}/eyebrow`, `b${i}/headline`], 36);
  }
  if (b.kind === 'cards') {
    // leaf text clips (no group fades → no black-frame trap), one per half-bar
    let t = b.start;
    for (const [j, c] of b.cards.entries()) {
      const len = j === b.cards.length - 1 ? b.start + b.len - t : b.cardLen;
      const cid = await engine.design.create(txt(`b${i}/card${j}`, c, { family: 'Fraunces', weight: 'semiBold', size: 150, color: C.paper,
        ranges: j === b.cards.length - 1 && b.accent ? [{ from: c.indexOf(b.accent), to: c.indexOf(b.accent) + b.accent.length, color: C.seal }] : undefined,
        time: { timeOffset: t, duration: len }, anim: { in: { type: 'zoom', duration: 0.35, easing: 'EaseOutQuint', zoom: { fade: true } } } }), { parent: words });
      const m = await engine.design.measure(cid);
      await engine.design.setProps(cid, { position: { x: (W - m.width) / 2, y: (H - m.height) / 2 - 30 } });
      t += len;
    }
  }
  if (b.kind === 'flow') {
    const f = b.flow;
    await placeGroup({ type: 'group', name: `b${i}/label`, props: { playback: { timeOffset: b.start, duration: b.wideLen } }, children: [
      txt(`b${i}/category`, f.category, { size: 24, weight: 'semiBold', color: C.seal, case: 'Uppercase', x: 120, y: 420,
        time: { timeOffset: 0.3, duration: b.wideLen - 0.3 }, anim: { in: { type: 'fade', duration: 0.5, easing: 'EaseOut' } } }),
      txt(`b${i}/flowLabel`, f.label, { family: 'Fraunces', weight: 'semiBold', size: 56, color: C.ink, x: 120, y: 462, w: 460,
        time: { timeOffset: 0.45, duration: b.wideLen - 0.45 }, anim: { in: { type: 'slide', duration: 0.7, easing: 'EaseOutQuint', slide: { direction: 1.5708, fade: true } } } })
    ] }, words);
    const cm = await engine.design.measure(await id(`b${i}/category`)), lm = await engine.design.measure(await id(`b${i}/flowLabel`));
    const top = WIN.y + (WIN.h - (cm.height + 22 + lm.height)) / 2;
    await engine.design.setProps(await id(`b${i}/category`), { position: { y: top } });
    await engine.design.setProps(await id(`b${i}/flowLabel`), { position: { y: top + cm.height + 22 } });
  }
  if (b.kind === 'end') await (async () => { // END CARD (outro option A, the master): nib mark + wordmark lockup, line, direction chip in seal — centred on ink.
{
  const lock = 96;
  await placeGroup({ type: 'group', name: `b${i}/endcard`, props: { playback: { timeOffset: b.start, duration: b.len } }, children: [
    rect(`b${i}/mark`, { x: 0, y: 0, w: lock, h: lock, r: lock * 0.22, fill: solid(C.seal),
      time: { timeOffset: 0.35, duration: b.len - 0.35 }, anim: { in: { type: 'pop', duration: 0.6 } } }),
    path(`b${i}/nib`, { d: NIB, x: lock * 0.15, y: lock * 0.15, w: lock * 0.7, h: lock * 0.7, color: C.paper,
      time: { timeOffset: 0.35, duration: b.len - 0.35 }, anim: { in: { type: 'pop', duration: 0.6 } } }),
    txt(`b${i}/word`, 'Quillon Briefs', { family: 'Fraunces', weight: 'semiBold', size: 120,
      ranges: [{ from: 8, to: 14, color: C.mist }],
      time: { timeOffset: 0.55, duration: b.len - 0.55 }, anim: { in: { type: 'fade', duration: 0.6, easing: 'EaseOut' } } }),
    txt(`b${i}/line`, b.words, { size: 40, color: C.paper, w: 1400, align: 'Center',
      time: { timeOffset: 1.2, duration: b.len - 1.2 }, anim: { in: { type: 'fade', duration: 0.6, easing: 'EaseOut' } } }),
    txt(`b${i}/cta`, b.direction, { size: 30, weight: 'semiBold', color: C.white, bg: C.seal, px: 28, py: 14, bgr: 12,
      time: { timeOffset: 1.8, duration: b.len - 1.8 }, anim: { in: { type: 'slide', duration: 0.6, easing: 'EaseOutQuint', slide: { direction: 1.5708, fade: true } } } })
  ] }, words);
  const m = async (n) => engine.design.measure(await id(n));
  const word = await m(`b${i}/word`), gap = lock * 0.32, lockW = lock + gap + word.width, lx = (W - lockW) / 2, ly = 330;
  await engine.design.setProps(await id(`b${i}/mark`), { position: { x: lx, y: ly } });
  await engine.design.setProps(await id(`b${i}/nib`), { position: { x: lx + lock * 0.15, y: ly + lock * 0.15 } });
  await engine.design.setProps(await id(`b${i}/word`), { position: { x: lx + lock + gap, y: ly + (lock - word.height) / 2 - 4 } });
  await engine.design.setProps(await id(`b${i}/line`), { position: { x: (W - 1400) / 2, y: 512 } });
  const cta = await m(`b${i}/cta`);
  await engine.design.setProps(await id(`b${i}/cta`), { position: { x: (W - cta.width) / 2, y: 636 } });
}
 })();
}

// ---------- 5. pointer layer: arrow glides in, clicks (seal ring pops); optional popover after the click ----------
for (const [i, b] of beats.entries()) {
  if (b.kind !== 'flow' || !b.flow.click) continue;
  const f = b.flow, px = (f.click[0] - f.detail.x) * b.k, py = (f.click[1] - f.detail.y) * b.k;
  b.pointer = { x: px, y: py };
  const dl = b.start + b.len - b.detailStart;
  const kids = [
    { type: 'graphic', name: `b${i}/ring`, props: { shape: { type: 'ellipse' }, width: 84, height: 84, position: { x: px - 42, y: py - 42 },
      fill: solid({ ...C.seal, a: 0.28 }), stroke: { enabled: true, color: C.seal, width: 4, position: 'Inner' },
      playback: { timeOffset: 1.0, duration: 0.9 }, animations: { in: { type: 'pop', duration: 0.35 }, out: { type: 'fade', duration: 0.3 } } } },
    path(`b${i}/arrow`, { d: ARROW, x: px - 4, y: py - 2, w: 54, h: 54, color: C.ink, stroke: C.white, sw: 3,
      time: { timeOffset: 0, duration: dl - 0.3 }, anim: { in: { type: 'slide', duration: 0.8, easing: 'EaseOutQuint', slide: { direction: 0.785, fade: true } } } })
  ];
  if (f.popover) kids.splice(1, 0, txt(`b${i}/popover`, f.popover.text, { size: 30, color: C.ink, w: f.popover.w || 640, x: f.popover.x, y: f.popover.y,
    bg: C.white, px: 32, py: 26, bgr: 16, lh: 1.4, ranges: f.popover.ranges,
    time: { timeOffset: 1.25, duration: dl - 1.55 }, anim: { in: { type: 'slide', duration: 0.5, easing: 'EaseOutQuint', slide: { direction: 4.712, fade: false } } } }));
  await placeGroup({ type: 'group', name: `b${i}/pointer`, props: { playback: { timeOffset: b.detailStart + 0.3, duration: dl - 0.3 } }, children: kids }, pointer);
}

// ---------- 6. captions: phrase chips across each voice line ----------
const capIds = [];
for (const [i, b] of beats.entries()) {
  if (!b.vo || !b.vo.uri) continue;
  const s0 = b.start + b.lead, dur = b.vo.dur, phrases = [];
  for (const sent of b.caption.match(/[^.?!:]+[.?!:]*/g).map((x) => x.trim()).filter(Boolean)) {
    const ws = sent.split(/\s+/), n = Math.ceil(ws.length / 7), per = Math.ceil(ws.length / n);
    for (let k = 0; k < ws.length; k += per) phrases.push(ws.slice(k, k + per).join(' '));
  }
  const totalChars = phrases.reduce((s, p) => s + p.length, 0);
  let ts = s0;
  for (const [j, p] of phrases.entries()) {
    const d = dur * p.length / totalChars;
    const cid = await engine.design.create(txt(`b${i}/cap${j}`, p, { size: 34, weight: 'medium', color: C.white, x: 0, y: 968, bg: C.capBg, px: 22, py: 10, bgr: 10,
      time: { timeOffset: ts, duration: Math.max(0.4, d - 0.05) } }), { parent: caps });
    const mm = await engine.design.measure(cid);
    await engine.design.setProps(cid, { position: { x: (W - mm.width) / 2 } });
    capIds.push({ id: cid, words: p.split(' ').length, d });
    ts += d;
  }
}

// ---------- 7. audio: VO on its beats, whoosh into every push, hit on the drop (music bed is already on the page) ----------
for (const [i, b] of beats.entries())
  if (b.vo && b.vo.uri) await engine.design.create({ type: 'audio', name: `audio/vo${i}`, props: { audio: { fileURI: b.vo.uri },
    playback: { timeOffset: b.start + b.lead, duration: b.vo.dur, volume: 1 } } }, { parent: page });
for (const [j, s] of SCRIPT.sfx.entries())
  await engine.design.create({ type: 'audio', name: `audio/sfx${j}-${s.kind}`, props: { audio: { fileURI: SCRIPT.sfxUri[s.kind].uri },
    playback: { timeOffset: s.t, duration: SCRIPT.sfxUri[s.kind].dur, volume: s.kind === 'hit' ? 0.75 : 0.5 } } }, { parent: page });

// ---------- 8. QA (engine/film.js checks) ----------
const flags = [];
const walk = async (x) => { const out = [x]; for (const c of await engine.design.getChildren(x)) out.push(...await walk(c)); return out; };
for (const x of await walk(page)) {
  const { type, name } = await engine.design.getProps(x, ['type', 'name']);
  if (!String(type).includes('text')) continue;
  const p = await engine.design.getProps(x, ['text.fontSize', 'text.hasClippedLines']);
  const size = parseFloat(p.text.fontSize);
  if (size < 22) flags.push(`small type ${size}px: ${name}`);
  if (p.text.hasClippedLines) flags.push(`clipped text: ${name}`);
  const bb = await engine.design.measure(x);
  if (bb.x < 60 || bb.y < 40 || bb.x + bb.width > W - 60 || bb.y + bb.height > H - 20) flags.push(`outside safe area: ${name} ${JSON.stringify(bb)}`);
}
for (const [i, b] of beats.entries()) {
  if (b.pointer && (b.pointer.x < 120 || b.pointer.x > W - 160 || b.pointer.y < 100 || b.pointer.y > H - 200)) flags.push(`stray pointer b${i}: ${JSON.stringify(b.pointer)}`);
  if (b.vo && b.vo.uri && b.vo.dur + b.lead > b.len) flags.push(`voice overruns beat b${i}`);
}
for (const c of capIds) if (c.d / c.words < 0.2) flags.push(`caption too fast: ${c.words} words in ${c.d.toFixed(2)}s`);
return { type: 'text', text: JSON.stringify({ page, duration: +TOTAL.toFixed(2),
  beats: beats.map((b, i) => ({ i, kind: b.kind, start: +b.start.toFixed(2), len: +b.len.toFixed(2), mid: +(b.start + b.len / 2).toFixed(2),
    ...(b.detailStart ? { cut: +b.detailStart.toFixed(2), detailMid: +((b.detailStart + b.start + b.len) / 2 + 0.4).toFixed(2) } : {}) })),
  flags }) };
