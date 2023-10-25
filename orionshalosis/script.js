import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera = null;
console.log(window.innerHeight, window.innerWidth)
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const scene = new THREE.Scene();

function init(){

    // camera
    camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 5, 1000);
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

    // rocket loader
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

    // flags loader
    var flag = new GLTFLoader();
    let flag0, flag1, flag2, flag3, flag4, flag5, flag6, flag7 = null;
    let flagCurrent = null;
    flagCurrent = new THREE.Group();
    flag.load('./resources/Flag.glb', function ( gltf ) {
        gltf.animations;
        flag0 = gltf.scene;
        flagCurrent.add(flag0);
        flag0.scale.set(0.5, 0.4, 0.5);
        flag0.rotateZ(Math.PI/8); 
        flag0.visible = false;
        flag1 = flag0.clone(true);
        flag1.position.x = 10
        flag1.position.y = 1
        flag2 = flag0.clone(true);
        flag2.position.x = 20
        flag2.position.y = 1.25
        flag3 = flag0.clone(true);
        flag3.position.x = 30
        flag3.position.y = 0.5
        flag4 = flag0.clone(true);
        flag4.position.x = 45
        flag4.position.y = 4
        flag5 = flag0.clone(true);
        flag5.position.x = 60
        flag5.position.y = 3.75
        flag6 = flag0.clone(true);
        flag6.position.x = 75
        flag6.position.y = 2.5
        flag7 = flag0.clone(true);
        flag7.position.x = 85
        flag7.position.y = 2
        flag2.visible = true;
        flagCurrent.add(flag1, flag2, flag3, flag4, flag5, flag6, flag7);
        scene.add( flagCurrent );
    },);
    flagCurrent.position.set(14.5, 0.75, 0);

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

    // renderer
    const canvas = document.querySelector("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // select of the text area
    const text = document.querySelector(".halosis");

// if the window is resize the game will too
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
    })

    // capture of planets
    let currentPlanet = "";
    let way = 0;
    let targetPositionX = earthMesh.position.x;
    let targetPositionY = earthMesh.position.y;
    let halosis = [
        {planet: "mercury", capt: false},
        {planet: "venus", capt: false},
        {planet: "earth", capt: true},
        {planet: "mars", capt: false},
        {planet: "jupiter", capt: false},
        {planet: "saturn", capt: false},
        {planet: "uranus", capt: false},
        {planet: "neptune", capt: false},
    ];

    //find what planet we are currently on
    function whatPlanet(){
        if (round(rocketCurrent.position.x) == MercuryMesh.position.x){
            currentPlanet = "mercury";
        }
        if (round(rocketCurrent.position.x) == VenusMesh.position.x){
            currentPlanet = "venus";
        }
        if (round(rocketCurrent.position.x) == earthMesh.position.x){
            currentPlanet = "earth";
        }
        if (round(rocketCurrent.position.x) == MarsMesh.position.x){
            currentPlanet = "mars";
        }
        if (round(rocketCurrent.position.x) == JupiterMesh.position.x){
            currentPlanet = "jupiter";
        }
        if (round(rocketCurrent.position.x) == SaturnMesh.position.x){
            currentPlanet = "saturn";
        }
        if (round(rocketCurrent.position.x) == UranusMesh.position.x){
            currentPlanet = "uranus";
        }
        if (round(rocketCurrent.position.x) == NeptuneMesh.position.x){
            currentPlanet = "neptune";
        }
    }

    // round a number
    function round(num){
        return Math.round(1000*num)/1000;
    }

    // if action the keyboard action in the game
    function onDocumentKeyDown(event) {
        whatPlanet()
        if (event.key == "ArrowLeft" || event.key == "q") {
            switch (currentPlanet) {
                case "mercury":
                    targetPositionX = sunMesh.position.x;
                    text.innerHTML = "In the sun? Really? Well you lost...";
                    break;
                case "venus":
                    targetPositionX = MercuryMesh.position.x;
                    targetPositionY = round(MercuryGeometry.parameters.radius);
                    text.innerHTML = "You are on Mercury";
                    halosis[0].capt = true;
                    flagCurrent.children[0].visible = true;
                    break;
                case "earth":
                    targetPositionX = VenusMesh.position.x;
                    targetPositionY = round(VenusGeometry.parameters.radius);
                    text.innerHTML = "You are on Venus";
                    halosis[1].capt = true;
                    flagCurrent.children[1].visible = true;
                    break;
                case "mars":
                    targetPositionX = earthMesh.position.x;
                    targetPositionY = round(earthGeometry.parameters.radius);
                    text.innerHTML = "You are on Earth";
                    halosis[2].capt = true;
                    flagCurrent.children[2].visible = true;
                    break;
                case "jupiter":
                    targetPositionX = MarsMesh.position.x;
                    targetPositionY = round(MarsGeometry.parameters.radius);
                    text.innerHTML = "You are on Mars";
                    flagCurrent.children[3].visible = true;
                    halosis[3].capt = true;
                    break;
                case "saturn":
                    targetPositionX = JupiterMesh.position.x;
                    targetPositionY = round(JupiterGeometry.parameters.radius);
                    text.innerHTML = "You are on Jupiter";
                    halosis[4].capt = true;
                    flagCurrent.children[4].visible = true;
                    break;
                case "uranus":
                    targetPositionX = SaturnMesh.position.x;
                    targetPositionY = round(SaturnGeometry.parameters.radius);
                    text.innerHTML = "You are on Saturn";
                    halosis[5].capt = true;
                    flagCurrent.children[5].visible = true;
                    break;
                case "neptune":
                    targetPositionX = UranusMesh.position.x;
                    targetPositionY = round(UranusGeometry.parameters.radius);
                    text.innerHTML = "You are on Uranus";
                    halosis[6].capt = true;
                    flagCurrent.children[6].visible = true;
                    break;
            }
            way = -1;
            if(halosis[0].capt == true && halosis[1].capt == true && halosis[2].capt == true && halosis[3].capt == true && halosis[4].capt == true && halosis[5].capt == true && halosis[6].capt == true && halosis[7].capt == true){
                text.innerHTML = "You won the game!";
            }
        }
        if (event.key == "ArrowRight" || event.key == "d") {
            switch (currentPlanet) {
                case "mercury":
                    targetPositionX = VenusMesh.position.x;
                    targetPositionY = round(VenusGeometry.parameters.radius);
                    text.innerHTML = "You are on Venus";
                    halosis[1].capt = true;
                    flagCurrent.children[1].visible = true;
                    break;
                case "venus":
                    targetPositionX = earthMesh.position.x;
                    targetPositionY = round(earthGeometry.parameters.radius);
                    text.innerHTML = "You are on Earth";
                    halosis[2].capt = true;
                    flagCurrent.children[2].visible = true;
                    break;
                case "earth":
                    targetPositionX = MarsMesh.position.x;
                    targetPositionY = round(MarsGeometry.parameters.radius);
                    text.innerHTML = "You are on Mars";
                    halosis[3].capt = true;
                    flagCurrent.children[3].visible = true;
                    break;
                case "mars":
                    targetPositionX = JupiterMesh.position.x;
                    targetPositionY = round(JupiterGeometry.parameters.radius);
                    text.innerHTML = "You are on Jupiter";
                    halosis[4].capt = true;
                    flagCurrent.children[4].visible = true
                    break;
                case "jupiter":
                    targetPositionX = SaturnMesh.position.x;
                    targetPositionY = round(SaturnGeometry.parameters.radius);
                    text.innerHTML = "You are on Saturn";
                    halosis[5].capt = true;
                    flagCurrent.children[5].visible = true;
                    break;
                case "saturn":
                    targetPositionX = UranusMesh.position.x;
                    targetPositionY = round(UranusGeometry.parameters.radius);
                    text.innerHTML = "You are on Uranus";
                    halosis[6].capt = true;
                    flagCurrent.children[6].visible = true;
                    break;
                case "uranus":
                    targetPositionX = NeptuneMesh.position.x;
                    targetPositionY = round(NeptuneGeometry.parameters.radius);
                    text.innerHTML = "You are on Neptune";
                    halosis[7].capt = true;
                    flagCurrent.children[7].visible = true;
                    break;
                case "neptune":
                    text.innerHTML = "Where are you going? Pluto is not a planet..."
                    break
            }
            way = 1;
            if(halosis[0].capt == true && halosis[1].capt == true && halosis[2].capt == true && halosis[3].capt == true && halosis[4].capt == true && halosis[5].capt == true && halosis[6].capt == true && halosis[7].capt == true){
                text.innerHTML = "You won the game!";
            }
        }
        if(way == 1){
            if (rocketCurrent.position.x <= targetPositionX) {
                rocketCurrent.position.x += 0.1;
                if (rocketCurrent.position.y <= targetPositionY) {
                    rocketCurrent.position.y += 0.03;
                } else if (rocketCurrent.position.y >= targetPositionY) {
                    rocketCurrent.position.y -= 0.03;
                }
                window.requestAnimationFrame(onDocumentKeyDown);
            }        
        } else {
            if (rocketCurrent.position.x >= targetPositionX) {
                rocketCurrent.position.x -= 0.1;
                if (rocketCurrent.position.y <= targetPositionY) {
                    rocketCurrent.position.y += 0.03;
                } else if (rocketCurrent.position.y >= targetPositionY) {
                    rocketCurrent.position.y -= 0.03;
                }
                window.requestAnimationFrame(onDocumentKeyDown);
            }
        }    
    }

// loop for the render and cam
    function loop(){
        document.addEventListener("keydown", onDocumentKeyDown, false);
        camera.lookAt(rocketCurrent.position.x, rocketCurrent.position.y, rocketCurrent.position.z);
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        window.requestAnimationFrame(loop);
    }
    loop();

}

init();