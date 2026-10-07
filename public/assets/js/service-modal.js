/* Service detail modal — opens an isolated per-service sheet from a "+" button.
   Reduce-motion: appears instantly. Mobile: full-screen sheet. */
(function () {
  "use strict";

  var modal = document.getElementById("svcModal");
  if (!modal) return;

  var sheet = modal.querySelector(".svc-sheet");
  var slot = modal.querySelector("[data-svc-slot]");
  var closeBtn = modal.querySelector(".svc-close");
  if (!sheet || !slot || !closeBtn) return;

  var openButtons = document.querySelectorAll("[data-svc-open]");
  if (!openButtons.length) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lastFocus = null;
  var scrollY = 0;
  var currentServiceId = null;

  function focusables() {
    return sheet.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }

  function lockScroll() {
    scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.documentElement.classList.add("svc-modal-open");
    var lenis = window.__zyniqueLenis;
    if (lenis && typeof lenis.stop === "function") lenis.stop();
  }

  function unlockScroll() {
    document.documentElement.classList.remove("svc-modal-open");
    var lenis = window.__zyniqueLenis;
    if (lenis && typeof lenis.start === "function") lenis.start();
    // Keep page where it was
    window.scrollTo(0, scrollY);
  }

  function openFor(serviceId, trigger) {
    var tpl = document.getElementById("tpl-" + serviceId);
    if (!tpl || !tpl.content) return;

    lastFocus = trigger || document.activeElement;
    currentServiceId = serviceId;

    // Fill the sheet
    slot.innerHTML = "";
    slot.appendChild(tpl.content.cloneNode(true));

    lockScroll();
    sheet.scrollTop = 0;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    // Focus into the sheet
    var runFocus = function () {
      var first = focusables()[0] || closeBtn;
      try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); }
    };
    if (reduce) runFocus();
    else setTimeout(runFocus, 60);
  }

  function close() {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    unlockScroll();

    var doneClose = function () {
      slot.innerHTML = "";
      if (lastFocus && typeof lastFocus.focus === "function") {
        try { lastFocus.focus({ preventScroll: true }); } catch (e) { lastFocus.focus(); }
      }
      currentServiceId = null;
    };
    if (reduce) doneClose();
    else setTimeout(doneClose, 320);
  }

  // Open triggers
  openButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var id = btn.getAttribute("data-svc-open");
      if (id) openFor(id, btn);
    });
  });

  // Close triggers
  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) close();
  });

  // Keyboard: Esc closes, Tab traps focus inside sheet
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "Tab") {
      var items = focusables();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  // Deep-link support: /services/#svc-01-pricing opens tier modal for svc-01
  function fromHash() {
    var m = /^#(svc-\d{2})-pricing$/.exec(location.hash);
    if (m) openFor(m[1], null);
  }
  window.addEventListener("hashchange", fromHash);
  // Delay slightly so the rest of the page settles first
  if (document.readyState === "complete") setTimeout(fromHash, 50);
  else window.addEventListener("load", function () { setTimeout(fromHash, 50); });
})();
