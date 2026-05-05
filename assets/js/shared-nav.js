/* ============================================================
   ARIARCH.TECH — shared-nav.js
   Navegação compartilhada entre todas as páginas
   ============================================================ */
'use strict';

(function initSharedTheme() {
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
    updateIcon(saved);
  }

  const toggle = document.getElementById('themeToggle');
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
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
})();

(function initSharedNav() {
  const hamburger = document.getElementById('navHamburger');
  const links     = document.getElementById('navLinks');
  if (!hamburger || !links) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    links.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      links.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Mark active based on current page
  const path = location.pathname.split('/').pop() || 'index.html';
  links.querySelectorAll('a[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('active');
  });
})();
