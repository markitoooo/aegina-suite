// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links
  const navLinks = document.querySelectorAll('.menu-link');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Team card toggle expansion
  const teamCards = document.querySelectorAll('.team-card');

  teamCards.forEach(card => {
    card.addEventListener('click', () => {
      // Toggle aria-expanded for accessibility
      const expanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', String(!expanded));
    });

    // Keyboard support for toggle
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const expanded = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', String(!expanded));
      }
    });
  });

  // Intersection Observer for fade-in animations on sections
  const sections = document.querySelectorAll('.section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Custom cursor pointer effect (optional)
  // Just example - replace or remove if unwanted
  /*
  const cursor = document.createElement('div');
  cursor.style.position = 'fixed';
  cursor.style.width = '20px';
  cursor.style.height = '20px';
  cursor.style.border = '2px solid #007aff';
  cursor.style.borderRadius = '50%';
  cursor.style.pointerEvents = 'none';
  cursor.style.transition = 'transform 0.15s ease-out';
  cursor.style.transform = 'translate(-50%, -50%)';
  cursor.style.zIndex = '9999';
  document.body.appendChild(cursor);

  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Add subtle scale on interactive elements
  const interactiveEls = document.querySelectorAll('a, button, .team-card');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
  */
});
