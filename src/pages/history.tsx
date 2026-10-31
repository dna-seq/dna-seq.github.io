import { GitHubMark, Icon } from "../components/Icon.tsx";
import { type Assets, Layout } from "../components/Layout.tsx";
import { links } from "../site.ts";

const gen1Modules = [
  {
    icon: "gen1-longevity-variants.webp",
    title: "Longevity variants",
    text: "About 1,900 variants from LongevityMap and other sources, scored, prioritised and grouped into eleven pathways.",
    repo: "just_longevitymap",
    now: "Longevity Map module",
  },
  {
    icon: "gen1-oncorisks.webp",
    title: "Hereditary cancer",
    text: "About 300 genes linked with cancer predisposition, progression and tumour cell motility.",
    repo: "just_cancer",
    now: "Cancer module (ClinVar panel)",
  },
  {
    icon: "gen1-cardiohereditary.webp",
    title: "Cardiovascular",
    text: "Genes for arrhythmias, cardiomyopathies, congenital heart disease and coronary artery disease.",
    repo: "just_cardio",
    now: "Cardio and Coronary modules",
  },
  {
    icon: "gen1-longevity-drugs.webp",
    title: "Drugs",
    text: "Drug metabolism for widely used and geroprotective drugs, from PharmGKB and DrugAge.",
    repo: "just_drugs",
    now: "Pharmacogenomics module (ClinPGx)",
  },
  {
    icon: "gen1-thrombophilia.webp",
    title: "Thrombophilia",
    text: "Genes and a polygenic score for blood clots and deep vein thrombosis.",
    repo: "just_thrombophilia",
    now: "Thrombophilia module",
  },
  {
    icon: "gen1-lipidmetabolism.webp",
    title: "Lipid metabolism",
    text: "Genes that control the production, transport and metabolism of cholesterol and other lipids.",
    repo: "just_lipidmetabolism",
    now: "Lipid Metabolism module",
  },
  {
    icon: "gen1-longevity-prs.webp",
    title: "Longevity polygenic score",
    text: "One longevity score of 330 variants; removed before the end of the first generation.",
    repo: "prs",
    now: "Thousands of PGS Catalog scores in just-prs",
  },
];

const changes = [
  ["Engine", "Modules for OakVar, a framework derived from OpenCRAVAT", "Its own engine on Polars, polars-bio and DuckDB, run as Dagster assets"],
  ["Annotation content", "Python plugins, one repository each", "Modules as data: CSV and YAML compiled to Parquet with a manifest"],
  ["Getting new content", "A new plugin release", "Install from an open catalog, with no software update"],
  ["Who writes modules", "The core team, by hand", "Anyone, by hand or with just-module-creator in Claude Code or Codex"],
  ["Polygenic scores", "One longevity score, later removed", "PGS Catalog models with ancestry-matched percentiles, through just-prs"],
  ["Where it runs", "A hosted service with accounts, or a local OakVar install", "On your computer; a public demo with public genomes only"],
  ["Speed, one public genome on one workstation", "About 100 minutes", "About 33 seconds with the ten default modules"],
] as const;

const gen1Team = ["antonkulaga", "winternewt", "OlgaBorysova", "Alex-Karmazin", "marfantyk", "lnalinaf", "Lady3mlnm"];

export function HistoryPage({ assets }: { assets: Assets }) {
  return (
    <Layout
      meta={{
        path: "/history/",
        title: "History: from Just-DNA-Seq to Just-DNA-Lite",
        description:
          "How Just-DNA-Seq began as longevity modules for OakVar in 2022, what the first generation shipped, and what changed in Just-DNA-Lite.",
      }}
      assets={assets}
    >
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">History</p>
          <h1>From Just-DNA-Seq to Just-DNA-Lite</h1>
          <p className="lead">
            Just-DNA-Seq began in 2022 as a set of longevity and health modules for OakVar. That first generation is
            retired. Its content lives on as modules in the catalog, and the archive below keeps its report, paper
            and comic where they were.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container prose-split">
          <div className="prose">
            <h2>Why it started</h2>
            <p>
              The first human genome took more than a decade and hundreds of millions of dollars. Today a genome
              costs a few hundred, and most providers sell the sequencing as a side dish to their own predictions. Those predictions come from proprietary databases and algorithms: you cannot see which
              variants a result rests on, check it, or compare two companies that disagree.
            </p>
            <p>
              We also wanted something no commercial service offered: a look at how a genome lines up with the
              genetics of longevity. People with exceptional longevity are not distinct from the general population
              in lifestyle, so their genes matter. The studies were public, but no open tool read a personal genome
              against them.
            </p>
            <p>
              So the first generation was a do-it-yourself toolbox: realign the raw reads with current tools, call
              variants, and annotate the result with open, documented modules.
            </p>
          </div>
          <figure className="shot shot-narrow">
            <img src="/img/gen1-report.webp" alt="The first-generation longevity report, with tabs for longevity variants, oncological risks, drugs and cardiovascular risks." width={718} height={950} loading="lazy" />
            <figcaption>
              The first-generation report. <a href="/example/">Open the archived example</a>.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Generation I</p>
            <h2>What the first generation shipped</h2>
            <div className="lead">
              <p>
                Each report was an OakVar module in its own repository. Every one of them has a successor in the
                catalog today.
              </p>
            </div>
          </div>
          <ul className="gen1-grid">
            {gen1Modules.map((m) => (
              <li key={m.title} className="gen1-card">
                <img src={`/img/${m.icon}`} alt="" width={88} height={80} loading="lazy" />
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                  <p className="gen1-meta">
                    <a href={`https://github.com/dna-seq/${m.repo}`}>
                      <GitHubMark size={14} /> <span className="mono">{m.repo}</span>
                    </a>
                    <span className="gen1-now">Now: {m.now}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Generation II</p>
            <h2>What changed in Just-DNA-Lite</h2>
          </div>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">Just-DNA-Seq (2022 to 2024)</th>
                  <th scope="col">Just-DNA-Lite (2025 onward)</th>
                </tr>
              </thead>
              <tbody>
                {changes.map(([row, before, after]) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    <td>{before}</td>
                    <td>{after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="link-row">
            <a className="button button-primary" href="/#how">
              How the new ecosystem works <Icon name="arrowRight" size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Archive</p>
            <h2>Kept from the first generation</h2>
          </div>
          <div className="archive-grid">
            <a className="card archive-card" href={links.gen1Paper}>
              <Icon name="file" size={26} />
              <h3>The paper</h3>
              <p>
                Kulaga A. et al. (2024). Just-DNA-Seq, open-source personal genomics platform: longevity science for
                everyone. arXiv:2403.19087.
              </p>
            </a>
            <a className="card archive-card comic-card" href="/dna-stories/">
              <img src="/img/comic-cover.webp" alt="Cover of the comic: two people walking through an autumn forest under the title Just-DNA-Seq, My genes and longevity." width={640} height={979} loading="lazy" />
              <div>
                <h3>The comic</h3>
                <p>My Genes and Longevity, a short comic about genetics and ageing made for the project in 2023.</p>
              </div>
            </a>
            <a className="card archive-card" href="/example/">
              <Icon name="table" size={26} />
              <h3>A first-generation report</h3>
              <p>The longevity report as the OakVar modules rendered it, kept as a static page.</p>
            </a>
            <a className="card archive-card" href={links.gen1Tutorial}>
              <Icon name="play" size={26} />
              <h3>The original tutorial</h3>
              <p>How the hosted first-generation platform worked, on YouTube.</p>
            </a>
          </div>
          <div className="support">
            <h3>The first-generation team on GitHub</h3>
            <ul>
              {gen1Team.map((handle) => (
                <li key={handle}>
                  <a href={`https://github.com/${handle}`}>@{handle}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
