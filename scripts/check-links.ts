/**
 * Check dist/ for broken internal references: every href/src that points into the site must name a
 * file that exists, and every fragment must name an id on the page it points at. External links are
 * not fetched here (CI should not fail because a third-party site is down).
 */
import { Glob } from "bun";
import { dirname, join, relative } from "node:path";

const dist = join(import.meta.dir, "..", "dist");
const glob = new Glob("**/*.html");
const files = [...glob.scanSync(dist)];

const idsByFile = new Map<string, Set<string>>();
const htmlByFile = new Map<string, string>();
for (const file of files) {
  const html = await Bun.file(join(dist, file)).text();
  htmlByFile.set(file, html);
  idsByFile.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1] ?? "")));
}

function resolveTarget(fromFile: string, url: string): string | null {
  const path = url.startsWith("/") ? url.slice(1) : join(dirname(fromFile), url);
  if (path === "" || path.endsWith("/")) return join(path, "index.html");
  return path;
}

/** Pages copied verbatim from the first-generation site are checked only for what links into them. */
const legacy = ["example/", "dna-stories/", "dna-seq_stories/"];

const problems: string[] = [];
for (const [file, html] of htmlByFile) {
  if (legacy.some((prefix) => file.startsWith(prefix))) continue;
  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = match[1] ?? "";
    if (/^(https?:|mailto:|data:)/.test(url) || url.startsWith("//")) continue;
    const [pathPart = "", fragment] = url.split("#");
    const target = pathPart === "" ? file : resolveTarget(file, pathPart);
    if (target === null) continue;
    const exists = await Bun.file(join(dist, target)).exists();
    if (!exists) {
      problems.push(`${file}: ${url} -> missing ${target}`);
      continue;
    }
    if (fragment && target.endsWith(".html") && !idsByFile.get(relative(dist, join(dist, target)))?.has(fragment)) {
      problems.push(`${file}: ${url} -> no id "${fragment}" in ${target}`);
    }
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(`${problems.length} broken internal reference(s)`);
  process.exit(1);
}
console.log(`links ok: ${files.length} pages checked`);
