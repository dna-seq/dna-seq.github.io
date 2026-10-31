import type { Assets } from "../page-types.ts";
import { catalog } from "../data/catalog.ts";
import { links, site } from "../site.ts";
import { ArrowRight, Play } from "../components/bits.tsx";
import { Chrome } from "../components/Chrome.tsx";

/** The first screen: one line of a genome file, and the report label it becomes. */
function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-light" aria-hidden="true" />
      <div className="container corridor">
        <h1 id="hero-title">
          Your genome, read{" "}
          <br />
          on your own computer.
        </h1>
        <p className="lead">See what published studies say about your DNA, without uploading it.</p>
        <div className="actions">
          <a className="btn btn--primary" href={links.demo}>
            Try the demo
          </a>
          <a className="btn" href="/start/">
            Install it
          </a>
        </div>
      </div>
      <div className="container before-after">
        <figure className="vcf">
          <figcaption>One line of your genome file</figcaption>
          <code>
            <span>chr6</span> <span>108587315</span> <span>G</span> <span>T</span> <span>0/1</span>
          </code>
        </figure>
        <span className="before-after-arrow">
          <ArrowRight size={32} />
        </span>
        <figure className="label" aria-label="The same position in the Longevity Map report: FOXO3, rs2802292, genotype G/T, protective in four studies">
          <div className="label-main">
            <div className="label-head">
              <span>Longevity Map</span>
              <span>rs2802292</span>
            </div>
            <p className="label-gene">FOXO3</p>
            <p className="label-row">
              Your genotype <b>G/T</b>
            </p>
          </div>
          <div className="label-stub">
            <span className="stamp">
              Protective
              <br />4 studies
            </span>
            <span>Anton Kulaga’s public genome</span>
          </div>
        </figure>
      </div>
    </section>
  );
}

/**
 * Where data moves: studies and modules travel in, the genome file never leaves the dashed line.
 * The ordered list under it carries every fact and replaces the drawing on narrow screens.
 */
function GenomeMap() {
  return (
    <section className="section map" aria-labelledby="map-title">
      <div className="container">
        <h2 id="map-title">Studies come in. Your file stays.</h2>
        <svg className="map-drawing" viewBox="0 0 1200 470" role="img" aria-label="Diagram of how Just-DNA works: published studies become modules in the catalog; you install the modules you choose; a sequencing service gives you your genome file; Just-DNA-Lite reads the file with the modules on your computer and writes your report. Nothing inside your computer is uploaded.">
          <defs>
            <marker id="map-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path className="map-head" d="M0 0 10 5 0 10z" />
            </marker>
          </defs>

          <rect className="map-home" x="610" y="12" width="578" height="446" rx="22" />
          <text className="map-home-label" x="638" y="50">Your computer</text>
          <text className="map-home-note" x="638" y="438">Nothing inside this line is uploaded</text>

          <rect className="map-node map-node--studies" x="12" y="40" width="250" height="168" rx="14" />
          <text className="map-title" x="36" y="80">Published studies</text>
          <text className="map-text" x="36" y="112">Papers and ClinVar</text>
          <text className="map-text" x="36" y="140">ClinPGx and CPIC</text>
          <text className="map-text" x="36" y="168">The PGS Catalog</text>

          <rect className="map-node map-node--catalog" x="330" y="64" width="220" height="120" rx="14" />
          <text className="map-title" x="354" y="104">Module catalog</text>
          <text className="map-text" x="354" y="136">{catalog.modules.length} modules, one</text>
          <text className="map-text" x="354" y="162">topic each</text>

          <rect className="map-node map-node--service" x="12" y="300" width="250" height="110" rx="14" />
          <text className="map-title" x="36" y="340">A sequencing service</text>

          <rect className="map-node map-node--lite" x="650" y="74" width="250" height="120" rx="14" />
          <text className="map-step" x="674" y="112">2</text>
          <text className="map-title" x="704" y="112">Just-DNA-Lite</text>
          <text className="map-text" x="674" y="144">reads it with the</text>
          <text className="map-text" x="674" y="170">modules you chose</text>

          <rect className="map-node map-node--file" x="650" y="290" width="250" height="110" rx="14" />
          <text className="map-step" x="674" y="330">1</text>
          <text className="map-title" x="704" y="330">Your genome file</text>
          <text className="map-text" x="674" y="362">a VCF file</text>

          <rect className="map-node map-node--report" x="950" y="74" width="214" height="120" rx="14" />
          <text className="map-step" x="974" y="112">3</text>
          <text className="map-title" x="1004" y="112">Your report</text>
          <text className="map-text" x="974" y="144">with the studies</text>
          <text className="map-text" x="974" y="170">behind each finding</text>

          <path className="map-edge" d="M262 124H322" markerEnd="url(#map-head)" />
          <path className="map-edge" d="M550 124H642" markerEnd="url(#map-head)" />
          <text className="map-edge-label" x="560" y="110">install</text>
          <path className="map-edge" d="M262 355H642" markerEnd="url(#map-head)" />
          <text className="map-edge-label" x="300" y="341">you download it</text>
          <path className="map-edge" d="M775 290V202" markerEnd="url(#map-head)" />
          <text className="map-edge-label" x="788" y="252">read here</text>
          <path className="map-edge" d="M900 134H942" markerEnd="url(#map-head)" />
        </svg>
        <ol className="map-steps">
          <li>
            <h3>Get your genome file</h3>
            <p>From a sequencing service, as a VCF.</p>
          </li>
          <li>
            <h3>Open it in Just-DNA-Lite</h3>
            <p>Free, on Linux, macOS or Windows.</p>
          </li>
          <li>
            <h3>Read your report</h3>
            <p>Each finding names its studies.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}

const topics: { title: string; line: string; modules: string[]; tint: string }[] = [
  {
    title: "Long life",
    line: "Variants studied in long-lived people.",
    modules: ["Longevity Map"],
    tint: "wed",
  },
  {
    title: "Inherited disease risk",
    line: "Known variants in hereditary cancer and heart genes.",
    modules: ["Cancer", "Cardio"],
    tint: "mon",
  },
  {
    title: "Medicines",
    line: "How you may process common drugs.",
    modules: ["Pharmacogenomics"],
    tint: "fri",
  },
  {
    title: "Body and traits",
    line: "Blood group, lactose, iron storage, smell.",
    modules: ["Blood Groups", "APOE type"],
    tint: "tue",
  },
  {
    title: "Polygenic scores",
    line: "Every published model for a trait.",
    modules: [],
    tint: "thu",
  },
];

function Topics() {
  return (
    <section className="section section--tight topics" aria-labelledby="topics-title">
      <div className="container">
        <h2 id="topics-title">What you can read about yourself</h2>
        <ul className="keys">
          {topics.map((t) => (
            <li key={t.title} className="plastic" style={{ ["--t" as string]: `var(--p-${t.tint})` }}>
              <a href={t.title === "Polygenic scores" ? "/report/" : "/modules/"}>
                <h3>{t.title}</h3>
                <p>{t.line}</p>
                {t.modules.length > 0 ? (
                  <span className="tags">
                    {t.modules.map((m) => (
                      <span key={m} className="tag">
                        {m}
                      </span>
                    ))}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="band band--ink" aria-labelledby="close-title">
      <div className="container band-split">
        <div className="band-copy">
          <h2 id="close-title">See a full report before sequencing.</h2>
          <p className="lead">The demo holds two public genomes, so every module runs on real data.</p>
          <div className="actions">
            <a className="btn btn--on-ink" href={links.demo}>
              Open the demo
            </a>
            <a className="btn btn--on-ink" href="/start/">
              Install it
            </a>
          </div>
          <p className="band-small">
            Writing a module? Start at <a href="/contribute/">Contribute</a>. Building software? See{" "}
            <a href="/developers/">Developers</a>.
          </p>
        </div>
        <a className="video" href={links.tutorial}>
          <span className="video-frame" data-slot="tutorial" data-kind="product" data-alt="The video tutorial's opening frame">
            <img src="/img/tutorial.webp" alt="" width={1280} height={720} loading="lazy" />
          </span>
          <span className="video-caption">
            <Play size={20} /> Watch the video tutorial
          </span>
        </a>
      </div>
    </section>
  );
}

export function HomePage({ assets }: { assets: Assets }) {
  return (
    <Chrome meta={{ path: "/", title: site.title, description: site.description, tab: "home" }} assets={assets}>
      <Hero />
      <GenomeMap />
      <Topics />
      <Close />
    </Chrome>
  );
}
