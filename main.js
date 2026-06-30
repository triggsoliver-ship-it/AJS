// ===== AJS Vehicle Services =====
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
    // Close the mobile menu with Escape
    document.addEventListener("keyup", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.focus();
      }
    });
  }

  // Current year in footer
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Scroll reveal with staggered delays for grouped items
  var revealTargets = document.querySelectorAll(
    ".card, .about-card, .about-text, .gallery-item, .contact-hours, .contact-info, .section-head"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
    // stagger items that share a grid (cards / gallery)
    if (el.classList.contains("card") || el.classList.contains("gallery-item")) {
      var siblings = Array.prototype.slice.call(el.parentNode.children);
      var i = siblings.indexOf(el);
      el.style.setProperty("--d", (i % 4) * 0.09 + "s");
    }
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          if (entry.target.classList.contains("card")) {
            (function (c) { setTimeout(function () { c.classList.add("snappy"); }, 850); })(entry.target);
          }
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  }

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll progress bar
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  // Sticky header shrink
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  var orbs = document.querySelectorAll(".orb");

  function onScroll() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docH > 0 ? (st / docH) * 100 : 0) + "%";
    if (header) header.classList.toggle("scrolled", st > 40);
    if (!reduceMotion && hero && st < window.innerHeight) {
      // subtle parallax on hero orbs
      orbs.forEach(function (o, idx) {
        o.style.transform = "translateY(" + st * (idx ? 0.18 : 0.28) + "px)";
      });
    }
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(function () { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  onScroll();

  // 3D tilt on service cards
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".services-grid .card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "translateY(-6px) rotateX(" + (-py * 7) + "deg) rotateY(" + (px * 7) + "deg)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  // Lightbox for gallery images (mouse + keyboard accessible)
  var lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Enlarged gallery image");
  lightbox.innerHTML = '<img alt="" />';
  document.body.appendChild(lightbox);
  var lightboxImg = lightbox.querySelector("img");
  var lastFocused = null;

  function openLightbox(img) {
    lastFocused = img;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || "Enlarged gallery image";
    lightbox.classList.add("open");
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    if (lastFocused) { lastFocused.focus(); lastFocused = null; }
  }

  document.querySelectorAll(".gallery-item img").forEach(function (img) {
    img.addEventListener("click", function () { openLightbox(img); });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });
  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keyup", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
})();
