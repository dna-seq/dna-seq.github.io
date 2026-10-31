import type { Assets } from "../page-types.ts";
import { links } from "../site.ts";
import { Banner, Code, GitHubMark, Switch } from "../components/bits.tsx";
import { Chrome } from "../components/Chrome.tsx";

const steps: [string, string][] = [
  ["Open a folder", "with the tables the module needs."],
  ["Draft from a source", "such as ClinVar, CPIC, ClinPGx or CIViC."],
  ["Decide what survives", "what each genotype means, and which paper backs it."],
  ["Place each variant", "on the genome, noting where each position came from."],
  ["Check", "what was written against what the sources say."],
  ["Compile", "into Parquet with a fingerprint, so it rebuilds the same."],
  ["Publish", "when you say so."],
];

const habits: [string, string][] = [
  ["A lookup shows a value, it does not paste it", "A later check compares the row with the same source."],
  ["A check that could not run stays unknown", "Nothing turns a failed lookup into a pass."],
  ["A quote is a sentence found in the paper", "The assistant fetches the article and quotes it word for word."],
  ["Most candidate rows get dropped", "In the FTO example, six of seven were, and its README says why."],
];

export function ContributePage({ assets }: { assets: Assets }) {
  return (
    <Chrome
      meta={{
        path: "/contribute/",
        title: "Contribute a module, Just-DNA",
        description: "Write an annotation module from papers with just-module-creator in Claude Code or Codex, check it, and publish it to the catalog under your name.",
        tab: "contribute",
      }}
      assets={assets}
    >
      <Banner title="Add a topic to the catalog." lead="Write a module from papers with Claude Code or Codex.">
        <a className="btn btn--primary" href="#plugin">
          Install the plugin
        </a>
      </Banner>

      <section className="section section--flush" id="plugin" aria-labelledby="plugin-title">
        <div className="container split split--top">
          <div className="split-copy">
            <h2 id="plugin-title">Install, then ask</h2>
            <p>
              A module is a table of claims, each tied to its paper. <a href={links.creator}>just-module-creator</a>{" "}
              helps your assistant write, check and compile one. It needs uv and Python 3.13.
            </p>
          </div>
          <div className="stack">
            <Switch
              id="plugin"
              label="Install the plugin"
              panels={[
                {
                  id: "claude",
                  label: "Claude Code",
                  body: (
                    <Code caption="Terminal">{`claude plugin marketplace add dna-seq/dna-seq-claude-marketplace
claude plugin install just-module-creator@dna-seq`}</Code>
                  ),
                },
                {
                  id: "codex",
                  label: "Codex",
                  body: (
                    <Code caption="Terminal">{`codex plugin marketplace add dna-seq/dna-seq-claude-marketplace
codex plugin add just-module-creator@dna-seq`}</Code>
                  ),
                },
              ]}
            />
            <Code caption="Then, in the assistant">{`/create-module caffeine metabolism, from this paper`}</Code>
          </div>
        </div>
      </section>

      <section className="section section--well" aria-labelledby="how-title">
        <div className="container">
          <h2 id="how-title">How a module gets made</h2>
          <Switch
            id="how"
            label="How a module gets made"
            panels={[
              {
                id: "steps",
                label: "The steps",
                body: (
                  <ol className="rows rows--numbered">
                    {steps.map(([title, line]) => (
                      <li key={title}>
                        <span>
                          <b>{title}</b> {line}
                        </span>
                      </li>
                    ))}
                  </ol>
                ),
              },
              {
                id: "habits",
                label: "The habits",
                body: (
                  <dl className="habits">
                    {habits.map(([title, line]) => (
                      <div key={title}>
                        <dt>{title}</dt>
                        <dd>{line}</dd>
                      </div>
                    ))}
                  </dl>
                ),
              },
              {
                id: "publish",
                label: "Publishing",
                body: (
                  <div className="publish">
                    <p className="publish-line">
                      Rehearse on the <a href={links.polygon}>polygon</a>, where test versions can be deleted. A version
                      on the <a href={links.catalog}>catalog</a> stays, so a module that installed yesterday installs the
                      same way tomorrow.
                    </p>
                    <p className="small">
                      Before publishing, the plugin can run your draft on genomes on your own machine through
                      Just-DNA-Lite. Drug response, star alleles and repeat counts have table kinds of their own:{" "}
                      <a href={links.creatorBeyond}>what more a module can carry</a>.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="band band--ink" aria-labelledby="talk-title">
        <div className="container band-row">
          <h2 id="talk-title">Ask before you start.</h2>
          <div className="actions">
            <a className="btn btn--on-ink" href={links.telegram}>
              Telegram
            </a>
            <a className="btn btn--on-ink" href={links.discord}>
              Discord
            </a>
            <a className="btn btn--on-ink" href={links.creator}>
              <GitHubMark size={18} /> just-module-creator
            </a>
            <a className="btn btn--on-ink" href={links.formatDocs}>
              Module format
            </a>
          </div>
        </div>
      </section>
    </Chrome>
  );
}
