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

// ============ Interactive Honeycomb Canvas ============
(function () {
  const canvas = document.getElementById('honeycombCanvas');
  if (!canvas) return;
  const hero = canvas.closest('.hero');
  if (!hero) return;
  const ctx = canvas.getContext('2d');

  // Hex geometry
  const HEX_RADIUS = 28;         // flat-top radius
  const GAP = 5;                  // space between hexagons
  const R = HEX_RADIUS + GAP;
  const GLOW_RADIUS = 180;       // cursor influence radius in px

  // Mouse tracking (relative to hero)
  let mouseX = -9999, mouseY = -9999;
  let smoothX = -9999, smoothY = -9999;
  let isInsideHero = false;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isInsideHero = true;
  });
  hero.addEventListener('mouseleave', () => {
    isInsideHero = false;
  });

  // Precompute hex corner offsets (flat-top)
  const corners = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    corners.push({ x: Math.cos(angle) * HEX_RADIUS, y: Math.sin(angle) * HEX_RADIUS });
  }

  // Draw a single hexagon
  function drawHex(cx, cy) {
    ctx.beginPath();
    ctx.moveTo(cx + corners[0].x, cy + corners[0].y);
    for (let i = 1; i < 6; i++) {
      ctx.lineTo(cx + corners[i].x, cy + corners[i].y);
    }
    ctx.closePath();
  }

  // Sizing
  let W, H, hexCenters = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = hero.offsetWidth;
    H = hero.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGrid();
  }

  function buildGrid() {
    hexCenters = [];
    // flat-top hex tiling
    const colW = R * 1.5;
    const rowH = R * Math.sqrt(3);
    const cols = Math.ceil(W / colW) + 2;
    const rows = Math.ceil(H / rowH) + 2;
    for (let col = -1; col < cols; col++) {
      for (let row = -1; row < rows; row++) {
        const cx = col * colW;
        const cy = row * rowH + (col % 2 === 0 ? 0 : rowH * 0.5);
        hexCenters.push({ x: cx, y: cy });
      }
    }
  }

  // Color helpers
  const BASE_STROKE = 'rgba(217, 139, 24, 0.18)';
  const BASE_FILL = 'rgba(239, 169, 58, 0.04)';

  function render() {
    // Smooth mouse following
    if (isInsideHero) {
      smoothX += (mouseX - smoothX) * 0.18;
      smoothY += (mouseY - smoothY) * 0.18;
    } else {
      smoothX += (-9999 - smoothX) * 0.06;
      smoothY += (-9999 - smoothY) * 0.06;
    }

    ctx.clearRect(0, 0, W, H);

    // Subtle warm gradient backdrop
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(0.5, '#fffdf7');
    bgGrad.addColorStop(1, '#fdf8ed');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    const glowR2 = GLOW_RADIUS * GLOW_RADIUS;

    for (let i = 0; i < hexCenters.length; i++) {
      const { x: cx, y: cy } = hexCenters[i];

      // Distance from smooth cursor
      const dx = cx - smoothX;
      const dy = cy - smoothY;
      const dist2 = dx * dx + dy * dy;

      // Proximity factor (0 = far, 1 = right on cursor)
      let proximity = 0;
      if (dist2 < glowR2) {
        proximity = 1 - Math.sqrt(dist2) / GLOW_RADIUS;
        proximity = proximity * proximity; // ease-in for smoother falloff
      }

      drawHex(cx, cy);

      // Fill: base subtle + golden glow when near cursor
      if (proximity > 0.01) {
        const fillAlpha = 0.04 + proximity * 0.4;
        const r = Math.round(239 + (255 - 239) * proximity);
        const g = Math.round(169 + (226 - 169) * proximity * 0.6);
        const b = Math.round(58 - 20 * proximity);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fillAlpha})`;
      } else {
        ctx.fillStyle = BASE_FILL;
      }
      ctx.fill();

      // Stroke
      if (proximity > 0.01) {
        const strokeAlpha = 0.18 + proximity * 0.7;
        ctx.strokeStyle = `rgba(217, 139, 24, ${strokeAlpha})`;
        ctx.lineWidth = 1 + proximity * 1.2;
      } else {
        ctx.strokeStyle = BASE_STROKE;
        ctx.lineWidth = 1;
      }
      ctx.stroke();

      // Inner glow highlight on closest hexagons
      if (proximity > 0.4) {
        drawHex(cx, cy);
        const glowAlpha = (proximity - 0.4) * 0.5;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, HEX_RADIUS);
        grad.addColorStop(0, `rgba(255, 220, 100, ${glowAlpha})`);
        grad.addColorStop(1, `rgba(239, 169, 58, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    requestAnimationFrame(render);
  }

  // Use ResizeObserver for responsive resizing
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => resize()).observe(hero);
  } else {
    window.addEventListener('resize', resize);
  }

  resize();
  requestAnimationFrame(render);
})();
