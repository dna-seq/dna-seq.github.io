/** One module as the site shows it, projected from the registry's catalog listing. */
export type CatalogModule = {
  namespace: string;
  name: string;
  title: string;
  description: string;
  color: string | null;
  version: string;
  genomeBuild: string | null;
  license: string | null;
  downloads: number;
  updatedAt: string | null;
  /** Distinct variants in the module's variants.csv only: 0 for drug-response and combined-result modules. */
  variantCount: number;
  geneCount: number;
  studyCount: number;
  /** Genotype rows flagged pathogenic or likely pathogenic (one per zygosity), not a variant count. */
  pathogenicCount: number;
  benignCount: number;
};

export type CatalogSnapshot = {
  registry: string;
  fetchedAt: string;
  total: number;
  modules: CatalogModule[];
};
