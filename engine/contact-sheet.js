// Contact sheet from the EXPORTED mp4 (so it checks the real deliverable, incl. black-frame failures).
// Run as ONE `edit` after `export({ format: 'mp4' })`; prepend:
//   const MP4 = '<uri from the mp4 export>'; const FILM_ID = '...'; const FLAGS = [...]; const TIMES = [[t, 'label'], ...];
// It adds a page named 'contact' (12 frames, 3 columns), returns its id → `export({ format: 'png', blockId, outPath })`,
// then run `for (const p of await engine.design.findByName('contact')) await engine.design.destroy(p);` so the
// saved film does not inline the mp4.
// (In-engine JPEG renders via engine.block.export work for judging — return them as images from an edit — but a
// scene holding them as data/buffer URIs refuses to checkpoint: SCENE.DISALLOWED_SCHEMES "buffer".)
for (const old of await engine.design.findByName('contact')) await engine.design.destroy(old);
const cols = 3, fw = 640, fh = 360, gap = 40, m = 80, rows = Math.ceil(TIMES.length / cols);
const SW = m * 2 + cols * fw + (cols - 1) * gap, SH = 200 + rows * (fh + 70) + m;
const ink = { r: 0.067, g: 0.075, b: 0.094, a: 1 }, paper = { r: 0.953, g: 0.937, b: 0.902, a: 1 }, seal = { r: 0.761, g: 0.255, b: 0.176, a: 1 }, mist = { r: 0.663, g: 0.675, b: 0.706, a: 1 };
const t = (name, string, size, color, x, y, weight = 'normal', w) => ({ type: 'text', name, props: { text: { string, font: { family: 'Inter', weight }, fontSize: size + 'px', color, lineHeight: { visual: 1.3 } }, widthMode: w ? 'Absolute' : 'Auto', ...(w ? { width: w } : {}), heightMode: 'Auto', position: { x, y } } });
const stack = (await engine.design.findByType('stack'))[0];
const sheet = await engine.design.create({ type: 'page', name: 'contact', props: { width: SW, height: SH, fill: { type: 'color', color: { value: ink } }, playback: { duration: 1 } }, children: [
  t('contact/title', `Contact sheet · ${FILM_ID} · from the exported mp4`, 40, paper, m, 60, 'semiBold'),
  t('contact/flags', FLAGS.length ? `QA flags: ${FLAGS.join(' · ')}` : 'QA flags: none (clipped text, small type, safe area, stray pointer, caption pace, voice fit)', 22, FLAGS.length ? seal : mist, m, 120, 'medium', SW - 2 * m),
  ...TIMES.flatMap(([ft, label], i) => { const x = m + (i % cols) * (fw + gap), y = 200 + Math.floor(i / cols) * (fh + 70); return [
    { type: 'graphic', name: `contact/f${i}`, props: { shape: { type: 'rect' }, width: fw, height: fh, position: { x, y }, fill: { type: 'video', video: { fileURI: MP4 } }, playback: { timeOffset: 0, duration: 1 } } },
    t(`contact/l${i}`, `${ft.toFixed(2)} s · ${label}`, 20, mist, x, y + fh + 14, 'medium') ]; })
] }, { parent: stack });
for (const [i, [ft]] of TIMES.entries()) {
  const [g] = await engine.design.findByName(`contact/f${i}`);
  const fill = engine.block.getFill(g); // engine.block: fill handle for AV load
  await engine.block.forceLoadAVResource(fill); // engine.block: AV metadata load has no facade verb
  await engine.design.setProps(fill, { playback: { trimOffset: ft, trimLength: 1, volume: 0 } });
}
return { type: 'text', text: JSON.stringify({ contact: sheet }) };
