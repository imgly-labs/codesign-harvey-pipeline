// Start the film: page 'film' (1920×1080, Video mode) with only the music bed on it, so it can be rendered to WAV
// (export wav) and beat-mapped (04-beatmap.js) before any cut is placed.
const scene = await engine.design.create({ type: 'scene' });
await engine.design.setProps(scene, { scene: { mode: 'Video' } });
const stack = (await engine.design.findByType('stack'))[0];
const page = await engine.design.create({ type: 'page', name: 'film', props: { width: 1920, height: 1080,
  fill: { type: 'color', color: { value: { r: 0.953, g: 0.937, b: 0.902, a: 1 } } }, playback: { duration: 52.8 } } }, { parent: stack });
const music = await engine.design.create({ type: 'audio', name: 'audio/music', props: { audio: { fileURI: 'workspace://assets/02506e85b455.m4a' },
  playback: { timeOffset: 0, duration: 52.8, volume: 1 } } }, { parent: page });
return { type: 'text', text: JSON.stringify({ page, music }) };
