/**
 * Local preview: build, serve dist/, and rebuild in a fresh process whenever src/ or public/ changes
 * (a fresh process, so edited page modules are re-imported rather than served from Bun's cache).
 * Reload the browser after "rebuilt".
 */
import { watch } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const dist = join(root, "dist");
const port = Number(process.env.PORT ?? 4321);

async function rebuild(): Promise<void> {
  const proc = Bun.spawn(["bun", join(root, "scripts/build.ts")], { stdout: "inherit", stderr: "inherit" });
  const code = await proc.exited;
  console.log(code === 0 ? "rebuilt" : `build failed (exit ${code}); still serving the last good build`);
}

await rebuild();

let timer: ReturnType<typeof setTimeout> | undefined;
for (const dir of ["src", "public"]) {
  watch(join(root, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 150);
  });
}

Bun.serve({
  port,
  async fetch(request) {
    const path = decodeURIComponent(new URL(request.url).pathname);
    const candidates = path.endsWith("/") ? [join(dist, path, "index.html")] : [join(dist, path), join(dist, path, "index.html")];
    for (const candidate of candidates) {
      if (!candidate.startsWith(dist)) break;
      const file = Bun.file(candidate);
      if (await file.exists()) return new Response(file);
    }
    return new Response(Bun.file(join(dist, "404.html")), { status: 404, headers: { "content-type": "text/html" } });
  },
});
console.log(`serving http://localhost:${port}`);
