/**
 * Render public/img/social-card.png, the 1200x630 preview link unfurlers show, from the site's own
 * stylesheet, fonts and the home page's genome line and report label. Needs a fresh `bun run build`
 * and a local Chrome (CHROME=/path/to/chrome to pick another); the PNG is committed, so CI never
 * runs this.
 */
import { Glob } from "bun";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const dist = join(root, "dist");
const chrome = process.env.CHROME ?? "google-chrome";

const css = [...new Glob("assets/site-*.css").scanSync(dist)][0];
if (!css) throw new Error("no built stylesheet in dist/; run `bun run build` first");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="/${css}">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  .sc { position: relative; display: grid; grid-template-columns: 1fr 470px; gap: 56px; align-items: center; width: 1200px; height: 630px; padding: 0 72px; box-sizing: border-box; background: var(--color-paper); background-image: var(--grain); }
  .sc::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: var(--color-accent); }
  .sc-brand { display: flex; align-items: center; gap: 14px; font-family: var(--font-display); font-weight: 700; font-size: 34px; color: var(--color-ink); }
  .sc-brand img { width: 52px; height: 52px; border-radius: 50%; }
  .sc-text h1 { margin: 40px 0 22px; font-size: 64px; line-height: 1.02; }
  .sc-text p { margin: 0; font-size: 26px; line-height: 1.4; color: var(--color-ink-2); }
  .sc-url { margin-top: 40px; font-family: var(--font-outlier); font-size: 24px; color: var(--color-accent-deep); }
  .sc-art { display: grid; justify-items: center; gap: 18px; }
  .sc-art .label { width: 100%; }
  .sc-arrow { color: var(--color-accent); }
</style></head>
<body><div class="sc">
  <div class="sc-text">
    <div class="sc-brand"><img src="/img/logo-96.png" alt=""><span>Just-DNA</span></div>
    <h1>Your genome, read on your own computer.</h1>
    <p>See what published studies say about your DNA, without uploading it.</p>
    <div class="sc-url">just-dna.life</div>
  </div>
  <div class="sc-art">
    <figure class="vcf"><figcaption>One line of your genome file</figcaption>
      <code><span>chr6</span> <span>108587315</span> <span>G</span> <span>T</span> <span>0/1</span></code></figure>
    <svg class="sc-arrow" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>
    <figure class="label">
      <div class="label-main">
        <div class="label-head"><span>Longevity Map</span><span>rs2802292</span></div>
        <p class="label-gene">FOXO3</p>
        <p class="label-row">Your genotype <b>G/T</b></p>
      </div>
      <div class="label-stub"><span class="stamp">Protective<br>4 studies</span><span>Anton Kulaga’s public genome</span></div>
    </figure>
  </div>
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
