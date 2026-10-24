// Judge frames in ONE edit: renders the film page at each time inside the engine and returns the images
// (replaces N separate `preview` calls). Prepend `const TIMES = [0.8, 4.2, ...];`. Use render:false.
const b64 = (bytes) => { const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; let o = '';
  for (let i = 0; i < bytes.length; i += 3) { const n = (bytes[i] << 16) | ((bytes[i + 1] || 0) << 8) | (bytes[i + 2] || 0);
    o += A[(n >> 18) & 63] + A[(n >> 12) & 63] + (i + 1 < bytes.length ? A[(n >> 6) & 63] : '=') + (i + 2 < bytes.length ? A[n & 63] : '='); } return o; };
const [film] = await engine.design.findByName('film');
const out = [];
for (const t of TIMES) {
  await engine.design.setProps(film, { playback: { time: t } });
  const blob = await engine.block.export(film, { mimeType: 'image/jpeg', targetWidth: 768, targetHeight: 432 }); // engine.block: in-engine frame render has no facade verb
  out.push({ type: 'text', text: `t=${t}` }, { type: 'image', data: b64(new Uint8Array(await blob.arrayBuffer())), mimeType: 'image/jpeg' });
}
await engine.design.setProps(film, { playback: { time: 0 } });
return out;
