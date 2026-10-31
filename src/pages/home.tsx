import type { ReactNode } from "react";
import { GraphicalAbstract } from "../components/Abstract.tsx";
import { Code, Tabs } from "../components/Code.tsx";
import { GitHubMark, Icon, type IconName } from "../components/Icon.tsx";
import { type Assets, Layout } from "../components/Layout.tsx";
import { catalog, moduleUrl, namespaces, sizeLabels, snapshotDate } from "../data/catalog.ts";
import { links, site } from "../site.ts";

function SectionHead({ eyebrow, title, children, id }: { eyebrow: string; title: ReactNode; children?: ReactNode; id?: string }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {children ? <div className="lead">{children}</div> : null}
    </div>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="ext" href={href}>
      {children}
      <Icon name="external" size={14} />
    </a>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <a className="pill" href="#history">
            <span className="pill-tag">New</span> Just-DNA-Seq is now Just-DNA-Lite, rebuilt from scratch
            <Icon name="arrowRight" size={16} />
          </a>
          <h1 id="hero-title">Read your genome against published evidence, on your own computer.</h1>
          <p className="hero-lead">
            Just-DNA-Lite annotates a whole-genome VCF with the modules you choose and computes polygenic scores
            locally, so the file never has to be uploaded. Modules come from an open catalog, and anyone can write a
            new one from papers with the AI assistant they already use.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={links.demo}>
              Try the public demo <Icon name="arrowRight" size={18} />
            </a>
            <a className="button button-on-dark" href="#install">
              Install it
            </a>
            <a className="button button-ghost-dark" href="#catalog">
              Browse modules
            </a>
          </div>
          <ul className="hero-facts">
            <li><Icon name="lock" size={16} /> Your file stays local</li>
            <li><Icon name="code" size={16} /> Open source</li>
            <li><Icon name="layers" size={16} /> Linux, macOS, Windows</li>
          </ul>
        </div>
        <div className="hero-art" aria-hidden="true">
          <img className="hero-helix" src="/img/helix.webp" alt="" width={820} height={1129} />
          <div className="evidence-card">
            <div className="evidence-top">
              <span className="evidence-module">Longevity Map</span>
              <span className="badge badge-good">protective</span>
            </div>
            <div className="evidence-variant">
              <strong>FOXO3</strong> <span className="mono">rs2802292</span>
            </div>
            <div className="evidence-genotype">
              Your genotype <span className="mono big">G/T</span> <span className="badge">called</span>
            </div>
            <div className="evidence-studies">
              <div><span>Southern Italian</span><span className="mono">PMID 19415983</span></div>
              <div><span>Han Chinese</span><span className="mono">PMID 19793722</span></div>
              <div><span>Japanese-American</span><span className="mono">PMID 18765803</span></div>
              <div><span>Danish</span><span className="mono">PMID 20849522</span></div>
            </div>
            <div className="evidence-foot">From Anton Kulaga's public genome</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps: { n: number; title: string; body: ReactNode }[] = [
  {
    n: 1,
    title: "Evidence",
    body: (
      <>
        Papers and public databases (ClinVar, GWAS Catalog, ClinPGx, CPIC, CIViC) say which genotypes have been
        linked with what, and in whom.
      </>
    ),
  },
  {
    n: 2,
    title: "Write",
    body: (
      <>
        <a href="#write">just-module-creator</a> helps your AI assistant turn that evidence into a module: a table of
        claims, each with its genotype and the paper behind it, checked and compiled.
      </>
    ),
  },
  {
    n: 3,
    title: "Share",
    body: (
      <>
        The <a href="#catalog">module catalog</a> publishes it under the author's name. A rehearsal registry, the
        polygon, catches mistakes before a version becomes permanent.
      </>
    ),
  },
  {
    n: 4,
    title: "Read",
    body: (
      <>
        <a href="#app">Just-DNA-Lite</a> installs modules, joins them with your VCF and scores it with{" "}
        <a href="#scores">just-prs</a>. The report says what you have and where each claim comes from.
      </>
    ),
  },
];

function HowItWorks() {
  return (
    <section className="section" id="how" aria-labelledby="how-title">
      <div className="container">
        <SectionHead id="how-title" eyebrow="How it fits together" title="From a paper to a sentence about your genome">
          <p>
            Four projects, one loop. Evidence is written into modules, modules are shared through a catalog, and the
            app on your computer reads your genome with them. Scores from the PGS Catalog run beside the modules.
          </p>
        </SectionHead>
        <GraphicalAbstract />
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.n}>
              <span className="step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const paths: { icon: IconName; who: string; what: string; href: string; cta: string }[] = [
  {
    icon: "file",
    who: "I have a genome file",
    what: "Read it against longevity, disease-predisposition, drug-response and other modules, and see where you fall for thousands of polygenic scores.",
    href: "#app",
    cta: "Read your genome",
  },
  {
    icon: "flask",
    who: "I study a trait or a disease",
    what: "Turn a curated variant list or a literature review into a versioned module that other people can install and cite.",
    href: "#write",
    cta: "Write a module",
  },
  {
    icon: "chat",
    who: "I work with Claude Code or Codex",
    what: "Give your assistant typed genomics tools: Ensembl lookups, polygenic scores, module authoring and local annotation.",
    href: "#assistants",
    cta: "Add the plugins",
  },
  {
    icon: "code",
    who: "I build pipelines",
    what: "Use scoring, ancestry percentiles and the module format in your own code. Every result is Parquet.",
    href: "#developers",
    cta: "See the libraries",
  },
  {
    icon: "school",
    who: "I teach genomics",
    what: "Show how annotation and polygenic scores work, and where models disagree, on real public genomes.",
    href: links.demo,
    cta: "Open the demo",
  },
];

function Paths() {
  return (
    <section className="section section-tight" aria-labelledby="paths-title">
      <div className="container">
        <h2 className="visually-hidden" id="paths-title">
          Where to start
        </h2>
        <div className="paths">
          {paths.map((p) => (
            <a key={p.who} className="path-card" href={p.href}>
              <Icon name={p.icon} size={26} />
              <h3>{p.who}</h3>
              <p>{p.what}</p>
              <span className="path-cta">
                {p.cta} <Icon name="arrowRight" size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <section className="section section-alt" id="app" aria-labelledby="app-title">
      <div className="container">
        <SectionHead id="app-title" eyebrow="Just-DNA-Lite" title="A report you can check, from a file you keep">
          <p>
            Upload a genome file, pick the topics, and read a report in ordinary language. The app runs on your
            computer and the file stays there. Ten modules come with it, covering longevity, disease predisposition,
            drug response, heart disease, cholesterol, fitness and clotting; more install from the catalog in one
            click.
          </p>
        </SectionHead>
        <div className="split">
          <ul className="feature-list">
            <li>
              <Icon name="table" />
              <div>
                <h3>Evidence you can follow</h3>
                <p>
                  Each matched variant shows your genotype, the module's conclusion and the studies behind it. rsIDs
                  link to dbSNP and studies to PubMed.
                </p>
              </div>
            </li>
            <li>
              <Icon name="dna" />
              <div>
                <h3>Combined results in a sentence</h3>
                <p>
                  Some answers need several positions read together. Blood group, APOE type and secretor status come
                  back as one plain result, and the report says when the file cannot decide.
                </p>
              </div>
            </li>
            <li>
              <Icon name="alert" />
              <div>
                <h3>Gaps are labelled</h3>
                <p>
                  A genotype inferred from nearby coverage is marked as inferred, and a module that could not be read
                  is listed with the reason instead of looking like "nothing found".
                </p>
              </div>
            </li>
            <li>
              <Icon name="bolt" />
              <div>
                <h3>Fast on ordinary hardware</h3>
                <p>
                  On one workstation the ten default modules annotate a whole genome in about a minute. Every result is
                  also a Parquet file for Python, R or DuckDB.
                </p>
              </div>
            </li>
          </ul>
          <figure className="shot">
            <img src="/img/report.webp" alt="A Longevity Variants report: totals, then a table of matched variants with genotype, zygosity, weight and links to AI explanations, then the conclusion and supporting studies of one FOXO3 variant." width={1400} height={821} loading="lazy" />
            <figcaption>The Longevity Variants report for a public genome, with one finding opened to its studies.</figcaption>
          </figure>
        </div>

        <div className="install" id="install">
          <div className="install-copy">
            <h3>Install</h3>
            <p>
              You need a VCF from whole-genome or whole-exome sequencing on the GRCh38 reference, the kind providers
              such as DNA Complete, Dante Labs and Sequencing.com let you download. Install{" "}
              <a href={links.uv}>uv</a> once, then run four commands. The app opens at{" "}
              <span className="mono">http://localhost:3000</span>, with nothing to configure.
            </p>
            <p className="small">
              Linux, macOS and Windows. Support for consumer chip files (23andMe and similar) and other genome builds
              is planned. Full instructions and troubleshooting are in the <a href={links.lite}>README</a>.
            </p>
          </div>
          <Tabs
            id="install"
            label="Ways to install Just-DNA-Lite"
            tabs={[
              {
                id: "uv",
                label: "uv",
                body: (
                  <Code>{`git clone https://github.com/dna-seq/just-dna-lite.git
cd just-dna-lite
uv sync
uv run start`}</Code>
                ),
              },
              {
                id: "container",
                label: "Podman or Docker",
                body: (
                  <>
                    <Code>{`git clone https://github.com/dna-seq/just-dna-lite.git
cd just-dna-lite
mkdir -p my_genomes   # put your .vcf or .vcf.gz files here
podman-compose up --build`}</Code>
                    <p className="small">
                      With Docker the last line is <span className="mono">docker compose up --build</span>. Podman is
                      the better default for a personal genome because it does not need root.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>

        <div className="cards-3">
          <div className="card">
            <h3>No genome of your own yet?</h3>
            <p>
              Two of the authors published theirs. Paste a link into <em>Import from Zenodo</em> in the app, or try
              them in the hosted demo, which uses public genomes only.
            </p>
            <ul className="link-list">
              <li><Ext href={links.zenodoAnton}>Anton Kulaga, CC0</Ext></li>
              <li><Ext href={links.zenodoLivia}>Livia Zaharia, CC-BY-4.0</Ext></li>
              <li><Ext href={links.openHumans}>Open Humans has more</Ext></li>
            </ul>
          </div>
          <a className="card video-card" href={links.tutorial}>
            <img src="/img/tutorial.webp" alt="" width={1280} height={720} loading="lazy" />
            <span className="video-play" aria-hidden="true">
              <Icon name="play" size={22} />
            </span>
            <span className="video-title">Video tutorial: Unlocking your DNA with Just-DNA-Lite</span>
          </a>
          <div className="card">
            <h3>Run it from the terminal</h3>
            <p>The same annotation without the web interface, on a public genome or your own file:</p>
            <Code label="Terminal">{`uv run annotate anton -m longevitymap
uv run annotate my.vcf.gz -m coronary`}</Code>
          </div>
        </div>
      </div>
    </section>
  );
}

function Scores() {
  return (
    <section className="section" id="scores" aria-labelledby="scores-title">
      <div className="container split split-reverse">
        <div>
          <SectionHead id="scores-title" eyebrow="just-prs" title="Every model for a trait, side by side">
            <p>
              A polygenic score adds up many small genetic effects. Different studies built different models for the
              same trait, and they often disagree. just-prs scores your genome with all of them from the{" "}
              <a href={links.pgsCatalog}>PGS Catalog</a>, so the disagreement is visible instead of hidden behind one
              number.
            </p>
          </SectionHead>
          <ul className="check-list">
            <li>Your ancestry is inferred from 1000 Genomes, and each score is placed among reference genomes of matching ancestry.</li>
            <li>Every model reports how much of it your file covers, and gets a quality label.</li>
            <li>Curated directions say what a higher score means for each model, such as "more LDL cholesterol".</li>
            <li>Works inside Just-DNA-Lite, as the <span className="mono">prs-ui</span> browser app, from Python, or through MCP.</li>
          </ul>
          <p className="note">
            Most score models were built from studies of people with European ancestry, so the reference fits some
            genomes better than others. A percentile is a place on a chart, not a diagnosis.
          </p>
          <div className="link-row">
            <a className="button button-secondary" href={links.prs}>
              <GitHubMark size={18} /> just-prs
            </a>
            <Ext href={links.pypi("just-prs")}>PyPI</Ext>
            <Ext href={links.prsMcp}>just-prs-mcp</Ext>
          </div>
        </div>
        <figure className="shot">
          <img src="/img/prs-ldl.webp" alt="A polygenic score report for LDL cholesterol: summary tiles for median percentile, most reliable model, number of models and model spread, above a bell curve with each model's position marked." width={1300} height={944} loading="lazy" />
          <figcaption>LDL cholesterol for one public genome: 101 PGS Catalog models, each placed on its own reference curve.</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Catalog() {
  const groups = namespaces();
  const date = snapshotDate();
  return (
    <section className="section section-alt" id="catalog" aria-labelledby="catalog-title">
      <div className="container">
        <SectionHead id="catalog-title" eyebrow="Module catalog" title="Modules are data you can read, install and publish">
          <p>
            A module is a folder of CSV tables and one YAML file. Each row is a claim about a genotype, and each
            claim is tied to its sources. The compiler turns the folder into Parquet with a manifest and a content
            digest, and the registry keeps every published version. Just-DNA-Lite installs modules from its Module
            Catalog page, with no software update.
          </p>
        </SectionHead>

        <div className="catalog-bar">
          <p className="catalog-stats">
            <strong>{catalog.modules.length}</strong> modules from <strong>{groups.length}</strong> authors{" "}
            <span className="muted">· snapshot of {date}</span>
          </p>
          <div className="catalog-tools" data-catalog-tools hidden>
            <label className="visually-hidden" htmlFor="catalog-search">
              Search modules
            </label>
            <input id="catalog-search" type="search" placeholder="Search modules, genes, authors" data-catalog-search />
            <div className="chips" role="group" aria-label="Filter by author">
              <button type="button" className="chip" aria-pressed="true" data-namespace="">
                All
              </button>
              {groups.map((g) => (
                <button key={g.name} type="button" className="chip" aria-pressed="false" data-namespace={g.name}>
                  {g.name} <span className="chip-count">{g.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <ul className="module-grid" data-catalog>
          {catalog.modules.map((m) => (
            <li key={`${m.namespace}/${m.name}`} data-namespace={m.namespace} data-search={`${m.title} ${m.name} ${m.namespace} ${m.description}`.toLowerCase()}>
              <a className="module-card" href={moduleUrl(m)} style={m.color ? { ["--module-color" as string]: m.color } : undefined}>
                <span className="module-title">{m.title}</span>
                <span className="module-id mono">
                  {m.namespace} · v{m.version}
                </span>
                <span className="module-desc">{m.description}</span>
                <span className="module-tags">
                  {sizeLabels(m).map((label) => (
                    <span key={label} className="tag">
                      {label}
                    </span>
                  ))}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <button type="button" className="button button-secondary catalog-more" data-catalog-more hidden>
          Show all {catalog.modules.length} modules
        </button>
        <p className="catalog-empty" data-catalog-empty hidden>
          No module matches. The <a href={links.catalog}>live catalog</a> may have newer ones.
        </p>

        <div className="catalog-foot">
          <div className="catalog-foot-text">
            <p>
              The same catalog appears inside Just-DNA-Lite: pick a module, choose a version, and install it next to
              the built-in ones. Publishing starts on the <a href={links.polygon}>polygon</a>, a rehearsal registry
              whose test versions can be deleted. A version on the main catalog stays, so a module that installed
              yesterday installs the same way tomorrow.
            </p>
            <a className="button button-primary" href={links.catalog}>
              Browse the live catalog <Icon name="arrowRight" size={18} />
            </a>
          </div>
          <figure className="shot">
            <img src="/img/catalog.webp" alt="The Module Catalog page in Just-DNA-Lite: a selected Longevity Map module with its version picker and a Get from catalog button, beside cards for other modules." width={1400} height={398} loading="lazy" />
            <figcaption>The Module Catalog page inside the app.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const authoringSteps = [
  ["Open a folder", "for the module, with the tables it needs and nothing else."],
  ["Draft from a source", "when one already publishes the rows: ClinVar, CPIC, ClinPGx, CIViC and others."],
  ["Decide what survives", "what each genotype means, and which paper backs it. This is the real work."],
  ["Place each variant", "on the genome, recording where every coordinate came from."],
  ["Check", "what was written against what the sources say."],
  ["Compile", "the folder into Parquet with a fingerprint, so it rebuilds the same way."],
  ["Publish", "when you say so: rehearse on the polygon first, then the catalog."],
] as const;

function Write() {
  return (
    <section className="section" id="write" aria-labelledby="write-title">
      <div className="container">
        <SectionHead id="write-title" eyebrow="just-module-creator" title="Write a module from a paper, with your assistant">
          <p>
            A plugin for Claude Code and Codex. You bring a question and the sources. The assistant reads them, writes
            each claim as a row with the paper behind it, checks identifiers and citations, compiles the module and
            publishes it when you say so. You do not need a genetics degree, and you do not need to write code.
          </p>
        </SectionHead>
        <div className="split split-top">
          <ol className="numbered">
            {authoringSteps.map(([title, body]) => (
              <li key={title}>
                <strong>{title}</strong> {body}
              </li>
            ))}
          </ol>
          <div className="stack">
            <Tabs
              id="plugin"
              label="Install the plugin"
              tabs={[
                {
                  id: "claude",
                  label: "Claude Code",
                  body: (
                    <Code>{`claude plugin marketplace add dna-seq/dna-seq-claude-marketplace
claude plugin install just-module-creator@dna-seq`}</Code>
                  ),
                },
                {
                  id: "codex",
                  label: "Codex",
                  body: (
                    <Code>{`codex plugin marketplace add dna-seq/dna-seq-claude-marketplace
codex plugin add just-module-creator@dna-seq`}</Code>
                  ),
                },
              ]}
            />
            <p className="small">
              Needs <a href={links.uv}>uv</a> and Python 3.13 or newer; dependencies install on first start. An
              account is only needed to publish. Then ask in your own words:
            </p>
            <Code label="In the assistant">{`/create-module caffeine metabolism, from this paper`}</Code>
          </div>
        </div>

        <div className="habits">
          <h3>Habits the tools hold you to</h3>
          <div className="cards-4">
            <div className="habit">
              <h4>A lookup shows a value, it does not paste it</h4>
              <p>A later check compares what you wrote with the same source, so a pasted value would only agree with itself.</p>
            </div>
            <div className="habit">
              <h4>A check that could not run stays unknown</h4>
              <p>Nothing turns a failed lookup into a zero or a pass.</p>
            </div>
            <div className="habit">
              <h4>A quote is a sentence found in the paper</h4>
              <p>The assistant fetches the article and quotes it word for word. A pasted title proves nothing.</p>
            </div>
            <div className="habit">
              <h4>Most candidate rows get dropped</h4>
              <p>
                A source that lists seven variants often supports one. In the <a href={links.creatorFto}>FTO example</a>{" "}
                six of seven were dropped, and its README says why.
              </p>
            </div>
          </div>
          <p className="small">
            Before publishing, the plugin can run your draft on genomes on your own machine through Just-DNA-Lite's
            MCP server, and show which variants they carry. Drug response, star alleles, repeat counts and polygenic
            scores have their own table kinds: <a href={links.creatorBeyond}>what more a module can carry</a>.
          </p>
          <div className="link-row">
            <a className="button button-secondary" href={links.creator}>
              <GitHubMark size={18} /> just-module-creator
            </a>
            <Ext href={links.formatDocs}>Module format documentation</Ext>
          </div>
        </div>
      </div>
    </section>
  );
}

const plugins: { name: string; what: string; href: string; tag?: string }[] = [
  {
    name: "ensembl",
    what: "Genes, transcripts, proteins, variants, population frequencies and phenotypes from Ensembl. Sends identifiers and coordinates to Ensembl's public services.",
    href: links.ensemblMcp,
  },
  {
    name: "just-prs",
    what: "Search the PGS Catalog, compare models, score a local VCF and report coverage, ancestry and model agreement. The genome is not uploaded.",
    href: links.prsMcp,
  },
  {
    name: "just-module-creator",
    what: "Author, check, compile and publish annotation modules, or run a draft on a genome on your machine.",
    href: links.creator,
  },
  {
    name: "just-dna-agents",
    what: "Subagents and slash commands for module work, including a guided create-module workflow for Codex.",
    href: links.agents,
  },
  {
    name: "manuscript-skills",
    what: "Prepares a scientific manuscript for submission: claims, numbers, references, figures and simulated referees. Not genomics-specific.",
    href: links.manuscriptSkills,
    tag: "any field",
  },
];

function Assistants() {
  return (
    <section className="section section-alt" id="assistants" aria-labelledby="assistants-title">
      <div className="container">
        <SectionHead id="assistants-title" eyebrow="For AI assistants" title="Genomics tools your assistant can call">
          <p>
            The dna-seq marketplace is one catalog of plugins for Claude Code and Codex. Your assistant calls typed
            tools instead of writing throwaway analysis code, and anything that reads a genome runs on your machine.
          </p>
        </SectionHead>
        <div className="split split-top">
          <ul className="plugin-list">
            {plugins.map((p) => (
              <li key={p.name}>
                <a href={p.href}>
                  <span className="mono plugin-name">{p.name}</span>
                  {p.tag ? <span className="tag">{p.tag}</span> : null}
                </a>
                <p>{p.what}</p>
              </li>
            ))}
            <li>
              <a href={links.liteMcp}>
                <span className="mono plugin-name">just-dna-lite MCP server</span>
              </a>
              <p>
                Comes with the app: list your samples, install a module, start annotation jobs and read the results
                from any MCP client.
              </p>
            </li>
          </ul>
          <div className="stack">
            <Code label="Claude Code">{`claude plugin marketplace add dna-seq/dna-seq-claude-marketplace
claude plugin install ensembl@dna-seq
claude plugin install just-prs@dna-seq`}</Code>
            <div className="prompts">
              <p className="prompts-title">Things to ask</p>
              <ul>
                <li>"What is rs699? Include population frequencies and predicted consequences."</li>
                <li>"Search for well-supported type 2 diabetes scores and compare their evidence."</li>
                <li>"Compute polygenic scores for this local VCF and report coverage and ancestry assumptions."</li>
                <li>"/create-module APOE variants, from these three papers."</li>
              </ul>
            </div>
            <p className="note">
              Results you ask the assistant to read go to whichever model provider runs the chat. Use genomes you are
              allowed to share with it.
            </p>
            <Ext href={links.marketplace}>The marketplace on GitHub, with Codex Desktop setup</Ext>
          </div>
        </div>
      </div>
    </section>
  );
}

const packages: { name: string; what: string; pypi?: string; href: string }[] = [
  { name: "just-prs", what: "PGS Catalog scoring, 1000 Genomes percentiles, ancestry inference", pypi: "just-prs", href: links.prs },
  { name: "prs-ui", what: "The polygenic score browser app, also embeddable in Reflex apps", pypi: "prs-ui", href: links.prs },
  { name: "just-dna-format", what: "The module schema and manifest, with integrity checks; light enough for any client", pypi: "just-dna-format", href: links.compiler },
  { name: "just-dna-compiler", what: "Compiles a module folder into Parquet and a manifest", pypi: "just-dna-compiler", href: links.compiler },
  { name: "just-dna-enricher", what: "Resolves rsIDs to coordinates and drafts rows from public sources", pypi: "just-dna-enricher", href: links.compiler },
  { name: "just-dna-registry", what: "Client and CLI for the catalog: list, download and verify, publish", pypi: "just-dna-registry", href: links.registry },
];

const repos: { name: string; what: string; href: string }[] = [
  { name: "just-dna-lite", what: "The app: annotation pipeline, web interface, reports, MCP server", href: links.lite },
  { name: "just-module-creator", what: "Claude Code and Codex plugin for writing modules", href: links.creator },
  { name: "just-prs", what: "Polygenic scores: library, CLI and browser app", href: links.prs },
  { name: "just-prs-mcp", what: "MCP server and plugin for just-prs", href: links.prsMcp },
  { name: "just-dna-compiler", what: "Module format, compiler and enricher", href: links.compiler },
  { name: "just-dna-registry", what: "The module catalog's server and client", href: links.registry },
  { name: "dna-seq-claude-marketplace", what: "One plugin catalog for Claude Code and Codex", href: links.marketplace },
  { name: "ensembl-mcp", what: "Live Ensembl lookups as an MCP server and plugin", href: links.ensemblMcp },
  { name: "just-dna-agents", what: "Agents and commands for module work", href: links.agents },
  { name: "prepare-annotations", what: "Pipelines that prepare Ensembl, ClinVar and dbSNP data", href: links.prepareAnnotations },
  { name: "reflex-mui-datagrid", what: "The data grid behind the app's tables, with Polars support", href: links.datagrid },
];

function Developers() {
  return (
    <section className="section" id="developers" aria-labelledby="developers-title">
      <div className="container">
        <SectionHead id="developers-title" eyebrow="For developers" title="Libraries, a format, and the code behind them">
          <p>
            The pieces work on their own. Score a VCF from a notebook, verify a module's digest in a downloader, or
            compile modules in your own pipeline. Everything is Python 3.13, published on PyPI and built on Polars,
            polars-bio, DuckDB and Dagster.
          </p>
        </SectionHead>
        <div className="dev-grid">
          <div>
            <h3 className="dev-heading">On PyPI</h3>
            <ul className="pkg-list">
              {packages.map((p) => (
                <li key={p.name}>
                  <a className="mono" href={p.pypi ? links.pypi(p.pypi) : p.href}>
                    {p.name}
                  </a>
                  <span>{p.what}</span>
                </li>
              ))}
            </ul>
            <Code label="Score a public genome in two lines">{`pip install just-prs
prs compute --vcf anton --pgs-id PGS000001`}</Code>
          </div>
          <div>
            <h3 className="dev-heading">Active repositories</h3>
            <ul className="repo-list">
              {repos.map((r) => (
                <li key={r.name}>
                  <a href={r.href}>
                    <GitHubMark size={16} /> <span className="mono">{r.name}</span>
                  </a>
                  <span>{r.what}</span>
                </li>
              ))}
            </ul>
            <p className="small">
              Older repositories in the <a href={links.org}>dna-seq organisation</a> belong to the first generation
              and are no longer maintained: see the <a href="/history/">history</a>. Reference docs:{" "}
              <a href={links.formatDocs}>module format</a>, <a href={links.catalogApiDocs}>registry API</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Caveats() {
  return (
    <section className="section section-tight" id="caveats" aria-labelledby="caveats-title">
      <div className="container">
        <div className="caveats">
          <h2 id="caveats-title">Before you read a result as news</h2>
          <ul>
            <li>
              This is research and education software. A health decision belongs with a clinician or a genetic
              counsellor.
            </li>
            <li>
              A red label is common in healthy people: an ordinary genome carries many variants that some database
              once called pathogenic.
            </li>
            <li>
              A polygenic score is a place on a chart built mostly from European studies, and lifestyle often moves a
              common disease more than any single common variant.
            </li>
            <li>
              If a finding matches a real family history and you are worried, the next step is a doctor and a
              clinical test. <a href={links.liteScience}>Understanding your genome</a> explains why.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const timeline = [
  { year: "2022", text: "Just-DNA-Seq starts as longevity, cancer, cardiovascular and drug-response modules for the OakVar variant-analysis framework." },
  { year: "2024", text: "The first-generation platform is described on arXiv, with a hosted service and a longevity report." },
  { year: "2025", text: "Just-DNA-Lite begins: a ground-up rewrite with its own annotation engine and modules as data instead of code." },
  { year: "2026", text: "just-prs, the module format and compiler, the public catalog, the plugin marketplace and just-module-creator ship, along with the public demo." },
];

function History() {
  return (
    <section className="section section-alt" id="history" aria-labelledby="history-title">
      <div className="container split split-top">
        <div>
          <SectionHead
            id="history-title"
            eyebrow="Second generation"
            title={
              <>
                From <span className="nowrap">Just-DNA-Seq</span> to <span className="nowrap">Just-DNA-Lite</span>
              </>
            }
          >
            <p>
              The project started in longevity research: there was no tool that made it straightforward to read a
              personal genome against studies of long-lived people, transparently and extensibly. The first
              generation proved the idea. The second rebuilt it so that anyone can add what the original team could
              never curate alone.
            </p>
          </SectionHead>
          <a className="button button-secondary" href="/history/">
            <Icon name="history" size={18} /> The first generation, its modules and paper
          </a>
        </div>
        <ol className="timeline">
          {timeline.map((t) => (
            <li key={t.year}>
              <span className="timeline-year">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const people = [
  { name: "Anton Kulaga", href: "https://github.com/antonkulaga" },
  { name: "Nikolay Usanov" },
  { name: "Olga Borysova", href: "https://github.com/OlgaBorysova" },
  { name: "Alexey Karmazin", href: "https://github.com/Alex-Karmazin" },
  { name: "Maria Koval", href: "https://github.com/marfantyk" },
  { name: "Malvina Pushkareva" },
  { name: "Livia Zaharia" },
  { name: "Georg Fuellen" },
  { name: "Robi Tacutu" },
];

const supporters = [
  { name: "IBIMA, Rostock University Medical Center", href: links.ibima },
  { name: "Institute of Biochemistry of the Romanian Academy", href: links.ibar },
  { name: "ROGEN consortium", href: links.rogen },
  { name: "HEALES", href: links.heales },
  { name: "Systems Biology of Aging Group", href: links.sbag },
];

function People() {
  return (
    <section className="section" id="people" aria-labelledby="people-title">
      <div className="container">
        <SectionHead id="people-title" eyebrow="People" title="Who makes it">
          <p>
            Just-DNA is built by researchers and engineers in ageing biology and bioinformatics, with module authors
            from the community. Anton Kulaga and Nikolay Usanov are the core developers.
          </p>
        </SectionHead>
        <ul className="people">
          {people.map((p) => (
            <li key={p.name}>{p.href ? <a href={p.href}>{p.name}</a> : p.name}</li>
          ))}
          <li className="people-more">and every author in the catalog</li>
        </ul>
        <div className="support">
          <h3>Affiliations and support</h3>
          <ul>
            {supporters.map((s) => (
              <li key={s.name}>
                <a href={s.href}>{s.name}</a>
              </li>
            ))}
          </ul>
          <p className="small">
            Anton Kulaga is funded through the ROGEN consortium. Recruitment there is still going, so
            Romanian-calibrated scores are a research direction, not a finished result.
          </p>
        </div>
        <div className="community">
          <a className="community-link" href={links.telegram}>
            <Icon name="send" /> Telegram
          </a>
          <a className="community-link" href={links.discord}>
            <Icon name="chat" /> Discord
          </a>
          <a className="community-link" href={links.youtube}>
            <Icon name="play" /> YouTube
          </a>
          <a className="community-link" href={links.org}>
            <GitHubMark /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ assets }: { assets: Assets }) {
  return (
    <Layout meta={{ path: "/", title: site.title, description: site.description }} assets={assets}>
      <Hero />
      <Paths />
      <HowItWorks />
      <App />
      <Scores />
      <Catalog />
      <Write />
      <Assistants />
      <Developers />
      <Caveats />
      <History />
      <People />
    </Layout>
  );
}
