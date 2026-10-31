import { createElement, type ReactElement } from "react";
import type { Assets } from "../components/Layout.tsx";
import { HistoryPage } from "./history.tsx";
import { HomePage } from "./home.tsx";
import { NotFoundPage, RedirectPage } from "./misc.tsx";

export type Page = {
  /** Output file, relative to dist/. */
  file: string;
  render: (assets: Assets) => ReactElement;
};

/** First-generation pages that moved; their old addresses keep working. */
const moved: { file: string; to: string; from: string }[] = [
  { file: "how_it_works.html", to: "/#how", from: "How it works" },
  { file: "why_just_dna.html", to: "/history/", from: "Why Just-DNA-Seq" },
  { file: "just-dna-baby/index.html", to: "/history/", from: "Just-DNA-Baby" },
  { file: "dna-seq_stories/index.html", to: "/dna-stories/", from: "Just-DNA-Seq Stories" },
];

export const pages: Page[] = [
  { file: "index.html", render: (assets) => createElement(HomePage, { assets }) },
  { file: "history/index.html", render: (assets) => createElement(HistoryPage, { assets }) },
  { file: "404.html", render: (assets) => createElement(NotFoundPage, { assets }) },
  ...moved.map(({ file, to, from }) => ({ file, render: () => createElement(RedirectPage, { to, from }) })),
];
