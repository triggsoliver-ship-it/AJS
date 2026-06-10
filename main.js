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
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Current year in footer
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Scroll reveal
  var revealTargets = document.querySelectorAll(
    ".card, .about-card, .about-text, .gallery-item, .contact-hours, .contact-info, .section-head"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  }

  // Lightbox for gallery images (skips placeholders)
  var lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = '<img alt="AJS gallery image" />';
  document.body.appendChild(lightbox);
  var lightboxImg = lightbox.querySelector("img");

  document.querySelectorAll(".gallery-item img").forEach(function (img) {
    img.addEventListener("click", function () {
      lightboxImg.src = img.src;
      lightbox.classList.add("open");
    });
  });
  lightbox.addEventListener("click", function () { lightbox.classList.remove("open"); });
  document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") lightbox.classList.remove("open");
  });
})();
