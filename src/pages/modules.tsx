import type { Assets } from "../page-types.ts";
import type { CatalogModule } from "../data/catalog-types.ts";
import { catalog, moduleUrl, namespaces, sizeLabels, snapshotDate } from "../data/catalog.ts";
import { links } from "../site.ts";
import { Banner, Shot, Switch } from "../components/bits.tsx";
import { Chrome } from "../components/Chrome.tsx";

/**
 * Topics a reader asks about, by module name. The catalog refreshes daily, so a module this map does
 * not know yet lands under "More topics" instead of disappearing.
 */
const topics: { title: string; names: string[] }[] = [
  { title: "Body and traits", names: ["blood_groups", "fut2_secretor", "apoe_epsilon", "hfe_compound_het", "lactose_tolerance", "smell"] },
  { title: "Long life", names: ["longevitymap", "superhuman"] },
  { title: "Inherited disease risk", names: ["cancer", "cardio", "pathogenic"] },
  { title: "Heart and blood", names: ["coronary", "lipidmetabolism", "thrombophilia"] },
  { title: "Medicines", names: ["pharmgkb", "placebo_response_research", "placebo_response_claude"] },
  { title: "Fitness", names: ["vo2max", "bodybuilding"] },
  { title: "Mind and behaviour", names: ["big_five_personality_snps", "cognitive_intelligence", "aggression_anger_snps", "risk_impulsivity_snps", "adhd_gwas_loci"] },
];

function grouped(): { title: string; modules: CatalogModule[] }[] {
  const placed = new Set<CatalogModule>();
  const groups = topics.map((t) => {
    const modules = catalog.modules.filter((m) => t.names.includes(m.name));
    for (const m of modules) placed.add(m);
    return { title: t.title, modules };
  });
  const rest = catalog.modules.filter((m) => !placed.has(m));
  return [...groups, { title: "More topics", modules: rest }].filter((g) => g.modules.length > 0);
}

/** Registry titles sometimes carry a subtitle after a dash; the list shows the short name. */
function shortTitle(title: string): string {
  return title.split(/\s[–—-]\s/)[0] ?? title;
}

export function ModulesPage({ assets }: { assets: Assets }) {
  const groups = grouped();
  const authors = namespaces().length;
  return (
    <Chrome
      meta={{
        path: "/modules/",
        title: "Modules, Just-DNA",
        description: "The annotation modules in the Just-DNA catalog, by topic: long life, inherited disease risk, medicines, body and traits, fitness, and mind and behaviour.",
        tab: "modules",
      }}
      assets={assets}
    >
      <Banner title="Choose what to read." lead={`${catalog.modules.length} modules from ${authors} authors, each one topic built from published studies.`} />

      <section className="section section--flush" aria-labelledby="topics-title">
        <div className="container">
          <div className="module-head">
            <h2 id="topics-title">Pick by topic</h2>

          </div>
          <Switch
            id="topic"
            label="Topics"
            panels={groups.map((g, i) => ({
              id: String(i),
              label: g.title,
              body: (
                <ul className="module-list" data-module-group>
                  {g.modules.map((m) => (
                    <li key={`${m.namespace}/${m.name}`} data-module={`${m.title} ${m.name} ${m.namespace} ${m.description}`.toLowerCase()}>
                      <a href={moduleUrl(m)} title={m.description}>
                        <span className="module-name">{shortTitle(m.title)}</span>
                        <span className="module-meta">
                          <span>{m.namespace}</span>
                          <span>{sizeLabels(m)[0] ?? `v${m.version}`}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ),
            }))}
          />
          <p className="caption module-foot">
            The catalog as of {snapshotDate()}. The <a href={links.catalog}>live catalog</a> may have newer modules.
          </p>
        </div>
      </section>

      <section className="section section--well" aria-labelledby="install-title">
        <div className="container split split--wide-visual">
          <div className="split-copy">
            <h2 id="install-title">Install them inside the app</h2>
            <p>Just-DNA-Lite lists the same catalog. Pick a module, choose a version, and it installs beside the built-in ones.</p>
            <div className="actions">
              <a className="btn" href={links.catalog}>
                Browse the live catalog
              </a>
            </div>
            <p className="small">
              Missing a topic? <a href="/contribute/">Write the module yourself</a>.
            </p>
          </div>
          <Shot
            slot="catalog"
            src="/img/catalog.webp"
            alt="The Module Catalog page in Just-DNA-Lite: a selected Longevity Map module with its version picker and a Get from catalog button, beside cards for other modules."
            width={1400}
            height={398}
            className="shot--strip"
          />
        </div>
      </section>
    </Chrome>
  );
}
