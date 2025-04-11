const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

// Renderer setup
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg-canvas'),
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Torus knot object
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 150, 20);
const material = new THREE.MeshStandardMaterial({
  color: 'royalblue',
  metalness: 0.8,
  roughness: 0.25
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const pointLight = new THREE.PointLight(0x4040ff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(ambientLight, pointLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
