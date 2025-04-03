import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();

// Carregar imagem de fundo como textura
const textureLoader = new THREE.TextureLoader();
textureLoader.load('background_airpodspro.png', (bgTexture) => {
  scene.background = bgTexture;
});

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 1, 5);

// Luz
const light = new THREE.DirectionalLight(0xf2f2f2, 1);
light.position.set(2, 2, 2);
scene.add(light);
scene.add(new THREE.AmbientLight(0xf2f2f2, 0.6));

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;
controls.enablePan = false;
controls.update();

let model = null;

// Carregar modelo GLB
const loader = new GLTFLoader();
loader.load('air_pods_pro.glb', function (gltf) {
  model = gltf.scene;
  model.scale.set(0.3, 0.3, 0.3);
  model.position.set(0, 0, 0);
  scene.add(model);
  animate();
}, undefined, function (error) {
  console.error('Erro ao carregar o modelo:', error);
});

// Responsividade do renderer
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  return needResize;
}

// Animação contínua com rotação para todos os dispositivos
let rotationSpeed = 0.005;
function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += rotationSpeed;
  }

  controls.update();
  resizeRendererToDisplaySize(renderer);
  renderer.render(scene, camera);
}
