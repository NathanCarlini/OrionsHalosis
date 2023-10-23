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
    gltf.scene.scale.set(0.1, 0.1, 0.1); 
    gltf.scene.position.set(30, 0.9, 0)
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

const MercuryGeometry = new THREE.SphereGeometry( 1, 32, 32 );
const textureMercury = new THREE.TextureLoader().load('resources/mercury.png' ); 
const MercuryMaterial = new THREE.MeshPhongMaterial({map: textureMercury});
const MercuryMesh = new THREE.Mesh(MercuryGeometry, MercuryMaterial);
MercuryMesh.position.x = 10;
scene.add(MercuryMesh);

const VenusGeometry = new THREE.SphereGeometry( 1, 32, 32 );
const textureVenus = new THREE.TextureLoader().load('resources/venus.jpg' ); 
const VenusMaterial = new THREE.MeshPhongMaterial({map: textureVenus});
const VenusMesh = new THREE.Mesh(VenusGeometry, VenusMaterial);
VenusMesh.position.x = 20;
scene.add(VenusMesh);

const earthGeometry = new THREE.SphereGeometry( 1, 32, 32 );
const textureEarth = new THREE.TextureLoader().load('resources/earthmap.jpg' ); 
const textureEarthBump = new THREE.TextureLoader().load('resources/earthbump.jpg' ); 
const textureEarthSpec = new THREE.TextureLoader().load('resources/earthspec.jpg' ); 
const earthMaterial = new THREE.MeshPhongMaterial({map: textureEarth, bumpMap: textureEarthBump, specular: textureEarthSpec});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.position.x = 30;
scene.add(earthMesh);

const MarsGeometry = new THREE.SphereGeometry( 1, 32, 32 );
const textureMars = new THREE.TextureLoader().load('resources/mars.jpg' ); 
const MarsMaterial = new THREE.MeshPhongMaterial({map: textureMars});
const MarsMesh = new THREE.Mesh(MarsGeometry, MarsMaterial);
MarsMesh.position.x = 40;
scene.add(MarsMesh);

const JupiterGeometry = new THREE.SphereGeometry( 2, 32, 32 );
const textureJupiter = new THREE.TextureLoader().load('resources/jupiter.jpg' ); 
const JupiterMaterial = new THREE.MeshPhongMaterial({map: textureJupiter});
const JupiterMesh = new THREE.Mesh(JupiterGeometry, JupiterMaterial);
JupiterMesh.position.x = 50;
scene.add(JupiterMesh);

const SaturnGeometry = new THREE.SphereGeometry( 1, 32, 32 );
const textureSaturn = new THREE.TextureLoader().load('resources/saturn.jpg' ); 
const SaturnMaterial = new THREE.MeshPhongMaterial({map: textureSaturn});
const SaturnMesh = new THREE.Mesh(SaturnGeometry, SaturnMaterial);
SaturnMesh.position.x = 60;
scene.add(SaturnMesh);

const SaturnRingGeometry = new THREE.RingGeometry( 3, 5, 32 ); 
const textureSaturnRing = new THREE.TextureLoader().load('resources/saturn_ring.png' ); 
const SaturnRingMaterial = new THREE.MeshPhongMaterial( { map: textureSaturnRing, side: THREE.DoubleSide } );
const SaturnRingMesh = new THREE.Mesh( SaturnRingGeometry, SaturnRingMaterial ); 
SaturnRingMesh.position.x = 50;
SaturnRingMesh.rotateX(Math.PI/2);
scene.add( SaturnRingMesh );

const UranusGeometry = new THREE.SphereGeometry( 1, 32, 32 );
const textureUranus = new THREE.TextureLoader().load('resources/uranus.jpg' ); 
const UranusMaterial = new THREE.MeshPhongMaterial({map: textureUranus});
const UranusMesh = new THREE.Mesh(UranusGeometry, UranusMaterial);
UranusMesh.position.x = 70;
scene.add(UranusMesh);

const NeptuneGeometry = new THREE.SphereGeometry( 1, 32, 32 );
const textureNeptune = new THREE.TextureLoader().load('resources/neptune.jpg' ); 
const NeptuneMaterial = new THREE.MeshPhongMaterial({map: textureNeptune});
const NeptuneMesh = new THREE.Mesh(NeptuneGeometry, NeptuneMaterial);
NeptuneMesh.position.x = 80;
scene.add(NeptuneMesh);

let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
let light2 = new THREE.AmbientLight(0xFFFFFF, 1);
light.position.set(20, 60, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
scene.add(light, light2);

const camera = new THREE.PerspectiveCamera(45,
    sizes.width / sizes.height);
camera.position.set(100, 20, 0);
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
