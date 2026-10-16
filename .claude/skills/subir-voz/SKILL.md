---
name: subir-voz
description: Add a new item to the "O que alguns judeus estão pensando" (Vozes) carousel on the live site and publish it straight to production. Input is a link (Instagram post or reel, YouTube, article) or a pasted testimony text. Use when Alice sends a link or text and says "sobe no carrossel", "adiciona nas vozes", "novo depoimento", "põe esse post no site", or runs /subir-voz.
---

# Add a Vozes card and publish it

Alice's standing instruction (2026-10-16): she sends a link or a text, you add it to the carousel and deploy to production in the same run, **without touching anything else**. Invoking this skill is her go-ahead to merge, push and run `vercel deploy --prod`. Do not stop to ask for approval of the card; ask only when something blocking is missing (see "When to ask").

Only these files change: the new `<li>` in the Vozes `<ul class="vozes__trilho">` in `site/index.html`; for a testimony, its `<template id="depo-<slug>">`; the module's table in `site/README.md`; and the record of the source (`materiais/` or `research/testimonies/`). No CSS, no JS, no other copy, no `?v=` bump.

## Steps

1. **Worktree.** `zsh .claude/skills/subir-voz/preparar.sh <slug>` from any checkout. It creates `.claude/worktrees/voz` on branch `voz-<slug>` from `origin/main` and copies the git-ignored media and `.vercel` link into it. Do all edits there. Slug: author plus subject, kebab-case, no accents (`golem-contra-flavio`).
2. **Capture the source.**
   - *Instagram post*: `gallery-dl` (no login) into a new empty dir; fall back to the built-in browser (`og:image`, caption). Reel: `yt-dlp` for `video.jpg` and `video.info.json`.
   - *Other link*: open it in the built-in browser; take title, author, date and `og:image`.
   - Save it as the next `materiais/NN-<outlet>-<subject>/` item, following `materiais/README.md` (media stays local and git-ignored; commit `fonte.json` and the `index.json` line, `status_uso: nao-verificado`). Write media to the **main checkout's** `materiais/`, since that is where local media lives.
   - *Testimony text*: save it as `research/testimonies/<slug>.md`, text exactly as given, in the shape of `limoncic.md` (who sent it and when, status, lines used on the site).
3. **Thumbnail** (not for testimonies, which are typographic): `site/img/vozes/<slug>-<year>.jpg`, 900 px wide, JPEG quality ~82 (`sips` or `ffmpeg`). Post covers keep the 4:5 crop (900 x 1125), reel frames 9:16 (900 x 1600). Look at the image before writing its `alt`. Post images already turn grayscale through CSS.
4. **Card.** Add the `<li>` at the **end** of the track unless Alice names a position. Copy the shape of an existing card of the same type exactly:
   - *Post* (`voz--post`) and *Vídeo* (`voz--video`, with `<span class="voz__play">`): `<a href target="_blank" rel="noopener">`; `voz__titulo` = author; `voz__meta` = `@handle · 9 out 2026` (or outlet · date); `voz__mais` = the post's own title, shortened only if it runs past two lines, then ` <span aria-hidden="true">↗</span>`.
   - *Depoimento* (`voz--depoimento`): `<button class="voz__abrir" data-depo="<slug>" aria-haspopup="dialog" aria-controls="depo">`; the thumb holds one pull quote **lifted verbatim** from the text, in “…” with inner ‘…’; `voz__meta` = the role line; `voz__mais` = `Ler o depoimento completo →`. Then add `<template id="depo-<slug>">` after the last `depo-*` template: `depo__lado` (author, role) and `depo__texto` with the `<h2 class="depo__titulo" id="depo-titulo">` (the text's own title, or the pull quote if it has none) and one `<p class="corpo">` per paragraph, text exactly as given.
   - Dates: `d mmm yyyy`, lowercase Portuguese abbreviations (jan fev mar abr mai jun jul ago set out nov dez).
5. **README.** Add one row to the table under "Carousel “O que alguns judeus estão pensando”" in `site/README.md` and update the card count line. Nothing else in the README.
6. **Check locally.** `preview_start {name: "voz"}` (serves `.claude/worktrees/voz/site` on 8774). Scroll the carousel to the new card, confirm the image loads, the link or modal opens (testimony: the modal shows the full text and closes on Esc), the arrows still reach the end, and the console has no errors. Also check at 375 px width. If anything fails, fix it before going on. Stop the preview afterwards.
7. **Commit** on `voz-<slug>`: `Add <author>'s <post|video|testimony> to the Vozes carousel`, with the attribution trailer.
8. **Publish.** `zsh .claude/skills/subir-voz/publicar.sh .claude/worktrees/voz "<author name as written in the HTML>"` (absolute worktree path is fine). It fast-forwards `main` to `origin/main`, rebases the branch on it, merges `--no-ff` without checking out main, pushes, copies new `img/vozes` files to the main checkout, runs `vercel deploy --prod`, confirms the text on https://bomprosjudeustambem.com.br, and removes the worktree and branch. A first "Not authorized" from the Vercel CLI is usually transient: run the script's deploy line again by hand. If the script stops, report where and leave the worktree in place.
9. **Report to Alice** in Portuguese, short: the card as it reads (type, title, meta, extra line or pull quote), the live URL https://bomprosjudeustambem.com.br (never a `vercel.app` preview), and any call you made (crop, shortened title, chosen pull quote).

## When to ask (one question, then stop)

- A testimony with no author name, or no role line. Never invent a role.
- A link you cannot open or capture at all.
- Anything that says the author is not Jewish or is not speaking for themself: the heading says "alguns judeus". Two `materiais/` items were left out for this reason (README).

Everything else is a call you make and report: which sentence becomes the pull quote, how a long title is shortened, the crop.

## Rules

- **Text exactly as given.** Fix nothing in a testimony beyond obvious typing slips (doubled space, doubled word), and list each fix.
- **Don't nag.** The "only `verified`" question for opinion pieces and the image licences are open items Alice already knows about (README "Open for this module", memory `launch-live-pending-risks`). Don't block on them or repeat them.
- **One card per run.** For several items, run the steps per item, or put all cards on one branch and publish once; say which.
- Third-party media never enters git (`site/img/vozes/` and `materiais/**` media are ignored).
