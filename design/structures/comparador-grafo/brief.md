# Comparador em grafo

## Hub summary (2026-10-08)

> Episódios de cada um dos candidatos envolvendo temas de interesse da comunidade.

## Alice's description (2026-10-09)

> na segunda estrutura, vamos ter uma tab em cima para o usuário trocar entre lula e flavio e ver os episódios de "antissemitismo" relacionados a cada um.
> no meio, um campo de texto deve ficar aberto com o nome do candidato selecionado e os episódios passando ao lado. conforme o usuário explora os pontos vai descobrindo a rede de relações do candidato com o antissemistismo.
> a referência para essa versão é esse site aqui: https://www.kunuminst.org/en
> estude atentamente antes de construir o wireframe,
> lembre-se de usar dados reais

Sketch: `references/01-sketch-alice.webp`. Kunumi study: `references.md` #02.

## Understanding

- One screen, no scroll. Tab top right (`lula | flávio`), title top left, a wide text field fixed at the center.
- Every dot on the field is one `verified` episode from `research/`. Nothing else is drawn as a dot.
- The field reads "**candidate** + episode". When the user is idle it walks through episodes by itself; when the user hovers (desktop) or taps (phone) near a dot, it shows that episode.
- The "rede de relações" is the chain of actors between the candidate and the act (Flávio → Jair Bolsonaro → Viktor Orbán). Recurring actors become hub nodes. Hubs and their lines stay hidden until one of their episodes is found, then stay on screen, so the network builds as the user explores. A counter shows "N de M descobertos".
- Kunumi's "Linear" mode becomes "Lista": the same episodes in date order. It is also the accessible and phone-friendly path.
- Clicking an episode opens a detail drawer: date, for/against, relation chain, dossier summary, sources with tier, dossier reference.

## Wireframe

`design/wireframes/comparador-grafo/index.html` (+ `data.js`, generated from `research/`; verified items only). Run with the `wireframes` entry in `.claude/launch.json` and open `/comparador-grafo/`.

Data as of 2026-10-09: Lula 37 episodes (16 for, 15 against, 6 ambiguous); Flávio 48 (10 for, 33 against, 5 ambiguous). 46 dossier items left out (needs-second-source, dropped, or context-only).

Motion (per the animate skill): field drift ±4px over 14–24s, linear, frozen while exploring and under reduced motion; card in 200ms opacity + scale .96→1 `cubic-bezier(0.23, 1, 0.32, 1)`, lingers 4s, out 300ms, max three on screen; field text 150ms out / 250ms in with 6px rise; tab indicator 200ms `cubic-bezier(0.77, 0, 0.175, 1)`; drawer 300ms `cubic-bezier(0.32, 0.72, 0, 1)`. Reduced motion keeps opacity, drops movement.

## Open questions

1. **Weight of indirect episodes.** 35 of Flávio's 48 dots come through family or allies (Jair, Eduardo, Orbán, Trump, Musk, AfD, Bannon). Only 4 of his 13 direct episodes are "against". The graph makes that visible (the Jair hub carries the biggest fan), which is honest, but a skim reads "48 dots, mostly black". Dossier §7.3 of `06-flavio-specific.md` forbids saying Flávio endorsed his father's statements. Should direct and indirect episodes look different (size, distance), or be filterable?
2. **"Against" vs "for" labels.** The ledger comes from the dossier, but some calls are editorial: Flávio calling Lula antisemitic in Jerusalem (F06) is marked "for" (pro-Israel stance, §7.1); F02 (Ustra book) and F08 (STF = AI-5) are about the dictatorship, not Jews, and are in as "against". Keep, relabel or cut?
3. **Images.** The sketch uses a Jovem Pan post. Jovem Pan is a partisan outlet (excluded as evidence in `research/README.md`), and the dossier's IHRA source is Metrópoles / Folha / O Globo. Cards should show a print from a Tier 1–2 source. Who collects the prints?
4. **The IHRA episode, as worded.** "saiu da IHRA" is supported, but the dossier is precise: Brazil left *observer* status in the Alliance (never a full member), with no official reason given; it is separate from the IHRA *definition*, which Brazil never adopted federally. The wireframe uses "retirou o Brasil da IHRA, sem explicar motivos".
5. **Conflict with the stateofaidesign reference.** This option is a single exploratory canvas, not a scroll narrative; it departs from `design/reference-stateofaidesign.md` in structure and motion. Which wins for this option?

## Decisions

- 2026-10-09: Only `verified` items appear; chains of actors come from the dossier's `via` field, normalised so recurring actors (Itamaraty, Jair Bolsonaro, Orbán…) become hubs and one-off actors stay as text.
- 2026-10-09: Episodes the candidate did himself are labelled "em pessoa" (not "direto") everywhere in the UI.
- 2026-10-09: Phones get their own pattern, not the desktop one shrunk. The picked episode docks as one card above the bottom bar (Kunumi's featured card) and stays until the next pick; a tap within 44px of a dot selects it; dots keep clear of the docked card; safe areas, no tap flash, no overscroll, 16px+ tap targets. Not yet checked on a real phone.
