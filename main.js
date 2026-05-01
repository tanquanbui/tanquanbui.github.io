/* ============================================================
   main.js — Portfolio interactivity
   - Typewriter hero text
   - Scroll-reveal (IntersectionObserver)
   - Sticky nav: hide on scroll-down, show on scroll-up
   - Active nav link highlighting
   - Animated stat counters
   - Mobile nav toggle
   ============================================================ */

/* ── Typewriter ── */
(function typewriter() {
  const el    = document.getElementById('typewriter');
  if (!el) return;

  const words = [
    'Cloud & IT Graduate',
    'AWS Enthusiast',
    'Infrastructure as Code',
    'Serverless Builder',
    'CLF-C02 Candidate',
  ];

  let wordIndex  = 0;
  let charIndex  = 0;
  let deleting   = false;
  const SPEED_TYPE   = 75;
  const SPEED_DELETE = 40;
  const PAUSE_END    = 1800;
  const PAUSE_START  = 400;

  function tick() {
    const word    = words[wordIndex];
    const visible = word.slice(0, charIndex);
    el.textContent = visible;

    if (!deleting && charIndex === word.length) {
      setTimeout(tick, PAUSE_END);
      deleting = true;
      return;
    }

    if (deleting && charIndex === 0) {
      deleting    = false;
      wordIndex   = (wordIndex + 1) % words.length;
      setTimeout(tick, PAUSE_START);
      return;
    }

    charIndex += deleting ? -1 : 1;
    setTimeout(tick, deleting ? SPEED_DELETE : SPEED_TYPE);
  }

  tick();
})();

/* ── Scroll reveal (IntersectionObserver) ── */
(function scrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
})();

/* ── Nav: hide on scroll-down, show on scroll-up ── */
(function navScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastY     = window.scrollY;
  let ticking   = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        nav.classList.toggle('hidden',  y > lastY && y > 80);
        nav.classList.toggle('scrolled', y > 20);
        lastY   = y;
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ── Active nav link ── */
(function activeNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link[data-section]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ── Mobile nav toggle ── */
(function mobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── Animated stat counters ── */
(function animateStats() {
  const cards = document.querySelectorAll('.stat-num[data-target]');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        countUp(el, target);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  cards.forEach(el => observer.observe(el));
})();

/* Shared count-up utility — also used by counter.js */
function countUp(el, target, duration = 1200) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);           // ease-out cubic
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* Expose for counter.js */
window.countUp = countUp;
