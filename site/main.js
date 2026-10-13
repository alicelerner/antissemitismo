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

  // Cover heights for the sticky stack (style.css, .capa). Kept current as fonts, images and width change.
  const altura = new ResizeObserver((entries) => {
    for (const e of entries) e.target.style.setProperty("--h", e.target.offsetHeight + "px");
  });
  document.querySelectorAll(".capa").forEach((c) => altura.observe(c));

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

  // Testimony and episode modal: native <dialog>, full screen, filled from a <template>.
  // It grows out of the card's dark thumbnail (or the episode row) and shrinks back into it.
  const depo = document.getElementById("depo");
  if (depo) {
    const corpo = depo.querySelector(".depo__corpo");
    const easeInOut = "cubic-bezier(0.77, 0, 0.175, 1)";
    const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";
    let origem = null, fechando = false;

    // clip-path inset() that matches an element's box on screen
    const recorte = (el) => {
      const r = el.getBoundingClientRect();
      return `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px)`;
    };
    const partes = () => [depo.querySelector(".depo__lado"), depo.querySelector(".depo__titulo"), ...depo.querySelectorAll(".depo__texto > :not(.depo__titulo)")];

    function abrir(botao, id) {
      origem = botao.querySelector(".voz__thumb") || botao;
      corpo.replaceChildren(document.getElementById(id).content.cloneNode(true));
      corpo.scrollTop = 0;
      depo.showModal();
      if (reduce) { depo.animate({ opacity: [0, 1] }, { duration: 200, easing: "ease" }); return; }
      depo.animate({ clipPath: [recorte(origem), "inset(0px 0px 0px 0px)"] }, { duration: 650, easing: easeInOut });
      partes().forEach((el, i) => el.animate(
        { opacity: [0, 1], transform: ["translateY(16px)", "translateY(0)"] },
        { duration: 600, delay: 320 + Math.min(i, 3) * 60, easing: easeOut, fill: "backwards" }));
      depo.querySelector(".depo__fechar").animate({ opacity: [0, 1] }, { duration: 300, delay: 450, easing: "ease", fill: "backwards" });
    }

    async function fechar() {
      if (fechando) return;
      fechando = true;
      depo.getAnimations({ subtree: true }).forEach((a) => a.finish());
      const fim = reduce || !origem
        ? depo.animate({ opacity: [1, 0] }, { duration: 200, easing: "ease" })
        : (corpo.animate({ opacity: [1, 0] }, { duration: 160, easing: "ease", fill: "forwards" }),
           depo.animate({ clipPath: ["inset(0px 0px 0px 0px)", recorte(origem)] }, { duration: 420, easing: easeInOut, fill: "forwards" }));
      await fim.finished.catch(() => {});
      depo.close();
      depo.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      fechando = false;
    }

    document.querySelectorAll("[data-depo]").forEach((b) => b.addEventListener("click", () => abrir(b, "depo-" + b.dataset.depo)));
    document.querySelectorAll("[data-ep]").forEach((b) => b.addEventListener("click", () => abrir(b, "ep-" + b.dataset.ep)));
    depo.querySelector(".depo__fechar").addEventListener("click", fechar);
    depo.addEventListener("cancel", (e) => { e.preventDefault(); fechar(); }); // Esc
  }

  // Hero band (proposal "revelação"): the slat wave is CSS. Here, the two candidates develop like prints:
  // paper and name appear, the portrait emerges over the paper; closing reverses it.
  // Lula is never on screen without Flávio; Flávio may be alone.
  const band = document.querySelector(".hero__band");
  if (band && !reduce) {
    const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
    const SINE = "cubic-bezier(0.37, 0, 0.63, 1)";
    let clock = 0, last = performance.now(), visible = true;
    const waiters = [];

    // One clock that stops while the band is off screen, so waits and animations pause together
    const tick = (now) => {
      if (visible) clock += now - last;
      last = now;
      for (let i = waiters.length - 1; i >= 0; i--) if (clock >= waiters[i].at) waiters.splice(i, 1)[0].resolve();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      band.getAnimations({ subtree: true }).forEach((a) => (visible ? a.play() : a.pause()));
    }).observe(band);

    const wait = (ms) => new Promise((resolve) => waiters.push({ at: clock + ms, resolve }));
    const rand = (a, b) => a + Math.random() * (b - a);
    const fade = (el, to, duration, easing) => {
      const a = el.animate({ opacity: [getComputedStyle(el).opacity, to] }, { duration, easing, fill: "forwards" });
      if (!visible) a.pause();
      return a.finished.then(() => { a.commitStyles(); a.cancel(); });
    };
    const parts = (fig) => [fig.querySelector(".hero__papel"), fig.querySelector(".hero__nome"), fig.querySelector("img")];
    const open = async (fig) => {
      const [papel, nome, img] = parts(fig);
      fade(nome, 1, 500, EASE_OUT);
      await fade(papel, 1, 500, EASE_OUT);
      await fade(img, 1, 2200, SINE);
    };
    const close = async (fig) => {
      const [papel, nome, img] = parts(fig);
      await fade(img, 0, 1400, SINE);
      fade(nome, 0, 400, EASE_OUT);
      await fade(papel, 0, 400, EASE_OUT);
    };

    const candidates = async (lula, flavio) => {
      await wait(400);
      for (;;) {
        const flavioOpen = open(flavio);
        await wait(rand(300, 600));
        await open(lula); await flavioOpen;
        await wait(rand(14000, 18000));
        await close(lula);
        await wait(rand(300, 700));
        await close(flavio);
        await wait(rand(1200, 2000));
      }
    };
    candidates(band.querySelector('[data-who="lula"]'), band.querySelector('[data-who="flavio"]'));
  }

  // CTAs point to axis pages that do not exist yet.
  document.querySelectorAll('[aria-disabled="true"]').forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));
})();
