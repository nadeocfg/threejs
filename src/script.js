import "./style.sass";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "#ff0000",
});
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Clock
// const clock = new THREE.Clock();

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

// Animation
const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
