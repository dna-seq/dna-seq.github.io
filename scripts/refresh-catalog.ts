/**
 * Refresh the module catalog snapshot the home page renders (src/data/catalog.json).
 *
 * The registry API sends no CORS headers, so the browser cannot read it from just-dna.life; the
 * site renders a snapshot at build time instead. The Pages workflow runs this before every build
 * (and daily), so the deployed catalog is at most a day old without a commit. Run it locally with
 * `bun run catalog` to update the committed fallback.
 *
 * A failed fetch exits non-zero and leaves the snapshot alone; the workflow treats that step as
 * optional, so an unreachable registry never takes the site down.
 */
import { join } from "node:path";
import type { CatalogModule, CatalogSnapshot } from "../src/data/catalog-types.ts";

const REGISTRY = process.env.REGISTRY_URL ?? "https://module-registry.just-dna.life";
const PER_PAGE = 100;
const target = join(import.meta.dir, "..", "src", "data", "catalog.json");

type RegistryStats = {
  variant_count?: number | null;
  gene_count?: number | null;
  study_count?: number | null;
  pathogenic_count?: number | null;
  benign_count?: number | null;
  categories?: string[] | null;
};

type RegistryItem = {
  namespace: string;
  name: string;
  title?: string | null;
  description?: string | null;
  short_description?: string | null;
  color?: string | null;
  latest_version: string;
  genome_build?: string | null;
  license?: string | null;
  downloads?: number | null;
  updated_at?: string | null;
  stats?: RegistryStats | null;
};

type RegistryPage = { items: RegistryItem[]; total: number; page: number; per_page: number };

async function fetchPage(page: number): Promise<RegistryPage> {
  const url = `${REGISTRY}/api/v1/modules?per_page=${PER_PAGE}&page=${page}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`${url} answered ${response.status} ${response.statusText}`);
  return (await response.json()) as RegistryPage;
}

function toModule(item: RegistryItem): CatalogModule {
  const stats = item.stats ?? {};
  return {
    namespace: item.namespace,
    name: item.name,
    title: item.title || item.name,
    description: item.short_description || item.description || "",
    color: item.color ?? null,
    version: item.latest_version,
    genomeBuild: item.genome_build ?? null,
    license: item.license ?? null,
    downloads: item.downloads ?? 0,
    updatedAt: item.updated_at ?? null,
    variantCount: stats.variant_count ?? 0,
    geneCount: stats.gene_count ?? 0,
    studyCount: stats.study_count ?? 0,
    pathogenicCount: stats.pathogenic_count ?? 0,
    benignCount: stats.benign_count ?? 0,
  };
}

const first = await fetchPage(1);
const items = [...first.items];
for (let page = 2; items.length < first.total; page++) {
  const next = await fetchPage(page);
  if (next.items.length === 0) break;
  items.push(...next.items);
}

const snapshot: CatalogSnapshot = {
  registry: REGISTRY,
  fetchedAt: new Date().toISOString(),
  total: first.total,
  modules: items.map(toModule).sort((a, b) => a.title.localeCompare(b.title)),
};

await Bun.write(target, JSON.stringify(snapshot, null, 2) + "\n");
const authors = new Set(snapshot.modules.map((m) => m.namespace)).size;
console.log(`catalog: ${snapshot.modules.length} modules from ${authors} namespaces -> ${target}`);
