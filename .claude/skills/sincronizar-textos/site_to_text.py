"""Render the copy of site/index.html as plain Markdown, in the same shape as the two team docs.

Usage: python3 -I site_to_text.py site/index.html [capas|episodios|tudo]

- capas: opening line, opening text and, per cover, name, line, text and episode rows ("Textos").
- episodios: every episode modal: title, label, date, place, paragraphs, quotes, sources ("Textos internos dos episódios").
Compare the output with the doc read through Drive to find what changed.
"""
import html
import re
import sys


def clean(t):
    t = re.sub(r'\s*<span aria-hidden="true">.*?</span>', '', t, flags=re.S)
    t = re.sub(r'<[^>]+>', '', t)
    return html.unescape(re.sub(r'\s+', ' ', t)).strip()


def capas(s):
    out = ['# Textos (site)', '']
    cruz = re.search(r'<section class="mod mod--inflexao".*?<p class="linha">(.*?)</p>', s, re.S)
    if cruz:
        out += [f'Ponto de inflexão: {clean(cruz.group(1))}', '']
    ab = re.search(r'<section class="mod mod--cruz">(.*?)</section>', s, re.S)
    if ab:
        out += ['## Abertura', '']
        out += [clean(p) for p in re.findall(r'<p class="(?:linha|corpo)">(.*?)</p>', ab.group(1), re.S)]
        out.append('')
    for m in re.finditer(r'<article class="capa" id="eixo-(\d)".*?</article>', s, re.S):
        a = m.group(0)
        nome = ' '.join(clean(x) for x in re.findall(r'<span class="line"><span>(.*?)</span></span>', a))
        out += [f'## {nome}', '']
        out += [clean(p) for p in re.findall(r'<p class="(?:linha|corpo)">(.*?)</p>', a, re.S)]
        out += ['', 'Episódios:']
        for d, t in re.findall(r'<span class="ep__data mono">(.*?)</span><span class="ep__titulo">(.*?)</span>', a):
            out.append(f'- {clean(d)} | {clean(t)}')
        out.append('')
    return out


def episodios(s):
    out = ['# Textos internos dos episódios (site)', '']
    for m in re.finditer(r'<template id="ep-([^"]+)">(.*?)</template>', s, re.S):
        tid, b = m.groups()
        g = lambda pat: (re.search(pat, b, re.S) or [None, ''])[1]
        out += [f'### {clean(g(r"<h2[^>]*>(.*?)</h2>"))}  [ep-{tid}]',
                f'*{clean(g(r"ep__eixo\">(.*?)</p>"))} · {clean(g(r"depo__autor\">(.*?)</p>"))} · {clean(g(r"depo__meta\">(.*?)</p>"))}*']
        texto = b.split('depo__texto">', 1)[1].split('<div class="ep__fontes">', 1)[0]
        for e in re.finditer(r'<p class="corpo">(.*?)</p>|<blockquote class="ep__citacao"><p>(.*?)</p><footer class="mono">(.*?)</footer></blockquote>', texto, re.S):
            out.append(clean(e.group(1)) if e.group(1) is not None else f'> {clean(e.group(2))} — {clean(e.group(3))}')
        out.append('Fontes:')
        for u, t in re.findall(r'<a href="([^"]+)"[^>]*>(.*?)</a>', b.split('ep__fontes', 1)[1], re.S):
            out.append(f'- [{clean(t)}]({u})')
        out.append('')
    return out


if __name__ == '__main__':
    s = open(sys.argv[1], encoding='utf-8').read()
    modo = sys.argv[2] if len(sys.argv) > 2 else 'tudo'
    linhas = (capas(s) if modo in ('capas', 'tudo') else []) + (episodios(s) if modo in ('episodios', 'tudo') else [])
    print('\n'.join(linhas))
