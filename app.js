// Smooth scroll on nav click
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Toggle team member info expansion
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
  card.addEventListener('click', () => {
    const expanded = card.getAttribute('aria-expanded') === 'true';
    teamCards.forEach(c => {
      c.setAttribute('aria-expanded', 'false');
      c.querySelector('.team-info').hidden = true;
    });
    if (!expanded) {
      card.setAttribute('aria-expanded', 'true');
      card.querySelector('.team-info').hidden = false;
    }
  });

  // Keyboard accessibility (Enter and Space)
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});
