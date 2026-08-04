// ============ Mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============ Scroll to top button ============
const scrollTopBtn = document.getElementById('scrollTop');
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('scroll', () => {
  scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// ============ Smooth Bee Cursor (No Trail) ============
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  // --- Bee cursor element ---
  const bee = document.createElement('div');
  bee.className = 'cursor-bee';
  bee.innerHTML = '<img src="images/bee-cursor.png" alt="" draggable="false">';
  document.body.appendChild(bee);
  document.body.classList.add('custom-cursor-active');

  // --- Mouse & physics state ---
  let mouseX = -200, mouseY = -200;
  let beeX = -200, beeY = -200;
  let prevBeeX = -200, prevBeeY = -200;
  let currentTilt = 0;
  let currentScale = 1;
  let targetScale = 1;
  let isVisible = false;
  let isMouseDown = false;

  // --- Mouse tracking ---
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      bee.style.opacity = '1';
      beeX = mouseX;
      beeY = mouseY;
      prevBeeX = mouseX;
      prevBeeY = mouseY;
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    bee.style.opacity = '0';
  });

  // --- Interactive element hover states ---
  const interactiveSelector = 'a, button, input, textarea, select, [role="button"], .btn, .nav-links li, .card, .sponsor-card, .faq-question';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      targetScale = 1.15;
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      targetScale = 1.0;
    }
  }, { passive: true });

  document.addEventListener('mousedown', () => {
    isMouseDown = true;
    targetScale = 0.9;
  });

  document.addEventListener('mouseup', () => {
    isMouseDown = false;
    targetScale = 1.0;
  });

  // --- Butter-smooth physics loop ---
  function render() {
    if (isVisible) {
      // Smooth organic gliding follow (tuned lerp for fluid flight)
      prevBeeX = beeX;
      prevBeeY = beeY;
      beeX += (mouseX - beeX) * 0.22;
      beeY += (mouseY - beeY) * 0.22;

      const dx = beeX - prevBeeX;

      // Smooth banking flight tilt
      const targetTilt = Math.max(-24, Math.min(24, dx * 2.4));
      currentTilt += (targetTilt - currentTilt) * 0.16;

      // Smooth scale interpolation
      currentScale += (targetScale - currentScale) * 0.2;

      // GPU transform update
      bee.style.transform = `translate3d(${beeX.toFixed(2)}px, ${beeY.toFixed(2)}px, 0) scale(${currentScale.toFixed(3)}) rotate(${currentTilt.toFixed(2)}deg)`;
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();

// ============ Hero countdown ============
(function () {
  const target = new Date('2026-09-06T00:00:00');
  const els = {
    days: document.getElementById('cdDays'),
    hours: document.getElementById('cdHours'),
    minutes: document.getElementById('cdMinutes'),
    seconds: document.getElementById('cdSeconds'),
  };
  if (!els.days) return;

  const pad = (n) => String(n).padStart(2, '0');

  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      els.days.textContent = els.hours.textContent = els.minutes.textContent = els.seconds.textContent = '00';
      return;
    }
    els.days.textContent = pad(Math.floor(diff / 86400000));
    els.hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    els.minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
    els.seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
  }

  tick();
  setInterval(tick, 1000);
})();

// ============ Scroll reveal ============
const revealTargets = document.querySelectorAll(
  '.about-grid, .hex-card, .part-right, .flower-card, .team-card, .faq-item'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ============ Countdown ============
// Set HACKATHON_START to a future date to enable a live countdown.
// While it is null / in the past, the "hackathon coming soon" state is shown.
const HACKATHON_START = new Date('2026-09-06T00:00:00');
const countdownEl = document.getElementById('countdownText');

function renderCountdown() {
  if (!countdownEl) return;
  if (!HACKATHON_START || HACKATHON_START <= new Date()) {
    countdownEl.textContent = 'hackathon coming soon!';
    return;
  }
  const diff = HACKATHON_START - new Date();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  countdownEl.textContent = `${d} Days : ${h} Hours : ${m} Minutes`;
}
renderCountdown();
setInterval(renderCountdown, 60000);
