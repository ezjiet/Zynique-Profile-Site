// Contact page Formspree submit + inline required-field validation.
// Posts a FormData body to form.action; the Formspree form ID still
// needs to be filled in — see memory `inputs-pending` for the current
// list of real-world data owed by the site owner.
(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("formStatus");
  const setStatus = (text, kind) => {
    status.textContent = text;
    status.className = "form-status mono" + (kind ? " is-" + kind : "");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let firstInvalid = null;
    form.querySelectorAll("[required]").forEach((el) => {
      const ok = el.value.trim() !== "" &&
        (el.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
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
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
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
})();
