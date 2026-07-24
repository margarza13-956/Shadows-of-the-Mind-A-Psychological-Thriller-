# Scripts — *Shadows of the Mind*

This folder is the home for every draft of the screenplay **Shadows of the Mind: The Elysium Files**, and for the single consolidated master we're building toward.

## Files

| File | What it is |
|------|-----------|
| `shadows-of-the-mind-master.md` | **The working master.** The canonical, up-to-date screenplay. Right now it holds the 5-act draft that was embedded in the app's `index.tsx`. As other drafts come in, their best material gets merged into this file. |
| `drafts/` | Raw, untouched source drafts. Drop any additional versions here (e.g. `draft-2024-google-docs.md`, `act-three-alt.md`) so nothing is lost and every merge can be traced back. |

## The master drives the app

The reader app (`index.tsx`) imports this master directly and parses it into acts at load time — it no longer keeps its own copy of the screenplay. **Edit `shadows-of-the-mind-master.md` and the app updates with it.** Keep the structure the parser relies on:

- Each act is a second-level heading: `## ACT ONE — THE CONNECTION`. Anything in parentheses (e.g. `(FINAL)`) is treated as a draft note and dropped from the on-screen title.
- Acts are separated by a `---` horizontal rule.
- Everything above the first `## ACT` heading (title, byline, status note) is ignored by the app.

## How the merge works

1. **Collect** — every version of the script lands in `drafts/`, one file per draft, named so the source and date are obvious.
2. **Compare** — drafts are diffed against the master to see what diverged (new scenes, alternate dialogue, cut lines).
3. **Merge** — the strongest version of each beat is folded into `shadows-of-the-mind-master.md`, with a note in the changelog below when something non-trivial is chosen.

## Adding a draft

- **From Google Drive:** export the doc as plain text or Markdown and add it under `drafts/`.
- **Pasted text:** drop it into a new file under `drafts/`.

## Changelog

- **Initial:** Extracted the complete 5-act draft from `index.tsx` into `shadows-of-the-mind-master.md` as the starting master. No other drafts merged yet.
- **App wired to the master:** `index.tsx` now imports and parses this master at build time instead of hardcoding the screenplay, so the two can't drift apart.
