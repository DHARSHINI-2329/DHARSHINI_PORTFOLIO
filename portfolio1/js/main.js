/* =============================================
   MAIN.JS — App Initialization
   Dharshini S — Futuristic Portfolio
   ============================================= */

(function () {
  'use strict';

  /* ==========================================
     1. LUCIDE ICONS INIT
     ========================================== */
  document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
      lucide.createIcons();
    }
  });

  /* ==========================================
     2. PAGE LOADER
     ========================================== */
  window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.style.opacity    = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => loader.remove(), 600);
    }
  });

  /* ==========================================
     3. HERO TYPING EFFECT
     ========================================== */
  function typeEffect(el, words, speed = 80, pause = 2200) {
    if (!el) return;
    let wordIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      const word    = words[wordIdx];
      const current = deleting
        ? word.slice(0, charIdx--)
        : word.slice(0, charIdx++);

      el.textContent = current;

      let delay = deleting ? speed * 0.6 : speed;

      if (!deleting && charIdx > word.length) {
        deleting = true;
        delay    = pause;
      } else if (deleting && charIdx < 0) {
        deleting = false;
        charIdx  = 0;
        wordIdx  = (wordIdx + 1) % words.length;
        delay    = 300;
      }
      setTimeout(tick, delay);
    }
    tick();
  }

  const typingEl = document.getElementById('hero-typing');
  if (typingEl) {
    typeEffect(typingEl, [
      'AI Developer',
      'Full Stack Builder',
      'UI/UX Designer',
      'Problem Solver',
      'Creative Coder',
    ]);
  }

  /* ==========================================
     4. SMOOTH SCROLL for CTA buttons
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ==========================================
     5. CURSOR GLOW PULSE on click
     ========================================== */
  const glowEl = document.getElementById('mouse-glow');
  document.addEventListener('click', e => {
    if (!glowEl) return;
    glowEl.style.transition = 'transform 0.15s ease';
    glowEl.style.transform  = 'translate(-50%, -50%) scale(1.4)';
    setTimeout(() => {
      glowEl.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 200);
  });

  /* ==========================================
     6. BACK TO TOP button
     ========================================== */
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }, { passive: true });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================
     7. CURRENT YEAR in footer
     ========================================== */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
