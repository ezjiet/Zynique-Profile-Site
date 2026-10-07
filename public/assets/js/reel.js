// Horizontal case-study reel on the Work page. Pins the viewport while
// the track slides left, picking up where the vertical scroll leaves
// off. Reduce-motion skips the pin so the track reads as a plain
// vertical column (CSS falls back to flex-wrap in that mode).
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const track = document.querySelector(".reel-track");
  if (!track) return;

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
})();
