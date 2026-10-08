# Reference: stateofaidesign.com

Mapped 2026-10-05 at 1280x800 and 1440x900, by DOM inspection (computed transforms sampled while scrolling) plus screenshots. Built in Framer by ++hellohello for Designer Fund / Foundation Capital. Page height is about 10,450px at 1280 wide.

Values marked "measured" come from computed styles. Values marked "inferred" are read from behaviour, not from source.

## 1. Page skeleton

| # | Section | Height (1280w) | Layout | Main motion |
|---|---|---|---|---|
| 1 | Hero | 100vh | Full-bleed video, giant H1 cropped off the right edge | 4s intro video, then logo assembly |
| 2 | Partners | ~400px | Mono label, hairline rule, logo row | none |
| 3 | Statement ("An inflection point") | ~250px | Mono label + 32px sentence | none |
| 4 | Stats, pinned | 1.5 viewports, sticky 100vh inside | Photo left, two colour blocks right with big numbers | Image zoom-out into place, aside slides in, numbers count up |
| 5 | Intro text | ~750px | 26px lead + 16px body, right column | none |
| 6 | Quote | ~615px | Black left column (quote glyph, avatar, name), coloured right column with 32px quote | Avatar scales 2 to 1, author fades up |
| 7 | Chapters, stacked | 3 x 100vh sticky slides in a 3200px track | Each slide a full colour field: number+title left, content right, image bottom-left | Each slide covers the previous one; title rises 112px |
| 8 | Case studies | ~1000px | Horizontal carousel of 460px cards with arrows | Hover expands card, accent bar changes colour |
| 9 | "Coming soon" block | ~960px | Large video right, text and link left | none |
| 10 | Subscribe | ~680px | Black field, centred form, background video | "Scroll to subscribe" hint fades |
| 11 | Methodology | ~330px | Black, 4 columns split by vertical hairlines, 120px numbers | Count-up |
| 12 | Footer | ~650px | Full-width "Ai in Design" wordmark, "2026" bottom right, link columns, legal line | none |

## 2. Section detail

### 2.1 Hero
- The opening collage (flower photo with duotone treatment, floating rectangular tiles labelled with roles like "HEAD OF DESIGN", "FOUNDER", a hairline crossing the frame) is a **pre-rendered video**, not DOM animation. Measured: `webm`, 4.04s, autoplay, muted, no loop, with a JPG poster.
- The logo "Ai in Design" is five separate SVG pieces (`Ai`, `i`, `n`, `D`, `esign`) plus a `2026` SVG. Each piece carries its own translateX (measured offsets -6, -15, -20, -72px), so the letters slide together and tighten into the wordmark. A black block grows behind it during the intro (seen in screenshots, timing not measured).
- Final hero state: H1 "AI in Design Report 2026" at 120px, intentionally bleeding off the right edge. Subtitle 20px top-left of the text block, mono byline bottom-left, "Scroll to read" bottom-centre.
- Hero nav is part of the hero, not the global nav: black "AiiD 26" logo block left, orange "Read the Report +" block. "+" rotates to "x" when the menu opens.

### 2.2 Stats, pinned (the signature scroll moment)
- Structure: `wrapper` 1350px tall containing a `position: sticky; top: 0` panel of 100vh. That gives about half a viewport of pinned scroll.
- Entering (measured): `image-wrapper` starts at `scale(1.5) translateY(600px)` and settles to identity as the section reaches the top. The photo begins inset under the statement text and grows to full height.
- While pinned: an `aside` (~465px wide) with two stacked colour blocks (lilac 60%, sage 40%) slides in from the right; the photo slides left by the same amount.
- Numbers ("900+", "25+") count up from 0 when the block enters.
- All of it is scroll-linked **and spring-smoothed**: after an instant scroll jump, translateX values overshoot and decay over roughly 300-500ms. Text inside the aside also gets a tiny scaleX (0.98-1.02) during movement, a velocity squash. Inferred: Framer scroll transform with a spring on top.

### 2.3 Quote
- Black column left, sage column right, 32px quote text.
- Scroll-linked over ~600px (measured): avatar image `scale(2)` to `scale(1)`; author block `translateY(80px)`, opacity 0 to identity, opacity 1.

### 2.4 Chapters (stacked sticky slides)
- A 3200px track holds three 100vh slides, each `position: sticky`. Each slide scrolls up and covers the one before: a card-stack effect done with sticky alone, no transforms (measured: no transform change across the track).
- Slide backgrounds: orange (Tools), lilac (Craft), sage (Teams).
- Slide content: "01 / Tools" at 80px top-left; right column with 40px subtitle, 16px description, mono label "IN THIS CHAPTER, WE'LL COVER:", five list rows separated by hairlines, then a full-width black CTA bar with an arrow. A dithered/halftone image sits bottom-left.
- On enter, the 80px chapter number and title rise from `translateY(112px)` (measured), masked so they appear to come up from a line.

### 2.5 Case studies carousel
- Cards 460px wide on a 16px gap, overflow to the right, prev/next arrows top-right (disabled arrow at opacity 0.5).
- Each thumbnail has a 16px lilac accent bar along its bottom edge.
- Hover (observed): the card widens (about 460 to 580px), the accent bar turns orange, a hidden question line appears under the title, and neighbours shift right.
- "Coming soon" cards have `filter: grayscale(1)` and a "Get notified" link.

### 2.6 Subscribe, methodology, footer
- Subscribe: black section, centred heading, email input with orange Submit, consent line. A looping background video sits behind. A "Scroll to subscribe" hint fades out as you arrive.
- Methodology: 120px numbers (906 / 25+ / 50+) in four columns split by vertical hairlines; count-up on enter.
- Footer: wordmark at full width (same SVG pieces as the intro), "2026" bottom-right, partner and report link columns, legal line.

### 2.7 Navigation
- Global fixed nav exists but stays hidden on desktop after the hero (measured translateY -58 to -118px at every scroll position I tested, including scrolling up). I could not trigger it on desktop. Treat as uncertain; it may only be active on tablet/mobile.
- "Read the Report" opens a mega menu: chapter rows (01 Tools, 02 Craft, 03 Teams) whose background slides in from the left on hover (measured resting `translateX(-163px)`), and a case-study menu with seven rows and small thumbnails.

## 3. Design tokens (measured)

### Colour
| Role | Value |
|---|---|
| Ink / dark fields | `#000000` |
| Paper | `#FFFFFF` |
| Orange (accent, CTAs, chapter 1) | `#FE7141` |
| Lilac (chapter 2, accent bars, stat block) | `#CDABFE` |
| Sage (chapter 3, quote, stat block) | `#D1DDD3` |
| Acid yellow (used once) | `#F0FF1C` |
| Secondary text | `rgba(0,0,0,0.6)` |

### Type
- Display and UI: Beausite Classic (Fatype, commercial licence). Medium 500 for nearly everything, Regular 400 for body.
- Labels: Geist Mono 500, 13px, uppercase.
- Scale: 120 (hero, stats) / 85 (pinned numbers) / 80 (chapter titles) / 40 (chapter subtitles, card titles) / 32 (statements, quote) / 26 (lead) / 22 / 18 (UI) / 16 (body) / 14 (card meta) / 13 mono / 12 legal.
- Tracking is tight and proportional: about -6% at 120px, -4% at 26-40px, -3% at 18px, -1% at 16px. Display line-height ~0.95, body 1.4.

### Layout
- Full-bleed sections, 16px side gutter, no max-width container on desktop.
- Hairline rules (1px black) separate every section and list row; mono label sits just under the rule.
- Colour fields do the sectioning instead of whitespace.

## 4. Motion grammar, summarised

1. One cinematic opening, pre-rendered as video, then the page is static type.
2. Scroll-linked, not time-based, for anything in the reading flow, with spring smoothing so it never feels mechanical.
3. Sticky does the heavy lifting: one pinned scene (stats) and one stacked-card sequence (chapters).
4. Text enters by rising from a mask; images enter by scaling down to 1.
5. Numbers count up once.
6. Hover is reserved for navigational objects (cards, menu rows), and changes layout (width) rather than adding decoration.

## 5. Implementation map for a coded build

| Pattern | Suggested implementation |
|---|---|
| Pinned stats scene | Outer section `height: 150vh`, inner `position: sticky; top: 0; height: 100vh`; Motion `useScroll({ target, offset })` + `useTransform` + `useSpring` |
| Stacked chapter slides | Pure CSS: each slide `position: sticky; top: 0; height: 100vh`, later slides higher in stacking order |
| Rise-from-mask titles | Wrapper `overflow: hidden` (or `clip-path`), child `translateY(100%)` to 0; trigger with `whileInView` or CSS `animation-timeline: view()` |
| Avatar scale, image zoom-out | Scroll-linked `scale` via `useTransform`, transform and opacity only |
| Count-up | `animate()` on a motion value once in view; render tabular numerals so width does not jitter |
| Intro | Either a short video (as the reference) or a code-only logo assembly; must be skippable and respect `prefers-reduced-motion` |
| Hover-expand cards | Flex children with `flex-basis` transition, or Motion `layout` |

## 6. Notes for this project

These are counterpoints to weigh before copying the reference one to one.

- **Tone.** The structure and motion grammar transfer well. The palette (flowers, lilac, orange) and the playful collage were chosen for an AI-in-design report. Our subject is antisemitism, the Holocaust and political violence; colour and imagery need their own decision.
- **The 4s intro.** Our audience is undecided voters, much of it likely arriving from WhatsApp on phones. A 4-second unskippable opener costs attention and data. A sub-1.5s code-only wordmark, or none, fits better.
- **The chapter stack maps directly onto the narrative arc** in `research/00-narrative.md` (the fear is legitimate / where the danger came from / what the project said / its allies / what Lula did / the choice). Each axis can be one stacked slide.
- **The pinned stats scene fits the lethality data** (axis 4). Every animated number must keep its source visible next to it; count-up must not outrun the citation.
- **Font licence.** Beausite Classic is commercial. Choose an alternative or budget the licence.
- **Reduced motion.** Not checked on the reference. Our build must ship a `prefers-reduced-motion` path for every scroll-linked effect.
- **Mobile.** Mapped desktop only. The reference has separate mobile variants (Framer breakpoints); ours needs the same, not a scaled-down desktop.
