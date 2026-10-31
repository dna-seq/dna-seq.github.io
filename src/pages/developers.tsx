import type { Assets } from "../page-types.ts";
import { links } from "../site.ts";
import { Banner, Code, Switch } from "../components/bits.tsx";
import { Chrome } from "../components/Chrome.tsx";

const packages: [string, string][] = [
  ["just-prs", "Polygenic scores with ancestry percentiles"],
  ["prs-ui", "The polygenic score browser app"],
  ["just-dna-format", "The module schema and manifest"],
  ["just-dna-compiler", "Module folder to Parquet"],
  ["just-dna-enricher", "Places rsIDs, drafts rows"],
  ["just-dna-registry", "The catalog client"],
];

const plugins: [string, string, string][] = [
  ["ensembl", "Genes, variants and frequencies from Ensembl", links.ensemblMcp],
  ["just-prs", "Search, compare and compute polygenic scores locally", links.prsMcp],
  ["just-module-creator", "Write, check, compile and publish modules", links.creator],
  ["just-dna-agents", "Subagents and commands for module work", links.agents],
  ["manuscript-skills", "Prepares a manuscript for submission, any field", links.manuscriptSkills],
  ["just-dna-lite MCP", "Your samples, annotation jobs and results", links.liteMcp],
];

const repos: [string, string, string][] = [
  ["just-dna-lite", "The app, its pipeline and its MCP server", links.lite],
  ["just-module-creator", "The module-writing plugin", links.creator],
  ["just-prs", "Polygenic scores: library, CLI, app", links.prs],
  ["just-prs-mcp", "MCP server for just-prs", links.prsMcp],
  ["just-dna-compiler", "Format, compiler and enricher", links.compiler],
  ["just-dna-registry", "The catalog's server and client", links.registry],
  ["dna-seq-claude-marketplace", "The plugin catalog", links.marketplace],
  ["ensembl-mcp", "Live Ensembl lookups", links.ensemblMcp],
  ["just-dna-agents", "Agents for module work", links.agents],
  ["prepare-annotations", "Ensembl, ClinVar and dbSNP preparation", links.prepareAnnotations],
  ["reflex-mui-datagrid", "The data grid behind the app's tables", links.datagrid],
];

function Table({ caption, rows }: { caption: string; rows: [string, string, string?][] }) {
  return (
    <table className="index">
      <caption className="visually-hidden">{caption}</caption>
      <tbody>
        {rows.map(([name, what, href]) => (
          <tr key={name}>
            <th scope="row">
              <a href={href ?? links.pypi(name)}>{name}</a>
            </th>
            <td>{what}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function DevelopersPage({ assets }: { assets: Assets }) {
  return (
    <Chrome
      meta={{
        path: "/developers/",
        title: "Developers and researchers, Just-DNA",
        description: "The Python libraries, AI assistant plugins, MCP servers and repositories behind Just-DNA, with the module format and registry API.",
        tab: "developers",
      }}
      assets={assets}
    >
      <Banner title="Libraries, plugins and the code." lead="Score a VCF from a notebook, or give your assistant genomics tools.">
        <a className="btn btn--primary" href={links.org}>
          Open the GitHub organisation
        </a>
      </Banner>

      <section className="section section--flush" aria-labelledby="parts-title">
        <div className="container">
          <h2 id="parts-title">Use the parts on their own</h2>
          <Switch
            id="parts"
            label="Parts of the ecosystem"
            panels={[
              { id: "pypi", label: "On PyPI", body: <Table caption="Python packages on PyPI" rows={packages} /> },
              {
                id: "assistants",
                label: "For AI assistants",
                body: (
                  <div className="split split--top">
                    <Table caption="Plugins and MCP servers" rows={plugins} />
                    <div className="stack">
                      <Code caption="Claude Code">{`claude plugin marketplace add dna-seq/dna-seq-claude-marketplace
claude plugin install ensembl@dna-seq`}</Code>
                      <p className="note">Whatever you ask the assistant to read goes to the model provider. Anything that reads a genome runs on your machine.</p>
                    </div>
                  </div>
                ),
              },
              { id: "repos", label: "Repositories", body: <Table caption="Active repositories" rows={repos} /> },
            ]}
          />
        </div>
      </section>

      <section className="section section--well" aria-labelledby="try-title">
        <div className="container split split--top">
          <div className="split-copy">
            <h2 id="try-title">Two lines to a score</h2>
            <p>Python 3.13, and every result is a Parquet file.</p>
            <ul className="link-list">
              <li>
                <a href={links.formatDocs}>Module format reference</a>
              </li>
              <li>
                <a href={links.catalogApiDocs}>Registry API</a>
              </li>
              <li>
                <a href={links.liteMcp}>The app’s MCP server</a>
              </li>
              <li>
                <a href={links.gen1Paper}>The first-generation paper on arXiv</a>
              </li>
            </ul>
          </div>
          <div className="stack">
            <Code caption="Score a public genome">{`pip install just-prs
prs compute --vcf anton --pgs-id PGS000001`}</Code>
            <Code caption="Annotate a public genome">{`uv run annotate anton -m longevitymap`}</Code>
          </div>
        </div>
      </section>
    </Chrome>
  );
}
