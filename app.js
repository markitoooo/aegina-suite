// Smooth scroll to sections on nav click without highlight or default jump
document.querySelectorAll('.nav-menu a').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetID = anchor.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetID);
    if (!targetSection) return;

    targetSection.focus({preventScroll:true}); // for accessibility

    window.scrollTo({
      top: targetSection.offsetTop - 70, // navbar height offset
      behavior: 'smooth'
    });
  });
});

// Team member expandable bio toggle for keyboard and mouse
document.querySelectorAll('.team-card.expandable').forEach(card => {
  card.addEventListener('click', () => {
    const expanded = card.getAttribute('aria-expanded') === 'true';
    card.setAttribute('aria-expanded', !expanded);
  });

  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const expanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', !expanded);
    }
  });
});

// Hero section canvas animation (simple wave effect using GSAP and canvas)
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let points = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.querySelector('.hero-section').offsetHeight;
    points = [];
    const spacing = width / 8;
    for (let i = 0; i <= 8; i++) {
      points.push({ x: i * spacing, y: height / 2 + Math.sin(i) * 20 });
    }
  }

  function drawWave(time) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 113, 243, 0.25)';
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const current = points[i];
      const cx = (prev.x + current.x) / 2;
      const cy = (prev.y + current.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
  }

  function animate(time = 0) {
    points.forEach((point, i) => {
      point.y = height / 2 + Math.sin((time / 500) + i) * 20;
    });
    drawWave(time);
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();
