// END CARD (outro option A, the master): nib mark + wordmark lockup, line, direction chip in seal — centred on ink.
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
