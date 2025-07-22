// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Animate header on load: subtle fade + slide down
gsap.from('.site-title', {
  opacity: 0,
  y: -20,
  duration: 1.2,
  ease: 'power3.out',
});

// Animate nav links sequentially on load
gsap.from('.nav-links li', {
  opacity: 0,
  y: -15,
  duration: 0.8,
  stagger: 0.15,
  delay: 0.3,
  ease: 'power3.out',
});

// Scroll-triggered animations for sections
const sections = document.querySelectorAll('.section');

sections.forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2,
  });
});

// Animate team members with stagger on scroll
gsap.utils.toArray('.team-member').forEach((member) => {
  gsap.from(member, {
    scrollTrigger: {
      trigger: member,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.2,
  });
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetID = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  });
});
