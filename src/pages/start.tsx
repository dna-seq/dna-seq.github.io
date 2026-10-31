import type { Assets } from "../page-types.ts";
import { links } from "../site.ts";
import { Banner, Code, Play, Switch } from "../components/bits.tsx";
import { Chrome } from "../components/Chrome.tsx";

export function StartPage({ assets }: { assets: Assets }) {
  return (
    <Chrome
      meta={{
        path: "/start/",
        title: "Get started, Just-DNA",
        description: "Get a genome file, install Just-DNA-Lite on Linux, macOS or Windows, and read your first report. The public demo needs neither.",
        tab: "start",
      }}
      assets={assets}
    >
      <Banner title="Your first report in three steps." lead="You need a genome file and a computer. The demo needs neither.">
        <a className="btn btn--primary" href={links.demo}>
          Try the demo
        </a>
      </Banner>

      <section className="section section--flush" aria-label="Three steps">
        <ol className="container stages">
          <li className="plastic stage" style={{ ["--t" as string]: "var(--p-wed)" }}>
            <div className="stage-copy">
              <h2>Get your genome file</h2>
              <p>
                Order whole-genome sequencing from a service that lets you download a GRCh38 VCF, such as DNA
                Complete, Dante Labs or Sequencing.com. Chip files like 23andMe are planned, not supported yet.
              </p>
            </div>
            <div className="stage-side">
              <h3>No genome yet?</h3>
              <ul className="link-list">
                <li>
                  <a href={links.zenodoAnton}>Anton Kulaga’s genome</a>, CC0
                </li>
                <li>
                  <a href={links.zenodoLivia}>Livia Zaharia’s genome</a>, CC-BY-4.0
                </li>
                <li>
                  More on <a href={links.openHumans}>Open Humans</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="plastic stage" style={{ ["--t" as string]: "var(--p-thu)" }} id="install">
            <div className="stage-copy">
              <h2>Install Just-DNA-Lite</h2>
              <p>
                Install <a href={links.uv}>uv</a> once, then run four commands. The app opens at localhost:3000.
              </p>
            </div>
            <div className="stage-side">
              <Switch
                id="install"
                label="Ways to install"
                panels={[
                  {
                    id: "uv",
                    label: "uv",
                    body: (
                      <Code caption="Terminal">{`git clone https://github.com/dna-seq/just-dna-lite.git
cd just-dna-lite
uv sync
uv run start`}</Code>
                    ),
                  },
                  {
                    id: "container",
                    label: "Podman or Docker",
                    body: (
                      <Code caption="Terminal, then put your .vcf files in my_genomes">{`git clone https://github.com/dna-seq/just-dna-lite.git
cd just-dna-lite
mkdir -p my_genomes
podman-compose up --build`}</Code>
                    ),
                  },
                ]}
              />
            </div>
          </li>
          <li className="plastic stage" style={{ ["--t" as string]: "var(--p-fri)" }}>
            <div className="stage-copy">
              <h2>Choose topics and read</h2>
              <p>
                Pick modules and start. The ten default modules take about a minute on one workstation.
              </p>
              <p className="small">
                Questions? The <a href={links.liteFaq}>FAQ</a> and <a href={links.liteScience}>Understanding your genome</a>.
              </p>
            </div>
            <a className="video stage-side" href={links.tutorial}>
              <span className="video-frame" data-slot="start-tutorial" data-kind="product" data-alt="The video tutorial's opening frame">
                <img src="/img/tutorial.webp" alt="" width={1280} height={720} loading="lazy" />
              </span>
              <span className="video-caption">
                <Play size={20} /> Watch the video tutorial
              </span>
            </a>
          </li>
        </ol>
      </section>
    </Chrome>
  );
}
