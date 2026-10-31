import type { ReactNode } from "react";
import type { Assets } from "../page-types.ts";
import { links, site } from "../site.ts";
import { GitHubMark } from "./bits.tsx";

export type TabId = "home" | "report" | "modules" | "start" | "contribute" | "developers" | "about";

/** The site's tabs, in order: readers first, then contributors, then developers, then the project. */
export const tabs: { id: TabId; href: string; label: string }[] = [
  { id: "home", href: "/", label: "Home" },
  { id: "report", href: "/report/", label: "Your report" },
  { id: "modules", href: "/modules/", label: "Modules" },
  { id: "start", href: "/start/", label: "Get started" },
  { id: "contribute", href: "/contribute/", label: "Contribute" },
  { id: "developers", href: "/developers/", label: "Developers" },
  { id: "about", href: "/about/", label: "About" },
];

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  tab?: TabId;
  noindex?: boolean;
};

/** Marks the page as scripted before first paint, so enhancements never flash. */
const bootstrap = `document.documentElement.classList.add("js");`;

/** Hallmark's slot helper: drops a stand-in that fails to load, swaps in the owner's files later. */
const slots = `window.hallmarkSlots=(m)=>{for(const[k,v]of Object.entries(m)){const s=document.querySelector('[data-slot="'+k+'"]');if(!s)continue;const im=new Image();im.src=typeof v==='string'?v:v.src;im.alt=(typeof v==='object'&&v.alt)||s.dataset.alt||'';s.querySelectorAll(':scope > img').forEach((o)=>o.remove());s.prepend(im);}};document.querySelectorAll('[data-slot] img').forEach((i)=>{if(i.complete&&!i.naturalWidth)i.remove();else i.addEventListener('error',()=>i.remove(),{once:true});});`;

function Masthead({ tab }: { tab?: TabId }) {
  return (
    <header className="masthead">
      <div className="container masthead-row">
        <a className="masthead-side" href={links.org}>
          <GitHubMark /> <span>dna-seq on GitHub</span>
        </a>
        <a className="wordmark" href="/" aria-label="Just-DNA, home">
          <img src="/img/logo-96.png" alt="" width={40} height={40} />
          <span>Just-DNA</span>
        </a>
        <a className="btn btn--primary btn--small masthead-action" href={links.demo}>
          Try the demo
        </a>
      </div>
      <nav className="tabs-wrap" aria-label="Site">
        <ul className="tabs" data-tabs>
          {tabs.map((t) => (
            <li key={t.id}>
              <a href={t.href} aria-current={t.id === tab ? "page" : undefined}>
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/** The tabs are in the masthead; the footer carries what lives off the site. */
const footerLinks: [string, string][] = [
  ["Public demo", links.demo],
  ["FAQ", links.liteFaq],
  ["Module format", links.formatDocs],
  ["Registry API", links.catalogApiDocs],
  ["The comic", "/dna-stories/"],
  ["GitHub", links.org],
  ["Telegram", links.telegram],
  ["Discord", links.discord],
  ["YouTube", links.youtube],
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-statement">Your genome stays on your computer. The studies stay open to read.</p>
        <ul className="footer-links">
          {footerLinks.map(([label, href]) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <p className="footer-legal">
          Research and education software, not medical advice. Just-DNA-Lite is AGPL-3.0; the libraries and
          plugins are MIT.
        </p>
      </div>
    </footer>
  );
}

export function Chrome({ meta, assets, children }: { meta: PageMeta; assets: Assets; children: ReactNode }) {
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
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png" />
        <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
        <link rel="stylesheet" href={assets.css} />
        <script type="module" src={assets.js} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Masthead tab={meta.tab} />
        <main id="main">{children}</main>
        <Footer />
        <script dangerouslySetInnerHTML={{ __html: slots }} />
      </body>
    </html>
  );
}
