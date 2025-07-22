// Three.js background scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("three-canvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.SphereGeometry(0.05, 16, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x61dafb });
let particles = [];

for (let i = 0; i < 250; i++) {
  const particle = new THREE.Mesh(geometry, material);
  particle.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );
  scene.add(particle);
  particles.push(particle);
}

function animate() {
  requestAnimationFrame(animate);
  particles.forEach(p => p.rotation.y += 0.001);
  renderer.render(scene, camera);
}
animate();

// GSAP title animation
gsap.from("#animated-title", {
  duration: 1.5,
  opacity: 0,
  y: 50,
  ease: "power4.out"
});

// Scroll animations
gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out"
  });
});

// Custom cursor
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Expandable team cards
document.querySelectorAll(".expandable").forEach(card => {
  card.addEventListener("click", () => {
    const info = card.querySelector(".more-info");
    const isOpen = card.getAttribute("aria-expanded") === "true";
    info.hidden = isOpen;
    card.setAttribute("aria-expanded", String(!isOpen));
  });
});

