# Hero animation

Animated hero for `site/`, built in code (HTML/CSS/JS), not generated video. Decided by Alice on 2026-10-12. Built step by step; nothing is produced without her approval.

Brief (Alice, 2026-10-12): a blurred background video with slow-moving rectangles that open and close on top of it. Some rectangles are blurred images, others are photos of Lula and Flávio Bolsonaro with credits. Everything moves slowly. Monochrome composition in the blue of the Israeli flag.

## Steps

1. Reference analysis (this file). Waiting for approval.
2. Static frame: composition, duotone, labels.
3. Material: background source; candidate photos with source, licence, credit.
4. Motion prototype (via the motion skills).
5. Integration into `site/`.

## Reference: stateofaidesign.com hero

Source: `ref/` (screen recording, 8.3s, 3354x1816, 60fps). Read at 3fps, so easing and exact timing are not measured yet.

- Background: macro flower footage, heavily processed. It is not just blurred: it is posterised into flat false-colour zones (lilac, orange, green) with soft edges and fine grain. The footage drifts slowly. Around 3.7-4.0s there is a hard cut to another shot with a cooler grey-green palette, then a cut back.
- Rectangles: 5-7 on screen at once. Sizes range from about 11% to 26% of the frame width. Sharp corners, no shadow, no rotation. Some are cropped by the top or right edge of the band. Most have a 1px light border.
- Rectangle content: each one is a window onto the same kind of footage, but with its own treatment (greyscale, green duotone, more blur, different scale). They read as lenses on the scene, not as separate pictures.
- Labels: small mono uppercase chips (FOUNDER, CREATIVE DIRECTOR, HEAD OF DESIGN, PRODUCT DESIGNER) in a white box, attached to a corner of the rectangle and overlapping its edge.
- Motion: rectangles drift slowly, and some grow or shrink between samples (opening and closing). Labels travel with their rectangles. Whether a rectangle opens by clipping from an edge or by scaling is not measurable at 3fps. A 30fps pass around one transition would settle it.
- Layout: the band takes about the top 55% of the viewport; the H1 and text sit on white below.

## Background source (Alice, 2026-10-12)

Historical pogrom, heavily blurred, as atmosphere. Fallback if nothing usable is found: 8 January 2023. No news screenshots.

Survey of moving-image sources (2026-10-12):

- Usable now: Monson home movie, Vienna 1938, 40s, 640x480, colour, CC0 (Prelinger Archives via Wikimedia Commons). Antisemitic graffiti on Jewish shops and a café, not violence. Shot in summer 1938 per its description, so likely before Kristallnacht despite the Commons note.
- Real Kristallnacht film, rights unclear: Bühl synagogue burning (amateur 8mm, private, copy at USHMM); Bielefeld synagogue burning (42s, USHMM, private holder, permission required).
- Universal Newsreel, 16 Nov 1938 (Vol. 10, Release 720): public domain (NARA deed, 1974), but the riot material is about four seconds of stills.
- German newsreels: rights held by Transit Film; not usable.
- Brazilian law (Lei 9.610, art. 44): audiovisual and photographic works are protected for 70 years from 1 January after first disclosure. Published 1938 material is public domain in Brazil. Private footage first disclosed later is not automatically.

Still photographs, plentiful and licensed: Wikimedia Commons categories "Shops damaged during Kristallnacht" (Bundesarchiv, Magdeburg and Munich, CC BY-SA 3.0 DE) and "Synagogues destroyed during Kristallnacht" (including Wiesbaden and Ludwigsburg burning). Each file's licence still needs checking.

## Static mockups (`mockups.html`, served by the `hero` launch config on port 8768)

- Round 1 (2026-10-12): four variants A-D. Alice preferred the less symmetric ones, A and D.
- Round 2 (2026-10-12): base A. Lighter background blur (0.3cqw), no photo credit on the portraits, D kept only for colour comparison; colour to be decided later. Small tiles use Alice's tip: white tile background with the blurred photo on top, so the tile reads against the background.
- Portraits: Alice's photos from Figma (file `Sh9lLXWjzeSgAaLPzeKTO4`, node 23:231), in `mock/`. Their source and licence are not recorded yet; needed before launch.
- Background candidates: `selecao.html` (33 Kristallnacht photos with licences).

## Motion prototype (`motion.html`)

Reference at 10fps (2026-10-12): the background drifts continuously; the rectangles change in discrete jumps (resize or appear between two frames, no fade), and around 6.4s the background cuts hard to another shot. We go slower and smoother than the reference, per Alice's brief.

Round 1 (2026-10-12), base A:
- Background: 36s drift (translate 3%, scale 1.02 to 1.08), alternate, strong ease-in-out. CSS animation on a wrapper; the blur sits on the image so it is not repainted.
- Tiles drift 0.6-1.2cqw over 17-26s each, alternate, so they never sync.
- Open and close with `clip-path: inset()` from a random edge: open 1400ms, close 1100ms, strong ease-out (`cubic-bezier(0.23, 1, 0.32, 1)`). Labels fade in 300ms after the tile opens, out 200ms before it closes.
- Lenses: open 5-9s, closed 1.5-4s; a lens waits to close while 4 or fewer tiles are open.
- Portraits: identical cycle (9s open, 3s closed), about half a cycle apart, order drawn at random on each load. Simulated over 10 minutes: never both closed, each closed 20.1% of the time.
- Reduced motion: no drift, no opening; static composition, fully open. Off screen: paused.

Round 2 (2026-10-12), Alice's notes: the name enters with the tile, not after; candidate tiles must visibly move; the frame is never still; the background zooms in and out; Lula is never on screen without Flávio (Flávio may be alone).
- Labels sit inside the clip and open with the tile.
- Drift uses easeInOutSine (`cubic-bezier(0.37, 0, 0.63, 1)`), so velocity is zero only for an instant. Portraits drift 3cqw over 19-21s, lenses 1.6-2.2cqw over 13-17s.
- Background: zoom 1 to 1.18 plus a 4% pan, 22s, alternate, sine.
- Candidates share one loop: Flávio opens, Lula opens 1.2-2.4s later, both hold 7-9s, Lula closes, Flávio closes 1.5-3.5s later, then 2-3s with neither. The portraits no longer get equal screen time; this is Alice's call.

Round 3 (2026-10-12): the four lenses use the pogrom photo from Alice's Figma frame (wounded man in bed, a Red Cross nurse, a boy and an old man; `mock/pogrom.png`, 800x623), each with a different crop, so the pogrom reads more clearly. Lens blur set to Alice's "12", read as a Figma layer blur on a 1440 frame (about CSS 6px). That conversion is an assumption; the page has a slider in Figma units. Source and licence of the photo still unknown; needed before launch.

Round 4 (2026-10-12): candidates on screen almost all the time. Lula starts opening 0.3-0.6s after Flávio, both hold 14-18s, Lula closes, Flávio closes 0.3-0.7s later, then 1.2-2s with neither (about 90% of the cycle on screen). Portrait drift mostly horizontal: 6cqw across, 0.6cqw down. Portraits sit above the lenses.

## Translation for this site (proposal, pending)

- One colour: duotone between `--tinta` `#07122e` and `--azul-1` `#e9f0fc`. Whether the mid-tone is the flag blue `#0038B8` or the site's own scale (`--azul-6` `#4863a1`) is still to be decided.
- Two kinds of rectangle: "lenses" (background re-treated with a different blue, blur and scale) and portraits (Lula, Flávio).
- Portraits get the same size, the same screen time and the same treatment, so neither candidate looks favoured.
- Label carries the name; photo credit (photographer and agency) sits with it, in Geist Mono.
- Respect `prefers-reduced-motion`: static frame instead.
