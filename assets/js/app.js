// Año footer
document.getElementById("year").textContent = new Date().getFullYear();

// Form validation (Bootstrap-style)
(() => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    status.textContent = "Enviado con éxito.";
    form.reset();
  });
})();

// Counter animation con LOOP cada 10 segundos
(() => {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
    // Transición ajustada a 5 segundos (5000ms) para llegar al final
    const duration = 5000; 
    const startTime = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const val = Math.floor(target * (1 - Math.pow(1 - t, 3)));
      el.textContent = val.toLocaleString("es-CL");
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const runAll = () => counters.forEach(animateCounter);
      runAll();
      // El loop de 10 segundos solicitado
      setInterval(runAll, 10000);
      io.disconnect();
    }
  }, { threshold: 0.3 });

  const section = document.getElementById("datos");
  if (section) io.observe(section);
})();

// HERO SLIDER
(() => {
  const bg = document.querySelector(".hero-bg");
  if (!bg) return;
  const slides = ["assets/img/hero.png", "assets/img/hero2.png", "assets/img/hero3.png", "assets/img/hero4.png"];
  let i = 0;
  bg.style.backgroundImage = `url("${slides[0]}")`;
  setInterval(() => {
    i = (i + 1) % slides.length;
    bg.style.opacity = "0";
    setTimeout(() => {
      bg.style.backgroundImage = `url("${slides[i]}")`;
      bg.style.opacity = "1";
    }, 350);
  }, 10000);
})();