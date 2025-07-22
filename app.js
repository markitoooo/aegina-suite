// app.js

import * as THREE from 'three';

let scene, camera, renderer, sphere;

function init() {
  scene = new THREE.Scene();

  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // transparent background

  // Sphere geometry & material
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: 0x3b82f6, // Webflow blue
    metalness: 0.6,
    roughness: 0.3,
    emissive: 0x1e40af,
    emissiveIntensity: 0.2,
  });

  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(
