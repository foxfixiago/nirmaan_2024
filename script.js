// === SCENE SETUP ===
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg-canvas'),
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// === LIGHTING ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(ambientLight, pointLight);

// === GEOMETRY ===
// Colors
const colors = ['#4169E1', '#000000', '#cccccc', '#0047AB', '#333333', '#777777'];

const torusArray = [];
for (let i = 0; i < 6; i++) {
  const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: colors[i],
    metalness: 0.7,
    roughness: 0.2,
  });
  const torus = new THREE.Mesh(geometry, material);
  torus.position.x = Math.sin(i) * 3;
  torus.position.y = Math.cos(i) * 2.5;
  torus.position.z = (i % 2 === 0) ? -1 : 1;
  scene.add(torus);
  torusArray.push(torus);
}

// Rectangular blocks
const blockArray = [];
for (let i = 0; i < 5; i++) {
  const blockGeo = new THREE.BoxGeometry(1.5, 0.5, 0.5);
  const blockMat = new THREE.MeshStandardMaterial({
    color: '#444',
    metalness: 0.6,
    roughness: 0.4,
  });
  const block = new THREE.Mesh(blockGeo, blockMat);
  block.position.set(i - 2, -1 + (i % 2) * 1.5, -0.5 + i * 0.2);
  block.rotation.z = Math.PI / 8;
  scene.add(block);
  blockArray.push(block);
}

// === ANIMATION ===
function animate() {
  requestAnimationFrame(animate);

  torusArray.forEach((torus, i) => {
    torus.rotation.x += 0.01 + i * 0.001;
    torus.rotation.y += 0.015 + i * 0.001;
  });

  blockArray.forEach((block, i) => {
    block.rotation.x += 0.005;
    block.rotation.y += 0.008;
  });

  renderer.render(scene, camera);
}
animate();

// === RESPONSIVE ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
window.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.brand-logo');
  logo.style.opacity = '0';
  logo.style.transform = 'scale(0.8)';

  setTimeout(() => {
    logo.style.transition = 'all 0.8s ease-in-out';
    logo.style.opacity = '1';
    logo.style.transform = 'scale(1)';
  }, 100); // slight delay for effect
});

