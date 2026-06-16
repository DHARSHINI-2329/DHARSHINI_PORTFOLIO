/* =============================================
   PARTICLES.JS — Canvas Particle Network
   Dharshini S — Futuristic Portfolio
   ============================================= */

(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  const CONFIG = {
    count:        90,
    speed:        0.35,
    radius:       1.8,
    lineDistance: 130,
    mouseRadius:  160,
    color:        '0, 245, 212',
    lineOpacity:  0.18,
    dotOpacity:   0.55,
  };

  /* ---------- Resize handler ---------- */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ---------- Particle class ---------- */
  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : (Math.random() > 0.5 ? -5 : H + 5);
      this.vx = (Math.random() - 0.5) * CONFIG.speed;
      this.vy = (Math.random() - 0.5) * CONFIG.speed;
      this.r  = Math.random() * CONFIG.radius + 0.5;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      /* Mouse repulsion */
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONFIG.mouseRadius) {
        const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
        this.vx += (dx / dist) * force * 0.8;
        this.vy += (dy / dist) * force * 0.8;
      }

      /* Dampen velocity */
      this.vx *= 0.98;
      this.vy *= 0.98;

      /* Clamp speed */
      const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (spd > CONFIG.speed * 3) {
        this.vx = (this.vx / spd) * CONFIG.speed * 3;
        this.vy = (this.vy / spd) * CONFIG.speed * 3;
      }

      this.x += this.vx;
      this.y += this.vy;

      /* Wrap around edges */
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.color}, ${this.alpha * CONFIG.dotOpacity})`;
      ctx.fill();
    }
  }

  /* ---------- Init ---------- */
  function init() {
    resize();
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(new Particle());
    }
  }

  /* ---------- Draw connections ---------- */
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.lineDistance) {
          const alpha = (1 - dist / CONFIG.lineDistance) * CONFIG.lineOpacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${CONFIG.color}, ${alpha})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  /* ---------- Animate ---------- */
  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  /* ---------- Events ---------- */
  window.addEventListener('resize', () => { resize(); });
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  /* ---------- Start ---------- */
  init();
  animate();
})();
