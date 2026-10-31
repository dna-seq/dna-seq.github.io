import type { Assets } from "../page-types.ts";
import { Banner } from "../components/bits.tsx";
import { Chrome, tabs } from "../components/Chrome.tsx";

const where: Record<string, string> = {
  report: "What a report shows.",
  modules: "Every topic in the catalog.",
  start: "From a file to a report.",
  contribute: "Write a module.",
  developers: "Libraries and plugins.",
  about: "Why, and who.",
};

export function NotFoundPage({ assets }: { assets: Assets }) {
  return (
    <Chrome meta={{ path: "/404.html", title: "Page not found, Just-DNA", description: "This page does not exist.", noindex: true }} assets={assets}>
      <Banner title="This page is not here." lead="The site was rebuilt in 2026 and some first-generation pages moved.">
        <a className="btn btn--primary" href="/">
          Go to the home page
        </a>
        <a className="btn" href="/history/">
          The first generation
        </a>
      </Banner>
      <section className="section section--flush" aria-labelledby="where-title">
        <div className="container">
          <h2 id="where-title" className="visually-hidden">
            The site’s tabs
          </h2>
          <ul className="where">
            {tabs.slice(1).map((t) => (
              <li key={t.id}>
                <a href={t.href}>
                  <b>{t.label}</b>
                  <span>{where[t.id]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Chrome>
  );
}

/**
 * A first-generation URL that now lives elsewhere. GitHub Pages serves no redirects, so this is a
 * static page with a meta refresh, a canonical link and a visible link for readers without either.
 */
export function RedirectPage({ to, from }: { to: string; from: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Moved, Just-DNA</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://just-dna.life${to}`} />
        <meta httpEquiv="refresh" content={`0; url=${to}`} />
      </head>
      <body>
        <p>
          {from} moved to <a href={to}>{to}</a>.
        </p>
      </body>
    </html>
  );
}
