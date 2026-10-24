# Reproduce it

Everything in this repo was made with [IMG.LY CoDesign](https://codesign.co) driven by Claude Code. These steps rebuild
it on your machine from the same inputs.

## 0. What you need

- [Claude Code](https://claude.com/claude-code) and the CoDesign plugin:

  ```sh
  claude plugin marketplace add imgly/codesign
  claude plugin install codesign@imgly-codesign
  ```

  The scripts are tested on plugin **0.5.1** (the version shows in the skills path,
  `~/.claude/plugins/cache/imgly-codesign/codesign/<version>/`).

- `git` with [Git LFS](https://git-lfs.com).
- Network access: fonts (Inter, Fraunces) are fetched by family name while building.
- Node 20+ only for step 4 (the helper scripts in `engine/`).
- A CoDesign login only for step 4's voice generation. Steps 1–3 need no account.

## 1. Clone (pick one)

Media is stored with Git LFS on `lfs.imgly.dev` (configured in `.lfsconfig`; public, no login).

**(a) Inputs only, 13 MB.** Enough for steps 2–4:

```sh
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/imgly-labs/codesign-harvey-pipeline
cd codesign-harvey-pipeline && git lfs pull --include "assets/**"
```

The finished films and designs are then small LFS pointer files. Fetch one when you want it, e.g.
`git lfs pull --include "films/nordvik-bank/**"`.

**(b) Everything, about 800 MB:**

```sh
git clone https://github.com/imgly-labs/codesign-harvey-pipeline
```

## 2. Load the inputs into CoDesign

`assets/` holds every input the build scripts use: the product screens, the voice-over clips, the music beds and the
sound effects. CoDesign names an asset after the first 12 hex digits of its SHA-256, so adding these 86 files gives you exactly the
`workspace://assets/<sha>.<ext>` URIs the scripts reference.

For a clean reproduction, start Claude Code with an empty CoDesign workspace, so nothing from earlier work can stand in
for the repo's inputs:

```sh
CODESIGN_WORKSPACE=/tmp/codesign-harvey claude
```

Then ask:

> Use the CoDesign `asset_add` tool on every file in `assets/` (absolute paths), several calls in parallel. Check that
> each returned uri ends in the file's own name.

After the first `asset_add`, check that the file appeared in `/tmp/codesign-harvey/assets/`: that proves the
empty workspace is in use. CoDesign also writes one thumbnail per PNG, so the folder ends up with 95 files; that is
expected. The whole step takes about a minute. To load only what one film needs, list its inputs with
`grep -o 'workspace://assets/[^"]*' build/nordvik-bank-edit.js | sort -u` (9 files for Nordvik Bank).

## 3. Rebuild an account film

Each `build/<account>-edit.js` is one complete `edit`: it creates the scene, builds the whole film (titles, product
moves, pointer, captions, voice, music) and returns a QA report. Ask:

> Load the `codesign:handbook` skill. Then `import({ title: 'Nordvik Bank' })`, run the contents of
> `build/nordvik-bank-edit.js` as a single `edit`, preview it at 2 s, 15 s and 40 s, and export it with
> `export({ format: 'mp4', blockId: <page from the QA report>, outPath: '<absolute path to this repo>/films/nordvik-bank/rebuilt.mp4' })`.
> Optionally save the editable design with `export({ format: 'imgly' })`. The edit result lists two lint notes; ignore
> them and do not change the film.

What you should see:

- **QA report** (the edit's return value): `duration: 43.2`, five beats, `flags: []`. Any flag (small type, clipped
  text, stray pointer, voice overrun) means something differs from our run.
- **Export:** `duration` 43.2 and `audioDuration` 43.2, as in `films/nordvik-bank/STATUS.md`. About 30 MB (the size varies with the encoder).
- **Frames:** 2 s is the title card ("Prepared for Nordvik Bank"), 15 s a punch-in on the cited answer with the
  pointer, 40 s the end card with the meeting line.
- **Expected notices, harmless:** a lint note that the media layer extends beyond the page (the punch-ins zoom past
  the frame on purpose), a note that the clips would fit on fewer tracks, and "this design has never been judged"
  (run the `judge` skill if you change the film).

Clone to verified mp4 took about 4 minutes in our clean-room test. The other 11 accounts work the same way;
`tracker.md` lists every film with its duration.

## 4. Make a film for a new account

1. Add the account to `accounts/accounts.json`: `id`, `name`, `segment`, `ae`, `meeting`, `notes`, and the `flows` to show (ids from `product-map/flows.json`).
2. Write its script to `accounts/<id>.script.json`: `title`, `vo` (voice lines), `captions`, `end` (see the existing ones).
3. Generate one voice clip per line with `asset_generate` (`elevenlabs/eleven-v3-tts`; this uses CoDesign's AI
   gateway, so sign in once with the `login` tool).
4. `node engine/make-script.mjs <id> '[{"uri":"workspace://assets/…","dur":7.2}, …]'` writes `build/<id>-edit.js`.
5. Run it as in step 3.

`lanes/BRIEF-films.md` is the brief our parallel agent lanes followed for exactly this; hand it to as many Claude Code
sessions as you like.

## 5. The launch film, blog graphics and explainer

- **Launch film:** in one design, run `films/launch/build/03-music.js` (the page with the music bed), then
  `films/launch/build/05-film.js` (the whole film), and export the `film` page as mp4: 52.8 s. The
  shipped `quillon-briefs-launch.mp4` also carries the small fixes from step 06 of the build log, made by hand after
  the judge pass.
  `films/launch/build/README.md` lists every edit we made along the way (storyboard, screens, beat map, fixes,
  contact sheet, outros).
- **Blog graphics:** `blog/requests.md` and `blog/replies.md` are the requests and answers; the `.imgly` files are the
  editable results and `blog/templates.imgly` is the template library.
- **Explainer:** `explainer/explainer.imgly` is the editable source of `explainer.mp4`. Open it with
  `import({ source: { path: '<absolute path>' } })` and change anything.

Any `.imgly` file here opens the same way.

**Versions:** the films were first built with the CoDesign plugin 0.4.3; the scripts here are updated for and
verified on 0.5.1.

Rebuilt videos match in content and timing; they are not byte-identical,
because the fonts are looked up by family name and the encoder output varies.
