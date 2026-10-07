// Per-page hero entrance animations.
// Each page gets its own flavour, kept to ~700ms end-to-end.
// Reduce-motion short-circuits to instant render.
// This file reads the "zq-nav" sessionStorage key the loader in /script.js
// sets on outgoing clicks; it is loaded BEFORE /script.js so the key is
// still present when the delay is computed.
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof gsap === "undefined") return;

  const NAV_KEY = "zq-nav";
  const introDelay = (() => {
    try {
      const raw = sessionStorage.getItem(NAV_KEY);
      if (!raw) return 0;
      const { at } = JSON.parse(raw);
      // Overlay fades for 0.6s starting ~0.18s after window.load; wait it out.
      return (Date.now() - at < 10000) ? 0.75 : 0;
    } catch { return 0; }
  })();

  const splitChars = (root) => {
    const chars = [];
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          [...child.textContent].forEach((ch) => {
            const s = document.createElement("span");
            s.textContent = ch === " " ? " " : ch;
            s.style.display = "inline-block";
            s.style.whiteSpace = "pre";
            frag.appendChild(s);
            chars.push(s);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== "BR") {
          walk(child);
        }
      });
    };
    walk(root);
    return chars;
  };

  const splitWords = (root) => {
    const words = [];
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement("span");
            w.className = "bw";
            w.textContent = part;
            w.style.display = "inline-block";
            w.style.clipPath = "inset(50% 0 50% 0)";
            w.style.webkitClipPath = "inset(50% 0 50% 0)";
            frag.appendChild(w);
            words.push(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== "BR") {
          walk(child);
        }
      });
    };
    walk(root);
    return words;
  };

  const intros = {
    // Home: existing hero signature — line-by-line mask-up + blur sub-headline.
    // The Home hero has its own markup (.hero-title / .hero-sub), not .page-hero.
    "/": () => {
      if (!document.querySelector(".hero-title")) return;
      gsap.from(".hero-title .line > span", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 0.1 });
      gsap.from(".hero-sub", { opacity: 0, y: 16, filter: "blur(10px)", duration: 1.1, ease: "power3.out", delay: 0.6 });
    },
    // Services: typewriter — characters tick in one by one.
    "/services/": (h1) => {
      const chars = splitChars(h1);
      const perChar = 0.05;
      gsap.set(chars, { opacity: 0 });
      gsap.to(chars, { opacity: 1, duration: 0.01, stagger: perChar, ease: "none", delay: introDelay });
      const after = introDelay + chars.length * perChar + 0.05;
      gsap.from(".page-hero .lede", { opacity: 0, y: 10, duration: 0.5, ease: "power2.out", delay: after });
      gsap.from(".page-hero p.mono", { opacity: 0, duration: 0.4, ease: "power2.out", delay: after + 0.15 });
    },
    // Work: pop-out — scale from 0.8 with a slight overshoot.
    "/work/": (h1) => {
      gsap.from(h1, { scale: 0.8, opacity: 0, duration: 0.7, ease: "back.out(1.6)", transformOrigin: "left center", delay: introDelay });
      gsap.from(".page-hero .lede", { opacity: 0, y: 10, scale: 0.95, duration: 0.6, ease: "back.out(1.4)", delay: introDelay + 0.18 });
      gsap.from(".page-hero p.mono", { opacity: 0, duration: 0.4, ease: "power2.out", delay: introDelay + 0.32 });
    },
    // About: stagger slide-up — content rises from under a clipping edge.
    "/about/": (h1) => {
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.innerHTML = h1.innerHTML;
      h1.innerHTML = "";
      h1.style.overflow = "hidden";
      h1.appendChild(inner);
      gsap.from(inner, { yPercent: 100, duration: 0.7, ease: "expo.out", delay: introDelay });
      gsap.from(".page-hero .lede", { opacity: 0, yPercent: 60, duration: 0.6, ease: "expo.out", delay: introDelay + 0.15 });
      gsap.from(".page-hero p.mono", { opacity: 0, yPercent: 40, duration: 0.5, ease: "expo.out", delay: introDelay + 0.3 });
    },
    // Blog: split-word reveal — each word opens from a horizontal split.
    "/blog/": (h1) => {
      const words = splitWords(h1);
      gsap.to(words, { clipPath: "inset(0% 0 0% 0)", webkitClipPath: "inset(0% 0 0% 0)", duration: 0.5, ease: "power3.out", stagger: 0.08, delay: introDelay });
      const after = introDelay + words.length * 0.08 + 0.1;
      gsap.from(".page-hero .lede", { opacity: 0, y: 10, duration: 0.5, ease: "power2.out", delay: after });
      gsap.from(".page-hero p.mono", { opacity: 0, duration: 0.4, ease: "power2.out", delay: after + 0.1 });
    },
    // Contact: mask-wipe — accent bar sweeps across, revealing text behind it.
    "/contact/": (h1) => {
      const parent = h1.parentNode;
      if (getComputedStyle(parent).position === "static") parent.style.position = "relative";
      const bar = document.createElement("span");
      bar.setAttribute("aria-hidden", "true");
      bar.style.cssText = "position:absolute;left:" + h1.offsetLeft + "px;top:" + h1.offsetTop + "px;width:" + h1.offsetWidth + "px;height:" + h1.offsetHeight + "px;background:var(--accent);transform-origin:left center;transform:scaleX(0);z-index:5;pointer-events:none;will-change:transform";
      parent.appendChild(bar);
      h1.style.clipPath = "inset(0 100% 0 0)";
      h1.style.webkitClipPath = "inset(0 100% 0 0)";
      const tl = gsap.timeline({ delay: introDelay, onComplete: () => bar.remove() });
      tl.to(bar, { scaleX: 1, duration: 0.3, ease: "power3.in" })
        .set(bar, { transformOrigin: "right center" })
        .to(bar, { scaleX: 0, duration: 0.4, ease: "power3.out" })
        .to(h1, { clipPath: "inset(0 0% 0 0)", webkitClipPath: "inset(0 0% 0 0)", duration: 0.4, ease: "none" }, "-=0.4");
      gsap.from(".page-hero .lede", { opacity: 0, x: -14, duration: 0.5, ease: "power2.out", delay: introDelay + 0.75 });
      gsap.from(".page-hero p.mono", { opacity: 0, duration: 0.4, ease: "power2.out", delay: introDelay + 0.9 });
    },
  };

  const path = location.pathname.replace(/\/+$/, "/") || "/";
  const intro = intros[path];
  if (!intro) return;
  if (path === "/") {
    intro();
  } else {
    const h1 = document.querySelector(".page-hero h1");
    if (h1) intro(h1);
  }
  // Nav fades in alongside the hero; delay matches the page's intro start.
  gsap.from(".nav", { opacity: 0, y: 20, duration: 1, delay: introDelay + 0.3 });
})();
