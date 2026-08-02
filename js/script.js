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

// ============ Custom cursor ============
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);
  document.body.classList.add('custom-cursor-active');

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  function trackRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(trackRing);
  }
  trackRing();

  const hoverTargets = 'a, button, .tile, .track-card, .prize-card, .sp-box, .team-card, .status-pill, .count-box, .faq-item summary';
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// ============ Registration status pill ============
(function () {
  const pill = document.getElementById('regStatusPill');
  const text = document.getElementById('regStatusText');
  if (!pill || !text) return;

  const regOpen = new Date('2026-08-03T00:00:00');
  const regClose = new Date('2026-08-31T23:59:59');
  const now = new Date();

  if (now < regOpen) {
    pill.classList.add('upcoming');
    text.textContent = 'registrations opening soon';
  } else if (now > regClose) {
    pill.classList.add('closed');
    text.textContent = 'registrations closed';
  } else {
    text.textContent = 'registrations open';
  }
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
