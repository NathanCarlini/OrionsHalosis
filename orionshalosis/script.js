import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const scene = new THREE.Scene();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    './resources/right.png',
    './resources/left.png',
    './resources/top.png',
    './resources/bottom.png',
    './resources/front.png',
    './resources/back.png',
]);

let fuseescene = null;
const fusee = new GLTFLoader();
fusee.load('./resources/rocketfuture.glb', function ( gltf ) {
    scene.add( gltf.scene );
    gltf.animations;
    fuseescene = gltf.scene;
    fuseescene.position.y =0;
    gltf.scenes;
    gltf.cameras; 
    gltf.asset; 

},);

let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(20, 100, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
scene.add(light);

const camera = new THREE.PerspectiveCamera(45,
    sizes.width / sizes.height);
camera.position.set(75, 20, 0);
camera.lookAt(0, 0, 0);
scene.add(camera);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.render(scene, camera);

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;

function loop(){
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop();
