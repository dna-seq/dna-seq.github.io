/**
 * The site's only script. Each part is an enhancement: without it every switcher panel
 * shows in order and code blocks are selected by hand.
 */

function initSwitches(): void {
  for (const root of document.querySelectorAll<HTMLElement>("[data-switch]")) {
    const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const select = (index: number, focus: boolean): void => {
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute("aria-controls") ?? "");
        if (panel) panel.hidden = !on;
      });
      if (focus) tabs[index]?.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i, false));
      tab.addEventListener("keydown", (event) => {
        const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (step === 0) return;
        event.preventDefault();
        select((i + step + tabs.length) % tabs.length, true);
      });
    });
    select(0, false);
  }
}

function initCopy(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
    button.addEventListener("click", async () => {
      const text = button.parentElement?.querySelector("code")?.textContent ?? "";
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied";
      } catch {
        button.textContent = "Select and copy";
      }
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1600);
    });
  }
}

/** Keeps the current tab in view on a phone, where the tab row scrolls sideways. */
function revealCurrentTab(): void {
  const row = document.querySelector<HTMLElement>("[data-tabs]");
  const current = row?.querySelector<HTMLElement>('[aria-current="page"]');
  if (!row || !current || row.scrollWidth <= row.clientWidth) return;
  row.scrollLeft = current.offsetLeft - (row.clientWidth - current.offsetWidth) / 2;
}

initSwitches();
initCopy();
revealCurrentTab();

export {};
