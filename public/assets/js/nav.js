// Nav chrome: Services dropdown (hover on desktop, tap on touchish),
// mobile hamburger toggle, and the EN/中文/BM language-switcher stub
// in the footer (persists the preference; strings are not yet
// translated — follow-up work).
(() => {
  const nav = document.getElementById("nav");
  const trigger = document.querySelector(".svc-trigger");
  const panel = document.getElementById("svcDropdown");
  const toggle = document.querySelector(".nav-toggle");
  const isTouchish = () => window.matchMedia("(max-width: 820px)").matches;
  let hoverTimer = null;
  const openPanel = () => { if (!panel) return; panel.classList.add("is-open"); trigger?.setAttribute("aria-expanded", "true"); };
  const closePanel = () => { if (!panel) return; panel.classList.remove("is-open"); trigger?.setAttribute("aria-expanded", "false"); };

  if (trigger && panel) {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      panel.classList.contains("is-open") ? closePanel() : openPanel();
    });
    trigger.addEventListener("mouseenter", () => { if (!isTouchish()) { clearTimeout(hoverTimer); openPanel(); } });
    trigger.addEventListener("mouseleave", () => { if (!isTouchish()) hoverTimer = setTimeout(closePanel, 200); });
    panel.addEventListener("mouseenter", () => { if (!isTouchish()) clearTimeout(hoverTimer); });
    panel.addEventListener("mouseleave", () => { if (!isTouchish()) hoverTimer = setTimeout(closePanel, 200); });
    document.addEventListener("click", (e) => {
      if (!panel.contains(e.target) && !trigger.contains(e.target)) closePanel();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePanel(); });
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) closePanel();
    });
  }

  // Language switcher (persist only; translations are follow-up work)
  const langButtons = document.querySelectorAll(".foot-lang button");
  if (langButtons.length) {
    let saved = "en";
    try { saved = localStorage.getItem("zq-lang") || "en"; } catch {}
    langButtons.forEach((b) => {
      const isSaved = b.dataset.lang === saved;
      b.classList.toggle("is-active", isSaved);
      b.setAttribute("aria-pressed", isSaved ? "true" : "false");
      b.addEventListener("click", () => {
        const lang = b.dataset.lang;
        langButtons.forEach((x) => {
          const on = x === b;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-pressed", on ? "true" : "false");
        });
        try { localStorage.setItem("zq-lang", lang); } catch {}
        document.documentElement.setAttribute("lang", lang);
      });
    });
  }
})();
