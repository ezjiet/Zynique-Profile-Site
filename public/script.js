(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  // Page transition loader → public/assets/js/page-transition.js

  // Nav chrome (dropdown, mobile toggle, lang switcher) → public/assets/js/nav.js
  const nav = document.getElementById("nav");

  // --- Smooth scroll (Lenis) + ScrollTrigger sync ---------------------------
  let lenis = null;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.__zyniqueLenis = lenis;
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

  // Everything else — contact form, per-page intros, home sequences, work
  // reel, generic reveals, cursor follower — lives in /assets/js/<feature>.js
  // and loads from the page's own script tags.

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
