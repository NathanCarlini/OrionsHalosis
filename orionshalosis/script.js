import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function degrees_to_radians(degrees)
{
  return degrees * (Math.PI/180);
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

let rocketscene = null;
const rocket = new GLTFLoader();
rocket.load('./resources/rocketfuture.glb', function ( gltf ) {
// rocket.load('./resources/rocket.glb', function ( gltf ) {
// rocket.load('./resources/Rocketship.glb', function ( gltf ) {
    scene.add( gltf.scene );
    gltf.animations;
    rocketscene = gltf.scene;
    rocketscene.position.y =0;
    gltf.scene.scale.set(0.2, 0.2, 0.2); 
    gltf.scene.position.set(15, 1.75, 0)
    gltf.scenes;
    gltf.cameras; 
    gltf.asset; 
},);

const geometry = new THREE.PlaneGeometry( 100, 100 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotateX(Math.PI/2)
// scene.add( plane );

// planets
const sunGeometry = new THREE.SphereGeometry( 5, 32, 32 );
const textureSun = new THREE.TextureLoader().load('resources/sun.jpg' ); 
const sunMaterial = new THREE.MeshPhongMaterial({map: textureSun});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);

const earthGeometry = new THREE.SphereGeometry( 2, 32, 32 );

const textureEarth = new THREE.TextureLoader().load('resources/earthmap.jpg' ); 
const textureEarthBump = new THREE.TextureLoader().load('resources/earthbump.jpg' ); 
const textureEarthSpec = new THREE.TextureLoader().load('resources/earthspec.jpg' ); 
const earthMaterial = new THREE.MeshPhongMaterial({map: textureEarth, bumpMap: textureEarthBump, specular: textureEarthSpec});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.position.x = 15;
scene.add(earthMesh);

let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(20, 80, 10);
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
