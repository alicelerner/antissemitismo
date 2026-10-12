(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal: add .is-in once a block is a third into view. CSS owns the motion.
  const seen = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      seen.unobserve(e.target);
    }
  }, { threshold: 0.33 });
  document.querySelectorAll("[data-reveal]").forEach((el) => seen.observe(el));

  // Count-up, once. Tabular numerals keep the width still. Source sits under the number from the start.
  const fmt = (v, d) => v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
  function countUp(el) {
    const to = parseFloat(el.dataset.count);
    const d = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = fmt(to, d) + suffix; return; }
    const dur = 1200;
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 4);
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      el.textContent = fmt(to * ease(t), d) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Menu: native <dialog> for focus trap and Esc.
  const menu = document.getElementById("menu");
  const open = document.querySelector(".bar__menu");
  open.addEventListener("click", () => menu.showModal());
  menu.querySelector(".menu__close").addEventListener("click", () => menu.close());
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.close()));
  // The page stays visible beside the panel; a click on it closes the menu.
  menu.addEventListener("click", (e) => {
    const r = menu.getBoundingClientRect();
    if (e.clientX > r.right || e.clientY > r.bottom) menu.close();
  });

  // Vozes carousel: arrows step one card; native scroll and snap do the rest. Ends disable their arrow.
  const trilho = document.querySelector(".vozes__trilho");
  if (trilho) {
    const setas = document.querySelectorAll(".vozes__seta");
    const step = () => trilho.querySelector(".voz").offsetWidth + 16;
    setas.forEach((b) => b.addEventListener("click", () =>
      trilho.scrollBy({ left: +b.dataset.dir * step(), behavior: reduce ? "auto" : "smooth" })));
    const sync = () => {
      setas[0].disabled = trilho.scrollLeft <= 1;
      setas[1].disabled = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 1;
    };
    trilho.addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    sync();
  }

  // Testimony modal: native <dialog>, full screen, filled from the card's <template>.
  const depo = document.getElementById("depo");
  if (depo) {
    const corpo = depo.querySelector(".depo__corpo");
    document.querySelectorAll("[data-depo]").forEach((b) => b.addEventListener("click", () => {
      corpo.replaceChildren(document.getElementById("depo-" + b.dataset.depo).content.cloneNode(true));
      corpo.scrollTop = 0;
      depo.showModal();
    }));
    depo.querySelector(".depo__fechar").addEventListener("click", () => depo.close());
  }

  // CTAs point to axis pages that do not exist yet.
  document.querySelectorAll('[aria-disabled="true"]').forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));
})();
