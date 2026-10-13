# Proposal: less like stateofaidesign (branch `menos-referencia`, 2026-10-13)

Alice's worry (2026-10-13): the site reads as a near copy of stateofaidesign.com. She asked for targeted changes, mainly to the hero animation (same purpose), and to whatever else is too close, done so she can reject them. Each change below is its own commit on this branch, so any one can be dropped or reverted without touching the others.

## 1. What is already ours

- Type: Fraunces Light (serif display) against the reference's Beausite (grotesque). The biggest single difference, and it holds.
- Palette: the flag blues and rose, against black, orange, lilac and sage.
- Imagery: duotone historical photographs and painting, not flower footage.
- Copy and content structure (covers with episodes that open in a modal).

## 2. What is near-identical, ranked by how recognisable it is

| # | Element | Reference | Ours today | Verdict |
|---|---|---|---|---|
| 1 | Hero band | Collage of floating rectangles that open and close, each a "lens" on the background, 1px light border, white mono chip on a corner | Same grammar: floating tiles, clip-path open from an edge, 1px white border, white mono chip bottom-left | Strongest echo. Change. |
| 2 | Top bar | Black logo block + wide orange "Read the Report +" slab | Dark "25.10" block + 516px rose "Eixos +" slab | Reference's identity in one glance. Change. |
| 3 | Text entrance | Titles rise from a mask, images settle from a scale | Same, everywhere (hero, covers, footer, painting, cover images) | The motion signature. Change. |
| 4 | Carousel | 460px cards, 16px accent bar under each thumbnail, hover widens the card to 580px and turns the bar orange | Same values (Alice asked for the module "like the reference") | Change the bar and the widening; keep the module. |
| 5 | Footer numbers | Methodology strip: big numbers in columns split by vertical hairlines | Same strip, three columns | Change the layout, keep the content. |
| 6 | Menu panel | Big rows, superscript index | Same, superscript after the title | Small change. |
| 7 | Sticky cover stack | Coloured full-screen slides stacking | Same | Keep: it won the team vote and fits the narrative. Its look now differs through colour, serif and photos. |
| 8 | Hairline + mono label section headers | Everywhere | Everywhere | Keep: common editorial vocabulary, not a signature. |
| 9 | Hero text block | Lede top-left, mono byline bottom-left, "Scroll to read" | Same arrangement | Not changed here; noted for later. |

## 3. The idea that ties the changes together: focus

The reference's motion grammar is "things slide into place" (masks, scales, clips from edges). Ours becomes "things come into focus": blur lifting, a photograph developing. It suits the subject (memory, evidence, looking closely at the record: the site already says "com lupa ou não") and it stays inside the existing palette, type and curves (`--ease-out`, `--ease-in-out`, sine drift).

## 4. Changes on this branch

1. Hero, "revelação". The band is divided into vertical slats aligned to a 12-column grid (6 on phones), drawn as faint hairlines. A slow wave crosses the band: one slat at a time comes into focus, showing a sharp strip of the pogrom photograph over the blurred Wiesbaden synagogue. Same purpose as the lenses (windows onto the pogrom), but ordered, like reading a record line by line, instead of a floating collage. The two candidates sit in grid-aligned windows and develop like photographic prints: a paper sheet appears, the portrait emerges from it, then fades back into paper and the sheet goes. No clip-path wipes, no white border, no corner chip: names run vertically along each portrait's edge. Kept from round 4: Lula never on screen without Flávio, both on screen most of the cycle, slow vertical drift so the frame is never still, background zoom, pause off screen, static frame under reduced motion. The wave is a pure CSS animation (off the main thread); the candidate cycle stays in `main.js`.
2. Focus-in entrances. Hero title, cover names and footer sentence go from blurred and transparent to sharp instead of rising from a mask. Cover images and the painting come into focus instead of settling from scale 1.04. Same durations and curve. Reduced motion keeps the fade only.
3. Bar. The rose slab shrinks to its content and names the axis being read ("Eixos" on the opening, then "01 Desconfiança", "02 Lula"...), so it does work the reference's slab does not.
4. Menu. The index moves before each title, as a mono label, instead of a superscript after it.
5. Carousel. No 16px accent bar and no widening. Each caption starts with a hairline; on hover a rose line draws across it from the left and the image moves closer inside its frame. The extra line still appears. This reverses Alice's 2026-10-12 request to follow the reference here, so it is the change most likely to be rejected.
6. Footer numbers. A ledger instead of a column strip: rows split by horizontal hairlines, number on the left column and label on the right, on the same 596/796 grid as the rest of the page.

## 5. How to judge it

- Does a first-time viewer who knows stateofaidesign still think "that's the AI in Design site"? The hero and bar are the test; look at the first screen only.
- Does the hero still say "the memory of the pogrom, and the two candidates in front of it" within three seconds?
- Is anything harder to read than before (the focus-in titles at 2x speed, the vertical names on a phone)?
- Neutrality: both portraits same size, same treatment, same timing as before.

## 6. Not done, worth considering

- Hero text block (row 9).
- Cover transition: the previous cover could dim as the next slides over it.
- The tinta + rose bar colours themselves.

## 7. Alice's verdict (2026-10-13)

Kept: hero slats (with a new photo each wave, and the candidates opening from an edge as before), focus-in entrances, the bar's axis name (at the old 516px width), the menu index (aligned to the capitals). Rejected and reverted: carousel, footer ledger.
