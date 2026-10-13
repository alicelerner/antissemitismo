---
name: sincronizar-textos
description: Bring the site copy in line with the team's two Google Docs ("Textos" and "Textos internos dos episódios"), the project's source of truth for copy. Use when Alice says the team finished a review round, asks to "atualizar o site com os docs", "sincronizar os textos", "incorporar as mudanças do doc", or runs /sincronizar-textos.
---

# Sync the site with the two source docs

The site's copy follows two Google Docs, edited by the team (Daniel Papaterra, Yael Berman, Pedro Zylbersztajn). The site follows the docs, never the other way round.

| Doc | Drive id | Governs |
|---|---|---|
| Textos | `18MhY5VuTya3dM4vjxAX-Tp6YWbNPw6uIpId6YdEowr4` | "Ponto de inflexão" line, opening ("entre a cruz e a espada"), cover names, cover lines and texts, episode rows on the covers (date and title) |
| Textos internos dos episódios | `1OAx1fLlZCHmtwsbDz_I4OtLixUIwb7h-IZofOa9nf_4` | Every episode modal: title, date, place, paragraphs, quotes with attribution, sources |

Everything lives in `site/index.html`: covers are `<article class="capa">`, modals are `<template id="ep-N-slug">`.

## Steps

1. **Branch.** `git checkout -b textos-rodada-<yyyy-mm-dd>` from an up-to-date main.
2. **Read both docs with comments.** Drive `read_file_content` with `includeComments: true`. If Alice names only one doc, read only that one.
3. **Render the site as text.** `python3 -I .claude/skills/sincronizar-textos/site_to_text.py site/index.html tudo > <scratchpad>/site.md`. Compare it with the docs section by section and list every difference: text, quotes, attributions, dates, places, titles, sources (URL, outlet, title, date), added or removed episodes, order.
4. **Apply.** Edit `site/index.html` so it matches the docs. Use a small Python script of exact `(old, new)` replacements that asserts each `old` occurs exactly once, so nothing lands in the wrong template. Keep the markup patterns already in the file (`<p class="corpo">`, `<blockquote class="ep__citacao"><p>…</p><footer class="mono">…</footer></blockquote>`, source `<li>` with `target="_blank" rel="noopener"` and the hidden ↗ span). Cover rows (`ep__titulo`) and modal titles (`depo__titulo`) are different texts; change each only where its doc changed it.
5. **Check in the browser.** `preview_start` with `{name: "site"}`, open at least one changed modal per cover (click its `[data-ep]` button), confirm the text, and check the console for errors. If an episode was added or removed, also check the "N de M" labels and that every row has a template.
6. **Record the round** in `site/README.md`: a dated section with what changed, the calls you made, and the points for Alice (see rules). Commit on the branch.
7. **Report to Alice** in Portuguese: what changed, your calls, the points for her, and the open comments. Ask before merging. Merge into main with `--no-ff` and push only on her yes. Publishing is `vercel deploy --prod` from `site/`, and it needs her explicit go-ahead.

## Rules

- **The doc wins.** Do not rewrite, improve or "restore" the team's text. Fix only typos, spelling and edit leftovers, and list each fix: merged words left by accepted suggestions ("alegoulembrou"), missing spaces, doubled punctuation, a title pasted twice, unbalanced quotation marks, tracking parameters (`?st_source=…`, `utm_*`) in URLs.
- **Ambiguity is a call, and you say so.** Typical cases: an attribution line left without its quote, a link placed on the date instead of in the sources, a source date that contradicts its URL, a bare URL with no title (give it the outlet and the title from the page or the slug, and say which). Make the smallest sensible call and list it.
- **Flag, don't overrule, departures from the dossier rules** (`research/README.md`, `research/00-narrative.md`): a contested reading reduced to one side, a caveat removed from a `needs-second-source` item, a strong claim backed by a single opinion piece, a comparative claim the dossier does not measure. Apply the doc, then list these for Alice.
- **Open comment threads are not decisions.** Do not apply a suggestion that sits in an open comment. List it and ask. Resolved threads whose change is already in the text are done.
- **Do not edit the docs** unless Alice asks. If the site needs something the doc lacks (for example, a fix Alice approved in chat), say the doc should be updated so it stays the source of truth.
- **Sources need a real check when they are new.** Open new source URLs in the built-in browser (WebFetch is blocked on some outlets, such as dw.com) and confirm the headline and date before you write them into the page.
- Third-party images, the licensed font and Save Page Now are separate open items (see the README "Open" list); don't raise them in a copy round.
