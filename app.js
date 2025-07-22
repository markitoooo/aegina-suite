// app.js

// Smooth scrolling for menu links
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElem = document.getElementById(targetId);
    if (targetElem) {
      window.scrollTo({
        top: targetElem.offsetTop - 70, // navbar height offset
        behavior: 'smooth'
      });
    }
  });
});

// Team card toggle info display
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('click', () => {
    const info = card.querySelector('.team-info');
    const expanded = card.getAttribute('aria-expanded') === 'true';

    if (expanded) {
      info.hidden = true;
      card.setAttribute('aria-expanded', 'false');
    } else {
      // Close all others
      document.querySelectorAll('.team-card').forEach(c => {
        c.querySelector('.team-info').hidden = true;
        c.setAttribute('aria-expanded', 'false');
      });
      info.hidden = false;
      card.setAttribute('aria-expanded', 'true');
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

// Fade-in on scroll animation using Intersection Observer
const faders = document.querySelectorAll('.section, .team-card, .hero-section');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  fader.classList.add('fade'); // Initially faded
  appearOnScroll.observe(fader);
});

// Liquid circle highlight animation (pulse on hover)
const highlightedCircle = document.querySelector('.highlighted-circle');
highlightedCircle.addEventListener('mouseenter', () => {
  highlightedCircle.style.animation = 'pulse 1.5s infinite alternate';
});
highlightedCircle.addEventListener('mouseleave', () => {
  highlightedCircle.style.animation = '';
});

// Subtle bounce on nav menu items on hover
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.animation = 'bounce 0.3s ease forwards';
  });
  link.addEventListener('animationend', () => {
    link.style.animation = '';
  });
});

// Cursor follower effect
const cursor = document.createElement('div');
cursor.id = 'cursor-follower';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Hover effect for team cards scaling and shadow handled in CSS

// Animations keyframes inserted via JS for better control
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes pulse {
    0% { box-shadow: 0 0 8px rgba(0,122,255,0.6); transform: scale(1); }
    100% { box-shadow: 0 0 20px rgba(0,122,255,1); transform: scale(1.05); }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes bounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0); }
  }
`, styleSheet.cssRules.length);

// Appear fade-in animation
styleSheet.insertRule(`
  .fade {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .appear {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`, styleSheet.cssRules.length);

// Cursor styling
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  #cursor-follower {
    position: fixed;
    pointer-events: none;
    width: 20px;
    height: 20px;
    margin-left: -10px;
    margin-top: -10px;
    border-radius: 50%;
    border: 2px solid var(--webflow-blue);
    transition: background-color 0.3s ease, transform 0.15s ease;
    z-index: 9999;
    mix-blend-mode: difference;
  }
`;
document.head.appendChild(cursorStyle);
