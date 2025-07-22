// Smooth scroll active nav highlight and scroll animation for sections

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section, header');
  const menuLinks = document.querySelectorAll('.menu-link');

  function debounce(func, wait = 10, immediate = false) {
    let timeout;
    return function () {
      const context = this, args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function activateMenuLink() {
    let scrollPos = window.scrollY || window.pageYOffset;
    sections.forEach(section => {
      const top = section.offsetTop - 80;
      const bottom = top + section.offsetHeight;
      const id = section.id;

      if (scrollPos >= top && scrollPos < bottom) {
        menuLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', debounce(activateMenuLink, 20));

  // Animate sections on scroll (fade in + translate)
  function animateOnScroll() {
    const windowBottom = window.innerHeight + window.scrollY;
    sections.forEach(section => {
      const revealPoint = section.offsetTop + 100;
      if (windowBottom > revealPoint) {
        section.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', debounce(animateOnScroll, 20));
  animateOnScroll();

  // Team cards expand/collapse details on click or keyboard
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('click', () => toggleCard(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      }
    });
  });

  function toggleCard(card) {
    const info = card.querySelector('.team-info');
    const expanded = card.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      info.hidden = true;
      card.setAttribute('aria-expanded', 'false');
    } else {
      info.hidden = false;
      card.setAttribute('aria-expanded', 'true');
    }
  }
});
