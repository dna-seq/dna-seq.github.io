import snapshot from "./catalog.json" with { type: "json" };
import type { CatalogModule, CatalogSnapshot } from "./catalog-types.ts";

export const catalog: CatalogSnapshot = snapshot;

const number = new Intl.NumberFormat("en-US");

function counted(n: number, word: string): string {
  return `${number.format(n)} ${word}${n === 1 ? "" : "s"}`;
}

/**
 * What a card says about a module's size, worded the way the app's Module Catalog words it.
 *
 * `variantCount` counts variants.csv alone, so a drug-response or combined-result module publishes 0
 * while it has rows: it shows the genes it reads instead. The pathogenic counter counts genotype rows,
 * not variants, so a ClinVar panel gets a label without a number.
 */
export function sizeLabels(module: CatalogModule): string[] {
  const labels: string[] = [];
  if (module.variantCount > 0) {
    labels.push(counted(module.variantCount, "variant"));
    if (module.geneCount > 0) labels.push(counted(module.geneCount, "gene"));
  } else if (module.geneCount > 0) {
    labels.push(counted(module.geneCount, "gene"));
  }
  if (module.pathogenicCount > 0) labels.push("ClinVar pathogenic");
  return labels;
}

export function moduleUrl(module: CatalogModule): string {
  const ns = encodeURIComponent(module.namespace);
  const name = encodeURIComponent(module.name);
  return `${catalog.registry}/ui/#/m/${ns}/${name}`;
}

/** Namespaces by module count, largest first; ties alphabetical. */
export function namespaces(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const m of catalog.modules) counts.set(m.namespace, (counts.get(m.namespace) ?? 0) + 1);
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function snapshotDate(): string {
  return new Date(catalog.fetchedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
