# Site: eixos lineares

The production build of structure option 1 ("eixos lineares"), chosen by the team vote. Started 2026-10-12. Independent of `design/wireframes/`: nothing here imports from the wireframes.

Run locally: `python3 -m http.server 8766 --directory site` (or the `site` entry in `.claude/launch.json`).

## Scope so far

Home only. Story told through the seven axis covers for readers who scroll straight through. Axis pages come next; the covers' "Entrar no eixo" bars are disabled and say "em construção".

Order (matches Figma "eixos lineares", node 18:2, as Alice edited it on 2026-10-12): hero (collage of real episode photos) → "Ponto de inflexão" line → full-width painting (`img/modulos/pintura-ponto-de-inflexao.jpg`, 1598 x 900, exported from Figma on 2026-10-12; replaced the engraving): Maurycy Minkowski, "After the Pogrom", 1910, Jewish Museum (credit given by Alice) → "entre a cruz e a espada" text, right column → quote module (hidden, kept in the markup) → seven covers, stacked with `position: sticky` on desktop when the viewport is at least 1024 x 720, plain sections below that (reference 7.1) → footer.

Cover structure (Alice's): hairline only on top; number and name stacked in the display serif; photo bottom-left (axis 07: the two numbers instead); right column with cover line + short paragraph, "Nesse eixo, cobriremos:" with four episode rows, CTA at the bottom.

Figma is the source of truth for layout and copy; the code follows it. Exception on purpose: "Mussoline" and "idéias" corrected to "Mussolini" and "ideias".

## Decisions (2026-10-12, Alice)

- Palette: blues of the Israeli flag, one per axis, lightest (01) to darkest (07). Alice softened the scale in Figma on 2026-10-12 (06 `#4863A1`, 07 `#31498C`); axis 05 now uses dark text for contrast. One complementary colour proposed by Claude: `--brasa` `#FF6B35`, used where the reference uses orange (menu bar, CTAs, dates, the quote glyph). Chosen because it is blue's complement and stays clear of PT red and the green-yellow of bolsonarismo. Pending Alice.
- Type (2026-10-12, Alice): Fraunces Light for display (italic for emphasis, e.g. *mais* in the title; title leading 82%), Geist Mono for labels (both OFL, Google Fonts), PP Neue Montreal Regular for every other text, with no tracking: UI 18, lede 20, episode rows 15, paragraphs 16/150% with 16px between paragraphs. Alice holds a non-commercial licence for Neue Montreal; the file in `fonts/` is git-ignored until publishing. In Figma the styles "Texto/Meta" and "Texto/Citacao" still name Inter, because the Figma plugin cannot load Alice's local fonts; the code uses Neue Montreal for them.
- Copy: very short. Each cover = number + short name, one story line, one dated episode with a verbatim quote and its source.
- Quote module: Flávio Limoncic, «O "nunca mais" não pode se referir somente aos judeus.» Full text in `research/testimonies/limoncic.md`.
- Motion: per the `animate` skill. Rare-tier reading page. CSS transitions toggled by one IntersectionObserver; strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)`; titles rise from a mask (800-900ms), images settle from scale 1.04, count-up once on axis 07 with the source printed under the number from the start. Reduced motion keeps fades, drops movement and count-up.

## Episodes on the covers

Every quote is in the dossier as `verified`. The images come from `materiais/` (worktree `materiais-stories-collection-1ee045`, untracked) or, where `materiais/` had nothing, from the source article's own share image.

| Axis | Quote (dossier ref) | Quote source | Image | Image origin |
|---|---|---|---|---|
| 01 | Lula, Adis Abeba, 18 fev 2024 (`05 §N10`) | G1 | `01-g1-lula-adis-abeba.jpg` | G1 share image (video frame) |
| 02 | Lottenberg: «Louvável», 28 jan 2026 (`05 §P5d`) | Agência Brasil | `02-conib-planalto-2026.jpg` | `materiais/07` (CONIB, photo Valdenio Vieira/SRI) |
| 03 | CONIB: «retrocesso moral e diplomático», 28 jul 2025 (`05 §A5`) | Metrópoles | `03-oglobo-ihra.jpg` | O Globo share image (photographer not captured) |
| 04 | Jair, Campina Grande, 8 fev 2017 (`02 §A2`) | Sul21 | `04-ato-deus-patria-familia.jpg` | `materiais/01` slide 12 (Catarinas; original photographer unknown) |
| 05 | Lottenberg on the AfD, Jul 2021 (`03 pair 6`) | JTA | `05-piaui-von-storch.jpg` | `materiais/10` (piauí) |
| 06 | CONIB on Alvim, Jan 2020 (`01 §2a`) | Metrópoles | `06-bbc-alvim.webp` | `materiais/02` (official Secult video frame, via BBC) |
| 07 | 70,8% (`04 §1.8.4`) and 100% (`04 §1.5`) | CONIB/FISESP; ADL | none, typographic | ADL sits behind a bot check; not bypassed |

## Open

0. Opening line (date fixed to 2020 by Alice). The Mussolini episode (ICL, Oct 2026) is not in the dossier and needs a second source; ICL says "semelhante", the line says "imitaram". 

1. Higgsfield: Seedream 5.0 Pro needs a paid plan. Prompts ready in `img/ilustracoes/prompts.md`.
3. Limoncic: role line, photo, where the text was published. The page uses "Bisneto de Lea e Itec, vítimas do Holocausto", drawn from his own text; confirm with him.
4. Image rights and credits: 03 and 04 lack photographer credits. All images are third-party; `site/img/episodios/` and `site/fonts/` are git-ignored until Alice decides what can go into the public repo.
5. Axis 04 line «O lema é dos integralistas de 1932» states where the slogan comes from, not that anyone is an integralist (`02 §A8`, rule in `00-narrative.md` IV). Check it reads that way.
6. Axis 03 line «Sair sem explicar foi uma falha» is the site's own judgement, as the narrative asks (`00-narrative.md` III).
