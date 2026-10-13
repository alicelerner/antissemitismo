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

  // Bar names the axis being read (proposal): the highest cover crossing the middle of the screen, "Eixos" elsewhere.
  const atual = document.querySelector(".bar__atual");
  const lendo = new Set();
  const nomeia = () => {
    const capa = [...lendo].sort((a, b) => b.dataset.n - a.dataset.n)[0];
    const html = capa
      ? `<span class="mono">${capa.dataset.n.padStart(2, "0")}</span>${capa.querySelector(".capa__name .line:last-child").textContent}`
      : "Eixos";
    if (atual.innerHTML === html) return;
    atual.innerHTML = html;
    if (!reduce) atual.animate({ opacity: [0, 1] }, { duration: 200, easing: "cubic-bezier(0.23, 1, 0.32, 1)" });
  };
  const meio = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? lendo.add(e.target) : lendo.delete(e.target);
    nomeia();
  }, { rootMargin: "-50% 0px -50% 0px" });
  document.querySelectorAll(".capa").forEach((c) => meio.observe(c));

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

  // Hero band (proposal "revelação"). The slat wave is CSS; here each slat takes the next photo when it starts a new
  // wave (opacity 0 at that moment), so every wave reveals a new photo. The candidates open and close from a random
  // edge with clip-path, as in round 4. Lula is never on screen without Flávio; Flávio may be alone.
  const band = document.querySelector(".hero__band");
  if (band && !reduce) {
    const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
    const OPEN = "inset(0 0% 0 0%)";
    const CLOSED = ["inset(0 100% 0 0)", "inset(0 0 0 100%)", "inset(100% 0 0 0)", "inset(0 0 100% 0)"];
    // Kristallnacht and Białystok. Białystok is a scan with a white border, so it is enlarged to hide it.
    const FOTOS = [
      { src: "img/hero/cristais1.jpg", pos: "50% 40%" },
      { src: "img/hero/bialystok.jpg", pos: "50% 45%", scale: 1.12 },
      { src: "img/hero/cristais2.jpeg", pos: "50% 55%" },
      { src: "img/hero/cristais3.webp", pos: "50% 50%" },
    ];
    FOTOS.forEach((f) => { new Image().src = f.src; }); // warm the cache so a swap never shows an empty slat
    band.querySelectorAll(".hero__slat").forEach((slat) => {
      const img = slat.querySelector("img");
      let n = 0;
      slat.addEventListener("animationiteration", () => {
        const f = FOTOS[++n % FOTOS.length];
        img.src = f.src;
        img.style.objectPosition = f.pos;
        img.style.transform = f.scale ? `scale(${f.scale})` : "";
      });
    });
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
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const clip = (el, from, to, duration) => {
      const a = el.animate([{ clipPath: from }, { clipPath: to }], { duration, easing: EASE_OUT, fill: "forwards" });
      if (!visible) a.pause();
      return a.finished.then(() => { a.commitStyles(); a.cancel(); });
    };
    const open = (fig) => clip(fig, pick(CLOSED), OPEN, 1400);
    const close = (fig) => clip(fig, OPEN, pick(CLOSED), 1100);

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
