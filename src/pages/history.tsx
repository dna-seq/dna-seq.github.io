import type { Assets } from "../page-types.ts";
import { links } from "../site.ts";
import { Banner, Switch } from "../components/bits.tsx";
import { Chrome } from "../components/Chrome.tsx";

const gen1: { icon: string; title: string; repo: string; now: string }[] = [
  { icon: "gen1-longevity-variants.webp", title: "Longevity variants", repo: "just_longevitymap", now: "Longevity Map" },
  { icon: "gen1-oncorisks.webp", title: "Hereditary cancer", repo: "just_cancer", now: "Cancer" },
  { icon: "gen1-cardiohereditary.webp", title: "Cardiovascular", repo: "just_cardio", now: "Cardio and Coronary" },
  { icon: "gen1-longevity-drugs.webp", title: "Drugs", repo: "just_drugs", now: "Pharmacogenomics" },
  { icon: "gen1-thrombophilia.webp", title: "Thrombophilia", repo: "just_thrombophilia", now: "Thrombophilia" },
  { icon: "gen1-lipidmetabolism.webp", title: "Lipid metabolism", repo: "just_lipidmetabolism", now: "Lipid Metabolism" },
  { icon: "gen1-longevity-prs.webp", title: "Longevity score", repo: "prs", now: "just-prs" },
];

const changes: [string, string, string][] = [
  ["Engine", "OakVar modules", "Its own engine on Polars and DuckDB"],
  ["New content", "A new plugin release", "Install from the catalog"],
  ["Who writes modules", "The core team", "Anyone, with just-module-creator"],
  ["Where it runs", "A hosted service", "Your computer"],
  ["One genome", "About 100 minutes", "About 33 seconds"],
];

export function HistoryPage({ assets }: { assets: Assets }) {
  return (
    <Chrome
      meta={{
        path: "/history/",
        title: "The first generation, Just-DNA",
        description: "Just-DNA-Seq, the first generation (2022 to 2024): its OakVar modules, what replaced each one, what changed in Just-DNA-Lite, and the archive.",
        tab: "about",
      }}
      assets={assets}
    >
      <Banner title="The first generation." lead="Just-DNA-Seq, 2022 to 2024: longevity and health modules for OakVar, now retired.">
        <a className="btn" href="/example/">
          Open an archived report
        </a>
      </Banner>

      <section className="section section--flush" aria-labelledby="gen1-title">
        <div className="container">
          <h2 id="gen1-title">What it shipped, and what changed</h2>
          <Switch
            id="gen1"
            label="The first generation"
            panels={[
              {
                id: "modules",
                label: "The modules",
                body: (
          <table className="index index--gen1">
            <caption className="visually-hidden">First-generation modules and what replaced them</caption>
            <thead>
              <tr>
                <th scope="col">Module</th>
                <th scope="col">Repository</th>
                <th scope="col">Now</th>
              </tr>
            </thead>
            <tbody>
              {gen1.map((m) => (
                <tr key={m.repo}>
                  <th scope="row">
                    <span className="gen1-name">
                      <img src={`/img/${m.icon}`} alt="" width={44} height={40} loading="lazy" />
                      {m.title}
                    </span>
                  </th>
                  <td data-label="Repository">
                    <a href={`https://github.com/dna-seq/${m.repo}`}>{m.repo}</a>
                  </td>
                  <td data-label="Now">{m.now}</td>
                </tr>
              ))}
            </tbody>
          </table>
                ),
              },
              {
                id: "changes",
                label: "What changed",
                body: (
                  <>
          <table className="index index--compare">
            <caption className="visually-hidden">Just-DNA-Seq compared with Just-DNA-Lite</caption>
            <thead>
              <tr>
                <td />
                <th scope="col">Just-DNA-Seq</th>
                <th scope="col">Just-DNA-Lite</th>
              </tr>
            </thead>
            <tbody>
              {changes.map(([row, before, after]) => (
                <tr key={row}>
                  <th scope="row">{row}</th>
                  <td data-label="Just-DNA-Seq">{before}</td>
                  <td data-label="Just-DNA-Lite">{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="caption module-foot">Speed is one public genome on one workstation.</p>
                  </>
                ),
              },
              {
                id: "archive",
                label: "The archive",
                body: (
          <ul className="archive">
            <li>
              <a href={links.gen1Paper}>The paper</a>
              <span>Kulaga A. et al. (2024), arXiv:2403.19087</span>
            </li>
            <li>
              <a href="/dna-stories/">The comic</a>
              <span>My Genes and Longevity, 2023</span>
            </li>
            <li>
              <a href="/example/">A report</a>
              <span>The longevity report, kept as a static page</span>
            </li>
            <li>
              <a href={links.gen1Tutorial}>The tutorial</a>
              <span>The hosted platform, on YouTube</span>
            </li>
          </ul>
                ),
              },
            ]}
          />
        </div>
      </section>
    </Chrome>
  );
}
