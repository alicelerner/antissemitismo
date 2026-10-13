# Site: eixos lineares

The production build of structure option 1 ("eixos lineares"), chosen by the team vote. Started 2026-10-12. Independent of `design/wireframes/`: nothing here imports from the wireframes.

Run locally: `python3 -m http.server 8766 --directory site` (or the `site` entry in `.claude/launch.json`).

## Scope so far

Home only. Story told through the seven axis covers for readers who scroll straight through. Axis pages come next; the covers' "Entrar no eixo" bars are disabled and say "em construção".

Order (matches Figma "eixos lineares", node 18:2, as Alice edited it on 2026-10-12): hero (animated band, since 2026-10-12: blurred Kristallnacht background, pogrom "lenses" and the two candidates; design and rounds in `design/hero/README.md`) → "Ponto de inflexão" line → full-width painting (`img/modulos/pintura-ponto-de-inflexao.jpg`, 1598 x 900, exported from Figma on 2026-10-12; replaced the engraving): Maurycy Minkowski, "After the Pogrom", 1910, Jewish Museum (credit given by Alice) → "entre a cruz e a espada" text, right column → quote module (hidden, kept in the markup) → seven covers, stacked with `position: sticky` at every size (reference 2.4): one screen tall on desktop when the viewport is at least 1024 x 720; below that, a cover taller than the screen sticks once its bottom reaches the screen's bottom, then the next slides over it (Alice, 2026-10-12) → "O que alguns judeus estão pensando" carousel → footer.

Cover structure (Alice's): hairline only on top; number and name stacked in the display serif; photo bottom-left (axis 07: the two numbers instead); right column with cover line + short paragraph, "Nesse eixo, cobriremos:" with four episode rows, CTA at the bottom.

Figma is the source of truth for layout and copy; the code follows it. Exception on purpose: "Mussoline" and "idéias" corrected to "Mussolini" and "ideias".

## Decisions (2026-10-12, Alice)

- Palette: blues of the Israeli flag, one per axis, lightest (01) to darkest (07). Alice softened the scale in Figma on 2026-10-12 (06 `#4863A1`, 07 `#31498C`); axis 05 now uses dark text for contrast. One complementary colour proposed by Claude: `--brasa` `#FF6B35`, used where the reference uses orange (menu bar, CTAs, dates, the quote glyph). Chosen because it is blue's complement and stays clear of PT red and the green-yellow of bolsonarismo. Pending Alice.
- Type (2026-10-12, Alice): Fraunces Light for display (italic for emphasis, e.g. *mais* in the title; title leading 82%), Geist Mono for labels (both OFL, Google Fonts), PP Neue Montreal Regular for every other text, with no tracking: UI 18, lede 20, episode rows 15, paragraphs 16/150% with 16px between paragraphs. Alice holds a non-commercial licence for Neue Montreal; the file in `fonts/` is git-ignored until publishing. In Figma the styles "Texto/Meta" and "Texto/Citacao" still name Inter, because the Figma plugin cannot load Alice's local fonts; the code uses Neue Montreal for them.
- Copy: very short. Each cover = number + short name, one story line, one dated episode with a verbatim quote and its source.
- Quote module: Flávio Limoncic, «O "nunca mais" não pode se referir somente aos judeus.» Full text in `research/testimonies/limoncic.md`.
- Motion: per the `animate` skill. Rare-tier reading page. CSS transitions toggled by one IntersectionObserver; strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)`; titles rise from a mask (800-900ms), images settle from scale 1.04, count-up once on axis 07 with the source printed under the number from the start. Reduced motion keeps fades, drops movement and count-up.
- Mobile pass (2026-10-12): the hero fills the first screen, its band starting below the fixed bar, and puts title and lede on top and "Feito por e para judeus brasileiros" with "Role para ler" (last) together at the bottom (Alice). Menu titles capped at 12vw so "Bolsonarismo" and the numbers fit; the modal × gets a solid disc because the text scrolls under it; the page behind any open dialog no longer scrolls; tap highlight off, `touch-action: manipulation` on links and buttons, press tint on episode rows. Checked in emulation at 375 x 812 and 320 x 568, not yet on a phone.

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

## Carousel "O que alguns judeus estão pensando" (2026-10-12, branch `complementar`)

Alice asked for a last module before the footer like the reference's case-studies carousel (reference 2.5), mixing posts, videos and testimonies. Cards 460px (267px on phones), 16px gap, arrows top-right, 16px `--azul-3` bar under each thumbnail; hover widens the card to 580px, turns the bar `--brasa` and shows one extra line. The track snaps on touch, unlike the reference.

Revised the same day at Alice's request:
- Quotes in plain quotation marks (“…”, inner ‘…’), the opening mark hanging in the margin; no separate glyph, no «».
- Hover slower and softer: widening 600ms strong ease-in-out (on-screen morph, per the `animate` skill), bar colour 400ms ease, extra line 500ms with 120ms delay.
- Video and post cards open the original on Instagram in a new tab.
- Testimony cards open a full-screen modal in `--tinta` (Alice's mockup, 2026-10-12; it replaced a right-hand drawer): author and role left, title and full text right, on the page's two-column grid. The modal grows out of the card's dark thumbnail (clip-path, 650ms strong ease-in-out), then the text rises in 60ms apart; closing (×, Esc) shrinks it back into the card in 420ms. WAAPI in `main.js`, since the start shape is the card's live position. The × gets a soft circle and a quarter turn on hover. Full texts live in `<template>` elements in `index.html`, exactly as given; Schucman's sources stay exactly as she wrote them: domains in parentheses at the end of each paragraph (no full URLs were given), in a lighter blue.
- Keyboard hover state uses `:has(:focus-visible)`, not `:focus-within`: the dialog returns focus to the card on close, which kept the first card stuck open.

| Card | Item | Source | Image |
|---|---|---|---|
| Depoimento | Flávio Limoncic, «O "nunca mais" não pode se referir somente aos judeus.» | `research/testimonies/limoncic.md` | none, typographic |
| Vídeo | Kiko Goifman, Instagram reel, 25 out 2022 | `materiais/03` | `img/vozes/goifman-reel-2022.jpg` (reel frame) |
| Post | Coletivo Golem, "Bolsonarismo e nazismo: entre referências e reverências", 9 out 2026 | `materiais/12` | `img/vozes/golem-dossie-2026.jpg` (carousel cover) |
| Depoimento | Lia Vainer Schucman, «Nossa proteção não precisa depender do silenciamento de ninguém.» | `design/structures/depoimento-ilustrado/brief.md` | none, typographic |
| Post | Coletivo Golem, "A extrema-direita nunca foi e nunca será aliada de judeus e judias: o Golem contra Flávio Bolsonaro", 6 out 2026 (added 2026-10-12, branch `vozes-golem-flavio`) | `materiais/13` | `img/vozes/golem-contra-flavio-2026.jpg` (carousel cover) |

`img/vozes/` is git-ignored like the episode images (third-party media).

Open for this module:
- These are voices, not evidence: every `materiais/` item is `nao-verificado`. Confirm that attributed opinion pieces may appear under the "only `verified`" rule.
- Kiko Goifman: confirm he is Jewish before he sits under this heading; the card's extra line is the capture's own title, not his words.
- Lia Vainer Schucman: role line given by Alice on 2026-10-12: «Professora da Universidade Federal de Santa Catarina, pesquisadora das relações raciais e integrante de iniciativas de enfrentamento ao antissemitismo.» Place of publication still unknown.
- Five cards since 2026-10-12. Fernanda Yuki (`materiais/09`) and Célio Lima (`materiais/08`) were left out because nothing says they are Jewish.

## Test: episodes open in a modal on the cover (2026-10-12, branch `capa-desconfianca`)

Alice's new script (Google Doc "Textos") replaces the seven axes with: introduction, 1 Desconfiança, 2 Lula, 3 Bolsonarismo, 4 Flávio (maybe one more between 3 and 4). The team is weighing whether to drop the axis pages and open each episode in a modal straight from the cover. This branch tests that on cover 01 only; covers 02-07 are untouched.

- Cover 01 renamed "Desconfiança"; opening text from the doc, with three spelling fixes ("antissemitismo", "mau cheiro", no hyphen). No CTA: with no axis page there is nothing to enter. No "Nesse eixo" label either (Alice): the list starts with a hairline on the image's top edge.
- Three episode rows (date | title | arrow). The doc listed four, but two were the same IHRA exit. Each row opens the testimony dialog (`#depo`), growing from the row instead of a card. Sources sit at the bottom of the modal, not in the text.
- Modal copy is drawn from `05-lula-record.md` (§A, §N10, §N13), written by Claude, pending Alice.
- Same day, Alice: applied to every cover. The home now has five covers: 01 Desconfiança, 02 Lula, 03 Bolsonarismo, 04 Alianças (the doc's "Eixo 2.0 (?)", kept until Alice decides), 05 Flávio. The old covers 02-07 and their CTAs are gone, axis 07 "A ferradura" (70,8% / 100%) included; the "Episodes on the covers" table above describes the v1 covers. The menu lists the five names.
- Copy: 02 and 05 are the doc's text with spelling fixes only ("se mantêm", "direito à existência", "se opõem", "explícitos", "nazifascista"). 03 and 04 had placeholders; their opening text is Claude's, drawn from `00-narrative.md` IV and V, pending Alice.
- Episodes (4 per cover, newest first) are all `verified` rows of `research/sources.md`. `A6-33` (Flávio's "gestapo do Lula") was left out because it is `needs-second-source`, and the Knesset speech (`A5-06`) is not claimed for the same reason. Quotes that exist only in English sources are paraphrased, not translated inside quotation marks.
- Cover 05 uses the hero portrait `img/hero/flavio.jpg` (credit unknown, caption "Crédito a confirmar").
- On desktop a long opening (02, 05) would push the cover past one screen; the photo now gives up height (crops shorter) instead: `.capa__main` rows `1fr minmax(0, auto)`, `min-height: 0`, `.capa__img { max-height: 100% }`.
- CONIB May 2025: the doc linked Brasil Paralelo (not Tier 2); replaced by Poder360, "Entidade judaica critica 'falas antissemitas' de Lula", which dates the note 11 May 2025 (Lula in Moscow on the 10th). The dossier says 14 May; correct the dossier if Alice agrees.

## Footer (2026-10-12, branch `rodape`)

Alice's line: «No dia 25, leve a memória com você pra urna. Vote por todos nós.» Full viewport height on `--azul-7` (first tried the flag's own `#0038B8`; Alice asked for a blue from the Figma palette), roman Fraunces Light up to 168px, sitting at the bottom. Mono row on top: "Feito por e para judeus brasileiros" left, "Outubro 2026" right; the bottom meta row is gone. The sentence ends with a small Brazilian flag (`img/bandeira.svg`, Alice's file from `design/bandeira.svg`), cap-height, kept on the same line as "nós.". It rises from a mask on enter like the hero and cover titles (900ms strong ease-out, 80ms between sentences); reduced motion drops the movement.

## Open

0. Opening line (date fixed to 2020 by Alice). The Mussolini episode (ICL, Oct 2026) is not in the dossier and needs a second source; ICL says "semelhante", the line says "imitaram". 

1. Cover images (2026-10-12, branch `claude/image-generation-planning-2210ba`): Alice turned down the generated collages (four Seedream 5.0 Flash tests, deleted with their prompts) and picked one image per cover, in the repo-root folder `capas/`. Copied to `img/capas/` (git-ignored, resized to 1200px max) and shown with the hero duotone (`url(#hero-duo)`, `--tinta` → `--azul-1`) plus a static grain overlay (`.capa__img--duo`). Cover figcaptions removed; credits will go elsewhere. Sources, credits and dossier status for these five images still to settle; `lula2.jpg` replaced `lula.jpg`; `desconfianca.jpg` is 400px and a manipulated image of real people.
3. Limoncic: role line, photo, where the text was published. The page uses "Bisneto de Lea e Itec, vítimas do Holocausto", drawn from his own text; confirm with him.
4. Image rights and credits: 03 and 04 lack photographer credits. All images are third-party; `site/img/episodios/` and `site/fonts/` are git-ignored until Alice decides what can go into the public repo.
5. Axis 04 line «O lema é dos integralistas de 1932» states where the slogan comes from, not that anyone is an integralist (`02 §A8`, rule in `00-narrative.md` IV). Check it reads that way.
6. Axis 03 line «Sair sem explicar foi uma falha» is the site's own judgement, as the narrative asks (`00-narrative.md` III).
7. Hero images (`img/hero/`): background is the Wiesbaden synagogue burning, 9 Nov 1938 (Center for Jewish History via Flickr Commons, "no known restrictions"), cropped and compressed. Lenses use the pogrom photo from Alice's Figma (source unknown). Portraits come from Alice's Figma; Lula's file carries EXIF copyright "Brenno Carvalho", Flávio's has no credit. Source, licence and credit for all three still to settle; where credits appear on the page is open.
