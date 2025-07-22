// Animate the heading with GSAP fade-in + letter animation
const title = document.getElementById('animated-title');
gsap.fromTo(title, 
  {opacity: 0, y: 20}, 
  {opacity: 1, y: 0, duration: 2, ease: "power3.out"});

// Expandable team cards logic
const cards = document.querySelectorAll('.card.expandable');

cards.forEach(card => {
  card.addEventListener('click', () => toggleExpand(card));
  card.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand(card);
    }
  });
});

function toggleExpand(card) {
  const expanded = card.getAttribute('aria-expanded') === 'true';
  const moreInfo = card.querySelector('.more-info');
  if (expanded) {
    moreInfo.hidden = true;
    card.setAttribute('aria-expanded', 'false');
  } else {
    moreInfo.hidden = false;
    card.setAttribute('aria-expanded', 'true');
  }
}

// Custom cursor
const cursor = document.getElementById('custom-cursor');

window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

window.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
  cursor.style.boxShadow = '0 0 10px rgba(255 255 255 / 0.8)';
});
window.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  cursor.style.boxShadow = '0 0 5px rgba(255 255 255 / 0.3)';
});

// THREE.JS animation

const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // transparent background

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5,5,5);
scene.add(directionalLight);

// Create a bunch of floating 3D spheres with soft glow
const spheres = [];
const sphereCount = 30;

const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x3b82f6,
  roughness: 0.4,
  metalness: 0.8,
  emissive: 0x1e40af,
  emissiveIntensity: 0.7
});

for(let i=0; i < sphereCount; i++) {
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 4
  );
  scene.add(sphere);
  spheres.push(sphere);
}

// Add a rotating wireframe torus in center
const torusGeometry = new THREE.TorusGeometry(1, 0.15, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({
  color: 0x1e40af,
  wireframe: true,
  opacity: 0.5,
  transparent: true
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Animate
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.005;
  torus.rotation.y += 0.01;

  spheres.forEach((sphere, i) => {
    sphere.position.y += Math.sin(Date.now() * 0.001 + i) * 0.0015;
    sphere.position.x += Math.cos(Date.now() * 0.001 + i) * 0.0015;
  });

  renderer.render(scene, camera);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});
