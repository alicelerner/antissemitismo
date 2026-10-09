# Structure options

Three candidate structures for the phase 2 site, drawn as wireframes for team feedback (started 2026-10-08). The hub page that lists them is `design/wireframes/index.html`, published at https://claude.ai/artifact/TE6K2erRV8CfUJbzidJ6qe.

| Option | Folder | Wireframe | Status |
|---|---|---|---|
| Eixos lineares | `eixos-lineares/` | `design/wireframes/eixos-lineares/` | wireframe drafted |
| Comparador em grafo | `comparador-grafo/` | `design/wireframes/comparador-grafo.html` | waiting for brief |
| Depoimento ilustrado | `depoimento-ilustrado/` | `design/wireframes/depoimento-ilustrado.html` | waiting for brief |

Status moves through: `waiting for brief` → `brief received` → `wireframe drafted` → `in feedback` → `chosen` / `dropped`.

## Folder layout

Each option folder holds:

- `brief.md` — Alice's description of the option, her words kept as given (Portuguese), followed by what Claude understood, open questions, and decisions as they are made.
- `references.md` — one entry per reference: source (URL or file), what Alice wants taken from it, and what to ignore.
- `references/` — screenshots, images and files Alice sends, named `NN-short-slug.ext` in the order received.

## Rules

- A reference is logged in `references.md` the moment it arrives, with what Alice said about it. Do not interpret silently.
- Wireframes stay grayscale and low fidelity. Palette and tone are not settled.
- Any content shown in a wireframe that stands for real facts uses placeholder text unless the fact is `verified` in `research/` (see `research/README.md`).
- These options may depart from `design/reference-stateofaidesign.md`. Where an option's references conflict with it, note the conflict in that option's `brief.md` and ask Alice which wins.
