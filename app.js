// GSAP animations for Hero Title fade & slide in
gsap.from(".hero-title", {
  duration: 1.5,
  y: 50,
  opacity: 0,
  ease: "power4.out",
  delay: 0.5,
});
gsap.from(".hero-subtitle", {
  duration: 1.3,
  y: 40,
  opacity: 0,
  ease: "power3.out",
  delay: 0.8,
});
gsap.from(".btn-primary", {
  duration: 1.3,
  y: 30,
  opacity: 0,
  ease: "power3.out",
  delay: 1,
});

// Expand/collapse team bios
document.querySelectorAll(".team-card.expandable").forEach((card) => {
  card.addEventListener("click", () => toggleBio(card));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleBio(card);
    }
  });
});

function toggleBio(card) {
  const expanded = card.getAttribute("aria-expanded") === "true";
  card.setAttribute("aria-expanded", !expanded);
}

// THREE.JS Hero Background animation

const canvas = document.getElementById("hero-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // transparent background

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 15;

// Create a smooth animated geometry (a sphere with noise)

const geometry = new THREE.IcosahedronGeometry(6, 4);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x0071f3,
  clearcoat: 1,
  clearcoatRoughness: 0,
  metalness: 0.7,
  roughness: 0.3,
  transparent: true,
  opacity: 0.6,
  reflectivity: 1,
  ior: 1.5,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const clock = new THREE.Clock();

// Simple noise function to distort vertices over time
function noise(x, y, z) {
  return (
    Math.sin(x * 3 + clock.getElapsedTime() * 2) +
    Math.sin(y * 4 + clock.getElapsedTime() * 3) +
    Math.sin(z * 5 + clock.getElapsedTime() * 4)
  );
}

function animate() {
  requestAnimationFrame(animate);

  const time = clock.getElapsedTime();

  // Distort vertices
  geometry.vertices.forEach((v) => {
    const n = noise(v.x, v.y, v.z);
    v.normalize().multiplyScalar(6 + n * 0.3);
  });
  geometry.verticesNeedUpdate = true;

  // Rotate sphere slowly
  sphere.rotation.x = time * 0.05;
  sphere.rotation.y = time * 0.06;

  renderer.render(scene, camera);
}

animate();

// Responsive resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
