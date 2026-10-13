// Shared by the post B video slides: screencast capture, page helpers and ffmpeg compositing.
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

export const PALETTE = { "azul-1": "e9f0fc", "azul-2": "dae5f8", "azul-3": "b4caf0", "azul-4": "93afe2", "azul-5": "7492d3",
  "azul-6": "4863a1", "azul-7": "31498c", tinta: "07122e", brasa: "d45c78" };
export const hex = name => PALETTE[name] || name.replace("#", "");

// Starts a CDP screencast into `dir`; the returned stop() writes an ffmpeg concat list that holds each frame
// for its real duration (the screencast only sends frames when something changes) and returns its path.
export async function screencast(ctx, page, dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const cdp = await ctx.newCDPSession(page);
  const shots = [];
  cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
    const file = `f${String(shots.length).padStart(5, "0")}.jpg`;
    writeFileSync(path.join(dir, file), Buffer.from(data, "base64"));
    shots.push({ file, t: metadata.timestamp });
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, everyNthFrame: 1 });
  return async () => {
    // The screencast is silent while nothing changes, so a closing still would be lost: paint one invisible
    // pixel to get a last frame stamped at the real end.
    await page.evaluate(() => {
      const d = document.createElement("div");
      d.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;opacity:.01;z-index:2147483647;pointer-events:none";
      (document.querySelector("dialog[open]") || document.body).append(d);
    });
    await page.waitForTimeout(250);
    await cdp.send("Page.stopScreencast");
    // Drop the blank frames before the site paints.
    const start = shots.findIndex((s, i) => i > 0 && s.t - shots[0].t > 0.3) - 1;
    const used = shots.slice(Math.max(start, 0));
    const list = `${dir}.txt`;
    writeFileSync(list, used.map((s, i) => {
      const next = used[i + 1];
      return `file '${path.join(dir, s.file)}'\nduration ${next ? (next.t - s.t).toFixed(4) : 0.04}`;
    }).join("\n") + `\nfile '${path.join(dir, used.at(-1).file)}'\n`);
    const span = used.at(-1).t - used[0].t;
    console.log(`${used.length} frames over ${span.toFixed(1)}s (${(used.length / span).toFixed(1)} fps captured)`);
    return list;
  };
}

// The cut, sped up, scaled into the frame's hole at {x, y, w, h}, frame PNG on top; 30 fps H.264 for Instagram.
// Canvas 1080 x 1440 for the feed (3:4), 1080 x 1920 for stories.
export function compose({ list, frame, hole: { x, y, w, h }, from = 0, to = 1e4, speed = 1, bg, file, canvas = { w: 1080, h: 1440 } }) {
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-f", "concat", "-safe", "0", "-i", list,
    "-i", frame,
    "-filter_complex",
    `color=c=0x${bg}:s=${canvas.w}x${canvas.h}:r=30[bg];` +
    `[0:v]trim=start=${from}:end=${to},setpts=(PTS-STARTPTS)/${speed},fps=30,scale=${Math.round(w)}:${Math.round(h)}:flags=lanczos,setsar=1[rec];` +
    `[bg][rec]overlay=${Math.round(x)}:${Math.round(y)}:shortest=1[b];[b][1:v]overlay=0:0,format=yuv420p[v]`,
    "-map", "[v]", "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-movflags", "+faststart",
    file,
  ], { stdio: "inherit" });
  console.log(file);
}

// The strong ease-in-out from the animate skill, cubic-bezier(0.77, 0, 0.175, 1), and the strong ease-out
// cubic-bezier(0.23, 1, 0.32, 1). Solved for x by Newton's method. Serialisable: no closures over module scope.
export function bezier(x1, y1, x2, y2) {
  const b = (t, a, c) => 3 * a * t * (1 - t) ** 2 + 3 * c * t * t * (1 - t) + t ** 3;
  const db = (t, a, c) => 3 * a * (1 - t) ** 2 + 6 * (c - a) * t * (1 - t) + 3 * (1 - c) * t * t;
  return x => { let t = x; for (let i = 0; i < 8; i++) t -= (b(t, x1, x2) - x) / (db(t, x1, x2) || 1e-6); return b(t, y1, y2); };
}

// `--story` anywhere in the arguments: 1080 x 1920 instead of the feed's 1080 x 1440. Returns the remaining args.
export function format(argv) {
  const story = argv.includes("--story");
  return { story, H: story ? 1920 : 1440, suffix: story ? "-story" : "", args: argv.filter(a => a !== "--story") };
}
