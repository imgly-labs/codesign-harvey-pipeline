const SCRIPT = {"id":"lachlan-moore","account":"Lachlan Moore","ae":"Isla Campbell","meeting":"Mon 23 Nov","title":{"eyebrow":"Prepared for Lachlan Moore","headline":"20 merger filings. Theories of harm, cited.","accent":"20 merger filings"},"end":{"line":"Quillon for Lachlan Moore’s competition team"},"grid":1.2,"music":{"uri":"workspace://assets/2117b3c7a2e2.m4a"},"flows":[{"id":"vault-review","category":"Contract work","screen":"s3","label":"Review every document at once","detail":{"x":900,"y":250,"w":690,"h":388},"click":[1290,366],"screenUri":"workspace://assets/01d40f8eb595.png"},{"id":"assistant-cited","category":"Assistant","screen":"s2","label":"Answers cited to the page","detail":{"x":300,"y":120,"w":1280,"h":720},"click":[1300,210],"screenUri":"workspace://assets/8b9bc22e79d6.png"},{"id":"assistant-ask","category":"Assistant","screen":"s1","label":"Ask across a whole matter","detail":{"x":480,"y":200,"w":1120,"h":630},"click":[1440,458],"screenUri":"workspace://assets/d6251a9c5df8.png"}],"vo":[{"uri":"workspace://assets/7976a7ddee3e.mp3","dur":7.706,"text":"Lachlan Moore’s competition team runs about twenty merger filings a year. Here is that work in Quillon."},{"uri":"workspace://assets/f5c7d40a4b08.mp3","dur":8.908,"text":"Vault reviews tens of thousands of internal documents at once, and the ones that matter come back flagged in one table."},{"uri":"workspace://assets/6ac1d386099e.mp3","dur":7.549,"text":"Ask for a theory of harm, and the answer comes back cited to the page, with the source document open beside it."},{"uri":"workspace://assets/94f46bef1d7c.mp3","dur":7.314,"text":"Ask one question across a whole filing, and Quillon reads every document in the matter before it answers."},{"uri":"workspace://assets/3280c34384c9.mp3","dur":3.709,"text":"Isla will walk your team through it on Monday the twenty-third."}],"captions":["Lachlan Moore’s competition team runs about 20 merger filings a year. Here is that work in Quillon.","Vault reviews tens of thousands of internal documents at once, and the ones that matter come back flagged in one table.","Ask for a theory of harm, and the answer comes back cited to the page, with the source document open beside it.","Ask one question across a whole filing, and Quillon reads every document in the matter before it answers.","Isla will walk your team through it on Monday the 23rd."]};
// Quillon film engine: ONE `edit` turns a script into a finished, timed film page.
// Usage: prepend `const SCRIPT = {...};` (engine/make-script.mjs does it; see REPRODUCE.md §4) and run the whole file as the body of
// one codesign `edit` on an empty design (after `import({ title })`). Returns the QA report as text.
// Replaces Harvey's ~750-line JS film engine (camera, transitions, captions, pointer clicks, end cards).

const W = 1920, H = 1080, GRID = SCRIPT.grid || 1.2, LEAD = 0.5, TAIL = 0.6, D = 0.5;
const C = { ink:{r:0.067,g:0.075,b:0.094,a:1}, paper:{r:0.953,g:0.937,b:0.902,a:1}, mist:{r:0.663,g:0.675,b:0.706,a:1},
  graphite:{r:0.357,g:0.373,b:0.408,a:1}, seal:{r:0.761,g:0.255,b:0.176,a:1}, white:{r:1,g:1,b:1,a:1}, capBg:{r:0.067,g:0.075,b:0.094,a:0.88} };
const NIB = 'M50,12 L80,52 L57,90 L43,90 L20,52 Z';
const ARROW = 'M8,4 L8,78 L28,60 L42,92 L56,86 L42,55 L70,55 Z';
const snap = (t) => Math.ceil(t / GRID - 1e-6) * GRID;
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

// Group clips: facade `create` drops a group parented to a track onto the page and re-sequences its
// children's playback back-to-back (CoDesign gap, see REPORT.md). Create, re-parent, then time.
const placeGroup = async (spec, parentTrack) => {
  const times = {};
  for (const c of spec.children) if (c.props.playback) { times[c.name] = c.props.playback; delete c.props.playback; }
  const g = await engine.design.create(spec, { parent: parentTrack });
  if ((await engine.design.getParent(g)) !== parentTrack) await engine.design.appendChild(parentTrack, g);
  await engine.design.setProps(g, { playback: spec.props.playback });
  for (const [n, pb] of Object.entries(times)) await engine.design.setProps((await engine.design.findByName(n))[0], { playback: pb });
  return g;
};

// ---------- 1. timing: every beat snapped to the music grid, long enough for its voice line ----------
const beats = [{ kind: 'title' }, ...SCRIPT.flows.map((f) => ({ kind: 'flow', flow: f })), { kind: 'end' }];
let t = 0;
beats.forEach((b, i) => {
  b.vo = SCRIPT.vo[i]; b.start = t;
  b.len = snap(Math.max(b.vo.dur + LEAD + TAIL, b.kind === 'end' ? 7.2 : 4.8));
  t += b.len;
});
const TOTAL = t;

// ---------- 2. page ----------
const scene = await engine.design.create({ type: 'scene' });
await engine.design.setProps(scene, { scene: { mode: 'Video' } });
const stack = (await engine.design.findByType('stack'))[0];
const page = await engine.design.create({ type: 'page', name: 'film', props: { width: W, height: H,
  fill: { type: 'color', color: { value: C.paper } }, playback: { duration: TOTAL } } }, { parent: stack });
const track = async (name) => { const id = await engine.design.create({ type: 'track', name }, { parent: page });
  engine.block.setBool(id, 'track/automaticallyManageBlockOffsets', false); // engine.block: no track/* props path
  return id; };
const media = await track('layer/media');
const words = await track('layer/words');
const pointer = await track('layer/pointer');
const caps = await track('layer/captions');

// ---------- 3. media layer: ink cards, wide window shots, punch-in detail shots (one track, transitions on every cut) ----------
const mediaClips = []; // [{id, transition}]
const WIN = { x: 640, y: 168, w: 1160, h: 725 };
for (const [i, b] of beats.entries()) {
  const end = b.start + b.len, ov = i < beats.length - 1 ? D : 0;
  if (b.kind !== 'flow') {
    const id = await engine.design.create(rect(`b${i}/ground`, { x: 0, y: 0, w: W, h: H, fill: { type: 'color', color: { value: C.ink } },
      time: { timeOffset: b.start, duration: b.len + ov } }), { parent: media });
    mediaClips.push({ id, tr: 'push' });
    continue;
  }
  const f = b.flow;
  b.wideLen = snap(b.len * 0.5);
  b.detailStart = b.start + b.wideLen;
  const wide = await engine.design.create(rect(`b${i}/wide`, { ...WIN, r: 22, shadow: true,
    fill: { type: 'image', uri: f.screenUri }, time: { timeOffset: b.start, duration: b.wideLen + D },
    anim: { in: { type: 'crop_zoom', duration: b.wideLen + D, easing: 'Linear', crop_zoom: { fade: false, scale: 1.06 } } } }), { parent: media });
  await engine.design.setProps(wide, { contentFill: { mode: 'Cover' } });
  mediaClips.push({ id: wide, tr: 'cross-zoom' });
  const k = W / f.detail.w;
  const detail = await engine.design.create(rect(`b${i}/detail`, { x: -f.detail.x * k, y: -f.detail.y * k, w: 1600 * k, h: 1000 * k,
    fill: { type: 'image', uri: f.screenUri }, time: { timeOffset: b.detailStart, duration: end - b.detailStart + ov } }), { parent: media });
  mediaClips.push({ id: detail, tr: 'push' });
  b.k = k;
}
for (let i = 0; i < mediaClips.length - 1; i++) {
  const tr = engine.block.createTransition(mediaClips[i].tr);
  await engine.design.setProps(tr, { playback: { duration: D } });
  if (mediaClips[i].tr === 'push') engine.block.setEnum(tr, 'transition/push/direction', 'Left'); // engine.block: transition options have no facade path
  engine.block.setEnum(tr, 'animationEasing', 'EaseInOutQuint'); // engine.block: no facade path
  engine.block.setTransition(mediaClips[i].id, tr);
}

// ---------- 4. words layer: title card, flow labels, end card ----------
{
  const b = beats[0], h = SCRIPT.title, a = h.headline.indexOf(h.accent);
  await placeGroup({ type: 'group', name: 'b0/title', props: { playback: { timeOffset: b.start, duration: b.len } }, children: [
    txt('b0/eyebrow', h.eyebrow, { size: 26, weight: 'semiBold', color: C.mist, case: 'Uppercase', x: 160, y: 330,
      time: { timeOffset: 0.3, duration: b.len - 0.3 }, anim: { in: { type: 'fade', duration: 0.6, easing: 'EaseOut' } } }),
    txt('b0/headline', h.headline, { family: 'Fraunces', weight: 'semiBold', size: 104, x: 160, y: 390, w: 1500,
      ranges: a >= 0 ? [{ from: a, to: a + h.accent.length, color: C.seal }] : undefined,
      time: { timeOffset: 0.5, duration: b.len - 0.5 }, anim: { in: { type: 'fade', writingStyle: 'Word', overlap: 0.35, duration: 1.2, easing: 'EaseOut' } } })
  ] }, words);
  // centre eyebrow + headline vertically by measurement (1- or 2-line headlines)
  const [eb] = await engine.design.findByName('b0/eyebrow'), [hl] = await engine.design.findByName('b0/headline');
  const em = await engine.design.measure(eb), hm = await engine.design.measure(hl), top = (H - (em.height + 32 + hm.height)) / 2 - 30;
  await engine.design.setProps(eb, { position: { y: top } });
  await engine.design.setProps(hl, { position: { y: top + em.height + 32 } });
}
for (const [i, b] of beats.entries()) {
  if (b.kind !== 'flow') continue;
  const f = b.flow;
  await placeGroup({ type: 'group', name: `b${i}/label`, props: { playback: { timeOffset: b.start, duration: b.wideLen } }, children: [
    txt(`b${i}/category`, f.category, { size: 22, weight: 'semiBold', color: C.seal, case: 'Uppercase', x: 120, y: 420,
      time: { timeOffset: 0.35, duration: b.wideLen - 0.35 }, anim: { in: { type: 'fade', duration: 0.5, easing: 'EaseOut' } } }),
    txt(`b${i}/flowLabel`, f.label, { family: 'Fraunces', weight: 'semiBold', size: 54, color: C.ink, x: 120, y: 462, w: 440,
      time: { timeOffset: 0.5, duration: b.wideLen - 0.5 }, anim: { in: { type: 'slide', duration: 0.7, easing: 'EaseOutQuint', slide: { direction: 1.5708, fade: true } } } })
  ] }, words);
}
{
  const i = beats.length - 1, b = beats[i], e = SCRIPT.end;
  const lock = 92;
  await placeGroup({ type: 'group', name: `b${i}/endcard`, props: { playback: { timeOffset: b.start, duration: b.len } }, children: [
    rect(`b${i}/mark`, { x: 0, y: 0, w: lock, h: lock, r: lock * 0.22, fill: { type: 'color', color: { value: C.seal } },
      time: { timeOffset: 0.4, duration: b.len - 0.4 }, anim: { in: { type: 'pop', duration: 0.6 } } }),
    path(`b${i}/nib`, { d: NIB, x: lock * 0.15, y: lock * 0.15, w: lock * 0.7, h: lock * 0.7, color: C.paper,
      time: { timeOffset: 0.4, duration: b.len - 0.4 }, anim: { in: { type: 'pop', duration: 0.6 } } }),
    txt(`b${i}/word`, 'Quillon', { family: 'Fraunces', weight: 'semiBold', size: 112, x: 0, y: 0,
      time: { timeOffset: 0.6, duration: b.len - 0.6 }, anim: { in: { type: 'fade', duration: 0.6, easing: 'EaseOut' } } }),
    txt(`b${i}/line`, e.line, { size: 34, color: C.mist, x: 0, y: 0, w: 1400, align: 'Center',
      time: { timeOffset: 1.0, duration: b.len - 1.0 }, anim: { in: { type: 'fade', duration: 0.6, easing: 'EaseOut' } } }),
    txt(`b${i}/cta`, `Walkthrough with ${SCRIPT.ae} · ${SCRIPT.meeting}`, { size: 30, weight: 'semiBold', color: C.white, x: 0, y: 0, bg: C.seal, px: 28, py: 14, bgr: 12,
      time: { timeOffset: 1.6, duration: b.len - 1.6 }, anim: { in: { type: 'fade', duration: 0.6, easing: 'EaseOut' } } }) // slide moves the glyphs but not the text background (CoDesign gap)
  ] }, words);
  // centre the lockup + lines by measurement
  const m = async (n) => engine.design.measure((await engine.design.findByName(n))[0]);
  const id = async (n) => (await engine.design.findByName(n))[0];
  const word = await m(`b${i}/word`), gap = lock * 0.3, lockW = lock + gap + word.width, lx = (W - lockW) / 2, ly = 340;
  await engine.design.setProps(await id(`b${i}/mark`), { position: { x: lx, y: ly } });
  await engine.design.setProps(await id(`b${i}/nib`), { position: { x: lx + lock * 0.15, y: ly + lock * 0.15 } });
  await engine.design.setProps(await id(`b${i}/word`), { position: { x: lx + lock + gap, y: ly + (lock - word.height) / 2 - 6 } });
  await engine.design.setProps(await id(`b${i}/line`), { position: { x: (W - 1400) / 2, y: 500 } });
  const cta = await m(`b${i}/cta`);
  await engine.design.setProps(await id(`b${i}/cta`), { position: { x: (W - cta.width) / 2, y: 620 } });
}

// ---------- 5. pointer layer: arrow glides in, clicks (seal ring pops) on the punch-in shot ----------
for (const [i, b] of beats.entries()) {
  if (b.kind !== 'flow' || !b.flow.click) continue;
  const f = b.flow, px = (f.click[0] - f.detail.x) * b.k, py = (f.click[1] - f.detail.y) * b.k;
  b.pointer = { x: px, y: py };
  const dl = b.start + b.len - b.detailStart;
  await placeGroup({ type: 'group', name: `b${i}/pointer`, props: { playback: { timeOffset: b.detailStart + 0.3, duration: dl - 0.3 } }, children: [
    { type: 'graphic', name: `b${i}/ring`, props: { shape: { type: 'ellipse' }, width: 84, height: 84, position: { x: px - 42, y: py - 42 },
      fill: { type: 'color', color: { value: { ...C.seal, a: 0.28 } } }, stroke: { enabled: true, color: C.seal, width: 4, position: 'Inner' },
      playback: { timeOffset: 1.1, duration: 0.9 }, animations: { in: { type: 'pop', duration: 0.35 }, out: { type: 'fade', duration: 0.3 } } } },
    path(`b${i}/arrow`, { d: ARROW, x: px - 4, y: py - 2, w: 54, h: 54, color: C.ink, stroke: C.white, sw: 3,
      time: { timeOffset: 0, duration: dl - 0.3 }, anim: { in: { type: 'slide', duration: 0.8, easing: 'EaseOutQuint', slide: { direction: 0.785, fade: true } } } })
  ] }, pointer);
}

// ---------- 6. captions layer: phrase chips timed across each voice line ----------
const capIds = [];
for (const [i, b] of beats.entries()) {
  const text = SCRIPT.captions[i], s0 = b.start + LEAD, dur = b.vo.dur;
  // sentences first, then balanced chunks of at most 8 words (never a 1-word orphan)
  const phrases = [];
  for (const sent of text.match(/[^.?!]+[.?!]*/g).map((x) => x.trim()).filter(Boolean)) {
    const ws = sent.split(/\s+/), n = Math.ceil(ws.length / 8), per = Math.ceil(ws.length / n);
    for (let k = 0; k < ws.length; k += per) phrases.push(ws.slice(k, k + per).join(' '));
  }
  const totalChars = phrases.reduce((s, p) => s + p.length, 0);
  let ts = s0;
  for (const [j, p] of phrases.entries()) {
    const d = dur * p.length / totalChars;
    const id = await engine.design.create(txt(`b${i}/cap${j}`, p, { size: 34, weight: 'medium', color: C.white, x: 0, y: 968, bg: C.capBg, px: 22, py: 10, bgr: 10,
      time: { timeOffset: ts, duration: Math.max(0.4, d - 0.05) } }), { parent: caps });
    const mm = await engine.design.measure(id);
    await engine.design.setProps(id, { position: { x: (W - mm.width) / 2 } });
    capIds.push({ id, words: p.split(' ').length, d });
    ts += d;
  }
}

// ---------- 7. audio: music bed ducked under the voice, voice lines on their beats ----------
await engine.design.create({ type: 'audio', name: 'audio/music', props: { audio: { fileURI: SCRIPT.music.uri },
  playback: { timeOffset: 0, duration: TOTAL, volume: 0.32, fadeIn: { duration: 0.4 }, fadeOut: { duration: 1.6 } } } }, { parent: page });
for (const [i, b] of beats.entries())
  await engine.design.create({ type: 'audio', name: `audio/vo${i}`, props: { audio: { fileURI: b.vo.uri },
    playback: { timeOffset: b.start + LEAD, duration: b.vo.dur, volume: 1 } } }, { parent: page });

// ---------- 8. automated QA (Harvey: contact sheets + flags for clipped text, small type, stray pointers) ----------
const flags = [];
const walk = async (id) => { const out = [id]; for (const c of await engine.design.getChildren(id)) out.push(...await walk(c)); return out; };
for (const id of await walk(page)) {
  const { type, name } = await engine.design.getProps(id, ['type', 'name']);
  if (!String(type).includes('text')) continue;
  const p = await engine.design.getProps(id, ['text.fontSize', 'text.hasClippedLines']);
  const size = parseFloat(p.text.fontSize);
  if (size < 22) flags.push(`small type ${size}px: ${name}`);
  if (p.text.hasClippedLines) flags.push(`clipped text: ${name}`);
  const bb = await engine.design.measure(id);
  if (bb.x < 60 || bb.y < 40 || bb.x + bb.width > W - 60 || bb.y + bb.height > H - 20) flags.push(`outside safe area: ${name} ${JSON.stringify(bb)}`);
}
for (const [i, b] of beats.entries()) {
  if (b.pointer && (b.pointer.x < 120 || b.pointer.x > W - 160 || b.pointer.y < 100 || b.pointer.y > H - 200)) flags.push(`stray pointer b${i}: ${JSON.stringify(b.pointer)}`);
  if (b.vo.dur + LEAD > b.len) flags.push(`voice overruns beat b${i}`);
}
for (const c of capIds) if (c.d / c.words < 0.2) flags.push(`caption too fast: ${c.words} words in ${c.d.toFixed(2)}s`);
return { type: 'text', text: JSON.stringify({ film: SCRIPT.id, page, duration: +TOTAL.toFixed(2),
  beats: beats.map((b, i) => ({ i, kind: b.kind, start: +b.start.toFixed(2), len: +b.len.toFixed(2), mid: +(b.start + b.len / 2).toFixed(2),
    ...(b.detailStart ? { wideMid: +(b.start + b.wideLen / 2).toFixed(2), cut: +b.detailStart.toFixed(2), detailMid: +((b.detailStart + b.start + b.len) / 2 + 0.4).toFixed(2) } : {}) })),
  flags }) };
