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

  // CTAs point to axis pages that do not exist yet.
  document.querySelectorAll('[aria-disabled="true"]').forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));
})();
