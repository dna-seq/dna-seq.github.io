/**
 * The graphical abstract: how evidence becomes a module, how a module reaches the app, and what
 * stays on the user's computer. Two drawings of one mechanism: a left-to-right flow for wide
 * screens and a top-to-bottom one for phones, so labels stay at reading size on both.
 * Colours come from the page's CSS (classes ga-*), so both themes work.
 */

type BoxProps = { x: number; y: number; w: number; h: number; className?: string };

function Box({ x, y, w, h, className = "ga-box" }: BoxProps) {
  return <rect x={x} y={y} width={w} height={h} rx={10} className={className} />;
}

function Title({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="ga-title">
      {children}
    </text>
  );
}

function Sub({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="ga-sub">
      {children}
    </text>
  );
}

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="ga-label">
      {children}
    </text>
  );
}

function Step({ x, y, n, children }: { x: number; y: number; n: number; children: string }) {
  return (
    <g className="ga-step">
      <circle cx={x} cy={y - 5} r={11} />
      <text x={x} y={y - 0.5} textAnchor="middle" className="ga-step-n">
        {n}
      </text>
      <text x={x + 18} y={y} className="ga-step-label">
        {children}
      </text>
    </g>
  );
}

/** Marker ids must be unique per document, and both drawings live on one page. */
function Defs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker id={`${prefix}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" className="ga-head" />
      </marker>
      <marker id={`${prefix}-arrow-accent`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" className="ga-head-accent" />
      </marker>
      <marker id={`${prefix}-arrow-brand`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" className="ga-head-brand" />
      </marker>
    </defs>
  );
}

const claim =
  "Published evidence is written into modules with an AI assistant, modules are shared through an open catalog, and Just-DNA-Lite on your computer reads your genome with them and with PGS Catalog scores. The genome file never leaves your computer.";

function Wide() {
  const p = "gaw";
  return (
    <svg className="ga ga-wide" viewBox="0 0 1160 560" role="img" aria-label={claim}>
      <Defs prefix={p} />

      <Step x={58} y={34} n={1}>Evidence</Step>
      <Step x={348} y={34} n={2}>Write</Step>
      <Step x={622} y={34} n={3}>Share</Step>
      <Step x={1000} y={34} n={4}>Read</Step>

      {/* 1. Evidence */}
      <Box x={20} y={90} w={200} h={60} />
      <Title x={120} y={115}>Papers</Title>
      <Sub x={120} y={134}>PubMed, Europe PMC</Sub>
      <Box x={20} y={162} w={200} h={78} />
      <Title x={120} y={186}>Public databases</Title>
      <Sub x={120} y={205}>ClinVar, GWAS Catalog,</Sub>
      <Sub x={120} y={222}>ClinPGx, CPIC, CIViC</Sub>
      <Box x={20} y={318} w={200} h={60} />
      <Title x={120} y={343}>PGS Catalog</Title>
      <Sub x={120} y={362}>published score models</Sub>

      {/* 2. Write */}
      <Box x={300} y={90} w={220} h={150} />
      <Title x={410} y={116}>Your AI assistant</Title>
      <Sub x={410} y={135}>Claude Code or Codex</Sub>
      <rect x={316} y={150} width={188} height={34} rx={8} className="ga-chip-accent" />
      <text x={410} y={172} textAnchor="middle" className="ga-chip-text">just-module-creator</text>
      <Sub x={410} y={206}>a row per claim, a paper per row,</Sub>
      <Sub x={410} y={223}>every ID and citation checked</Sub>

      {/* 3. Share */}
      <Box x={590} y={90} w={180} h={150} />
      <Title x={680} y={114}>Module catalog</Title>
      <rect x={604} y={126} width={152} height={44} rx={8} className="ga-inner" />
      <text x={680} y={145} textAnchor="middle" className="ga-inner-title">Polygon</text>
      <Sub x={680} y={161}>rehearse, deletable</Sub>
      <rect x={604} y={186} width={152} height={44} rx={8} className="ga-inner" />
      <text x={680} y={205} textAnchor="middle" className="ga-inner-title">Catalog</text>
      <Sub x={680} y={221}>versioned, immutable</Sub>
      <line x1={680} y1={170} x2={680} y2={184} className="ga-line" markerEnd={`url(#${p}-arrow)`} />

      {/* 4. Read: the local boundary */}
      <rect x={830} y={56} width={310} height={490} rx={16} className="ga-local" />
      <rect x={848} y={46} width={124} height={20} rx={10} className="ga-local-tag" />
      <text x={910} y={60} textAnchor="middle" className="ga-local-tag-text">Your computer</text>

      <rect x={850} y={84} width={160} height={56} rx={10} className="ga-file" />
      <Title x={930} y={107}>Your genome</Title>
      <Sub x={930} y={126}>VCF file, GRCh38</Sub>

      <Box x={850} y={180} w={270} h={198} className="ga-box ga-app" />
      <Title x={985} y={205}>Just-DNA-Lite</Title>
      <Sub x={985} y={224}>web interface on your computer</Sub>
      <rect x={866} y={238} width={238} height={36} rx={8} className="ga-chip" />
      <text x={985} y={261} textAnchor="middle" className="ga-chip-text">annotation engine</text>
      <rect x={866} y={286} width={238} height={32} rx={8} className="ga-chip-accent" />
      <text x={985} y={307} textAnchor="middle" className="ga-chip-text">MCP server</text>
      <rect x={866} y={330} width={238} height={36} rx={8} className="ga-chip" />
      <text x={985} y={353} textAnchor="middle" className="ga-chip-text">just-prs scores</text>

      <Box x={850} y={430} w={270} h={68} />
      <Title x={985} y={457}>Your report</Title>
      <Sub x={985} y={477}>plain language, sources, Parquet</Sub>
      <text x={985} y={530} textAnchor="middle" className="ga-local-note">Nothing in here is uploaded</text>

      {/* Flows */}
      <path d="M220 120H245V201H220" className="ga-line" fill="none" />
      <line x1={245} y1={160} x2={298} y2={160} className="ga-line" markerEnd={`url(#${p}-arrow)`} />
      <Label x={271} y={152}>read</Label>

      <line x1={520} y1={165} x2={588} y2={165} className="ga-line" markerEnd={`url(#${p}-arrow)`} />
      <Label x={554} y={157}>publish</Label>

      <path d="M770 208H815V256H864" className="ga-line ga-line-brand" fill="none" markerEnd={`url(#${p}-arrow-brand)`} />
      <Label x={800} y={198}>install</Label>

      <line x1={930} y1={140} x2={930} y2={178} className="ga-line ga-line-brand" markerEnd={`url(#${p}-arrow-brand)`} />
      <Label x={942} y={164} anchor="start">read locally</Label>

      <line x1={220} y1={348} x2={864} y2={348} className="ga-line" markerEnd={`url(#${p}-arrow)`} />
      <Label x={540} y={340}>scoring files, downloaded once</Label>

      <path d="M410 242V302H864" className="ga-line ga-line-accent" fill="none" markerStart={`url(#${p}-arrow-accent)`} markerEnd={`url(#${p}-arrow-accent)`} />
      <Label x={640} y={294}>MCP: try a draft on your own genomes</Label>

      <line x1={985} y1={378} x2={985} y2={428} className="ga-line ga-line-brand" markerEnd={`url(#${p}-arrow-brand)`} />
      <Label x={997} y={408} anchor="start">writes</Label>
    </svg>
  );
}

function Narrow() {
  const p = "gan";
  return (
    <svg className="ga ga-narrow" viewBox="0 0 380 936" role="img" aria-label={claim}>
      <Defs prefix={p} />

      <Step x={30} y={22} n={1}>Evidence</Step>
      <Box x={20} y={38} w={160} h={56} />
      <Title x={100} y={61}>Papers</Title>
      <Sub x={100} y={80}>PubMed, Europe PMC</Sub>
      <Box x={196} y={38} w={160} h={56} />
      <Title x={276} y={61}>Databases</Title>
      <Sub x={276} y={80}>ClinVar, GWAS, ClinPGx</Sub>
      <Box x={20} y={124} w={140} h={52} />
      <Title x={90} y={146}>PGS Catalog</Title>
      <Sub x={90} y={164}>score models</Sub>

      <path d="M100 94V110H276V94" className="ga-line" fill="none" />
      <line x1={188} y1={110} x2={188} y2={220} className="ga-line" markerEnd={`url(#${p}-arrow)`} />
      <Label x={198} y={160} anchor="start">read</Label>
      <path d="M20 150H7V797H44" className="ga-line" fill="none" markerEnd={`url(#${p}-arrow)`} />

      {/* Everything from step 2 down sits 24 units lower, clear of the PGS Catalog box. */}
      <g transform="translate(0 24)">
      <Step x={30} y={186} n={2}>Write</Step>
      <Box x={20} y={198} w={336} h={110} />
      <Title x={188} y={222}>Your AI assistant</Title>
      <Sub x={188} y={240}>Claude Code or Codex</Sub>
      <rect x={36} y={252} width={304} height={34} rx={8} className="ga-chip-accent" />
      <text x={188} y={274} textAnchor="middle" className="ga-chip-text">just-module-creator</text>

      <line x1={188} y1={308} x2={188} y2={356} className="ga-line" markerEnd={`url(#${p}-arrow)`} />
      <Label x={198} y={337} anchor="start">publish</Label>

      <Step x={30} y={348} n={3}>Share</Step>
      <Box x={20} y={358} w={336} h={100} />
      <Title x={188} y={380}>Module catalog</Title>
      <rect x={36} y={392} width={140} height={52} rx={8} className="ga-inner" />
      <text x={106} y={413} textAnchor="middle" className="ga-inner-title">Polygon</text>
      <Sub x={106} y={431}>rehearse, deletable</Sub>
      <rect x={200} y={392} width={140} height={52} rx={8} className="ga-inner" />
      <text x={270} y={413} textAnchor="middle" className="ga-inner-title">Catalog</text>
      <Sub x={270} y={431}>versioned, immutable</Sub>
      <line x1={176} y1={418} x2={198} y2={418} className="ga-line" markerEnd={`url(#${p}-arrow)`} />

      <Step x={30} y={498} n={4}>Read</Step>
      <rect x={14} y={514} width={350} height={388} rx={16} className="ga-local" />
      <rect x={204} y={504} width={124} height={20} rx={10} className="ga-local-tag" />
      <text x={266} y={518} textAnchor="middle" className="ga-local-tag-text">Your computer</text>

      <line x1={270} y1={458} x2={270} y2={618} className="ga-line ga-line-brand" markerEnd={`url(#${p}-arrow-brand)`} />
      <Label x={280} y={580} anchor="start">install</Label>

      <rect x={36} y={534} width={160} height={52} rx={10} className="ga-file" />
      <Title x={116} y={556}>Your genome</Title>
      <Sub x={116} y={574}>VCF file, GRCh38</Sub>
      <line x1={116} y1={586} x2={116} y2={618} className="ga-line ga-line-brand" markerEnd={`url(#${p}-arrow-brand)`} />

      <Box x={30} y={620} w={318} h={180} className="ga-box ga-app" />
      <Title x={189} y={644}>Just-DNA-Lite</Title>
      <Sub x={189} y={662}>web interface on your computer</Sub>
      <rect x={46} y={674} width={286} height={34} rx={8} className="ga-chip" />
      <text x={189} y={696} textAnchor="middle" className="ga-chip-text">annotation engine</text>
      <rect x={46} y={716} width={286} height={32} rx={8} className="ga-chip-accent" />
      <text x={189} y={737} textAnchor="middle" className="ga-chip-text">MCP server</text>
      <rect x={46} y={756} width={286} height={34} rx={8} className="ga-chip" />
      <text x={189} y={778} textAnchor="middle" className="ga-chip-text">just-prs scores</text>

      <path d="M358 253H372V732H334" className="ga-line ga-line-accent" fill="none" markerStart={`url(#${p}-arrow-accent)`} markerEnd={`url(#${p}-arrow-accent)`} />

      <line x1={189} y1={800} x2={189} y2={828} className="ga-line ga-line-brand" markerEnd={`url(#${p}-arrow-brand)`} />
      <Box x={30} y={830} w={318} h={50} />
      <Title x={189} y={851}>Your report</Title>
      <Sub x={189} y={869}>plain language, sources, Parquet</Sub>
      <text x={189} y={896} textAnchor="middle" className="ga-local-note">Nothing in here is uploaded</text>
      </g>
    </svg>
  );
}

export function GraphicalAbstract() {
  return (
    <figure className="abstract">
      <div className="abstract-canvas">
        <Wide />
        <Narrow />
      </div>
      <figcaption>
        <span className="legend">
          <span className="legend-swatch legend-local" /> stays on your computer
        </span>
        <span className="legend">
          <span className="legend-swatch legend-mcp" /> optional: an assistant drives the app through MCP
        </span>
        <span className="legend-text">
          The genome file is read where it sits. Modules and scoring files are downloaded to it, never the other
          way round.
        </span>
      </figcaption>
    </figure>
  );
}
