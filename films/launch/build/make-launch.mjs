// Assemble the film edit: SCRIPT (beats snapped to beats.json + audio.json + flows) + film-launch.js → build/05-film.js
// node make-launch.mjs   (reads launch-script.json, audio.json; writes 05-film.js)
import fs from 'node:fs';
const dir = new URL('.', import.meta.url).pathname;
const s = JSON.parse(fs.readFileSync(dir + 'launch-script.json', 'utf8'));
const a = JSON.parse(fs.readFileSync(dir + 'audio.json', 'utf8'));
const SCRIPT = { ...s, vo: a.vo.map((v) => (v.uri ? { uri: v.uri, dur: v.dur } : null)), sfxUri: a.sfx };
let code = fs.readFileSync(dir + 'film-launch.js', 'utf8');
if (s.endCardCode) code = code.replace('/* END_CARD */', fs.readFileSync(dir + s.endCardCode, 'utf8'));
fs.writeFileSync(dir + '05-film.js', `const SCRIPT = ${JSON.stringify(SCRIPT)};\n${code}`);
console.log('05-film.js', fs.statSync(dir + '05-film.js').size, 'bytes');
