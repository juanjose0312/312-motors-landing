"use strict";

// TODO: replace with the client's real WhatsApp number
const WHATSAPP_NUMBER = "573000000000";

// ===== Sticky header =====
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
}, { passive: true });

// ===== Mobile nav =====
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== Gallery carousel =====
(function initCarousel() {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  const slides = track.children;
  const dotsContainer = document.getElementById("carouselDots");
  let index = 0;
  let autoplayTimer = null;

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Ir a la imagen ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.children;

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("is-active", i === index);
    }
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
    restartAutoplay();
  }

  function restartAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      index = (index + 1) % slides.length;
      render();
    }, 5000);
  }

  document.getElementById("carouselPrev").addEventListener("click", () => goTo(index - 1));
  document.getElementById("carouselNext").addEventListener("click", () => goTo(index + 1));

  // Basic swipe support for touch devices
  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) goTo(delta < 0 ? index + 1 : index - 1);
  }, { passive: true });

  render();
  restartAutoplay();
})();

// ===== Contact form -> WhatsApp =====
(function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const errorMsg = document.getElementById("formError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const isEmpty = !field.value.trim();
      field.classList.toggle("is-invalid", isEmpty);
      if (isEmpty) valid = false;
    });

    errorMsg.hidden = valid;
    if (!valid) return;

    const data = new FormData(form);
    const lines = [
      "Hola 312 Motors, quiero agendar una cita.",
      `Nombre: ${data.get("name")}`,
      `Teléfono: ${data.get("phone")}`,
      `Vehículo: ${data.get("vehicle")}`,
      data.get("date") ? `Fecha preferida: ${data.get("date")}` : null,
      `Descripción: ${data.get("message")}`,
    ].filter(Boolean);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });

  form.querySelectorAll("[required]").forEach((field) => {
    field.addEventListener("input", () => field.classList.remove("is-invalid"));
  });
})();
