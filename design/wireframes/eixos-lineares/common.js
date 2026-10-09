// Shared helpers for the Eixos lineares wireframe: element builder, nav bar and full-screen menu.
// Content comes from window.CHAPTERS (data.js), generated from research/00-narrative.md and the axis files.

function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false || c === "") continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
}

function chapterUrl(id) { return "eixo-" + chapterNum(window.CHAPTERS.findIndex(c => c.id === id)) + ".html"; }
function chapterNum(i) { return String(i + 1).padStart(2, "0"); }

function mountChrome(current) {
  const chapters = window.CHAPTERS;

  const bar = el("div", { class: "wf-bar" },
    el("span", {}, "Wireframe · Opção 1 · Eixos lineares"),
    el("a", { href: "../index.html" }, "Todas as opções")
  );

  const sheet = el("div", { class: "sheet", hidden: true, role: "dialog", "aria-modal": "true", "aria-label": "Menu" });
  const close = () => { sheet.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); menuBtn.focus(); };
  const rows = chapters.map((c, i) =>
    el("a", { class: "row", href: chapterUrl(c.id), "aria-current": current === c.id ? "page" : null,
              onclick: close },
      el("sup", {}, chapterNum(i)), c.title)
  );
  sheet.append(
    el("div", { class: "sheet-top" },
      el("a", { class: "logo", href: "index.html" }, "LOGO"),
      el("button", { type: "button", onclick: close }, "Fechar ×")),
    el("nav", { "aria-label": "Eixos" },
      rows
    )
  );
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !sheet.hidden) close(); });

  const menuBtn = el("button", { type: "button", "aria-expanded": "false",
    onclick: () => { sheet.hidden = false; menuBtn.setAttribute("aria-expanded", "true"); sheet.querySelector("button").focus(); } },
    el("span", {}, "Eixos"), el("span", { "aria-hidden": "true" }, "+"));

  const nav = el("header", { class: "nav" },
    el("a", { class: "logo", href: "index.html" }, "LOGO"),
    el("div", { class: "spacer" }),
    menuBtn
  );

  document.body.prepend(bar, nav, sheet);
}

// Axis cover shared by the overview slides and the top of each axis page.
// opts.rows caps the "Neste eixo" list; opts.cta adds the black bar linking to the axis page.
function buildCover(c, i, opts = {}) {
  const rows = opts.rows ? c.toc.slice(0, opts.rows) : c.toc;
  return [
    el("div", { class: "line" }),
    el(opts.titleTag || "h2", { class: "name" }, el("span", {}, chapterNum(i)), c.label),
    el("div", { class: "head" },
      el("h2", {}, c.title),
      el("p", {}, c.summary)),
    el("div", { class: "ph img" }, el("span", {}, "Imagem do eixo")),
    el("div", { class: "list" },
      el("div", { class: "mono" }, "Neste eixo:"),
      el("ul", {}, rows.map(t => el("li", {}, t))),
      opts.cta ? el("a", { class: "cta", href: chapterUrl(c.id) }, "Ler o eixo " + c.label, el("span", { "aria-hidden": "true" }, "→")) : null)
  ];
}
