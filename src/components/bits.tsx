import type { ReactNode } from "react";

/** GitHub's mark, the one brand glyph on the site. */
export function GitHubMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path
        fill="currentColor"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

/** Lucide's arrow-right and play, stroked at 2 on a 24 grid. */
export function ArrowRight({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="icon" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function Play({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="icon" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

/** A command block with its real context as the caption and a copy button the script wires. */
export function Code({ caption, children }: { caption: string; children: string }) {
  return (
    <figure className="code">
      <figcaption>{caption}</figcaption>
      <pre>
        <code>{children.trim()}</code>
      </pre>
      <button type="button" className="copy" data-copy>
        Copy
      </button>
    </figure>
  );
}

/**
 * Two to four real states behind a segmented control. Without script the control hides and every
 * panel shows in order, each under its own name.
 */
export function Switch({ id, label, panels }: { id: string; label: string; panels: { id: string; label: string; body: ReactNode }[] }) {
  return (
    <div className="switch" data-switch>
      <div className="seg" role="tablist" aria-label={label}>
        {panels.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            id={`${id}-${p.id}-tab`}
            aria-controls={`${id}-${p.id}`}
            aria-selected={i === 0}
            tabIndex={i === 0 ? 0 : -1}
          >
            {p.label}
          </button>
        ))}
      </div>
      {panels.map((p) => (
        <div key={p.id} role="tabpanel" id={`${id}-${p.id}`} aria-labelledby={`${id}-${p.id}-tab`} className="switch-panel">
          <p className="switch-name">{p.label}</p>
          {p.body}
        </div>
      ))}
    </div>
  );
}

/** A capture of the real product, framed in the theme and swappable for a newer one. */
export function Shot({
  slot,
  src,
  alt,
  width,
  height,
  caption,
  position,
  className,
  priority,
}: {
  slot: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
  position?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`shot ${className ?? ""}`}>
      <div className="shot-frame" data-slot={slot} data-kind="product" data-alt={alt}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/** A tab page's first screen: the head, one line and at most two actions, then the page starts. */
export function Banner({ title, lead, children }: { title: ReactNode; lead: ReactNode; children?: ReactNode }) {
  return (
    <section className="banner">
      <div className="container banner-inner">
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children ? <div className="actions">{children}</div> : null}
      </div>
    </section>
  );
}
