// Beam overlay and activation logic
(function () {
  let svg, path, head, beamContainer;
  let totalLength = 0;
  let targets = [];
  let targetsData = [];
  let sectionsData = [];
  let ticking = false;
  let initScheduled = false;

  const ACTIVATION_RADIUS = 100; // distance from path/head to trigger glow
  const LEAD = 0; // no lead; trigger when head actually reaches

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  function getDocHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }

  function updateSVGSize() {
    const docH = getDocHeight();
    const vw = window.innerWidth;
    svg.setAttribute('width', String(vw));
    svg.setAttribute('height', String(docH));
    svg.setAttribute('viewBox', `0 0 ${vw} ${docH}`);
    if (beamContainer) {
      beamContainer.style.height = docH + 'px';
      beamContainer.style.width = '100%';
    }
    return { docH, vw };
  }

  function getProfileCenter() {
    const el = qs('#profile-photo');
    if (!el) return { x: window.innerWidth * 0.5, y: 80 };
    const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2 + window.scrollX;
    const y = r.top + r.height / 2 + window.scrollY;
    return { x, y };
  }

  function buildPath() {
    const { docH, vw } = updateSVGSize();
    const start = getProfileCenter();

    const y1 = Math.min(start.y + 400, docH * 0.30);
    const y2 = Math.min(start.y + 1100, docH * 0.65);
    const y3 = Math.max(docH - 100, start.y + 1400);

    const x1 = vw * 0.70;
    const x2 = vw * 0.25;
    const x3 = vw * 0.60;

    const d = [
      `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`,
      // curve to point 1
      `C ${(start.x + 120).toFixed(1)} ${(start.y + 240).toFixed(1)}, ${(x1 - 120).toFixed(1)} ${(y1 - 120).toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`,
      // curve to point 2
      `C ${(x1 + 120).toFixed(1)} ${(y1 + 250).toFixed(1)}, ${(x2 - 120).toFixed(1)} ${(y2 - 120).toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`,
      // curve to point 3 (near bottom)
      `C ${(x2 + 120).toFixed(1)} ${(y2 + 220).toFixed(1)}, ${(x3 - 120).toFixed(1)} ${(y3 - 200).toFixed(1)}, ${x3.toFixed(1)} ${y3.toFixed(1)}`
    ].join(' ');

    path.setAttribute('d', d);

    totalLength = path.getTotalLength();
    path.style.strokeDasharray = String(totalLength);
    path.style.strokeDashoffset = String(totalLength);
  }

  function computeClosestLengthForPoint(px, py) {
    let bestLen = 0;
    let bestDist2 = Infinity;
    const step = 3; // finer sampling for better precision
    for (let l = 0; l <= totalLength; l += step) {
      const pt = path.getPointAtLength(l);
      const dx = pt.x - px;
      const dy = pt.y - py;
      const d2 = dx * dx + dy * dy;
      if (d2 < bestDist2) {
        bestDist2 = d2;
        bestLen = l;
      }
    }
    return bestLen;
  }

  function collectTargets() {
    targets = qsa('[data-beam-target]');
    targetsData = targets.map((el) => {
      const r = el.getBoundingClientRect();
      const left = r.left + window.scrollX;
      const top = r.top + window.scrollY;
      const right = left + r.width;
      const bottom = top + r.height;
      const cx = left + r.width / 2;
      const cy = top + r.height / 2;
      const length = computeClosestLengthForPoint(cx, cy);
      return { el, length, cx, cy, rect: { left, top, right, bottom } };
    });
  }

  function distancePointToRect(px, py, rect) {
    const dx = Math.max(rect.left - px, 0, px - rect.right);
    const dy = Math.max(rect.top - py, 0, py - rect.bottom);
    if (dx === 0 && dy === 0) return 0; // inside rect
    return Math.hypot(dx, dy);
  }

  function collectSections() {
    const ids = ['experience', 'projects'];
    sectionsData = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const bottom = r.bottom + window.scrollY;
      const cards = Array.from(el.querySelectorAll('.project-card'));
      return { id, el, top, bottom, cards };
    }).filter(Boolean);
  }

  function updateOnScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    const drawLen = totalLength * progress;

    path.style.strokeDashoffset = String(totalLength - drawLen);

    const headLen = Math.max(0, Math.min(totalLength, drawLen));
    const pt = path.getPointAtLength(headLen);
    head.setAttribute('cx', String(pt.x));
    head.setAttribute('cy', String(pt.y));
    head.style.opacity = '1';

    // Section-based activation: when beam head is within a section's vertical band
    if (sectionsData && sectionsData.length) {
      for (const s of sectionsData) {
        const inSection = pt.y >= s.top && pt.y <= s.bottom;
        s.el.classList.toggle('section-glow', inSection);
      }
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      updateOnScroll();
    });
  }

  function init() {
    beamContainer = document.querySelector('.beam-overlay');
    svg = document.getElementById('beam-svg');
    path = document.getElementById('beam-path');
    head = document.getElementById('beam-head');
    if (!svg || !path || !head) return;
    buildPath();
    collectTargets();
    collectSections();
    updateOnScroll();
    setupScrollSpy();
  }

  function scheduleInit() {
    if (initScheduled) return;
    initScheduled = true;
    requestAnimationFrame(() => {
      initScheduled = false;
      init();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
  window.addEventListener('load', () => { init(); });
  window.addEventListener('resize', () => { scheduleInit(); });
  window.addEventListener('scroll', onScroll, { passive: true });
  if (window.matchMedia) {
    ['(max-width: 960px)', '(max-width: 640px)', '(orientation: portrait)'].forEach(q => {
      const m = window.matchMedia(q);
      if (m.addEventListener) m.addEventListener('change', scheduleInit);
      else if (m.addListener) m.addListener(scheduleInit);
    });
  }

  const profile = document.getElementById('profile-photo');
  if (profile) {
    if ('ResizeObserver' in window) {
      try { new ResizeObserver(() => scheduleInit()).observe(profile); } catch {}
    }
    profile.addEventListener('load', scheduleInit, { once: true });
  }

  const page = document.querySelector('.page');
  if (page && 'ResizeObserver' in window) {
    try { new ResizeObserver(() => scheduleInit()).observe(page); } catch {}
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => scheduleInit());
  }

  // Scroll spy and smooth active state
  function setupScrollSpy() {
    const links = Array.from(document.querySelectorAll('.nav-item'));
    const map = new Map([
      ['#home', document.getElementById('home-section') || document.getElementById('home')],
      ['#experience', document.getElementById('experience')],
      ['#projects', document.getElementById('projects')],
      ['#blog', document.getElementById('blog')]
    ]);

    // Smooth scroll offset fix for sticky header not necessary due to CSS scroll-behavior
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (!hash || !hash.startsWith('#')) return;
        const section = map.get(hash);
        if (!section) return;
        e.preventDefault();
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        let topMost = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!topMost || entry.boundingClientRect.top < topMost.boundingClientRect.top) {
              topMost = entry;
            }
          }
        }
        if (topMost) {
          const id = '#' + (topMost.target.id === 'home-section' ? 'home' : topMost.target.id);
          links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
        }
      }, { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] });

      map.forEach((section) => { if (section) observer.observe(section); });
    }
  }
})();


