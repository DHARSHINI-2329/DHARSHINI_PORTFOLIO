/* =============================================
   NAVBAR.JS — Navigation Behavior
   Dharshini S — Futuristic Portfolio
   ============================================= */

(function () {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks   = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const sections   = document.querySelectorAll('section[id]');

  /* ---------- Scroll: add glass class ---------- */
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  /* ---------- Active link tracking ---------- */
  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top    = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  /* ---------- Hamburger toggle ---------- */
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  /* ---------- Smooth scroll + close mobile menu ---------- */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        /* Close mobile */
        if (hamburger) hamburger.classList.remove('open');
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    });
  });

  /* ---------- Listen ---------- */
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init call
})();
