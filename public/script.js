(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  // Duplicate marquee items so the CSS loop is seamless
  const mq = document.querySelector(".marquee-track");
  mq.innerHTML += mq.innerHTML;

  // Smooth scroll (Lenis) driven by GSAP's ticker so ScrollTrigger stays in sync
  let lenis = null;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Anchor links go through Lenis
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
  const nav = document.getElementById("nav");
  let lastY = 0;
  ScrollTrigger.create({
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle("is-hidden", y > 200 && y > lastY);
      lastY = y;
    },
  });

  // Light logo/button while a dark section is under the nav
  document.querySelectorAll(".pin, .cta").forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: "top 40px", end: "bottom 40px",
      onToggle: (self) => nav.classList.toggle("on-dark", self.isActive),
    });
  });

  // Contact form: submit to Formspree without leaving the page
  const form = document.getElementById("contactForm");
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

  if (reduce) {
    document.querySelectorAll(".pin-word, .pin-desc p").forEach((el, i) => el.classList.toggle("is-active", i % 3 === 0));
    return;
  }

  // Hero: line-by-line type reveal
  gsap.from(".hero-title .line > span", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 0.1 });
  gsap.from(".hero-sub, .nav", { opacity: 0, y: 20, duration: 1, delay: 0.6 });

  // Hero: parallax featured image
  gsap.to(".hero-media-inner", {
    yPercent: -22, ease: "none",
    scrollTrigger: { trigger: ".hero-media", start: "top bottom", end: "bottom top", scrub: true },
  });
  gsap.from(".hero-media", {
    scale: 0.92, borderRadius: 40, ease: "none",
    scrollTrigger: { trigger: ".hero-media", start: "top bottom", end: "top 30%", scrub: true },
  });

  // Pinned section: swap Websites -> Software -> POS as you scroll
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

  // Selected work: horizontal reel tied to vertical scroll
  const track = document.querySelector(".reel-track");
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

  // Generic fade-up reveals
  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.from(el, { opacity: 0, y: 40, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });

  // About: words light up as you scroll
  const scrub = document.querySelector(".scrub");
  scrub.innerHTML = scrub.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
  gsap.to(".scrub .w", {
    opacity: 1, stagger: 0.1, ease: "none",
    scrollTrigger: { trigger: scrub, start: "top 80%", end: "bottom 45%", scrub: true },
  });

  // CTA title reveal
  gsap.from(".cta-title .line > span", {
    yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.1,
    scrollTrigger: { trigger: ".cta", start: "top 70%" },
  });

  // Cursor follower on project media
  const cursor = document.querySelector(".cursor");
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
  window.addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); });
  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-on"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-on"));
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
