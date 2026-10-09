# Comparador em grafo: references

Entries in the order received. Files live in `references/`.

## 01. Alice's sketch

- Source: `references/01-sketch-alice.webp`
- Received: 2026-10-09
- Take: the whole layout. Title "Comparador de antissemitismo" top left. Segmented toggle `lula | flávio` top right (selected side filled black). Center: a wide text field reading "**lula** saiu da IHRA" (candidate name bold, episode in gray). Scattered dots across the canvas; one episode shown as an image card (a news post: "Governo retira Brasil da Aliança Internacional para a Memória do Holocausto") with thin straight lines running from it to other dots.
- Ignore: nothing stated.
- Notes: the sample episode is phrased as "saiu da IHRA". Whether it can appear depends on its status in `research/` (see brief, open questions).

## 02. Kunumi Institute home

- Source: https://www.kunuminst.org/en
- Received: 2026-10-09
- Take: the exploration model. Alice: "estude atentamente antes de construir o wireframe".
- Ignore: nothing stated.
- Notes (studied 2026-10-09, desktop 1440x900 and mobile 375x812). Next.js, one full-screen canvas (WebGL-scale, 2880x1800 at 2x), Instrument Sans + ABC Monument Grotesk (and its Mono for tags).
  - **Field.** Light gray background (~#e8e8e8). A few hundred black dots of varied size fill the screen as a 3D cloud: dot size encodes depth, the cloud drifts and rotates slowly on its own. Every dot is a content item.
  - **Central pill.** Translucent gray capsule, centered, ~400px wide. Reads "I want to learn about [Topic]" (mobile: "Show me [Topic]"); the topic word cycles every few seconds. Thumbnails of items in that topic stack and shuffle *behind* the pill, half hidden by its blur. Click focuses an input; typing shows submit and clear buttons.
  - **Hover reveal.** Moving the cursor near dots turns the nearby ones into small image thumbnails. A salmon tag chip (mono caps: "Report", "Knowledge", "Colab") appears among them, and thin 1px gray straight lines run from the chip to each thumbnail. Items with several tags show several chips side by side. A revealed cluster stays for a few seconds after the cursor leaves, then dissolves back into dots, so a path of exploration leaves a short trail.
  - **Click.** Clicking a revealed cluster opens a filtered list: the field blurs, the pill moves to the top holding the active tags as chips plus "New search", and content cards stack vertically in the center column (image, title, type tags, read time).
  - **Featured card.** Bottom center, small translucent card with one item (thumbnail + title), above two buttons, "Index" and "Linear".
  - **Index.** Field blurs; a horizontal carousel of large category cards (About, Articles, Podcasts, Colabs, Careers), "Close" at the bottom.
  - **Linear.** The dots fly into a single horizontal row; vertical scroll moves the row sideways. Each item becomes a card (image cards and text-only cards alternate). "Back" at the bottom. It is the same set as the field, read in order.
  - **Mobile.** Same field and pill, no hover. A tap anywhere jumps straight to the filtered list.
  - **Accessibility.** Floating accessibility button bottom right with a panel (contrast, text size, pause particles, reduce motion and others).

<!--
## NN. Short name
- Source: URL or references/NN-slug.ext
- Received: YYYY-MM-DD
- Take: what Alice wants from it
- Ignore: what to leave out
- Notes:
-->
