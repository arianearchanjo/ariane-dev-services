/* ============================================================
   ARIARCH.DEV — shared-nav.js
   Navegação compartilhada entre todas as páginas
   ============================================================ */
'use strict';

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
