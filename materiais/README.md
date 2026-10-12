# Materiais

Local captures of the videos, posts and pages we may use to illustrate the stories. Started on 2026-10-12 from Alice's reference doc ("Referências", Google Docs `1tKHl5n_Ow9DroWfCGwzX6JBseSYH1MjCcfIvUZWCYZo`).

A capture here is not evidence. Only `verified` material from `research/` may appear on the site (see `research/README.md`). Every item starts as `status_uso: nao-verificado`; `tier_dossie` says where it stands against the source tiers.

## Layout

```
materiais/
  index.json                 one line per item: id, type, outlet, date, title, url, tier, status
  NN-fonte-assunto/          one folder per source link
    fonte.json               full metadata: url, outlet, author, date, summary, tier, notes, file list
    ...captured files
```

Folder ids: two-digit order from the reference doc, then outlet, then subject, kebab-case, no accents. New items continue the numbering (13, 14, ...).

## File names inside an item

| File | What it is |
|---|---|
| `fonte.json` | Metadata. Read this first. |
| `print-topo.png` | Screenshot of the first screen (1440x900 at 2x; web story at 412px mobile). |
| `print-pagina.png` | Full-page screenshot, capped at 16000 CSS px. |
| `pagina.pdf` | Print-to-PDF of the article. |
| `texto.txt` | Main text extracted from the page (internal reference only, do not republish). |
| `captura.json` | Raw page metadata from the capture script (og tags, publish date, HTTP status). |
| `og.*` | The page's share image. |
| `imagens/imagem-NN.*` + `imagens/imagens.json` | Images from the article or carousel, in order, with alt text, captions and origin URL. |
| `imagens/slide-NN.*` | Web story slide backgrounds. |
| `video.mp4`, `video.jpg`, `video.info.json` | Reel video, thumbnail and full yt-dlp metadata. |
| `legenda.txt` | The post caption. |

## Caveats

- The repo is public and served on GitHub Pages, and the media here is third-party copyrighted material (press photos, articles, reels). Decision by Alice, 2026-10-12: media stays out of git. Only `README.md`, `index.json`, `fonte.json`, `captura.json` and `imagens/imagens.json` are tracked (see `.gitignore`). The media lives in the local `materiais/` folder of the main checkout; a fresh clone has metadata only, and the files can be re-captured from the URLs in `fonte.json`.
- Instagram carousels were captured without login; the order of `12` was rebuilt from upload ids and checked visually.
- `05`: the letter images are gone from the live Intercept page and were recovered from the 2021 Wayback Machine copy. The letter reads "Vocês são a razão da existência do meu mandato"; the dossier (A1-02) quotes it as "a razão de ser". Fix the dossier before quoting.
- `01`: catarinas.info sits behind a Cloudflare bot check; slide backgrounds were downloaded directly, the overlaid text is in `texto.txt`.
