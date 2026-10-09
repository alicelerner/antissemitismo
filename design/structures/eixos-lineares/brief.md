# Eixos lineares

## Hub summary (2026-10-08)

> Narrativa organizada pelos eixos do roteiro como se fossem capítulos de uma história.

## Alice's description (2026-10-09)

> vamos começar pela "eixos lineares". a referência aqui é o stateofaidesign que você já mapeou.
> cada eixo é um dos capítulos. o usuário pode tanto scrollar direto e consumir uma versão reduzida quanto entrar em cada um dos eixos para consumir mais informações.
>
> quero que você use o conteúdo do roteiro para criar o wireframe. lembrando que aqui só estamos querendo demonstrar os possíveis caminhos com wireframes, então não precisa de animação nem nada. só precisa dar para sentir como a navegação vai funcionar. e já com conteúdo real.

## Understanding

- Two reading depths: a single long scroll with a reduced version of every chapter, and a full page per chapter reached from it.
- Structure follows `design/reference-stateofaidesign.md` (hero, statement, chapter blocks, methodology, footer, full-screen menu).
- No motion. Grayscale, low fidelity, real copy in Portuguese from the narrative and the axis files.

## Decisions

- 2026-10-09: "eixos" are the movements of `research/00-narrative.md`, not the research axes.
- 2026-10-09: movement IVb (strategic philosemitism) is a short block at the end of chapter IV, not its own chapter. Seven chapters.
- 2026-10-09 (round 2): chapter 1 title is "Você tem razão de estar frustrado" (was "com medo" in the narrative). Opening line is "Quem é mais antissemita?". Chapters numbered 01-07, not roman. Chapters stack over each other on desktop as in the reference (plain sections on phones, as the reference does). Menu lists only the chapters. Less text, more image: overview slides show dek + three image cards; evidence on chapter pages shows image, one quote, reaction and source. Microcopy, research notes and "Como fizemos" removed from the pages.

- 2026-10-09 (round 3): the site calls them "eixos", not "capítulos". Axis pages are static files (`eixo-01.html` to `eixo-07.html`) because the hash-routed `capitulo.html` did not work inside the artifact viewer.

- 2026-10-09 (round 4): axis covers follow reference 03 (sizes and spacing of the "02 Craft" slide), on the overview and at the top of each axis page. Short axis names added for the big left title; proposed by Claude, pending Alice: 01 Frustração, 02 O registro, 03 A IHRA, 04 O projeto, 05 A companhia, 06 O governo, 07 A ferradura.

## Open questions
- Content extraction (2026-10-09) found the narrative attributes «cria seu judeu verdadeiro» to Gherman, but `02 §C5` gives it to Magali Cunha with unconfirmed wording. The wireframe uses Gherman's «O bolsonarismo colonizou o judaísmo» instead. Fix `00-narrative.md` IVb.
- The narrative's "two to three times more likely" (PRRI) is not supported by `02 §C7` (about 1.6-1.8x). Wireframe prints raw percentages.
- Chapter VII closing line («...com o lema dos integralistas») may read as calling Flávio an integralist, which the site rules avoid. Needs Alice's call.
- Closing lines for chapters II and III were written for the wireframe; the narrative has none.

## Build

- Wireframe: `design/wireframes/eixos-lineares/` (overview `index.html`, axis pages `eixo-NN.html`, generated from `content/eixo-template.html`).
- Content: `design/wireframes/eixos-lineares/content/chapters-*.json`, assembled into `data.js` by `content/build.py`. Each chapter keeps a `gaps` list shown on the page as a research note.
