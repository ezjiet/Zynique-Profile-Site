// Home-page motion sequences: quotes marquee duplication, hero-image
// parallax + scale-in, the pinned word swap, and the dark CTA title
// reveal. Each one is scoped to its own element — safe to load on
// every page; it no-ops where the markup isn't there.
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Marquee: duplicate items so the CSS loop reads seamlessly.
  // Non-animated: safe under reduce-motion (CSS handles the still state).
  const mq = document.querySelector(".marquee-track");
  if (mq) mq.innerHTML += mq.innerHTML;

  // Reduce-motion falls back to a static "every third active" look for
  // the pinned word swap and skips the rest.
  if (reduce) {
    document.querySelectorAll(".pin-word, .pin-desc p").forEach((el, i) =>
      el.classList.toggle("is-active", i % 3 === 0)
    );
    return;
  }

  // Hero: parallax featured image on home
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

  // Pinned word swap (home only)
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

  // Dark CTA title: masked-up line reveal.
  // (Currently unused in production — kept so new pages can drop in a
  // .cta-title with a .line > span structure and get the effect free.)
  if (document.querySelector(".cta-title")) {
    gsap.from(".cta-title .line > span", {
      yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: ".cta", start: "top 70%" },
    });
  }
})();
