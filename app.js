// Smooth scroll to section when clicking a menu link
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Expand/collapse team member info
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('click', () => toggleTeamInfo(card));
  card.addEventListener('keypress', e => {
    if (e.key === 'Enter') toggleTeamInfo(card);
  });
});

function toggleTeamInfo(card) {
  const infoId = card.getAttribute('aria-controls');
  const expanded = card.getAttribute('aria-expanded') === 'true';
  card.setAttribute('aria-expanded', !expanded);
  document.getElementById(infoId).hidden = expanded;
}

// Fade-in sections on scroll (basic intersection observer)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});
