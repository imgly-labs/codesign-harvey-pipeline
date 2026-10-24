// Assemble the edit body for one account film: SCRIPT (account brief + flow menu + generated voice lines) + engine.
// node engine/make-script.mjs <accountId> '<vo json: [{"uri":"...","dur":7.2}, ...]>'  → build/<accountId>-edit.js
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [id, voJson] = process.argv.slice(2);
const accounts = JSON.parse(fs.readFileSync(`${root}/accounts/accounts.json`, 'utf8')).accounts;
const menu = JSON.parse(fs.readFileSync(`${root}/product-map/flows.json`, 'utf8'));
const music = JSON.parse(fs.readFileSync(`${root}/build/music.json`, 'utf8'));
const base = accounts.find((x) => x.id === id);
if (!base) throw new Error(`no account ${id}`);
// lanes write the script (title/end/vo/captions) to accounts/<id>.script.json so parallel lanes never edit the same file
const scriptFile = `${root}/accounts/${id}.script.json`;
const a = fs.existsSync(scriptFile) ? { ...base, ...JSON.parse(fs.readFileSync(scriptFile, 'utf8')) } : base;
if (!a.vo || !a.title) throw new Error(`account ${id} has no script yet: write ${scriptFile}`);
const vo = JSON.parse(voJson);
if (vo.length !== a.vo.length) throw new Error(`need ${a.vo.length} voice lines, got ${vo.length}`);
// captions use the written spelling; the voice script uses the spoken one
const spoken = [[/\band\b(?= Weir)/g, '&'], [/twenty-four hundred/g, '2,400'], [/more than three hundred/g, 'more than 300'],
  [/forty thousand/g, '40,000'], [/sixty portfolio/g, '60 portfolio'], [/nine hundred/g, '900'], [/fifteen business days/g, '15 Business Days'],
  [/fewer than ten/g, 'fewer than 10']];
const captions = (a.captions || a.vo).map((s) => spoken.reduce((t, [re, w]) => t.replace(re, w), s));
const SCRIPT = {
  id: a.id, account: a.name, ae: a.ae, meeting: a.meeting, title: a.title, end: a.end, grid: 1.2,
  music: { uri: music.uri },
  flows: a.flows.map((f) => ({ id: f, ...menu.flows[f], screenUri: menu.screens[menu.flows[f].screen].uri })),
  vo: vo.map((v, i) => ({ ...v, text: a.vo[i] })), captions
};
const engine = fs.readFileSync(`${root}/engine/film.js`, 'utf8');
fs.mkdirSync(`${root}/build`, { recursive: true });
const out = `${root}/build/${id}-edit.js`;
fs.writeFileSync(out, `const SCRIPT = ${JSON.stringify(SCRIPT)};\n${engine}`);
console.log(out, fs.statSync(out).size, 'bytes');
