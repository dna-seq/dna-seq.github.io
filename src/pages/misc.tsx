import { Icon } from "../components/Icon.tsx";
import { type Assets, Layout } from "../components/Layout.tsx";

export function NotFoundPage({ assets }: { assets: Assets }) {
  return (
    <Layout
      meta={{ path: "/404.html", title: "Page not found · Just-DNA", description: "This page does not exist.", noindex: true }}
      assets={assets}
    >
      <section className="page-hero page-hero-short">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1>This page is not here</h1>
          <p className="lead">
            The site was rebuilt in 2026 and some first-generation pages moved. The history page links to everything
            that was kept.
          </p>
          <div className="link-row">
            <a className="button button-primary" href="/">
              Home <Icon name="arrowRight" size={18} />
            </a>
            <a className="button button-secondary" href="/history/">
              History and archive
            </a>
          </div>
        </div>
      </section>
    </Layout>
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
        <title>Moved · Just-DNA</title>
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
