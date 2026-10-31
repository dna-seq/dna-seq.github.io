import type { ReactElement } from "react";

/** The hashed stylesheet and script a build produced, as the pages link them. */
export type Assets = { css: string; js: string };

export type Page = {
  /** Output file, relative to dist/. */
  file: string;
  render: (assets: Assets) => ReactElement;
};
