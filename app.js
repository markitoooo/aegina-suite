// Team expandable bio toggle
document.querySelectorAll('.team-card.expandable').forEach(card => {
  card.addEventListener('click', () => {
    const expanded = card.getAttribute('aria-expanded') === 'true';
    // Close all others first
    document.querySelectorAll('.team-card.expandable').forEach(c => {
      c.setAttribute('aria-expanded', 'false');
    });
    card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });

  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-title', {
  opacity: 0,
  y: 30,
  duration: 1.2,
  ease: 'power3.out',
  delay: 0.2,
});

gsap.from('.hero-subtitle', {
  opacity: 0,
  y: 30,
  duration: 1.2,
  ease: 'power3.out',
  delay: 0.4,
});

gsap.from('.btn-primary', {
  opacity: 0,
  y: 20,
  duration: 1,
  ease: 'power3.out',
  delay: 0.6,
});

// Three.js background for hero section
(() => {
  const canvas = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 15;

  // Geometry + Material for floating spheres
  const sphereGeometry = new THREE.IcosahedronGeometry(1.2, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x0071f3,
    roughness: 0.3,
    metalness: 0.9,
    transparent: true,
    opacity: 0.25,
    emissive: 0x0050a0,
    emissiveIntensity: 0.6,
  });

  // Create several spheres floating
  const spheres = [];
  const count = 6;
  for (let i = 0; i < count; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.set(
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 5
    );
    scene.add(sphere);
    spheres.push(sphere);
  }

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x0071f3, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // Animation loop
  function animate(time = 0) {
    const t = time / 1000;
    spheres.forEach((sphere, i) => {
      sphere.position.x += 0.002 * Math.sin(t * 1.5 + i);
      sphere.position.y += 0.0015 * Math.cos(t * 1.2 + i * 1.1);
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.006;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }

  window.addEventListener('resize', () => {
    resize();
  });

  resize();
  animate();
})();

