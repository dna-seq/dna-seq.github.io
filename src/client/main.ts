/**
 * The only script the site ships. Everything it does is an enhancement: without it the pages still
 * read top to bottom, tabs render as stacked panels, and the catalog shows every module.
 */

function storeTheme(theme: string): void {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can be blocked (private windows, strict settings); the toggle still works for this page.
  }
}

function effectiveTheme(): "light" | "dark" {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function initThemeToggle(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")) {
    button.addEventListener("click", () => {
      const next = effectiveTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      storeTheme(next);
    });
  }
}

function initCopyButtons(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
    button.addEventListener("click", async () => {
      const code = button.parentElement?.querySelector("code")?.textContent ?? "";
      await navigator.clipboard.writeText(code);
      button.classList.add("copied");
      button.setAttribute("aria-label", "Copied");
      setTimeout(() => {
        button.classList.remove("copied");
        button.setAttribute("aria-label", "Copy to clipboard");
      }, 1600);
    });
  }
}

function initTabs(): void {
  for (const container of document.querySelectorAll<HTMLElement>("[data-tabs]")) {
    const tabs = [...container.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const select = (selected: HTMLButtonElement, focus: boolean) => {
      for (const tab of tabs) {
        const active = tab === selected;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute("aria-controls") ?? "");
        if (panel) panel.hidden = !active;
      }
      if (focus) selected.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab, false));
      tab.addEventListener("keydown", (event) => {
        const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (step === 0) return;
        event.preventDefault();
        const next = tabs[(i + step + tabs.length) % tabs.length];
        if (next) select(next, true);
      });
    });
    const first = tabs[0];
    if (first) select(first, false);
  }
}

function initCatalogFilter(): void {
  const list = document.querySelector<HTMLElement>("[data-catalog]");
  const tools = document.querySelector<HTMLElement>("[data-catalog-tools]");
  const search = document.querySelector<HTMLInputElement>("[data-catalog-search]");
  const empty = document.querySelector<HTMLElement>("[data-catalog-empty]");
  const more = document.querySelector<HTMLButtonElement>("[data-catalog-more]");
  if (!list || !tools || !search || !empty || !more) return;
  tools.hidden = false;
  const items = [...list.querySelectorAll<HTMLElement>("li")];
  const chips = [...tools.querySelectorAll<HTMLButtonElement>("[data-namespace]")];
  // On a phone the full grid is a very long scroll; show a few until the reader asks for the rest.
  const PREVIEW = 6;
  let expanded = !matchMedia("(max-width: 700px)").matches;
  let namespace = "";
  const apply = () => {
    const terms = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    const filtering = terms.length > 0 || namespace !== "";
    let shown = 0;
    let matched = 0;
    for (const item of items) {
      const text = item.dataset.search ?? "";
      const match = (!namespace || item.dataset.namespace === namespace) && terms.every((t) => text.includes(t));
      if (match) matched++;
      const visible = match && (expanded || filtering || matched <= PREVIEW);
      item.hidden = !visible;
      if (visible) shown++;
    }
    empty.hidden = shown > 0;
    more.hidden = expanded || filtering || matched <= PREVIEW;
  };
  more.addEventListener("click", () => {
    expanded = true;
    apply();
  });
  search.addEventListener("input", apply);
  for (const chip of chips) {
    chip.addEventListener("click", () => {
      namespace = chip.dataset.namespace ?? "";
      for (const c of chips) c.setAttribute("aria-pressed", String(c === chip));
      apply();
    });
  }
  apply();
}

/** Highlights the header link of the section in view, on the home page only. */
function initScrollSpy(): void {
  const links = new Map<string, HTMLAnchorElement>();
  for (const a of document.querySelectorAll<HTMLAnchorElement>(".nav-desktop [data-nav]")) {
    if (a.getAttribute("href")?.startsWith("#")) links.set(a.dataset.nav ?? "", a);
  }
  if (links.size === 0) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const [id, a] of links) a.classList.toggle("active", id === entry.target.id);
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  for (const id of links.keys()) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}

function initMobileNav(): void {
  const details = document.querySelector<HTMLDetailsElement>(".nav-mobile");
  if (!details) return;
  for (const a of details.querySelectorAll("a")) a.addEventListener("click", () => (details.open = false));
  document.addEventListener("click", (event) => {
    if (details.open && !details.contains(event.target as Node)) details.open = false;
  });
}

initThemeToggle();
initCopyButtons();
initTabs();
initCatalogFilter();
initScrollSpy();
initMobileNav();
