// Custom Cursor
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

// GSAP Animation
gsap.from('#animated-title', {
  duration: 1.5,
  y: -50,
  opacity: 0,
  ease: 'power3.out'
});

// Expandable team bios
document.querySelectorAll('.card.expandable').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
    const expanded = card.getAttribute('aria-expanded') === 'true';
    card.setAttribute('aria-expanded', !expanded);
  });
});

// Three.js Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Particle Field
const starsGeometry = new THREE.BufferGeometry();
const starCount = 1000;
const positions = [];
for (let i = 0; i < starCount; i++) {
  positions.push((Math.random() - 0.5) * 100);
  positions.push((Math.random() - 0.5) * 100);
  positions.push((Math.random() - 0.5) * 100);
}
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0x00baff, size: 0.4 });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

function animate() {
  requestAnimationFrame(animate);
  starField.rotation.y += 0.0008;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
