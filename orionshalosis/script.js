import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

let camera = null;
const scene = new THREE.Scene();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function init(){
// camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(30, 0, 30);

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

// init planets (to optimize with class)
    let planets = new THREE.Group();
    const Planets = class {
        constructor(size, texture, position, price){
            const Geometry = new THREE.SphereGeometry( size, 32, 32 );
            const texturePlanet = new THREE.TextureLoader().load('resources/'+texture+'.jpg' ); 
            if (texture == "earth"){
                const textureEarthBump = new THREE.TextureLoader().load('resources/earthbump.jpg' ); 
                const textureEarthSpec = new THREE.TextureLoader().load('resources/earthspec.jpg' );
                const Material = new THREE.MeshPhongMaterial({map: texturePlanet, bumpMap: textureEarthBump, specular: textureEarthSpec}); 
                const Mesh = new THREE.Mesh(Geometry, Material);
                Mesh.position.x = position;
                Mesh.name = texture;
                planets.add(Mesh);
            } else {
                const Material = new THREE.MeshPhongMaterial({map: texturePlanet}); 
                const Mesh = new THREE.Mesh(Geometry, Material);
                Mesh.position.x = position;
                Mesh.name = texture;
                planets.add(Mesh);
            
                const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
                const points = [];
                points.push( new THREE.Vector3( position, 0, 0 ) );
                points.push( new THREE.Vector3( position+1.5, size+1, 0 ) );
                points.push( new THREE.Vector3( position+6, size+1, 0 ) );
                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                const line = new THREE.Line( geometry, material );
                scene.add( line );
            
                const loader = new FontLoader();
                loader.load( 'font/space-font.json', function ( font ) {
                    const geometry = new TextGeometry( 'Price : '+price, {
                        font: font,
                        size: 0.4,
                        height: 0.1,
                    } );
                    const material = new THREE.MeshStandardMaterial({
                        color: 'white',
                    });
                    const textMesh = new THREE.Mesh(geometry, material);
                    textMesh.position.set(position+1.75, size+1.5, 0);
                    scene.add(textMesh);
                } );
            }
            this.texture = texture;
            this.position = position;
            this.price = price;
        }
        getPos(){
            let obj = [this.texture, this.position,this.price];
            return obj;
        }
    }

    const sun = new Planets(15, 'sun', -10, 0);
    const mercury = new Planets(1, 'mercury', 15, 300);
    const venus = new Planets(1.8, 'venus', 25, 200);
    const earth = new Planets(2, 'earth', 35, 0);
    const mars = new Planets(1.4, 'mars', 45, 150);
    const jupiter = new Planets(5, 'jupiter', 60, 100);
    const saturn = new Planets(4.5, 'saturn', 75, 250);
    const uranus = new Planets(3.5, 'uranus', 90, 400);
    const neptune = new Planets(3.1, 'neptune', 100, 700);
    camera.position.x = rocketCurrent.position.x;
    scene.add(planets);
    // add ring to saturn
    const SaturnRingGeometry = new THREE.RingGeometry( 5, 8, 64 ); 
    const SaturnRingMaterial = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide } );
    SaturnRingMaterial.transparent = true;
    SaturnRingMaterial.opacity = 0.2;
    const SaturnRingMesh = new THREE.Mesh( SaturnRingGeometry, SaturnRingMaterial ); 
    SaturnRingMesh.position.x = 75;
    SaturnRingMesh.rotateX(Math.PI/2);
    scene.add( SaturnRingMesh );
        
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
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// select of the text area
    const text = document.querySelector(".halosis");

// if the window is resize the game will too
    window.addEventListener('resize', () => {
        let width = window.innerWidth;
        let height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    })

// capture of planets
    let currentPlanet = "";
    let way = 0;
    let targetPositionX = 0;
    let targetPositionY = 0;
    let halosis = [
        {planet: "sun", capt: false, left:"none", right:"none", price:sun.getPos()[2]},
        {planet: "mercury", capt: false, left:"sun", right:"venus", price:mercury.getPos()[2]},
        {planet: "venus", capt: false, left:"mercury", right:"earth", price:venus.getPos()[2]},
        {planet: "earth", capt: true, left:"venus", right:"mars", price:earth.getPos()[2]},
        {planet: "mars", capt: false, left:"earth", right:"jupiter", price:mars.getPos()[2]},
        {planet: "jupiter", capt: false, left:"mars", right:"saturn", price:jupiter.getPos()[2]},
        {planet: "saturn", capt: false, left:"jupiter", right:"uranus", price:saturn.getPos()[2]},
        {planet: "uranus", capt: false, left:"saturn", right:"neptune", price:uranus.getPos()[2]},
        {planet: "neptune", capt: false, left:"uranus", right:"pluto", price:neptune.getPos()[2]},
    ];

//find what planet we are currently on
    function whatPlanet(){
        if (round(rocketCurrent.position.x) == sun.getPos()[1]){
            currentPlanet = {number:"0", name:"sun"};
        } if (round(rocketCurrent.position.x) == mercury.getPos()[1]){
            currentPlanet = {number:"1", name:"mercury"};
        } if (round(rocketCurrent.position.x) == venus.getPos()[1]){
            currentPlanet = {number:"2", name:"venus"};
        } if (round(rocketCurrent.position.x) == earth.getPos()[1]){
            currentPlanet = {number:"3", name:"earth"};
        } if (round(rocketCurrent.position.x) == mars.getPos()[1]){
            currentPlanet = {number:"4", name:"mars"};
        } if (round(rocketCurrent.position.x) == jupiter.getPos()[1]){
            currentPlanet = {number:"5", name:"jupiter"};
        } if (round(rocketCurrent.position.x) == saturn.getPos()[1]){
            currentPlanet = {number:"6", name:"saturn"};
        } if (round(rocketCurrent.position.x) == uranus.getPos()[1]){
            currentPlanet = {number:"7", name:"uranus"};
        } if (round(rocketCurrent.position.x) == neptune.getPos()[1]){
            currentPlanet = {number:"8", name:"neptune"};
        }
    }

// round a number
    function round(num){
        return Math.round(1000*num)/1000;
    }

// if action the keyboard action in the game
    let anim = false;
    function onDocumentKeyDown(event) {
        whatPlanet()
        if (event.key == "ArrowLeft" || event.key == "q") {
            for (let i = 0; i < planets.children.length; i++) {
                if(currentPlanet.name == "sun"){
                    text.innerHTML = "Reload the page... You have lost...";
                } else if(halosis[i].planet == currentPlanet.name && currentPlanet.name == "mercury" && anim == false){
                    targetPositionX = planets.children[i-1].position.x;
                    text.innerHTML = "In the sun? Really? Well you lost...";
                    way = -1;
                    window.requestAnimationFrame(animRocket);
                } else if(halosis[i].planet == currentPlanet.name && anim == false && halosis[i-1].capt == true){
                    targetPositionX = planets.children[i-1].position.x;
                    targetPositionY = round(planets.children[i-1].geometry.parameters.radius);
                    text.innerHTML = "Flying...";
                    way = -1;
                    window.requestAnimationFrame(animRocket);
                } else if(halosis[i].planet == currentPlanet.name && anim == false && mat >= halosis[i-1].price){
                    mat = mat - halosis[i-1].price;
                    targetPositionX = planets.children[i-1].position.x;
                    targetPositionY = round(planets.children[i-1].geometry.parameters.radius);
                    text.innerHTML = "Flying...";
                    way = -1;
                    window.requestAnimationFrame(animRocket);
                }
            }
        }
        if (event.key == "ArrowRight" || event.key == "d") {
            for (let i = 0; i < planets.children.length; i++) {
                if(halosis[i].planet == currentPlanet.name && halosis[i].right == "pluto" && anim == false){
                    text.innerHTML = "Where are you going? Pluto is not a planet...";
                } else if (halosis[i].planet == currentPlanet.name && anim == false && halosis[i].right == "none"){
                    text.innerHTML = "Reload the page... You have lost...";
                } else if(halosis[i].planet == currentPlanet.name && anim == false && halosis[i+1].capt == true){
                    targetPositionX = planets.children[i+1].position.x;
                    targetPositionY = round(planets.children[i+1].geometry.parameters.radius);
                    text.innerHTML = "Flying...";
                    way = 1;
                    window.requestAnimationFrame(animRocket);
                } else if(halosis[i].planet == currentPlanet.name && anim == false && mat >= halosis[i+1].price){
                    mat = mat - halosis[i+1].price;
                    targetPositionX = planets.children[i+1].position.x;
                    targetPositionY = round(planets.children[i+1].geometry.parameters.radius);
                    text.innerHTML = "Flying...";
                    way = 1;
                    window.requestAnimationFrame(animRocket);
                }
            }
        }
    }
    // control rocket with mouse
    function onMouseDown(e) {
        pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects( scene.children );
        if(intersects[0]){
            for (let i = 0; i < planets.children.length; i++) {
                whatPlanet();
                if(halosis[i].right == intersects[0].object.name && currentPlanet.number == i && anim == false && halosis[i+1].capt == true){
                    targetPositionX = planets.children[i+1].position.x;
                    targetPositionY = round(planets.children[i+1].geometry.parameters.radius);
                    text.innerHTML = "Flying...";
                    way = 1;
                    window.requestAnimationFrame(animRocket);
                } else if(halosis[i].right == intersects[0].object.name && currentPlanet.number == i && anim == false && mat >= halosis[i+1].price){
                    mat = mat - halosis[i+1].price;
                    targetPositionX = planets.children[i+1].position.x;
                    targetPositionY = round(planets.children[i+1].geometry.parameters.radius);
                    text.innerHTML = "Flying...";
                    way = 1;
                    window.requestAnimationFrame(animRocket);
                } 
                if(halosis[i].left == intersects[0].object.name && currentPlanet.number == i && halosis[i].left == "sun" && anim == false){
                    targetPositionX = sun.getPos()[1];
                    text.innerHTML = "In the sun? Really? Well you lost...";
                    way = -1;
                    window.requestAnimationFrame(animRocket);
                } if(halosis[i].left == intersects[0].object.name && currentPlanet.number == i && anim == false && halosis[i-1].capt == true){
                    targetPositionX = planets.children[i-1].position.x;
                    targetPositionY = round(planets.children[i-1].geometry.parameters.radius);
                    text.innerHTML = "Flying...";
                    way = -1;
                    window.requestAnimationFrame(animRocket);
                } else if(halosis[i].left == intersects[0].object.name && currentPlanet.number == i && anim == false && mat >= halosis[i-1].price){
                    mat = mat - halosis[i-1].price;
                    targetPositionX = planets.children[i-1].position.x;
                    targetPositionY = round(planets.children[i-1].geometry.parameters.radius);
                    text.innerHTML = "Flying...";
                    way = -1;
                    window.requestAnimationFrame(animRocket);
                }
            }
        }
    }

    // animation rocket from planets to planets
    function animRocket(){
        anim = true;
        if(way == 1){
            if (rocketCurrent.position.x <= targetPositionX) {
                rocketCurrent.position.x += 0.1;
                if (rocketCurrent.position.y <= targetPositionY) {
                    rocketCurrent.position.y += 0.03;
                } else if (rocketCurrent.position.y >= targetPositionY) {
                    rocketCurrent.position.y -= 0.03;
                }
                camera.position.x = rocketCurrent.position.x;
                window.requestAnimationFrame(animRocket);
            } else {
                text.innerHTML = "You are on " + currentPlanet.name;
                anim = false;
                halosis[currentPlanet.number].capt = true;
                flagCurrent.children[parseInt(currentPlanet.number-1)].visible = true;
            }
        } else {
            if (rocketCurrent.position.x >= targetPositionX) {
                rocketCurrent.position.x -= 0.1;
                if (rocketCurrent.position.y <= targetPositionY) {
                    rocketCurrent.position.y += 0.03;
                } else if (rocketCurrent.position.y >= targetPositionY) {
                    rocketCurrent.position.y -= 0.03;
                }
                camera.position.x = rocketCurrent.position.x;
                window.requestAnimationFrame(animRocket);
            } else if(currentPlanet.name == "sun"){
                anim = false;
            }
            else {
                text.innerHTML = "You are on " + currentPlanet.name;
                anim = false;
                halosis[currentPlanet.number].capt = true;
                flagCurrent.children[currentPlanet.number-1].visible = true;
            }
        }
        whatPlanet();
        if(halosis[1].capt == true && halosis[2].capt == true && halosis[3].capt == true && halosis[4].capt == true && halosis[5].capt == true && halosis[6].capt == true && halosis[7].capt == true && halosis[8].capt == true){
            text.innerHTML = "You won the game!";
            anim = true;
        }  
    }

    // loop for moon stones update
    let mat = null;
    const resource = document.querySelector(".resource")
    async function resources(){
        for (let i = 0; i < halosis.length; i++) {
            if (currentPlanet.name == "sun"){
                mat = 0;
            } else if (halosis[i].capt == true) {
                if(halosis[i].name == "venus"){
                    mat += 0.5;
                } else {
                    mat += 0.1;
                    resource.innerHTML = "Moon Stone : " + round(mat);
                }
            }
        }
    }

// loop for the render and cam
    function loop(){
        document.addEventListener("keydown", onDocumentKeyDown, false);
        document.addEventListener('mousedown', onMouseDown, false);
        camera.lookAt(rocketCurrent.position.x, rocketCurrent.position.y, rocketCurrent.position.z);
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        resources();
        window.requestAnimationFrame(loop);
    }
    loop();
}
init();