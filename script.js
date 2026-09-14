/* =========================================================
   Zynique — interactions + i18n + theme
   ========================================================= */

// ---------- Translations ----------
const i18n = {
  en: {
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",

    "hero.eyebrow": "Custom builds · Web · Marketing",
    "hero.title.l1": "Custom systems.",
    "hero.title.l2": "Smart marketing.",
    "hero.title.l3": "Real results.",
    "hero.sub": "Zynique builds tailor-made websites and business systems, then helps you get in front of the right audience. One team, from the first line of code to the first thousand customers.",
    "hero.cta1": "Start a project",
    "hero.cta2": "See what we do",
    "hero.stat1.t": "End-to-end",
    "hero.stat1.d": "design, build, launch",
    "hero.stat2.t": "Custom-fit",
    "hero.stat2.d": "no cookie-cutter templates",
    "hero.stat3.t": "Growth-focused",
    "hero.stat3.d": "built to convert",

    "about.kicker": "About",
    "about.title": "We build the tech — and the traction.",
    "about.p1": "Zynique is a small studio focused on custom systems, websites, and marketing. We work with founders and small teams who need something built properly, without getting lost in a huge agency pipeline.",
    "about.p2": "Every project starts with a real conversation about what you're trying to do. From there we design, build, and launch — whether that's a full internal system, a public site, or a campaign that finally makes your work visible.",
    "about.p3": "If it can be coded, styled, or shipped, we probably enjoy doing it. And if it needs eyes on it, we know how to get those too.",

    "services.kicker": "What we do",
    "services.title": "Services built around your goals",
    "services.sub": "Pick one, or roll them together. Everything below can flex to your stack, budget, and timeline.",

    "services.c1.t": "Website Customization",
    "services.c1.d": "Redesigns, rebuilds, and custom features on your existing site or from scratch. Fast, responsive, and easy for you to maintain.",
    "services.c1.l1": "Landing pages & full sites",
    "services.c1.l2": "Theme & template overhauls",
    "services.c1.l3": "Performance & SEO tune-ups",

    "services.c2.t": "System Customization",
    "services.c2.d": "Business systems shaped to how you actually work — not the other way around. Admin panels, dashboards, integrations, automations.",
    "services.c2.l1": "Custom dashboards & portals",
    "services.c2.l2": "Workflow automation",
    "services.c2.l3": "API & database integrations",

    "services.c3.t": "Marketing Services",
    "services.c3.d": "Content, socials, and campaigns that put your product in front of the right people. Practical, measurable, no fluff.",
    "services.c3.l1": "Social media & content",
    "services.c3.l2": "Brand & visual identity",
    "services.c3.l3": "Ad campaigns & funnels",

    "services.c4.t": "Launch & Growth",
    "services.c4.d": "End-to-end launches for new products or rebrands. We handle the site, the story, and the push — so day one actually feels like day one.",
    "services.c4.l1": "Launch campaigns",
    "services.c4.l2": "Analytics setup",
    "services.c4.l3": "Ongoing iteration",

    "contact.kicker": "Contact",
    "contact.title": "Let's build something together.",
    "contact.lede": "Tell us a bit about what you need. We usually reply within one working day.",
    "contact.loc": "Based in Malaysia · Working worldwide",

    "form.name": "Name",
    "form.name.ph": "Your name",
    "form.email": "Email",
    "form.email.ph": "you@example.com",
    "form.topic": "What do you need?",
    "form.topic.web": "Website customization",
    "form.topic.sys": "System customization",
    "form.topic.mkt": "Marketing",
    "form.topic.lch": "Full launch",
    "form.topic.unk": "Not sure yet",
    "form.message": "Message",
    "form.message.ph": "A quick sentence or two about your project",
    "form.submit": "Send message",
    "form.err": "Please fill in name, email, and message.",
    "form.ok": "Opening your email app…",

    "footer.rights": "All rights reserved.",
    "footer.back": "Back to top"
  },

  zh: {
    "nav.about": "关于",
    "nav.services": "服务",
    "nav.contact": "联系",

    "hero.eyebrow": "定制开发 · 网页 · 营销",
    "hero.title.l1": "定制系统。",
    "hero.title.l2": "智慧营销。",
    "hero.title.l3": "真实成果。",
    "hero.sub": "Zynique 为你打造量身定制的网站与业务系统，并助你精准触达目标客户。从第一行代码，到第一千位客户，一个团队全程陪伴。",
    "hero.cta1": "开始项目",
    "hero.cta2": "了解服务",
    "hero.stat1.t": "全流程",
    "hero.stat1.d": "设计、开发、上线",
    "hero.stat2.t": "量身定制",
    "hero.stat2.d": "拒绝千篇一律模板",
    "hero.stat3.t": "以增长为导向",
    "hero.stat3.d": "为转化而生",

    "about.kicker": "关于",
    "about.title": "我们打造技术，也带来增长。",
    "about.p1": "Zynique 是一家专注于定制系统、网站与营销的小型工作室。我们服务于创业者与小团队，为你打造真正合用的作品，不让你迷失在大型代理商的流程里。",
    "about.p2": "每个项目都始于一次真诚的沟通，了解你真正想做的事。之后我们负责设计、开发、上线 — 无论是内部系统、公开网站，还是让你的成果被看见的营销活动。",
    "about.p3": "只要能写、能设计、能上线的，我们都乐在其中。需要被看见？我们也知道怎么做到。",

    "services.kicker": "我们做什么",
    "services.title": "围绕你的目标打造的服务",
    "services.sub": "任选其一，或组合搭配。以下每项都能贴合你的技术栈、预算与时间线。",

    "services.c1.t": "网站定制",
    "services.c1.d": "重新设计、重建、或为现有网站添加定制功能。快速、响应式、易于维护。",
    "services.c1.l1": "落地页与完整网站",
    "services.c1.l2": "主题与模板改造",
    "services.c1.l3": "性能与 SEO 优化",

    "services.c2.t": "系统定制",
    "services.c2.d": "让业务系统贴合你的工作方式 — 而不是反过来。管理后台、仪表盘、集成、自动化。",
    "services.c2.l1": "定制仪表盘与门户",
    "services.c2.l2": "工作流自动化",
    "services.c2.l3": "API 与数据库集成",

    "services.c3.t": "营销服务",
    "services.c3.d": "用内容、社群与广告，让你的产品出现在对的人面前。实用、可量化、不虚。",
    "services.c3.l1": "社群与内容运营",
    "services.c3.l2": "品牌与视觉识别",
    "services.c3.l3": "广告投放与转化漏斗",

    "services.c4.t": "上线与增长",
    "services.c4.d": "为新产品或品牌重塑提供全流程上线。我们负责网站、故事与传播 — 让上线第一天，真正像上线。",
    "services.c4.l1": "上线传播",
    "services.c4.l2": "数据分析部署",
    "services.c4.l3": "持续迭代",

    "contact.kicker": "联系",
    "contact.title": "一起打造点什么吧。",
    "contact.lede": "告诉我们你的需求。一般一个工作日内回复。",
    "contact.loc": "位于马来西亚 · 服务全球",

    "form.name": "姓名",
    "form.name.ph": "你的姓名",
    "form.email": "邮箱",
    "form.email.ph": "you@example.com",
    "form.topic": "你需要什么？",
    "form.topic.web": "网站定制",
    "form.topic.sys": "系统定制",
    "form.topic.mkt": "营销",
    "form.topic.lch": "全面上线",
    "form.topic.unk": "还不确定",
    "form.message": "留言",
    "form.message.ph": "简单一两句描述你的项目",
    "form.submit": "发送讯息",
    "form.err": "请填写姓名、邮箱与留言。",
    "form.ok": "正在打开你的邮件应用…",

    "footer.rights": "版权所有。",
    "footer.back": "回到顶部"
  },

  ms: {
    "nav.about": "Tentang",
    "nav.services": "Perkhidmatan",
    "nav.contact": "Hubungi",

    "hero.eyebrow": "Binaan tersuai · Web · Pemasaran",
    "hero.title.l1": "Sistem tersuai.",
    "hero.title.l2": "Pemasaran bijak.",
    "hero.title.l3": "Hasil sebenar.",
    "hero.sub": "Zynique membina laman web dan sistem perniagaan tersuai, kemudian membantu anda mencapai khalayak yang betul. Satu pasukan, dari baris kod pertama hingga seribu pelanggan pertama.",
    "hero.cta1": "Mulakan projek",
    "hero.cta2": "Lihat khidmat kami",
    "hero.stat1.t": "Hujung ke hujung",
    "hero.stat1.d": "reka, bina, lancar",
    "hero.stat2.t": "Tersuai penuh",
    "hero.stat2.d": "bukan templat biasa",
    "hero.stat3.t": "Fokus pertumbuhan",
    "hero.stat3.d": "dibina untuk menukar",

    "about.kicker": "Tentang",
    "about.title": "Kami bina teknologi — dan momentum.",
    "about.p1": "Zynique ialah studio kecil yang fokus kepada sistem tersuai, laman web dan pemasaran. Kami bekerja dengan pengasas dan pasukan kecil yang mahukan sesuatu yang dibina dengan betul, tanpa hilang dalam saluran agensi besar.",
    "about.p2": "Setiap projek bermula dengan perbualan sebenar tentang apa yang anda mahu capai. Dari situ kami reka, bina dan lancarkan — sama ada sistem dalaman, laman awam, atau kempen yang akhirnya menyerlahkan kerja anda.",
    "about.p3": "Kalau ia boleh dikod, direka atau dilancarkan, kami memang seronok buat. Dan kalau ia perlu dilihat orang, kami tahu caranya.",

    "services.kicker": "Apa kami buat",
    "services.title": "Perkhidmatan mengikut matlamat anda",
    "services.sub": "Pilih satu, atau gabungkan semua. Semuanya boleh disesuaikan dengan stack, bajet dan garis masa anda.",

    "services.c1.t": "Penyesuaian Laman Web",
    "services.c1.d": "Reka bentuk semula, bina semula, atau ciri tersuai untuk laman sedia ada atau dari mula. Pantas, responsif dan mudah diselenggara.",
    "services.c1.l1": "Halaman utama & laman penuh",
    "services.c1.l2": "Ubah suai tema & templat",
    "services.c1.l3": "Prestasi & pengoptimuman SEO",

    "services.c2.t": "Penyesuaian Sistem",
    "services.c2.d": "Sistem perniagaan yang mengikut cara anda bekerja — bukan sebaliknya. Panel admin, papan pemuka, integrasi, automasi.",
    "services.c2.l1": "Papan pemuka & portal tersuai",
    "services.c2.l2": "Automasi aliran kerja",
    "services.c2.l3": "Integrasi API & pangkalan data",

    "services.c3.t": "Perkhidmatan Pemasaran",
    "services.c3.d": "Kandungan, media sosial dan kempen yang meletakkan produk anda di depan orang yang betul. Praktikal, boleh diukur, tanpa lebihan.",
    "services.c3.l1": "Media sosial & kandungan",
    "services.c3.l2": "Identiti jenama & visual",
    "services.c3.l3": "Kempen iklan & corong jualan",

    "services.c4.t": "Lancar & Pertumbuhan",
    "services.c4.d": "Pelancaran hujung ke hujung untuk produk baharu atau jenama semula. Kami uruskan laman, cerita dan promosi — supaya hari pertama benar-benar terasa seperti hari pertama.",
    "services.c4.l1": "Kempen pelancaran",
    "services.c4.l2": "Persediaan analitis",
    "services.c4.l3": "Lelaran berterusan",

    "contact.kicker": "Hubungi",
    "contact.title": "Jom bina sesuatu bersama.",
    "contact.lede": "Beritahu kami sedikit tentang keperluan anda. Biasanya kami balas dalam satu hari bekerja.",
    "contact.loc": "Berpangkalan di Malaysia · Berkhidmat seluruh dunia",

    "form.name": "Nama",
    "form.name.ph": "Nama anda",
    "form.email": "E-mel",
    "form.email.ph": "anda@contoh.com",
    "form.topic": "Apa yang anda perlukan?",
    "form.topic.web": "Penyesuaian laman web",
    "form.topic.sys": "Penyesuaian sistem",
    "form.topic.mkt": "Pemasaran",
    "form.topic.lch": "Pelancaran penuh",
    "form.topic.unk": "Belum pasti",
    "form.message": "Mesej",
    "form.message.ph": "Satu atau dua ayat ringkas tentang projek anda",
    "form.submit": "Hantar mesej",
    "form.err": "Sila isi nama, e-mel dan mesej.",
    "form.ok": "Membuka aplikasi e-mel anda…",

    "footer.rights": "Hak cipta terpelihara.",
    "footer.back": "Kembali ke atas"
  }
};

const LANG_LABELS = { en: "EN", zh: "中文", ms: "BM" };

// ---------- Storage helpers (safe) ----------
const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  set(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }
};

// ---------- Theme ----------
function initTheme() {
  const saved = store.get("zynique.theme");
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = saved || (prefersLight ? "light" : "dark");
  applyTheme(theme);
}
function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  store.set("zynique.theme", theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  applyTheme(current === "light" ? "dark" : "light");
}

// ---------- Language ----------
function initLang() {
  const saved = store.get("zynique.lang");
  const nav = (navigator.language || "en").toLowerCase();
  let lang = saved;
  if (!lang) {
    if (nav.startsWith("zh")) lang = "zh";
    else if (nav.startsWith("ms")) lang = "ms";
    else lang = "en";
  }
  applyLang(lang);
}
function applyLang(lang) {
  if (!i18n[lang]) lang = "en";
  const dict = i18n[lang];

  document.documentElement.setAttribute("lang", lang === "zh" ? "zh" : lang === "ms" ? "ms" : "en");

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  const label = document.getElementById("langLabel");
  if (label) label.textContent = LANG_LABELS[lang];

  document.querySelectorAll("#langMenu li").forEach(li => {
    li.classList.toggle("is-active", li.getAttribute("data-lang") === lang);
  });

  store.set("zynique.lang", lang);
  window._currentLang = lang;
}

// ---------- Ripple ----------
function attachRipple(el) {
  el.addEventListener("click", (e) => {
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const wave = document.createElement("span");
    wave.className = "ripple-wave";
    wave.style.width = wave.style.height = size + "px";
    wave.style.left = (e.clientX - rect.left - size / 2) + "px";
    wave.style.top = (e.clientY - rect.top - size / 2) + "px";
    el.appendChild(wave);
    setTimeout(() => wave.remove(), 600);
  });
}

// ---------- Main ----------
document.addEventListener("DOMContentLoaded", () => {

  // Initial theme + language BEFORE Lucide draws icons
  initTheme();
  initLang();

  // Lucide icons
  if (window.lucide) window.lucide.createIcons();

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav shadow on scroll + progress bar
  const nav = document.querySelector(".nav");
  const progress = document.getElementById("scrollProgress");
  const onScroll = () => {
    if (window.scrollY > 10) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");

    if (progress) {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      progress.style.width = Math.min(100, Math.max(0, scrolled * 100)) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Theme toggle
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Language switcher
  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");
  if (langBtn && langMenu) {
    const openMenu = () => {
      langMenu.hidden = false;
      // reflow before adding class so the transition runs
      void langMenu.offsetWidth;
      langMenu.classList.add("is-open");
      langBtn.setAttribute("aria-expanded", "true");
    };
    const closeMenu = () => {
      langMenu.classList.remove("is-open");
      langBtn.setAttribute("aria-expanded", "false");
      setTimeout(() => { langMenu.hidden = true; }, 180);
    };
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (langBtn.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    });
    langMenu.querySelectorAll("li").forEach(li => {
      li.addEventListener("click", () => {
        applyLang(li.getAttribute("data-lang"));
        closeMenu();
      });
    });
    document.addEventListener("click", (e) => {
      if (!langMenu.contains(e.target) && e.target !== langBtn) closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("is-open");
      mobile.hidden = !open;
      toggle.setAttribute("aria-expanded", open);
    });
    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobile.classList.remove("is-open");
        mobile.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Card spotlight
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", x + "%");
      card.style.setProperty("--my", y + "%");
    });
  });

  // Ripple on primary + ghost buttons
  document.querySelectorAll(".ripple").forEach(attachRipple);

  // Contact form
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const dict = i18n[window._currentLang || "en"];
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const topic = (data.get("topic") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        status.textContent = dict["form.err"];
        status.style.color = "#f87171";
        return;
      }

      const subject = encodeURIComponent(`New enquiry from ${name} — ${topic}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`
      );
      window.location.href = `mailto:hello@zynique.com?subject=${subject}&body=${body}`;

      status.style.color = "";
      status.textContent = dict["form.ok"];
      form.reset();
    });
  }
});
