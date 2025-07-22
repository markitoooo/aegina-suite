// Smooth scroll for menu links
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Toggle team info expand
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
    const info = card.querySelector('.team-info');
    if (info) info.hidden = !info.hidden;
  });
});

// Remove laggy cursors
document.body.style.cursor = 'default';
