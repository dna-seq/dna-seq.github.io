import type { ReactNode } from "react";
import { links, sections, site } from "../site.ts";
import { GitHubMark, Icon } from "./Icon.tsx";

export type Assets = { css: string; js: string };

export type PageMeta = {
  /** Path the page is served at, e.g. "/" or "/history/". */
  path: string;
  title: string;
  description: string;
  /** Pages that only redirect or report a miss stay out of search results. */
  noindex?: boolean;
};

/** Sets the theme before first paint (no flash) and marks the page as scripted for progressive enhancement. */
const themeBootstrap = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}})();`;

/** Section links resolve on any page: bare fragments on the home page, "/#id" elsewhere. */
function sectionHref(id: string, onHome: boolean): string {
  return onHome ? `#${id}` : `/#${id}`;
}

function Header({ onHome }: { onHome: boolean }) {
  const navLinks = (
    <>
      {sections.map((s) => (
        <a key={s.id} href={sectionHref(s.id, onHome)} data-nav={s.id}>
          {s.label}
        </a>
      ))}
      <a href="/history/">History</a>
    </>
  );
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="Just-DNA home">
          <img src="/img/logo-96.png" alt="" width={34} height={34} />
          <span>
            Just<span className="brand-dash">-</span>DNA
          </span>
        </a>
        <nav className="nav-desktop" aria-label="Main">
          {navLinks}
        </nav>
        <div className="header-actions">
          <button type="button" className="icon-button theme-toggle" data-theme-toggle aria-label="Switch colour theme">
            <Icon name="moon" className="theme-icon-dark" />
            <Icon name="sun" className="theme-icon-light" />
          </button>
          <a className="icon-button" href={links.org} aria-label="Just-DNA on GitHub">
            <GitHubMark />
          </a>
          <a className="button button-small button-primary header-cta" href={links.demo}>
            Try the demo
          </a>
          <details className="nav-mobile">
            <summary aria-label="Menu">
              <Icon name="menu" size={22} />
            </summary>
            <nav aria-label="Main (mobile)">
              {navLinks}
              <a href={links.demo}>Try the demo</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function Footer({ onHome }: { onHome: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand" href="/">
            <img src="/img/logo-96.png" alt="" width={34} height={34} />
            <span>
              Just<span className="brand-dash">-</span>DNA
            </span>
          </a>
          <p>
            Open-source personal genomics: read your genome against published evidence, on your own computer.
          </p>
          <p className="footer-note">
            Research and education software. Nothing here is a diagnosis or medical advice.
          </p>
        </div>
        <div>
          <h2>Use</h2>
          <ul>
            <li><a href={links.demo}>Public demo</a></li>
            <li><a href={sectionHref("install", onHome)}>Install Just-DNA-Lite</a></li>
            <li><a href={links.catalog}>Module catalog</a></li>
            <li><a href={sectionHref("write", onHome)}>Write a module</a></li>
            <li><a href={links.prs}>just-prs</a></li>
          </ul>
        </div>
        <div>
          <h2>Learn</h2>
          <ul>
            <li><a href={links.liteFaq}>FAQ</a></li>
            <li><a href={links.liteScience}>Understanding your genome</a></li>
            <li><a href={links.formatDocs}>Module format docs</a></li>
            <li><a href={links.catalogApiDocs}>Registry API</a></li>
            <li><a href="/history/">History of the project</a></li>
          </ul>
        </div>
        <div>
          <h2>Community</h2>
          <ul>
            <li><a href={links.org}>GitHub</a></li>
            <li><a href={links.telegram}>Telegram</a></li>
            <li><a href={links.discord}>Discord</a></li>
            <li><a href={links.youtube}>YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Just-DNA-Lite is AGPL-3.0; the libraries and plugins are MIT.</span>
        <a href={links.org}>github.com/dna-seq</a>
      </div>
    </footer>
  );
}

export function Layout({ meta, assets, children }: { meta: PageMeta; assets: Assets; children: ReactNode }) {
  const onHome = meta.path === "/";
  const canonical = `${links.site}${meta.path}`;
  const image = `${links.site}${site.socialImage}`;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {meta.noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={canonical} />}
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#0a1820" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={image} />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png" />
        <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <link rel="stylesheet" href={assets.css} />
        <script type="module" src={assets.js} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header onHome={onHome} />
        <main id="main">{children}</main>
        <Footer onHome={onHome} />
      </body>
    </html>
  );
}
