// fade-in on scroll for sections
document.querySelectorAll('.section').forEach(sec => {
  sec.classList.add('fade-in');
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 }).observe(sec);
});

// smooth scroll navigation links
document.querySelectorAll('.glass-nav a').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Three.js subtle animated hero background
(() => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const geometry = new THREE.SphereGeometry(4, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0x007BFF, transparent: true, opacity: 0.1 });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.001;
    sphere.rotation.x += 0.0008;
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  });

  animate();
})();
