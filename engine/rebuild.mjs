// Re-assemble build/<id>-edit.js with the CURRENT engine and flow menu, keeping its SCRIPT (voice uris, copy).
// node engine/rebuild.mjs <id> [<id> ...]
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const menu = JSON.parse(fs.readFileSync(`${root}/product-map/flows.json`, 'utf8'));
const engine = fs.readFileSync(`${root}/engine/film.js`, 'utf8');
for (const id of process.argv.slice(2)) {
  const file = `${root}/build/${id}-edit.js`;
  const first = fs.readFileSync(file, 'utf8').split('\n')[0];
  const S = JSON.parse(first.replace(/^const SCRIPT = /, '').replace(/;$/, ''));
  S.flows = S.flows.map((f) => ({ ...f, detail: menu.flows[f.id].detail, click: menu.flows[f.id].click }));
  fs.writeFileSync(file, `const SCRIPT = ${JSON.stringify(S)};\n${engine}`);
  console.log(file, fs.statSync(file).size);
}
