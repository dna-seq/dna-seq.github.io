import type { Assets } from "../page-types.ts";
import { links } from "../site.ts";
import { Banner, Switch } from "../components/bits.tsx";
import { Chrome } from "../components/Chrome.tsx";

const reasons: [string, string][] = [
  ["You see the source", "Each claim names its paper or database."],
  ["Your file stays home", "The app never uploads your genome."],
  ["You choose what to read", "Anyone can add a module to the catalog."],
];

const timeline: [string, string][] = [
  ["2022", "Just-DNA-Seq: longevity, cancer, heart and drug modules for OakVar."],
  ["2024", "The first generation is published on arXiv."],
  ["2025", "Just-DNA-Lite begins, with modules as data."],
  ["2026", "The catalog, the plugins and the public demo ship."],
];

const people: [string, string?][] = [
  ["Anton Kulaga", "https://github.com/antonkulaga"],
  ["Nikolay Usanov"],
  ["Olga Borysova", "https://github.com/OlgaBorysova"],
  ["Alexey Karmazin", "https://github.com/Alex-Karmazin"],
  ["Maria Koval", "https://github.com/marfantyk"],
  ["Malvina Pushkareva"],
  ["Livia Zaharia"],
  ["Georg Fuellen"],
  ["Robi Tacutu"],
];

const supporters: [string, string][] = [
  ["IBIMA, Rostock University Medical Center", links.ibima],
  ["Institute of Biochemistry of the Romanian Academy", links.ibar],
  ["ROGEN consortium", links.rogen],
  ["HEALES", links.heales],
  ["Systems Biology of Aging Group", links.sbag],
];

export function AboutPage({ assets }: { assets: Assets }) {
  return (
    <Chrome
      meta={{
        path: "/about/",
        title: "About, Just-DNA",
        description: "Why Just-DNA exists, how it grew from Just-DNA-Seq in 2022 to Just-DNA-Lite, and the people and institutions behind it.",
        tab: "about",
      }}
      assets={assets}
    >
      <Banner title="Why we built Just-DNA." lead="Commercial reports choose what you read and rarely show why." />

      <section className="section section--flush" aria-labelledby="instead-title">
        <div className="container rows-layout">
          <div>
            <h2 id="instead-title">What we wanted instead</h2>
            <p className="rows-more">It began in longevity research.</p>
          </div>
          <dl className="rows">
            {reasons.map(([title, line]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{line}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--well" aria-labelledby="who-title">
        <div className="container">
          <h2 id="who-title">The project and its people</h2>
          <Switch
            id="who"
            label="The project and its people"
            panels={[
              {
                id: "timeline",
                label: "Since 2022",
                body: (
                  <ol className="timeline">
                    {timeline.map(([year, text]) => (
                      <li key={year}>
                        <time>{year}</time>
                        <span>
                          {text}
                          {year === "2024" ? (
                            <>
                              {" "}
                              <a href="/history/">The first generation</a>
                            </>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ol>
                ),
              },
              {
                id: "people",
                label: "People",
                body: (
                  <div className="stack">
                    <p>Anton Kulaga and Nikolay Usanov are the core developers.</p>
                    <ul className="names">
                      {people.map(([name, href]) => (
                        <li key={name}>{href ? <a href={href}>{name}</a> : name}</li>
                      ))}
                      <li>and every author in the catalog</li>
                    </ul>
                  </div>
                ),
              },
              {
                id: "support",
                label: "Support",
                body: (
                  <div className="stack">
                    <p>Anton Kulaga is funded through the ROGEN consortium.</p>
                    <ul className="names">
                      {supporters.map(([name, href]) => (
                        <li key={name}>
                          <a href={href}>{name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="band band--ink" aria-labelledby="talk-title">
        <div className="container band-split">
          <div className="band-copy">
            <h2 id="talk-title">Questions? Ask the team.</h2>
            <div className="actions">
              <a className="btn btn--on-ink" href={links.telegram}>
                Telegram
              </a>
              <a className="btn btn--on-ink" href={links.discord}>
                Discord
              </a>
              <a className="btn btn--on-ink" href={links.youtube}>
                YouTube
              </a>
              <a className="btn btn--on-ink" href={links.org}>
                GitHub
              </a>
            </div>
          </div>
          <a className="comic" href="/dna-stories/">
            <span className="comic-frame" data-slot="comic" data-alt="Cover of the comic My Genes and Longevity">
              <img src="/img/comic-cover.webp" alt="" width={640} height={979} loading="lazy" />
            </span>
            <span>Read the comic, My Genes and Longevity</span>
          </a>
        </div>
      </section>
    </Chrome>
  );
}
