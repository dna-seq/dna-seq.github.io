import { createElement } from "react";
import type { Page } from "../page-types.ts";
import { AboutPage } from "./about.tsx";
import { ContributePage } from "./contribute.tsx";
import { DevelopersPage } from "./developers.tsx";
import { HistoryPage } from "./history.tsx";
import { HomePage } from "./home.tsx";
import { NotFoundPage, RedirectPage } from "./misc.tsx";
import { ModulesPage } from "./modules.tsx";
import { ReportPage } from "./report.tsx";
import { StartPage } from "./start.tsx";

/** First-generation pages that moved; their old addresses keep working. */
const moved: { file: string; to: string; from: string }[] = [
  { file: "how_it_works.html", to: "/start/", from: "How it works" },
  { file: "why_just_dna.html", to: "/about/", from: "Why Just-DNA-Seq" },
  { file: "just-dna-baby/index.html", to: "/history/", from: "Just-DNA-Baby" },
  { file: "dna-seq_stories/index.html", to: "/dna-stories/", from: "Just-DNA-Seq Stories" },
];

export const pages: Page[] = [
  { file: "index.html", render: (assets) => createElement(HomePage, { assets }) },
  { file: "report/index.html", render: (assets) => createElement(ReportPage, { assets }) },
  { file: "modules/index.html", render: (assets) => createElement(ModulesPage, { assets }) },
  { file: "start/index.html", render: (assets) => createElement(StartPage, { assets }) },
  { file: "contribute/index.html", render: (assets) => createElement(ContributePage, { assets }) },
  { file: "developers/index.html", render: (assets) => createElement(DevelopersPage, { assets }) },
  { file: "about/index.html", render: (assets) => createElement(AboutPage, { assets }) },
  { file: "history/index.html", render: (assets) => createElement(HistoryPage, { assets }) },
  { file: "404.html", render: (assets) => createElement(NotFoundPage, { assets }) },
  ...moved.map(({ file, to, from }) => ({ file, render: () => createElement(RedirectPage, { to, from }) })),
];
