// Page transition loader. Intercepts internal link clicks and shows a
// dark overlay with the destination page title + an easing percent
// counter, then navigates. On the next page's load the overlay plays
// its matching second half before fading out. Reduce-motion skips the
// animated overlay entirely; the browser does a plain navigation.
//
// This file writes a "zq-nav" key to sessionStorage before navigating
// and reads it on the destination page. page-intros.js reads the same
// key BEFORE this file runs so its intros know to wait for the overlay
// fade — do not change load order without updating both.
(() => {
  const overlay = document.getElementById("pageTransition");
  if (!overlay) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const titleGhost = overlay.querySelector(".pt-title-ghost");
  const titleBold = overlay.querySelector(".pt-title-bold");
  const pctEl = overlay.querySelector(".pt-percent");
  const NAV_KEY = "zq-nav";

  const titleFor = (href) => {
    const path = href.replace(/#.*$/, "").replace(/\?.*$/, "");
    const map = { "/": "Home", "/services/": "Services", "/work/": "Work",
                  "/about/": "About", "/blog/": "Blog", "/contact/": "Contact" };
    return map[path] || document.body.dataset.pageTitle || "Zynique";
  };

  const setOverlayTitle = (text) => {
    if (!titleGhost || !titleBold) return;
    titleGhost.textContent = text;
    titleBold.textContent = text;
  };

  const setReveal = (pct) => {
    if (!titleBold) return;
    const inset = "inset(0 " + Math.max(0, 100 - pct) + "% 0 0)";
    titleBold.style.clipPath = inset;
    titleBold.style.webkitClipPath = inset;
  };

  const showOverlay = (title) => {
    setOverlayTitle(title);
    pctEl.textContent = "0%";
    setReveal(0);
    overlay.classList.remove("is-leaving");
    overlay.classList.add("is-active");
    overlay.setAttribute("aria-hidden", "false");
  };

  const hideOverlay = () => {
    overlay.classList.add("is-leaving");
    overlay.classList.remove("is-active");
    overlay.setAttribute("aria-hidden", "true");
  };

  const animatePercent = (from, to, ms) => new Promise((resolve) => {
    const start = performance.now();
    // ease-out-cubic — percent jumps larger steps early and settles toward 100
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms);
      const v = from + (to - from) * ease(t);
      pctEl.textContent = Math.round(v) + "%";
      setReveal(v);
      if (t < 1) requestAnimationFrame(tick); else resolve();
    };
    requestAnimationFrame(tick);
  });

  const isInternal = (href) => {
    if (!href) return false;
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
    if (/^(https?:)?\/\//i.test(href)) {
      try { return new URL(href, location.href).origin === location.origin; } catch { return false; }
    }
    return href.startsWith("/");
  };

  if (reduce) return;

  // Intercept clicks on internal links
  document.addEventListener("click", async (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    if (a.target && a.target !== "_self") return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const href = a.getAttribute("href");
    if (!isInternal(href)) return;
    const url = new URL(href, location.href);
    // same-path hash-only navigation: let anchor smooth-scroll handle it
    if (url.pathname === location.pathname && url.hash) return;

    e.preventDefault();
    const title = a.dataset.navTitle || titleFor(url.pathname);
    try { sessionStorage.setItem(NAV_KEY, JSON.stringify({ title, at: Date.now() })); } catch {}
    showOverlay(title);
    await animatePercent(0, 100, 1400);
    location.href = href;
  });

  // Incoming side: if this page load follows a tracked click, show overlay
  // at full for a moment then fade out as the page is ready
  try {
    const raw = sessionStorage.getItem(NAV_KEY);
    if (raw) {
      const { title, at } = JSON.parse(raw);
      if (Date.now() - at < 10000) {
        setOverlayTitle(title);
        pctEl.textContent = "100%";
        setReveal(100);
        overlay.classList.add("is-active");
        overlay.setAttribute("aria-hidden", "false");
        window.addEventListener("load", () => {
          setTimeout(hideOverlay, 180);
        });
      }
      sessionStorage.removeItem(NAV_KEY);
    }
  } catch {}
})();
