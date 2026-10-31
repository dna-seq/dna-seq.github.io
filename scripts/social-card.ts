/**
 * Render public/img/social-card.png, the 1200x630 preview link unfurlers show, from the site's own
 * stylesheet and fonts. Needs a fresh `bun run build` and a local Chrome (CHROME=/path/to/chrome to
 * pick another); the PNG is committed, so CI never runs this.
 */
import { Glob } from "bun";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const dist = join(root, "dist");
const chrome = process.env.CHROME ?? "google-chrome";

const css = [...new Glob("assets/site-*.css").scanSync(dist)][0];
if (!css) throw new Error("no built stylesheet in dist/; run `bun run build` first");

const html = `<!doctype html>
<html lang="en" data-theme="dark"><head><meta charset="utf-8">
<link rel="stylesheet" href="/${css}">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  .card { position: relative; width: 1200px; height: 630px; background: #08161d; color: #eaf3f2; overflow: hidden; }
  .card .hero-glow { position: absolute; inset: 0; }
  .card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: var(--spectrum); }
  .sc-helix { position: absolute; right: 40px; top: -30px; width: 400px; filter: drop-shadow(0 0 50px rgb(31 180 196 / .3)); }
  .sc-text { position: absolute; left: 72px; top: 64px; width: 720px; }
  .sc-brand { display: flex; align-items: center; gap: 16px; font-family: var(--font-sans); font-weight: 750; font-size: 34px; color: #fff; }
  .sc-brand img { width: 56px; height: 56px; border-radius: 50%; }
  .sc-brand span { color: #3fc9b5; }
  .sc-text h1 { font-family: var(--font-serif); font-weight: 600; font-size: 58px; line-height: 1.08; color: #fff; margin: 48px 0 26px; letter-spacing: -0.01em; }
  .sc-text p { font-family: var(--font-sans); font-size: 26px; line-height: 1.45; color: #a4b9bc; margin: 0; }
  .sc-url { position: absolute; left: 72px; bottom: 50px; font-family: var(--font-mono); font-weight: 600; font-size: 24px; color: #7fd9cb; }
</style></head>
<body><div class="card">
  <div class="hero-glow"></div>
  <img class="sc-helix" src="/img/helix.webp" alt="">
  <div class="sc-text">
    <div class="sc-brand"><img src="/img/logo-96.png" alt=""><b>Just<span>-</span>DNA</b></div>
    <h1>Read your genome against published evidence, on your own computer.</h1>
    <p>Just-DNA-Lite, an open module catalog, just-module-creator for Claude Code and Codex, and polygenic scores with just-prs.</p>
  </div>
  <div class="sc-url">just-dna.life</div>
</div></body></html>`;

const page = join(dist, "_social-card.html");
await Bun.write(page, html);
const server = Bun.serve({
  port: 0,
  async fetch(request) {
    const file = Bun.file(join(dist, decodeURIComponent(new URL(request.url).pathname)));
    return (await file.exists()) ? new Response(file) : new Response("not found", { status: 404 });
  },
});
const target = join(root, "public", "img", "social-card.png");
const proc = Bun.spawn(
  [chrome, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1200,630", "--virtual-time-budget=3000", `--screenshot=${target}`, `http://localhost:${server.port}/_social-card.html`],
  { stdout: "ignore", stderr: "ignore" },
);
const code = await proc.exited;
server.stop();
await Bun.file(page).delete();
if (code !== 0) throw new Error(`${chrome} exited with ${code}`);
console.log(`wrote ${target}`);
