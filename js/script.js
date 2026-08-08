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

// ============ Hero countdown ============
(function () {
  const target = new Date('2026-08-31T23:59:00');
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
const HACKATHON_START = new Date('2026-08-31T23:59:00');
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

// ============ Interactive Glowing Honeycomb Hero Canvas ============
(function () {
  const canvas = document.getElementById('honeycombCanvas');
  if (!canvas) return;
  const hero = canvas.closest('.hero');
  if (!hero) return;
  const ctx = canvas.getContext('2d');

  const HEX_RADIUS = 30;
  const GAP = 4.5;
  const R = HEX_RADIUS + GAP;
  const GLOW_RADIUS = 210;
  const GLOW_RADIUS_SQ = GLOW_RADIUS * GLOW_RADIUS;

  let mouseX = -9999, mouseY = -9999;
  let isMouseOverHero = false;

  window.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
      mouseX = x;
      mouseY = y;
      isMouseOverHero = true;
    } else {
      isMouseOverHero = false;
      mouseX = -9999;
      mouseY = -9999;
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isMouseOverHero = false;
    mouseX = -9999;
    mouseY = -9999;
  });

  const corners = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    corners.push({
      x: Math.cos(angle) * HEX_RADIUS,
      y: Math.sin(angle) * HEX_RADIUS
    });
  }

  function drawHexagon(cx, cy) {
    ctx.beginPath();
    ctx.moveTo(cx + corners[0].x, cy + corners[0].y);
    for (let i = 1; i < 6; i++) {
      ctx.lineTo(cx + corners[i].x, cy + corners[i].y);
    }
    ctx.closePath();
  }

  let W = 0, H = 0;
  let hexCells = [];

  // Circles (in canvas-local coords) where the honeycomb glow must never
  // paint — keeps the DAVV / SDSF logo badges clear of the hover effect.
  let logoZones = [];

  function computeLogoZones() {
    const rect = hero.getBoundingClientRect();
    const badges = hero.querySelectorAll('.school-badge');
    logoZones = Array.from(badges).map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left - rect.left + r.width / 2,
        y: r.top - rect.top + r.height / 2,
        radius: Math.max(r.width, r.height) / 2 + 6
      };
    });
  }

  function isInLogoZone(x, y) {
    for (let i = 0; i < logoZones.length; i++) {
      const z = logoZones[i];
      const dx = x - z.x, dy = y - z.y;
      if (dx * dx + dy * dy < z.radius * z.radius) return true;
    }
    return false;
  }

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = hero.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGrid();
    computeLogoZones();
  }

  function buildGrid() {
    hexCells = [];
    const colStep = R * 1.5;
    const rowStep = R * Math.sqrt(3);
    const cols = Math.ceil(W / colStep) + 2;
    const rows = Math.ceil(H / rowStep) + 2;

    for (let col = -1; col < cols; col++) {
      for (let row = -1; row < rows; row++) {
        const cx = col * colStep;
        const cy = row * rowStep + (col % 2 === 0 ? 0 : rowStep * 0.5);
        hexCells.push({
          x: cx,
          y: cy,
          glow: 0,
          pulseOffset: (cx * 0.05 + cy * 0.05) % (Math.PI * 2)
        });
      }
    }
  }

  const BASE_STROKE = 'rgba(217, 147, 42, 0.20)';

  let time = 0;

  function renderHoneycomb() {
    time += 0.02;

    // Transparent base — lets the existing gold hero background show through.
    ctx.clearRect(0, 0, W, H);

    if (isMouseOverHero && mouseX > -100 && mouseY > -100) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, H);
      for (let i = 0; i < logoZones.length; i++) {
        const z = logoZones[i];
        ctx.moveTo(z.x + z.radius, z.y);
        ctx.arc(z.x, z.y, z.radius, 0, Math.PI * 2, true);
      }
      ctx.clip('evenodd');

      const spotGrad = ctx.createRadialGradient(
        mouseX, mouseY, 10,
        mouseX, mouseY, GLOW_RADIUS * 1.3
      );
      spotGrad.addColorStop(0, 'rgba(255, 204, 77, 0.20)');
      spotGrad.addColorStop(0.5, 'rgba(239, 169, 58, 0.09)');
      spotGrad.addColorStop(1, 'rgba(239, 169, 58, 0)');
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    for (let i = 0; i < hexCells.length; i++) {
      const cell = hexCells[i];
      const dx = cell.x - mouseX;
      const dy = cell.y - mouseY;
      const distSq = dx * dx + dy * dy;

      let targetGlow = 0;
      if (distSq < GLOW_RADIUS_SQ) {
        const factor = 1 - Math.sqrt(distSq) / GLOW_RADIUS;
        targetGlow = factor * factor;
      }

      cell.glow += (targetGlow - cell.glow) * (targetGlow > cell.glow ? 0.35 : 0.10);

      if (isInLogoZone(cell.x, cell.y)) continue;

      drawHexagon(cell.x, cell.y);

      if (cell.glow > 0.01) {
        const fillAlpha = 0.035 + cell.glow * 0.45;
        const r = Math.round(239 + (255 - 239) * cell.glow);
        const g = Math.round(169 + (218 - 169) * cell.glow);
        const b = Math.round(58 + (90 - 58) * (1 - cell.glow));
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fillAlpha.toFixed(3)})`;
      } else {
        const idleAlpha = 0.03 + Math.sin(time + cell.pulseOffset) * 0.012;
        ctx.fillStyle = `rgba(239, 169, 58, ${idleAlpha.toFixed(3)})`;
      }
      ctx.fill();

      if (cell.glow > 0.01) {
        const strokeAlpha = 0.20 + cell.glow * 0.78;
        ctx.strokeStyle = `rgba(224, 150, 30, ${strokeAlpha.toFixed(3)})`;
        ctx.lineWidth = 1.1 + cell.glow * 1.5;
      } else {
        ctx.strokeStyle = BASE_STROKE;
        ctx.lineWidth = 1.1;
      }
      ctx.stroke();

      if (cell.glow > 0.35) {
        drawHexagon(cell.x, cell.y);
        const coreAlpha = (cell.glow - 0.35) * 0.65;
        const coreGrad = ctx.createRadialGradient(cell.x, cell.y, 0, cell.x, cell.y, HEX_RADIUS);
        coreGrad.addColorStop(0, `rgba(255, 235, 130, ${coreAlpha.toFixed(3)})`);
        coreGrad.addColorStop(1, 'rgba(239, 169, 58, 0)');
        ctx.fillStyle = coreGrad;
        ctx.fill();
      }
    }

    requestAnimationFrame(renderHoneycomb);
  }

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => resizeCanvas()).observe(hero);
  } else {
    window.addEventListener('resize', resizeCanvas);
  }

  resizeCanvas();
  requestAnimationFrame(renderHoneycomb);
})();
