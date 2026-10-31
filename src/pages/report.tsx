import type { Assets } from "../page-types.ts";
import { links } from "../site.ts";
import { Banner, Shot, Switch } from "../components/bits.tsx";
import { Chrome } from "../components/Chrome.tsx";

const facts: [string, string][] = [
  ["Evidence you can follow", "rsIDs link to dbSNP, studies to PubMed."],
  ["Results in a sentence", "Blood group or APOE type as one plain answer."],
  ["Gaps are labelled", "Inferred genotypes and skipped modules say so."],
];

const cautions: [string, string][] = [
  ["Not a diagnosis", "Health decisions belong with a clinician or a genetic counsellor."],
  ["Red labels are common", "Healthy genomes carry variants once called pathogenic."],
  ["A score is a place on a chart", "Lifestyle often matters more than any common variant."],
  ["Worried? Ask a doctor", "A finding that matches your family history needs a clinical test."],
];

export function ReportPage({ assets }: { assets: Assets }) {
  return (
    <Chrome
      meta={{
        path: "/report/",
        title: "Your report, Just-DNA",
        description: "What a Just-DNA-Lite report shows: your genotype, what it means and the studies behind it, results in plain sentences, polygenic scores, and how to read them.",
        tab: "report",
      }}
      assets={assets}
    >
      <Banner title="Every finding names its studies." lead="Your genotype, what it means, and the papers behind it.">
        <a className="btn btn--primary" href={links.demo}>
          Try the demo
        </a>
      </Banner>

      <section className="section section--flush" aria-labelledby="parts-title">
        <div className="container">
          <h2 id="parts-title" className="visually-hidden">
            What a report holds
          </h2>
          <Switch
            id="report"
            label="What a report holds"
            panels={[
              {
                id: "findings",
                label: "Findings",
                body: (
                  <div className="workbench">
                    <Shot
                      slot="report"
                      src="/img/report.webp"
                      alt="The Longevity Variants report: totals of matched variants, then a table with genotype, zygosity and weight, and one FOXO3 finding opened to its conclusion and direction."
                      width={1400}
                      height={821}
                      priority
                      className="shot--wide"
                    />
                    <dl className="facts">
                      {facts.map(([title, line]) => (
                        <div key={title}>
                          <dt>{title}</dt>
                          <dd>{line}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ),
              },
              {
                id: "scores",
                label: "Polygenic scores",
                body: (
                  <div className="split">
                    <div className="split-copy">
                      <h3 className="panel-head">Every score model, side by side</h3>
                      <p>
                        Different studies built different models for one trait, and they often disagree.{" "}
                        <a href={links.prs}>just-prs</a> scores your genome with each PGS Catalog model.
                      </p>
                      <p className="note">Most models come from studies of European ancestry.</p>
                    </div>
                    <Shot
                      slot="scores"
                      src="/img/prs-ldl.webp"
                      alt="A polygenic score report for LDL cholesterol: summary tiles above a bell curve with each model’s position marked."
                      width={1300}
                      height={944}
                      className="shot--tall"
                      caption="101 LDL cholesterol models for one public genome."
                    />
                  </div>
                ),
              },
              {
                id: "reading",
                label: "How to read it",
                body: (
                  <div className="rows-layout">
                    <div>
                      <h3 className="panel-head">Before you read a result as news</h3>
                      <p className="rows-more">
                        <a href={links.liteScience}>Understanding your genome</a>
                      </p>
                    </div>
                    <dl className="rows">
                      {cautions.map(([title, line]) => (
                        <div key={title}>
                          <dt>{title}</dt>
                          <dd>{line}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>
    </Chrome>
  );
}
