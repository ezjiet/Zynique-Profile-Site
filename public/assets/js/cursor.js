// Orange disc that follows the pointer over [data-cursor] media.
// Hidden on narrow screens via CSS; skipped entirely under
// reduce-motion so hover doesn't tint the cursor.
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
  window.addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); });

  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-on"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-on"));
  });
})();
