# Reproduce it

Everything in this repo was made with [IMG.LY CoDesign](https://codesign.co) driven by Claude Code. These steps rebuild
it on your machine from the same inputs.

## 0. What you need

- [Claude Code](https://claude.com/claude-code) and the CoDesign plugin:

  ```sh
  claude plugin marketplace add imgly/codesign
  claude plugin install codesign@imgly-codesign
  ```

- `git` with [Git LFS](https://git-lfs.com), and Node 20+ (only for the small helper scripts in `engine/`).

## 1. Clone

```sh
git clone https://github.com/imgly-labs/codesign-harvey-pipeline
```

Media is stored with Git LFS on `lfs.imgly.dev` (configured in `.lfsconfig`, no login needed). The full clone is about
770 MB. To rebuild without downloading the finished films and designs, fetch only the inputs (13 MB):

```sh
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/imgly-labs/codesign-harvey-pipeline
cd codesign-harvey-pipeline && git lfs pull --include "assets/**"
```

## 2. Load the inputs into CoDesign

`assets/` holds every input the build scripts use: the product screens, the voice-over clips, the music beds and the
sound effects. CoDesign names an asset after the SHA-256 of its bytes, so adding these files gives you exactly the
`workspace://assets/<sha>.<ext>` URIs the scripts reference.

Start Claude Code in the repo and ask:

> Use the CoDesign `asset_add` tool on every file in `assets/` (absolute paths). Check that each returned uri ends in
> the file's own name.

## 3. Rebuild an account film

Each `build/<account>-edit.js` is one complete `edit`: it creates the scene and builds the whole film (titles, product
moves, pointer, captions, voice, music) and returns a QA report. Ask:

> Read the CoDesign handbook. Then `import({ title: 'Nordvik Bank' })`, run the contents of
> `build/nordvik-bank-edit.js` as a single `edit`, preview it at 2 s, 15 s and 40 s, and export it as mp4 to
> `films/nordvik-bank/rebuilt.mp4`.

Expect 43.2 s with a 43.2 s audio track, matching `films/nordvik-bank/STATUS.md`. The other 11 accounts work the same
way; `tracker.md` lists every film with its duration.

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

- **Launch film:** `films/launch/build/README.md` lists the edits in order (storyboard, screens, beat map, the one
  film edit, fixes, contact sheet, outros).
- **Blog graphics:** `blog/requests.md` and `blog/replies.md` are the requests and answers; the `.imgly` files are the
  editable results and `blog/templates.imgly` is the template library.
- **Explainer:** `explainer/explainer.imgly` is the editable source of `explainer.mp4`. Open it with
  `import({ source: { path: '<absolute path>' } })` and change anything.

Any `.imgly` file here opens the same way. Rebuilt videos match in content and timing; they are not byte-identical,
because the fonts are looked up by family name and the encoder output varies.
