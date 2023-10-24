import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera = null;
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const scene = new THREE.Scene();

function init(){

    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 1000);
    camera.position.set(50, 15, 40);

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
    let rocketCurrent = null;
    rocketCurrent = new THREE.Group();
    scene.add(rocketCurrent);
    var rocket = new GLTFLoader();
    rocket.load('./resources/rocketfuture.glb', function ( gltf ) {
    // rocket.load('./resources/rocket.glb', function ( gltf ) {
    // rocket.load('./resources/Rocketship.glb', function ( gltf ) {
        gltf.animations;
        rocketscene = gltf.scene;
        rocketCurrent.add(rocketscene);
        rocketscene.position.y =0;
        rocketscene.scale.set(0.1, 0.1, 0.1); 
        scene.add( rocketCurrent );
    },);
    rocketCurrent.position.set(35, 2, 0);

    const geometry = new THREE.PlaneGeometry( 100, 100 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Math.PI/2)
    // scene.add( plane );

    // init planets
    const sunGeometry = new THREE.SphereGeometry( 15, 32, 32 );
    const textureSun = new THREE.TextureLoader().load('resources/sun.jpg' ); 
    const sunMaterial = new THREE.MeshPhongMaterial({map: textureSun});
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.position.x = -10;
    scene.add(sunMesh);

    const MercuryGeometry = new THREE.SphereGeometry( 1, 32, 32 );
    const textureMercury = new THREE.TextureLoader().load('resources/mercury.png' ); 
    const MercuryMaterial = new THREE.MeshPhongMaterial({map: textureMercury});
    const MercuryMesh = new THREE.Mesh(MercuryGeometry, MercuryMaterial);
    MercuryMesh.position.x = 15;
    scene.add(MercuryMesh);

    const VenusGeometry = new THREE.SphereGeometry( 1.8, 32, 32 );
    const textureVenus = new THREE.TextureLoader().load('resources/venus.jpg' ); 
    const VenusMaterial = new THREE.MeshPhongMaterial({map: textureVenus});
    const VenusMesh = new THREE.Mesh(VenusGeometry, VenusMaterial);
    VenusMesh.position.x = 25;
    scene.add(VenusMesh);

    const earthGeometry = new THREE.SphereGeometry( 2, 32, 32 );
    const textureEarth = new THREE.TextureLoader().load('resources/earthmap.jpg' ); 
    const textureEarthBump = new THREE.TextureLoader().load('resources/earthbump.jpg' ); 
    const textureEarthSpec = new THREE.TextureLoader().load('resources/earthspec.jpg' ); 
    const earthMaterial = new THREE.MeshPhongMaterial({map: textureEarth, bumpMap: textureEarthBump, specular: textureEarthSpec});
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.position.x = 35;
    scene.add(earthMesh);

    const MarsGeometry = new THREE.SphereGeometry( 1.4, 32, 32 );
    const textureMars = new THREE.TextureLoader().load('resources/mars.jpg' ); 
    const MarsMaterial = new THREE.MeshPhongMaterial({map: textureMars});
    const MarsMesh = new THREE.Mesh(MarsGeometry, MarsMaterial);
    MarsMesh.position.x = 45;
    scene.add(MarsMesh);

    const JupiterGeometry = new THREE.SphereGeometry( 5, 32, 32 );
    const textureJupiter = new THREE.TextureLoader().load('resources/jupiter.jpg' ); 
    const JupiterMaterial = new THREE.MeshPhongMaterial({map: textureJupiter});
    const JupiterMesh = new THREE.Mesh(JupiterGeometry, JupiterMaterial);
    JupiterMesh.position.x = 60;
    scene.add(JupiterMesh);

    const SaturnGeometry = new THREE.SphereGeometry( 4.5, 32, 32 );
    const textureSaturn = new THREE.TextureLoader().load('resources/saturn.jpg' ); 
    const SaturnMaterial = new THREE.MeshPhongMaterial({map: textureSaturn});
    const SaturnMesh = new THREE.Mesh(SaturnGeometry, SaturnMaterial);
    SaturnMesh.position.x = 75;
    scene.add(SaturnMesh);

    const SaturnRingGeometry = new THREE.RingGeometry( 5, 8, 64 ); 
    const SaturnRingMaterial = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide } );
    SaturnRingMaterial.transparent = true;
    SaturnRingMaterial.opacity = 0.2;
    const SaturnRingMesh = new THREE.Mesh( SaturnRingGeometry, SaturnRingMaterial ); 
    SaturnRingMesh.position.x = 75;
    SaturnRingMesh.rotateX(Math.PI/2);
    scene.add( SaturnRingMesh );

    const UranusGeometry = new THREE.SphereGeometry( 3.5, 32, 32 );
    const textureUranus = new THREE.TextureLoader().load('resources/uranus.jpg' ); 
    const UranusMaterial = new THREE.MeshPhongMaterial({map: textureUranus});
    const UranusMesh = new THREE.Mesh(UranusGeometry, UranusMaterial);
    UranusMesh.position.x = 90;
    scene.add(UranusMesh);

    const NeptuneGeometry = new THREE.SphereGeometry( 3.1, 32, 32 );
    const textureNeptune = new THREE.TextureLoader().load('resources/neptune.jpg' ); 
    const NeptuneMaterial = new THREE.MeshPhongMaterial({map: textureNeptune});
    const NeptuneMesh = new THREE.Mesh(NeptuneGeometry, NeptuneMaterial);
    NeptuneMesh.position.x = 100;
    scene.add(NeptuneMesh);
        
    // light
    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    let light2 = new THREE.AmbientLight(0xFFFFFF, 1);
    light.position.set(20, 60, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    scene.add(light, light2);

    const canvas = document.querySelector("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;


    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
    })

    let currentPlanet = "";
    let way = 0;
    let targetPositionX = earthMesh.position.x;
    function whatPlanet(){
        if (Math.floor(rocketCurrent.position.x) == MercuryMesh.position.x){
            currentPlanet = "mercury";
        }
        if (Math.floor(rocketCurrent.position.x) == VenusMesh.position.x){
            currentPlanet = "venus";
        }
        if (Math.floor(rocketCurrent.position.x) == earthMesh.position.x){
            currentPlanet = "earth";
        }
        if (Math.floor(rocketCurrent.position.x) == MarsMesh.position.x){
            currentPlanet = "mars";
        }
        if (Math.floor(rocketCurrent.position.x) == JupiterMesh.position.x){
            currentPlanet = "jupiter";
        }
        if (Math.floor(rocketCurrent.position.x) == SaturnMesh.position.x){
            currentPlanet = "saturn";
        }
        if (Math.floor(rocketCurrent.position.x) == UranusMesh.position.x){
            currentPlanet = "uranus";
        }
        if (Math.floor(rocketCurrent.position.x) == NeptuneMesh.position.x){
            currentPlanet = "neptune";
        }
    }

    function onDocumentKeyDown(event) {
        whatPlanet()
        if (event.key == "ArrowLeft" || event.key == "q") {
            switch (currentPlanet) {
                case "mercury":
                    targetPositionX = sunMesh.position.x;
                    console.log("In the sun? Really? Well you lost...")
                    break;
                case "venus":
                    targetPositionX = MercuryMesh.position.x;
                    rocketCurrent.position.y = MercuryGeometry.parameters.radius
                    console.log("You are at Mercury")
                    break;
                case "earth":
                    targetPositionX = VenusMesh.position.x;
                    rocketCurrent.position.y = VenusGeometry.parameters.radius
                    console.log("You are at Venus")
                    break;
                case "mars":
                    targetPositionX = earthMesh.position.x;
                    rocketCurrent.position.y = earthGeometry.parameters.radius
                    console.log("You are at Earth")
                    break;
                case "jupiter":
                    targetPositionX = MarsMesh.position.x;
                    rocketCurrent.position.y = MarsGeometry.parameters.radius
                    console.log("You are at Mars")
                    break;
                case "saturn":
                    targetPositionX = JupiterMesh.position.x;
                    rocketCurrent.position.y = JupiterGeometry.parameters.radius
                    console.log("You are at Jupiter")
                    break;
                case "uranus":
                    targetPositionX = SaturnMesh.position.x;
                    rocketCurrent.position.y = SaturnGeometry.parameters.radius
                    console.log("You are at Saturn")
                    break;
                case "neptune":
                    targetPositionX = UranusMesh.position.x;
                    rocketCurrent.position.y = UranusGeometry.parameters.radius
                    console.log("You are at Uranus")
                    break;
            }
            way = -1;
        }
        if (event.key == "ArrowRight" || event.key == "d") {
            switch (currentPlanet) {
                case "mercury":
                    targetPositionX = VenusMesh.position.x;
                    rocketCurrent.position.y = VenusGeometry.parameters.radius
                    console.log("You are at Venus")
                    break;
                case "venus":
                    targetPositionX = earthMesh.position.x;
                    rocketCurrent.position.y = earthGeometry.parameters.radius
                    console.log("You are at Earth")
                    break;
                case "earth":
                    targetPositionX = MarsMesh.position.x;
                    rocketCurrent.position.y = MarsGeometry.parameters.radius
                    console.log("You are at Mars")
                    break;
                case "mars":
                    targetPositionX = JupiterMesh.position.x;
                    rocketCurrent.position.y = JupiterGeometry.parameters.radius
                    console.log("You are at Jupiter")
                    break;
                case "jupiter":
                    targetPositionX = SaturnMesh.position.x;
                    rocketCurrent.position.y = SaturnGeometry.parameters.radius
                    console.log("You are at Saturn")
                    break;
                case "saturn":
                    targetPositionX = UranusMesh.position.x;
                    rocketCurrent.position.y = UranusGeometry.parameters.radius
                    console.log("You are at Uranus")
                    break;
                case "uranus":
                    targetPositionX = NeptuneMesh.position.x;
                    rocketCurrent.position.y = NeptuneGeometry.parameters.radius
                    console.log("You are at Neptune")
                    break;
                case "neptune":
                    console.log("Where are you going? Pluto is not a planet...")
                    break
            }
            way = 1;
        }
        console.log(targetPositionX, rocketCurrent.position.x, whatPlanet());
        if(way == 1){
            if (rocketCurrent.position.x <= targetPositionX) {
                rocketCurrent.position.x += 0.1;
                window.requestAnimationFrame(onDocumentKeyDown);
            }
        } else {
            if (rocketCurrent.position.x >= targetPositionX) {
                rocketCurrent.position.x -= 0.1;
                window.requestAnimationFrame(onDocumentKeyDown); 
            }
        }
    }

    function loop(){
        document.addEventListener("keydown", onDocumentKeyDown, false);
        // if (rocketCurrent.position.x == targetPositionX) move = 0;
        camera.lookAt(rocketCurrent.position.x, rocketCurrent.position.y, rocketCurrent.position.z);
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        window.requestAnimationFrame(loop);
    }
    loop();

}

init();