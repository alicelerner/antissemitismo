# Social posts

Instagram pieces that promote the site (bomprosjudeustambem.com.br). Started 2026-10-13 on branch `redes-post-b`.

Two posts were planned (Alice, 2026-10-13):

- **Post A**: a carousel that tells the story (cover question, the dilemma, one slide per site cover with a verbatim dated quote, closing line). Postponed.
- **Post B**: "selling" the site, modelled on luzcasluz's post https://www.instagram.com/p/DWJQdYYDoSX/ (UI recordings and crops on a flat background, ending on the address bar alone). Done: two videos for the feed, the same two plus a closing slide for stories.

Always in the site's visual identity: palette, Fraunces / Neue Montreal / Geist Mono, real screens of the site.

## Post B

Background `--azul-3` (#B4CAF0); `--azul-7` and `--brasa` were tried and rejected. Three items, in this order:

| Item | Source | Feed (1080 x 1440) | Stories (1080 x 1920) |
|---|---|---|---|
| 1. The site in a browser window: hero, slow scrolls to the painting and covers 01 and 02, a cursor opens the Planalto episode, ~5 s on the modal | `01-hero.mjs`, `janela.html` | `01-hero-azul-3.mp4` (16 s) | `01-hero-azul-3-story.mp4` |
| 2. The site on a phone: menu, "03 Bolsonarismo", the Alvorada episode, with iOS-style touch dots | `03-celular.mjs`, `celular.html` | `03-celular-azul-3.mp4` (14 s) | `03-celular-azul-3-story-completo.mp4` (26 s: about 1 s inside the episode, closes it, travels calmly through covers 04 and 05 to the footer line); `03-celular-azul-3-story.mp4` (14 s, ends on the episode) kept as the shorter option |
| 3. Stories only: the site's flag near the bottom, the middle left free for Instagram's link sticker | `link.html`, `render.mjs` | none | `05-link-story.png` |

File numbers follow the first five-slide plan; slides 2 (screen mosaic) and 4 (zoom on the 250+ / 30+ numbers and an episode's sources) were made and dropped by Alice.

Decisions along the way (Alice, 2026-10-13):
- Recordings at 1440 x 900, the width the site's grid and Figma are drawn for; at 1280 the bar, cover image and text column stop lining up.
- Slide 1 scrolls slowly (1400 ms per scroll, 1200-1800 ms dwell, strong ease-in-out from the `animate` skill) and only a few stops; a tour of every section at 900/700 ms was too fast.
- The phone's status bar is `--tinta` with white text, so it continues the site's dark bar and meets the dark modal.
- Closing slide: the feed version (the address bar alone with the flag below) was dropped, and with it the feed's third item; a heart and a Star of David beside the flag were tried and dropped too.
- In stories, the browser window keeps its feed size; the phone grows to 720 px; the closing slide has no address bar, so Alice can place Instagram's link sticker there, and a 128 px flag sits 300 px from the bottom, clear of the reply bar.

## Running

Needs Node, ffmpeg and the local site server (`site` in `.claude/launch.json`, port 8766: the recordings use the git-ignored images in `site/img/`). Clarity is blocked during recordings. From `social/`:

```
npm install
node post-b/01-hero.mjs record scroll      # capture (the hero's cycle is random: check the first frame)
node post-b/01-hero.mjs 3.5 60 1 azul-3    # composite: from, to, speed, background; add --story for 1080 x 1920
node post-b/03-celular.mjs record [--story] [--completo] # capture and composite; --completo: episode, close, footer
node post-b/03-celular.mjs [--story] [--completo]        # composite again
node post-b/render.mjs link 05-link --story
```

`out/` is git-ignored (third-party images). It keeps the approved captures (`01-frames`, `03-frames`, about 170 MB) so the videos can be recomposed without recording a different take. The feed phone video still uses the first take (2.2 s on cover 03); the stories ones are later takes (`03-frames` was re-recorded for the short stories cut, `03-frames-completo` holds the full route). A route straight from cover 03 to the footer, without the episode, was tested and replaced by the full one.
