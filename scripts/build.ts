/**
 * Build the static site into dist/: copy public/, copy the self-hosted fonts, bundle the stylesheet
 * and the client script with content-hashed names, and render every page to HTML. Nothing runs in
 * the browser but the small client script; the pages are plain HTML.
 */
import { cp, mkdir, rename, rm } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import type { Assets } from "../src/components/Layout.tsx";
import { pages } from "../src/pages/index.ts";

const root = join(import.meta.dir, "..");
const dist = join(root, "dist");
/** Built beside dist/ and swapped in at the end, so the dev server never serves a half-built tree. */
const out = join(root, "dist.next");

/** Fontsource stylesheets whose faces the site uses; only the subsets below are shipped. */
const FONT_STYLESHEETS = [
  "@fontsource-variable/inter/index.css",
  "@fontsource-variable/source-serif-4/opsz.css",
  "@fontsource-variable/jetbrains-mono/index.css",
];
/** Greek is in: module titles use ε (APOE ε2, ε3, ε4). */
const FONT_SUBSET = /-(latin|latin-ext|greek)-(wght|opsz)-normal$/;

/**
 * Bun's CSS bundler inlines url() fonts as base64 (a 1 MB stylesheet), so the fonts are copied as
 * files instead and their @font-face rules rewritten to point at /fonts/.
 */
async function fonts(): Promise<string> {
  await mkdir(join(out, "fonts"), { recursive: true });
  const rules: string[] = [];
  for (const spec of FONT_STYLESHEETS) {
    const cssPath = Bun.resolveSync(spec, root);
    const css = await Bun.file(cssPath).text();
    for (const [, name = "", rule = ""] of css.matchAll(/\/\* ([\w-]+) \*\/\s*(@font-face\s*\{[^}]*\})/g)) {
      if (!FONT_SUBSET.test(name)) continue;
      const file = rule.match(/url\(\.\/files\/([^)]+)\)/)?.[1];
      if (!file) throw new Error(`no font file in ${spec} rule ${name}`);
      await cp(join(dirname(cssPath), "files", file), join(out, "fonts", file));
      rules.push(rule.replace(`./files/${file}`, `/fonts/${file}`).replace(/\s+/g, " "));
    }
  }
  if (rules.length === 0) throw new Error("no font faces matched; did fontsource rename its files?");
  return rules.join("\n");
}

async function bundle(fontFaces: string): Promise<Assets> {
  const js = await Bun.build({
    entrypoints: [join(root, "src/client/main.ts")],
    outdir: join(out, "assets"),
    naming: "[name]-[hash].[ext]",
    minify: true,
    target: "browser",
  });
  const css = await Bun.build({ entrypoints: [join(root, "src/styles/site.css")], minify: true });
  for (const result of [js, css]) {
    if (!result.success) {
      for (const log of result.logs) console.error(log);
      throw new Error("bundling failed");
    }
  }
  const jsOut = js.outputs.find((o) => o.kind === "entry-point");
  const cssOut = css.outputs[0];
  if (!jsOut || !cssOut) throw new Error("the bundle is missing its script or stylesheet");

  const stylesheet = `${fontFaces}\n${await cssOut.text()}`;
  const cssName = `assets/site-${Bun.hash(stylesheet).toString(36)}.css`;
  await Bun.write(join(out, cssName), stylesheet);
  return { css: `/${cssName}`, js: `/${relative(out, jsOut.path)}` };
}

export async function build(): Promise<void> {
  const started = performance.now();
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  await cp(join(root, "public"), out, { recursive: true });
  const assets = await bundle(await fonts());
  for (const page of pages) {
    const target = join(out, page.file);
    await mkdir(dirname(target), { recursive: true });
    await Bun.write(target, `<!doctype html>${renderToStaticMarkup(page.render(assets))}`);
  }
  await rm(dist, { recursive: true, force: true });
  await rename(out, dist);
  const ms = Math.round(performance.now() - started);
  console.log(`built ${pages.length} pages and assets in ${ms} ms -> ${dist}`);
}

if (import.meta.main) await build();
