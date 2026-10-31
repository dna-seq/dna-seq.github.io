/** Every outbound address the site uses, in one place, so a moved service is a one-line change. */
export const links = {
  site: "https://just-dna.life",
  demo: "https://lite.just-dna.life/",
  catalog: "https://module-registry.just-dna.life/ui/",
  catalogApiDocs: "https://module-registry.just-dna.life/docs",
  polygon: "https://module-polygon.just-dna.life/ui/",
  formatDocs: "https://just-dna.life/just-dna-compiler/",

  org: "https://github.com/dna-seq",
  lite: "https://github.com/dna-seq/just-dna-lite",
  liteFaq: "https://github.com/dna-seq/just-dna-lite/blob/main/docs/FAQ.md",
  liteScience: "https://github.com/dna-seq/just-dna-lite/blob/main/docs/SCIENCE_LITERACY.md",
  liteMcp: "https://github.com/dna-seq/just-dna-lite/blob/main/docs/MCP_SERVER.md",
  creator: "https://github.com/dna-seq/just-module-creator",
  creatorFto: "https://github.com/dna-seq/just-module-creator/tree/main/assets/fto_bmi",
  creatorBeyond: "https://github.com/dna-seq/just-module-creator/blob/main/docs/BEYOND_BASICS.md",
  prs: "https://github.com/dna-seq/just-prs",
  prsMcp: "https://github.com/dna-seq/just-prs-mcp",
  registry: "https://github.com/dna-seq/just-dna-registry",
  compiler: "https://github.com/dna-seq/just-dna-compiler",
  marketplace: "https://github.com/dna-seq/dna-seq-claude-marketplace",
  ensemblMcp: "https://github.com/dna-seq/ensembl-mcp",
  agents: "https://github.com/dna-seq/just-dna-agents",
  manuscriptSkills: "https://github.com/dna-seq/manuscript-skills",
  datagrid: "https://github.com/dna-seq/reflex-mui-datagrid",
  prepareAnnotations: "https://github.com/dna-seq/prepare-annotations",
  dnaSeqPipelines: "https://github.com/dna-seq/dna-seq",
  biomarkers: "https://github.com/dna-seq/just-biomarkers",
  rna: "https://github.com/dna-seq/just-rna",

  pypi: (name: string) => `https://pypi.org/project/${name}/`,

  telegram: "https://t.me/just_dna_seq",
  discord: "https://discord.com/invite/5WU6aSANXy",
  youtube: "https://www.youtube.com/channel/UCKJPXRJgi4Rxh9Lb1G_9SZw",
  tutorial: "https://www.youtube.com/watch?v=NcOiEUaIpUk",
  gen1Tutorial: "https://www.youtube.com/watch?v=H23UCty82ag",
  gen1Paper: "https://arxiv.org/abs/2403.19087",

  zenodoAnton: "https://zenodo.org/records/18370498",
  zenodoLivia: "https://zenodo.org/records/19487816",
  openHumans: "https://www.openhumans.org/",
  pgsCatalog: "https://www.pgscatalog.org/",
  uv: "https://docs.astral.sh/uv/getting-started/installation/",

  rogen: "https://rogen.umfcd.ro/",
  heales: "https://heales.org/",
  ibima: "https://ibima.med.uni-rostock.de/",
  ibar: "https://www.biochim.ro/",
  sbag: "https://aging-research.group/",
} as const;

export const site = {
  name: "Just-DNA",
  title: "Just-DNA: see what published studies say about your genome",
  description:
    "Free, open-source personal genomics. Just-DNA-Lite reads your genome file against studies on longevity, health risks, medicines and traits, on your own computer, and shows the papers behind every finding.",
  socialImage: "/img/social-card.png",
} as const;
