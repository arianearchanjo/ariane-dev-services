/* ============================================================
   ARIANE ARCHANJO — PORTFOLIO FREELANCE
   script.js
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────
   1. CURSOR PERSONALIZADO
   ────────────────────────────────────────────── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  const hoverTargets = document.querySelectorAll('a, button, .project-card, .service-card, .diff-card, .contact-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });
})();

/* ──────────────────────────────────────────────
   2. NAVBAR & ANCHOR NAVIGATION
   ────────────────────────────────────────────── */
(function initNavbar() {
  const siteNav   = document.getElementById('siteNav');
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.getElementById('navLinks');
  const allLinks  = navLinks ? navLinks.querySelectorAll('a') : [];

  window.addEventListener('scroll', () => {
    if (siteNav) siteNav.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveAnchor();
    if (typeof updateBackTop === 'function') updateBackTop();
  }, { passive: true });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    allLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  function updateActiveAnchor() {
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentId = section.id;
      }
    });

    allLinks.forEach(link => {
      const anchor = link.dataset.anchor;
      if (anchor) {
        link.classList.toggle('active-anchor', anchor === currentId);
      } else {
        const path = location.pathname.split('/').pop() || 'index.html';
        const linkPage = link.dataset.page;
        link.classList.toggle('active', linkPage === path);
      }
    });
  }
  
  // Run once on load
  updateActiveAnchor();
})();

/* ──────────────────────────────────────────────
   3. DARK / LIGHT MODE
   ────────────────────────────────────────────── */
(function initTheme() {
  const toggle    = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html      = document.documentElement;

  const saved = localStorage.getItem('theme');
  if (saved) { 
    html.setAttribute('data-theme', saved); 
    updateIcon(saved); 
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon(next);
    });
  }

  function updateIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
})();

/* ──────────────────────────────────────────────
   4. REVEAL ANIMATION
   ────────────────────────────────────────────── */
(function initReveal() {
  const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ──────────────────────────────────────────────
   5. TEXTO DIGITADO (Typed.js inspired)
   ────────────────────────────────────────────── */
(function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    "Do jeito certo.",
    "Sites que vendem.",
    "Design que converte.",
    "Foco em resultados.",
    "Sua marca online."
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let isDeleting = false;
  let typeSpeed  = 100;

  function type() {
    const current = phrases[phraseIdx];
    
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 50;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1000);
})();

/* ──────────────────────────────────────────────
   6. BACK TO TOP
   ────────────────────────────────────────────── */
function updateBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  if (window.scrollY > 500) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

const backTopBtn = document.getElementById('backTop');
if (backTopBtn) {
  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ──────────────────────────────────────────────
   7. FOOTER YEAR
   ────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ──────────────────────────────────────────────
   8. CARD TILT EFFECT (Opcional/Sutil)
   ────────────────────────────────────────────── */
(function initTilt() {
  const cards = document.querySelectorAll('.service-card, .project-card, .review-card');
  if (window.innerWidth < 768) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = (x - (rect.width / 2)) / (rect.width / 2);
      const dy = (y - (rect.height / 2)) / (rect.height / 2);
      card.style.transform = `perspective(600px) rotateX(${-dy * 2}deg) rotateY(${dx * 2}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();