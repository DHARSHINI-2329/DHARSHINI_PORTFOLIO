/* =============================================
   ANIMATIONS.JS — Scroll Reveals, Mouse Glow,
   Counter Animations & Education Bars
   Dharshini S — Futuristic Portfolio
   ============================================= */

(function () {

  /* ==========================================
     1. MOUSE-FOLLOW GLOW
     ========================================== */
  const glowEl = document.getElementById('mouse-glow');
  if (glowEl) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
    let tx = gx, ty = gy;

    window.addEventListener('mousemove', e => {
      tx = e.clientX;
      ty = e.clientY;
    });

    (function animateGlow() {
      gx += (tx - gx) * 0.06;
      gy += (ty - gy) * 0.06;
      glowEl.style.left = gx + 'px';
      glowEl.style.top  = gy + 'px';
      requestAnimationFrame(animateGlow);
    })();
  }

  /* ==========================================
     2. SCROLL REVEAL — Intersection Observer
     ========================================== */
  const revealTargets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ==========================================
     3. COUNTER ANIMATION (stats numbers)
     ========================================== */
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target || el.textContent);
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const val      = eased * target;
      el.textContent = val.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));

  /* ==========================================
     4. EDUCATION SCORE BARS
     ========================================== */
  const eduEntries = document.querySelectorAll('.edu-entry');
  const eduObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const bar = entry.target.querySelector('.edu-score-bar-fill');
        if (bar) {
          // trigger CSS transition by ensuring the width variable is set
          bar.style.width = bar.style.getPropertyValue('--score-pct') || bar.dataset.pct || '80%';
        }
        eduObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  eduEntries.forEach(el => eduObserver.observe(el));

  /* ==========================================
     5. SKILL ORBS — Stagger on viewport entry
     ========================================== */
  const orbGroups = document.querySelectorAll('.skills-orb-grid, .soft-skills-grid');
  const orbObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          setTimeout(() => {
            child.style.opacity    = '1';
            child.style.transform  = 'translateY(0)';
          }, i * 60);
        });
        orbObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  orbGroups.forEach(group => {
    Array.from(group.children).forEach(child => {
      child.style.opacity   = '0';
      child.style.transform = 'translateY(20px)';
      child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    orbObserver.observe(group);
  });

  /* ==========================================
     6. CONTACT FORM — Submit handler (demo)
     ========================================== */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const origText = btn.innerHTML;
      btn.innerHTML   = '<i data-lucide="check-circle"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #008C76, #00A693)';
      if (window.lucide) lucide.createIcons();
      setTimeout(() => {
        btn.innerHTML        = origText;
        btn.style.background = '';
        if (window.lucide) lucide.createIcons();
        form.reset();
      }, 3000);
    });
  }

  /* ==========================================
     7. PARALLAX — subtle hero content drift
     ========================================== */
  const heroContent = document.querySelector('.hero-grid');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroContent.style.transform = `translateY(${scrolled * 0.12}px)`;
    }, { passive: true });
  }

})();
