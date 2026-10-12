// "O que alguns judeus estão pensando": carousel of posts, videos and testimonies, mounted before the site footer.
// Wireframe placeholders only: nothing here stands for a real person or a real statement.
// Real items must be `verified` in research/ (see research/README.md) before they replace these.
const THOUGHTS = [
  { type: "depoimento", title: "Depoimento", meta: "Nome, cidade · idade", more: "Pergunta ou frase de contexto do depoimento.", quote: "Frase curta do depoimento, em destaque, até duas ou três linhas." },
  { type: "vídeo", title: "Título do vídeo", meta: "Nome, cidade · 1:30", more: "Pergunta que o vídeo responde." },
  { type: "post", title: "Post", meta: "@perfil · rede · data", more: "Contexto: o que motivou o post." },
  { type: "depoimento", title: "Depoimento", meta: "Nome, cidade · idade", more: "Pergunta ou frase de contexto do depoimento.", quote: "Frase curta do depoimento, em destaque, até duas ou três linhas." },
  { type: "vídeo", title: "Título do vídeo", meta: "Nome, cidade · 0:45", more: "Pergunta que o vídeo responde." },
  { type: "post", title: "Post", meta: "@perfil · rede · data", more: "Contexto: o que motivou o post." },
  { type: "depoimento", title: "Depoimento", meta: "Nome, cidade · idade", more: "Pergunta ou frase de contexto do depoimento.", quote: "Frase curta do depoimento, em destaque, até duas ou três linhas." }
];

function mountThoughts() {
  const thumb = t => {
    if (t.type === "depoimento") return el("div", { class: "thumb" }, el("p", { class: "quote" }, "«" + t.quote + "»"));
    if (t.type === "vídeo") return el("div", { class: "thumb" }, el("div", { class: "ph" }, el("span", {}, "Vídeo")), el("span", { class: "play", "aria-hidden": "true" }));
    return el("div", { class: "thumb" }, el("div", { class: "post", "aria-hidden": "true" },
      el("div", { class: "who" }, el("span", { class: "av" }), el("span", { class: "ln", style: "width:40%" })),
      el("span", { class: "ln" }), el("span", { class: "ln" }), el("span", { class: "ln", style: "width:70%" })));
  };
  const cards = THOUGHTS.map(t =>
    el("a", { class: "card", href: "#", onclick: e => e.preventDefault() },
      thumb(t),
      el("div", {}, el("span", { class: "mono" }, t.type), el("h3", {}, t.title), el("span", { class: "meta" }, t.meta)),
      el("p", { class: "more" }, t.more)));

  const prev = el("button", { type: "button", "aria-label": "Anterior" }, "←");
  const next = el("button", { type: "button", "aria-label": "Próximo" }, "→");
  const track = el("div", { class: "track", role: "group", "aria-label": "Posts, vídeos e depoimentos" }, cards);
  const section = el("section", { class: "thoughts", "aria-labelledby": "thoughts-h" },
    el("div", { class: "head" },
      el("div", {}, el("span", { class: "mono" }, "Vozes"), el("h2", { id: "thoughts-h" }, "O que alguns judeus estão pensando")),
      el("div", { class: "arrows" }, prev, next)),
    track);

  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const step = () => (cards[0].getBoundingClientRect().width + 16);
  const go = dir => track.scrollBy({ left: dir * step(), behavior: reduce.matches ? "auto" : "smooth" });
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  const sync = () => {
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  };
  track.addEventListener("scroll", sync, { passive: true });
  addEventListener("resize", sync);
  document.querySelector("footer.site").before(section);
  sync();
}
