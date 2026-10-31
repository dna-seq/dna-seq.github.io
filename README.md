# just-dna.life

The website of the Just-DNA ecosystem: [Just-DNA-Lite](https://github.com/dna-seq/just-dna-lite), the
[module catalog](https://module-registry.just-dna.life/ui/),
[just-module-creator](https://github.com/dna-seq/just-module-creator) and
[just-prs](https://github.com/dna-seq/just-prs). Live at <https://just-dna.life>.

A static site built with [Bun](https://bun.sh) and TypeScript. Pages are React components rendered to
plain HTML at build time; the browser gets that HTML, one stylesheet and a 1 KB script for the tabs
inside pages and the copy buttons. Fonts are self-hosted, so a visit makes no third-party requests.

## Structure

The site is seven tabs, one page each, written for people reading their own genome first:

| Tab | Path | For |
|---|---|---|
| Home | `/` | anyone curious about their genome |
| Your report | `/report/` | what a report shows, polygenic scores, how to read a result |
| Modules | `/modules/` | the catalog, grouped by topic |
| Get started | `/start/` | getting a genome file, installing, the demo |
| Contribute | `/contribute/` | writing and publishing modules with just-module-creator |
| Developers | `/developers/` | libraries, AI assistant plugins and MCP servers, repositories |
| About | `/about/` | why the project exists, its people; `/history/` covers the first generation |

Longer pages split into tabs of their own; each has an address (`/report/#scores`).

## Develop

```bash
bun install
bun run dev        # http://localhost:4321, rebuilds on every change under src/ and public/
bun run check      # typecheck, build, and fail on broken internal links
```

## Layout

| Path | What |
|---|---|
| `src/pages/` | one file per tab, `history.tsx`, the 404 page, and `index.ts`, the list of pages and of old URLs that redirect |
| `src/components/` | `Chrome.tsx` (the masthead with the tab row, the footer, meta tags) and `bits.tsx` (icons, code blocks, switchers) |
| `src/site.ts` | every outbound link, in one place |
| `src/data/catalog.json` | snapshot of the module registry, rendered on the Modules tab |
| `src/styles/` | `tokens.css` (colours, type, spacing), `base.css`, and `site.css`, the components |
| `src/client/main.ts` | the only browser script; the site reads fine without it |
| `public/` | copied as is: images, `CNAME`, and the first-generation archive pages (`example/`, `dna-stories/`) |
| `scripts/` | `build.ts`, `dev.ts`, `check-links.ts`, `refresh-catalog.ts`, `social-card.ts` |

## Design

The design was made with the [Hallmark](https://github.com/Nutlope/hallmark) design skill, theme "Dose":
warm paper, one green accent, Schibsted Grotesk for headings, Instrument Sans for text and DM Mono for
genome data. The first lines of `src/styles/site.css` record the choices and the rules deliberately
waived; keep them when editing. Every colour and font goes through a token in `tokens.css`. The site is
light only. Primary buttons use the logo's own colours: the `--logo-*` tokens are the PyMOL rainbow of
the logo render, measured as the median lit colour of each hue band.

None of the three fonts has Greek letters, so the ε in a module title such as "APOE type (ε2, ε3, ε4)"
falls back to the system font. Topic grouping on the Modules tab uses a map from module name to topic in
`src/pages/modules.tsx`; a new catalog module lands under "More topics" until it is added there.

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
