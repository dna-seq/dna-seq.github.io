# just-dna.life

The website of the Just-DNA ecosystem: [Just-DNA-Lite](https://github.com/dna-seq/just-dna-lite), the
[module catalog](https://module-registry.just-dna.life/ui/),
[just-module-creator](https://github.com/dna-seq/just-module-creator) and
[just-prs](https://github.com/dna-seq/just-prs). Live at <https://just-dna.life>.

A static site built with [Bun](https://bun.sh) and TypeScript. Pages are React components rendered to
plain HTML at build time; the browser gets that HTML, one stylesheet and a 3 KB script for the theme
toggle, tabs, copy buttons and the catalog filter. Fonts are self-hosted, so a visit makes no
third-party requests.

## Develop

```bash
bun install
bun run dev        # http://localhost:4321, rebuilds on every change under src/ and public/
bun run check      # typecheck, build, and fail on broken internal links
```

## Layout

| Path | What |
|---|---|
| `src/pages/` | `home.tsx`, `history.tsx`, the 404 page, and `index.ts`, the list of pages and of old URLs that redirect |
| `src/components/` | layout (header, footer, meta tags), icons, code blocks and tabs, and `Abstract.tsx`, the graphical abstract |
| `src/site.ts` | every outbound link and the home page's sections, in one place |
| `src/data/catalog.json` | snapshot of the module registry, rendered as the catalog grid |
| `src/styles/site.css` | the whole stylesheet: tokens for light and dark, then components |
| `src/client/main.ts` | the only browser script; the site reads fine without it |
| `public/` | copied as is: images, `CNAME`, and the first-generation archive pages (`example/`, `dna-stories/`) |
| `scripts/` | `build.ts`, `dev.ts`, `check-links.ts`, `refresh-catalog.ts`, `social-card.ts` |

## The catalog snapshot

The registry API sends no CORS headers, so the page cannot read it from the browser. `bun run catalog`
writes `src/data/catalog.json`; the Pages workflow runs it before every build and once a day, so the live
site is at most a day behind the registry without a commit. If the registry is unreachable, the build
uses the committed snapshot.

## Deploy

Every push to `main` builds and deploys through `.github/workflows/pages.yml` (the repository's Pages
source is "GitHub Actions"). The custom domain is `just-dna.life`; project sites of other `dna-seq`
repositories appear under it (for example `/just-dna-compiler/`), so do not add a top-level folder with
the same name as a repository that publishes Pages.

## Images

Screenshots in `public/img/` come from the Just-DNA-Lite paper figures and the app, run on the authors'
public genomes. `bun run build && bun scripts/social-card.ts` re-renders `public/img/social-card.png`
(the link preview) from the site's own stylesheet; it needs a local Chrome.
