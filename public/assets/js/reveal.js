// Two scroll-reveal effects shared across the site:
//
// 1. Generic `.reveal` — blur-to-sharp fade applied to any element with
//    the class, except hero lines (which have their own mask-up signature
//    via page-intros.js). One-shot: fires once as it crosses the fold.
//
// 2. About-page `.scrub` — word-by-word blur-to-sharp tied to scroll
//    progress. Scrubbed, so scrolling back reverses it.
//
// Reduce-motion skips both.
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.from(el, {
      opacity: 0, y: 22, filter: "blur(10px)",
      duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  const scrub = document.querySelector(".scrub");
  if (scrub) {
    scrub.innerHTML = scrub.textContent.trim().split(/\s+/)
      .map((w) => `<span class="w">${w}</span>`).join(" ");
    gsap.set(".scrub .w", { opacity: 0.15, filter: "blur(6px)" });
    gsap.to(".scrub .w", {
      opacity: 1, filter: "blur(0px)",
      stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: scrub, start: "top 80%", end: "bottom 45%", scrub: true },
    });
  }
})();
