import './style.css'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import bg from './bg2.jpg'
// import bmap from './bmap.png'
// import dmap from './dispalcemap.png'
// import bg3 from './bg3.png'
import bg4 from './bg4.jpg'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const gui = new dat.GUI()
const scene = new THREE.Scene();

const loader = new THREE.TextureLoader()
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
var meshPosition = new THREE.Vector3();

let device = {
  width: innerWidth,
  height: innerHeight,
  aspect: innerWidth / innerHeight
}
const tx = loader.load(bg)
const tx2 = loader.load(bg4)
const renderer = new THREE.WebGLRenderer({
  alpha: true
});
const controls = new OrbitControls(camera, renderer.domElement);
controls.update()
renderer.setSize(device.width, device.height);
camera.aspect = device.aspect
// camera.rotation.y = Math.PI

document.body.appendChild(renderer.domElement);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 62, 62)
  , new THREE.MeshStandardMaterial({
    // color: 'blue',
    roughness: 1,
    map: tx,

  }));
// scene.add(sphere);

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.07, 62, 62),
  new THREE.MeshStandardMaterial({
    roughness: 1,
    map: tx2,
    // bumpMap:loader.load(bmap),
    // displacementMap:loader.load(dmap),
    // displacementScale:0,
    // lightMap:loader.load(bg3)
  }))
sphere2.position.set(-0.34, 0.07, -0.53)
const group = new THREE.Group()
group.rotation.z = -.5
group.add(sphere)
group.add(sphere2)
group.add(camera)
scene.add(group)
gui.add(sphere2.position, 'x')
gui.add(sphere2.position, 'y')
gui.add(sphere2.position, 'z')
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(30.3, 20, 5);
const pointLight2 = new THREE.PointLight(0xf76871, .5);
pointLight2.position.set(-30.3, -20, -5);
scene.add(pointLight);
scene.add(pointLight2);
const geometry = new THREE.BufferGeometry();
const vertices = [];
group.add(pointLight)
for (let i = 0; i < 10000; i++) {

  vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
  vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
  vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z

}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3,true));
const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x888888 }));
scene.add(particles);
// gui.add(pointLight.position,'x').min(5).max(50)
// gui.add(pointLight.position,'y').min(5).max(50)
// gui.add(pointLight.position,'z').min(5).max(50)
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);
// // RESIZE START
window.addEventListener('resize', () => {
  device.width = innerWidth
  device.height = innerHeight
  device.aspect = innerWidth / innerHeight
  camera.aspect = device.aspect
  camera.updateProjectionMatrix()
  renderer.setSize(device.width, device.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})
// RESIZE END

camera.position.z = 1.8;
group.getWorldPosition(meshPosition)
camera.lookAt(meshPosition)
renderer.render(scene, camera);
const clock = new THREE.Clock()
var radius = .8; // Adjust the radius as needed
var speed = 0.001; // Adjust the speed as needed
function animate() {
  const time = clock.getElapsedTime()
  var angle = Date.now() * speed;
  var x = Math.cos(angle) * radius;
  var z = Math.sin(angle) * radius;
  sphere2.position.set(x, 0, z);
  sphere.rotation.x =.3 * time
  sphere2.rotation.x =.6 * time
  group.rotation.y = .1 * time
  group.rotation.x = .1 * time
  renderer.render(scene, camera);
  camera.lookAt(sphere.position);
  requestAnimationFrame(animate)

}
animate()
