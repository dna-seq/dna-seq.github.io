import type { ReactNode } from "react";
import { Icon } from "./Icon.tsx";

/**
 * A shell or prompt snippet with a copy button (the button appears only when scripts run). The
 * label row holds the button, so it never covers a long command.
 */
export function Code({ children, label = "Terminal" }: { children: string; label?: string }) {
  return (
    <div className="code">
      <div className="code-label">{label}</div>
      <pre>
        <code>{children.trim()}</code>
      </pre>
      <button type="button" className="copy" data-copy aria-label="Copy to clipboard">
        <Icon name="copy" size={16} className="copy-idle" />
        <Icon name="check" size={16} className="copy-done" />
      </button>
    </div>
  );
}

export type Tab = { id: string; label: string; body: ReactNode };

/**
 * Tabs that degrade to stacked, labelled panels without scripts: every panel renders visible with
 * its own heading, and the client script hides the inactive ones and reveals the tab list.
 */
export function Tabs({ id, tabs, label }: { id: string; tabs: Tab[]; label: string }) {
  return (
    <div className="tabs" data-tabs>
      <div className="tablist" role="tablist" aria-label={label}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${id}-tab-${tab.id}`}
            aria-controls={`${id}-panel-${tab.id}`}
            aria-selected={i === 0 ? "true" : "false"}
            tabIndex={i === 0 ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className="tabpanel"
          role="tabpanel"
          id={`${id}-panel-${tab.id}`}
          aria-labelledby={`${id}-tab-${tab.id}`}
        >
          <div className="tabpanel-label">{tab.label}</div>
          {tab.body}
        </div>
      ))}
    </div>
  );
}
