(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  // --- Page transition overlay ---------------------------------------------
  // Shows a dark overlay with the destination title + a counting percentage
  // when clicking an internal nav link, then navigates when the counter hits
  // 100. On the next page, we show the overlay briefly and fade it out so
  // the two halves feel like one transition. Reduced-motion skips it.
  const overlay = document.getElementById("pageTransition");
  const titleGhost = overlay?.querySelector(".pt-title-ghost");
  const titleBold = overlay?.querySelector(".pt-title-bold");
  const pctEl = overlay?.querySelector(".pt-percent");
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
    if (!overlay) return;
    setOverlayTitle(title);
    pctEl.textContent = "0%";
    setReveal(0);
    overlay.classList.remove("is-leaving");
    overlay.classList.add("is-active");
    overlay.setAttribute("aria-hidden", "false");
  };

  const hideOverlay = () => {
    if (!overlay) return;
    overlay.classList.add("is-leaving");
    overlay.classList.remove("is-active");
    overlay.setAttribute("aria-hidden", "true");
  };

  // ease-out-cubic: fast at the start, decelerating. With a ~1.4s duration this
  // makes the percent counter jump by 3-7 at a time early on and ease into the
  // final digits, which reads much more natural than a linear tick.
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const animatePercent = (from, to, ms) => new Promise((resolve) => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = easeOutCubic(t);
      const v = from + (to - from) * eased;
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

  if (overlay && !reduce) {
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
      // Give the overlay a beat to fade in before the counter starts.
      await new Promise((r) => setTimeout(r, 90));
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
            setTimeout(hideOverlay, 260);
          });
        }
        sessionStorage.removeItem(NAV_KEY);
      }
    } catch {}
  }

  // --- Language switcher stub (persist preference only, strings not yet
  //     translated — follow-up work)
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

  // --- Nav: Services dropdown + mobile toggle --------------------------------
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

  // --- Marquee: duplicate items (home only) ---------------------------------
  const mq = document.querySelector(".marquee-track");
  if (mq) mq.innerHTML += mq.innerHTML;

  // --- Smooth scroll (Lenis) + ScrollTrigger sync ---------------------------
  let lenis = null;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Anchor links go through Lenis (same-page only)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis ? lenis.scrollTo(el, { offset: 0 }) : el.scrollIntoView();
    });
  });

  // Nav hides on scroll down, returns on scroll up
  if (nav) {
    let lastY = 0;
    ScrollTrigger.create({
      onUpdate: (self) => {
        const y = self.scroll();
        nav.classList.toggle("is-hidden", y > 200 && y > lastY);
        lastY = y;
      },
    });
    // Light nav while a dark section is under it
    document.querySelectorAll(".pin, .cta").forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec, start: "top 40px", end: "bottom 40px",
        onToggle: (self) => nav.classList.toggle("on-dark", self.isActive),
      });
    });
  }

  // --- Contact form (Formspree) --------------------------------------------
  const form = document.getElementById("contactForm");
  if (form) {
    const status = document.getElementById("formStatus");
    const setStatus = (text, kind) => {
      status.textContent = text;
      status.className = "form-status mono" + (kind ? " is-" + kind : "");
    };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let firstInvalid = null;
      form.querySelectorAll("[required]").forEach((el) => {
        const ok = el.value.trim() !== "" && (el.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
        el.closest(".field").classList.toggle("is-invalid", !ok);
        if (!ok && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        setStatus("Please fill in your name, a valid email and a message.", "err");
        firstInvalid.focus();
        return;
      }
      const button = form.querySelector("button[type=submit]");
      button.disabled = true;
      setStatus("Sending…");
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        setStatus("Thanks! We'll be in touch soon.", "ok");
      } catch (err) {
        setStatus("Something went wrong. Please try WhatsApp or email us instead.", "err");
      } finally {
        button.disabled = false;
      }
    });
    form.querySelectorAll("input, textarea").forEach((el) =>
      el.addEventListener("input", () => el.closest(".field")?.classList.remove("is-invalid"))
    );
  }

  if (reduce) {
    document.querySelectorAll(".pin-word, .pin-desc p").forEach((el, i) => el.classList.toggle("is-active", i % 3 === 0));
    return;
  }

  // --- Hero: line-by-line type reveal (home) --------------------------------
  if (document.querySelector(".hero-title")) {
    gsap.from(".hero-title .line > span", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 0.1 });
    gsap.from(".hero-sub, .nav", { opacity: 0, y: 20, duration: 1, delay: 0.6 });
  }
  if (document.querySelector(".page-hero h1")) {
    gsap.from(".page-hero h1", { yPercent: 60, opacity: 0, duration: 1, ease: "expo.out" });
    gsap.from(".page-hero .lede, .nav", { opacity: 0, y: 20, duration: 1, delay: 0.3 });
  }

  // Hero: parallax featured image
  if (document.querySelector(".hero-media")) {
    gsap.to(".hero-media-inner", {
      yPercent: -22, ease: "none",
      scrollTrigger: { trigger: ".hero-media", start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.from(".hero-media", {
      scale: 0.92, borderRadius: 40, ease: "none",
      scrollTrigger: { trigger: ".hero-media", start: "top bottom", end: "top 30%", scrub: true },
    });
  }

  // --- Pinned word swap (home) ----------------------------------------------
  if (document.querySelector(".pin")) {
    const words = gsap.utils.toArray(".pin-word");
    const descs = gsap.utils.toArray(".pin-desc p");
    const index = document.querySelector(".pin-index");
    let current = 0;
    const setStep = (n) => {
      if (n === current) return;
      current = n;
      words.forEach((w, i) => {
        w.classList.toggle("is-active", i === n);
        w.classList.toggle("is-past", i < n);
      });
      descs.forEach((d, i) => d.classList.toggle("is-active", i === n));
      index.textContent = String(n + 1).padStart(2, "0");
    };
    ScrollTrigger.create({
      trigger: ".pin",
      start: "top top",
      end: () => "+=" + window.innerHeight * 2.2,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        setStep(Math.min(words.length - 1, Math.floor(self.progress * words.length)));
        gsap.set(".pin-bar span", { scaleX: self.progress });
      },
    });
  }

  // --- Horizontal reel (work) -----------------------------------------------
  const track = document.querySelector(".reel-track");
  if (track) {
    const distance = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -distance(), ease: "none",
      scrollTrigger: {
        trigger: ".work",
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }

  // --- Generic fade-up reveals ----------------------------------------------
  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.from(el, { opacity: 0, y: 40, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });

  // --- About: words light up as you scroll ----------------------------------
  const scrub = document.querySelector(".scrub");
  if (scrub) {
    scrub.innerHTML = scrub.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
    gsap.to(".scrub .w", {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: scrub, start: "top 80%", end: "bottom 45%", scrub: true },
    });
  }

  // --- CTA title reveal -----------------------------------------------------
  if (document.querySelector(".cta-title")) {
    gsap.from(".cta-title .line > span", {
      yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: ".cta", start: "top 70%" },
    });
  }

  // --- Cursor follower on project media -------------------------------------
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    window.addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); });
    document.querySelectorAll("[data-cursor]").forEach((el) => {
      el.addEventListener("pointerenter", () => cursor.classList.add("is-on"));
      el.addEventListener("pointerleave", () => cursor.classList.remove("is-on"));
    });
  }

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
