// Post B, slide 1: the site inside a browser window on --azul-3, 1080 x 1440 MP4.
// Needs the local site server (`site` in .claude/launch.json, port 8766). Run from social/:
//   node post-b/01-hero.mjs record scroll           capture: hero, scrolls, cursor opens an episode (the approved cut)
//   node post-b/01-hero.mjs record [seconds]        capture only the hero from page load (default 20 s)
//   node post-b/01-hero.mjs [from] [to] [speed] [bg] cut and speed up the capture, then composite on a background
//                                                   (approved: 3.5 60 1 azul-3; bg is a palette name or a hex)
// Add --story to any of these for the 1080 x 1920 stories version (same window, centred in the taller frame).
// The hero's candidate cycle is random, so after a new capture, check the first frame.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { screencast, compose, hex, format } from "./lib.mjs";

const fmt = format(process.argv), argv = fmt.args;
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, "../out/post-b");
const frames = path.join(out, "01-frames");
const list = path.join(out, "01-frames.txt");

// Site viewport (CSS px) and how it sits in the 1080 x 1440 canvas. Content keeps the viewport's ratio.
// 1440 wide because the site's grid is drawn for it (596fr + 796fr + gutters, as in Figma); at 1280 the bar,
// the cover image and the text column stop lining up (Alice, 2026-10-13).
const VIEW = { width: 1440, height: 900 }, SCALE = 1.5;
const W = 984, H = Math.round(W * VIEW.height / VIEW.width), TOP = 84;
const X = (1080 - W) / 2, Y = Math.round((fmt.H - H - TOP) / 2) + TOP;

const bgName = argv[2] === "record" ? "azul-3" : (argv[5] || "azul-3");
const BG = hex(bgName);
const frame = path.join(out, `01-janela-${bgName}${fmt.suffix}.png`);

const browser = await chromium.launch();
mkdirSync(out, { recursive: true });

// Frame overlay: opaque everywhere except the content hole.
{
  const page = await browser.newPage({ viewport: { width: 1080, height: fmt.H } });
  await page.goto(`file://${here}/janela.html?w=${W}&h=${H}&top=${TOP}&bg=${BG}&ch=${fmt.H}`);
  await page.screenshot({ path: frame, omitBackground: true });
  await page.close();
}

// Runs in the page. Stops by name: "painting", "eixo-1".."eixo-5", "footer". On-screen movement, so the strong
// ease-in-out from the animate skill. First try went through everything at 900 ms / 700 ms and felt rushed;
// Alice asked for one or two slow scrolls (2026-10-13): hero -> painting -> cover 01, 1400 ms / 1800 ms.
// Runs in the page. A plain arrow cursor that follows the real mouse, so the episode click can be seen.
// The episode dialog sits in the top layer, so the cursor moves into whichever dialog is open.
function addCursor({ x, y }) {
  const arrow = `<svg width="22" height="30" viewBox="0 0 22 30"><path d="M2 2v22l6-5.5 4 9 3.6-1.6-4-8.8H20z" fill="#000" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  const hand = `<svg width="26" height="30" viewBox="0 0 26 30"><path d="M8.5 2.5c1.1 0 2 .9 2 2v8.3l.9-.2c1-.2 2 .4 2.3 1.3l.3-.1c1-.2 2 .4 2.3 1.4.9-.2 1.9.3 2.2 1.2l.6 1.9c.8 2.6.5 5.4-.8 7.8l-.9 1.6H8.4l-4.6-7.3c-.6-.9-.3-2.1.6-2.7.8-.5 1.8-.4 2.4.3l-.3-.4V4.5c0-1.1.9-2 2-2z" fill="#fff" stroke="#000" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
  const c = document.createElement("div");
  c.innerHTML = arrow;
  Object.assign(c.style, { position: "fixed", left: 0, top: 0, zIndex: 2147483647, pointerEvents: "none",
    transform: `translate(${x - 2}px, ${y - 2}px)` });
  document.body.append(c);
  let shape = "arrow";
  addEventListener("mousemove", e => {
    const want = getComputedStyle(e.target).cursor === "pointer" ? "hand" : "arrow";
    if (want !== shape) { shape = want; c.innerHTML = want === "hand" ? hand : arrow; }
    // The hand's hotspot is its fingertip, the arrow's its tip.
    const [dx, dy] = shape === "hand" ? [8, 2] : [2, 2];
    c.style.transform = `translate(${e.clientX - dx}px, ${e.clientY - dy}px)`;
  }, true);
  new MutationObserver(() => {
    const open = document.querySelector("dialog[open]");
    (open || document.body).append(c);
  }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
}

async function scrollTour({ stops, scroll: SCROLL, dwell: DWELL }) {
  const ease = (() => { // cubic-bezier(0.77, 0, 0.175, 1), solved for x by Newton's method
    const [x1, y1, x2, y2] = [0.77, 0, 0.175, 1];
    const b = (t, a, c) => 3 * a * t * (1 - t) ** 2 + 3 * c * t * t * (1 - t) + t ** 3;
    const db = (t, a, c) => 3 * a * (1 - t) ** 2 + 6 * (c - a) * t * (1 - t) + 3 * (1 - c) * t * t;
    return x => { let t = x; for (let i = 0; i < 8; i++) t -= (b(t, x1, x2) - x) / (db(t, x1, x2) || 1e-6); return b(t, y1, y2); };
  })();
  // Targets measured at the top of the page, before any cover sticks.
  const top = el => el.getBoundingClientRect().top + scrollY;
  const painting = document.querySelector(".mod--gravura");
  const at = name => name === "painting" ? top(painting) - (innerHeight - painting.offsetHeight) / 2
    : name === "footer" ? document.documentElement.scrollHeight - innerHeight
    : top(document.getElementById(name));
  const targets = stops.map(at);
  const wait = ms => new Promise(r => setTimeout(r, ms));
  for (const to of targets) {
    const from = scrollY, t0 = performance.now();
    await new Promise(done => {
      const step = now => {
        const p = Math.min((now - t0) / SCROLL, 1);
        scrollTo(0, from + (to - from) * ease(p));
        p < 1 ? requestAnimationFrame(step) : done();
      };
      requestAnimationFrame(step);
    });
    await wait(DWELL);
  }
}

// Moves the real mouse along the same strong ease-in-out, one step per frame.
async function glide(page, a, b, ms) {
  const e = t => t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2; // cubic in-out, close to the scroll curve
  const n = Math.round(ms / 16);
  for (let i = 1; i <= n; i++) {
    const p = e(i / n);
    await page.mouse.move(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p);
    await page.waitForTimeout(16);
  }
}

if (argv[2] === "record") {
  const seconds = +(argv[3] || 20);
  // Screencast from page load. Clarity is blocked so recordings never reach the analytics.
  const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: SCALE });
  const page = await ctx.newPage();
  await page.route(/clarity\.ms/, r => r.abort());
  await page.goto("about:blank");
  const stop = await screencast(ctx, page, frames);
  await page.goto("http://localhost:8766/", { waitUntil: "load" });
  if (argv[3] === "scroll") {
    // Hero, slow scrolls to the painting and covers 01 and 02, then the cursor opens an episode (Alice, 2026-10-13).
    const rest = { x: 1290, y: 760 };
    await page.mouse.move(rest.x, rest.y);
    await page.evaluate(addCursor, rest);
    await page.waitForTimeout(6000);
    await page.evaluate(scrollTour, { stops: ["painting", "eixo-1", "eixo-2"], scroll: 1400, dwell: 1200 });
    const row = await page.locator('[data-ep="2-planalto"]').boundingBox();
    const on = { x: row.x + 260, y: row.y + row.height / 2 };
    await glide(page, rest, on, 900);
    await page.waitForTimeout(450);
    await page.mouse.down(); await page.waitForTimeout(90); await page.mouse.up();
    await page.waitForTimeout(700);
    await glide(page, on, { x: 360, y: 700 }, 700); // to the modal's empty left column, out of the text's way
    await page.waitForTimeout(5500);
  } else {
    await page.waitForTimeout(seconds * 1000);
  }
  await stop();
}
await browser.close();

// Composite: the cut, sped up, scaled into the hole, frame on top.
const [from, to, speed] = argv[2] === "record" ? [0, 1e4, 1] : [3.5, 60, 1].map((d, i) => +(argv[2 + i] ?? d));
compose({ list, frame, hole: { x: X, y: Y, w: W, h: H }, from, to, speed, bg: BG, canvas: { w: 1080, h: fmt.H },
  file: path.join(out, `01-hero-${bgName}${fmt.suffix}.mp4`) });
