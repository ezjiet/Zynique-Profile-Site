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

  // Contact form (Formspree) → public/assets/js/contact-form.js

  // Per-page hero entrances live in /assets/js/page-intros.js, loaded before
  // this file so the loader's sessionStorage key is still present when it
  // computes its delay.
  //
  // Home sequences (marquee, hero parallax, pin word swap, CTA title) live
  // in /assets/js/home-sequences.js.

  if (reduce) return;

  // Horizontal work reel → public/assets/js/reel.js

  // --- Generic text reveal: blur-to-sharp -----------------------------------
  // Site-wide typography fade: text starts low-opacity + blurred + slightly
  // offset, then snaps into focus as it crosses the fold. One effect, applied
  // to anything with .reveal (except hero lines, which have their own
  // mask-up signature).
  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.from(el, {
      opacity: 0, y: 22, filter: "blur(10px)",
      duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  // --- About scrub: word-by-word blur-to-sharp ------------------------------
  const scrub = document.querySelector(".scrub");
  if (scrub) {
    scrub.innerHTML = scrub.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
    gsap.set(".scrub .w", { opacity: 0.15, filter: "blur(6px)" });
    gsap.to(".scrub .w", {
      opacity: 1, filter: "blur(0px)",
      stagger: 0.1, ease: "none",
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
