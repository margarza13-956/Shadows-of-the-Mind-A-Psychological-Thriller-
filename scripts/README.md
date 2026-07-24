# Scripts — *Shadows of the Mind*

This folder is the home for every draft of the screenplay **Shadows of the Mind: The Elysium Files**, and for the single consolidated master we're building toward.

## Files

| File | What it is |
|------|-----------|
| `shadows-of-the-mind-master.md` | **The working master.** The canonical, up-to-date screenplay. Right now it holds the 5-act draft that was embedded in the app's `index.tsx`. As other drafts come in, their best material gets merged into this file. |
| `drafts/` | Raw, untouched source drafts. Drop any additional versions here (e.g. `draft-2024-google-docs.md`, `act-three-alt.md`) so nothing is lost and every merge can be traced back. |

## How the merge works

1. **Collect** — every version of the script lands in `drafts/`, one file per draft, named so the source and date are obvious.
2. **Compare** — drafts are diffed against the master to see what diverged (new scenes, alternate dialogue, cut lines).
3. **Merge** — the strongest version of each beat is folded into `shadows-of-the-mind-master.md`, with a note in the changelog below when something non-trivial is chosen.

## Adding a draft

- **From Google Drive:** export the doc as plain text or Markdown and add it under `drafts/`.
- **Pasted text:** drop it into a new file under `drafts/`.

## Changelog

- **Initial:** Extracted the complete 5-act draft from `index.tsx` into `shadows-of-the-mind-master.md` as the starting master. No other drafts merged yet.
