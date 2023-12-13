import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Planets from './Planets.js';
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const MyThree = () =>{
//   const refContainer = useRef(null);
  useEffect(() => {

var socket = io("http://localhost:3001");
let price = 0;
let player1 = true;
let player2 = false;
let capt1x2 = false;
let capt2x2 = false;
let capt2x15 = false;
let capt1x15 = false;
let turnP1 = 0;
let turnP2 = 0;
let camera = null;
// const scene = new THREE.Scene();

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function init(){
    let state, rocketscene, rocketCurrent, rocketscene2, rocketCurrent2, flagCurrent, planets, mat, mat2, way, targetPositionX, targetPositionY, sec;

    // init planets p1
    const sun = new Planets(15, 'sun', -10, 0);
    const scene = sun.getPos()[5];
    const mercury = new Planets(1, 'mercury', 15, 300);
    const venus = new Planets(1.8, 'venus', 25, 200, 2);
    const earth = new Planets(2, 'earth', 35, 0);
    const mars = new Planets(1.4, 'mars', 45, 150, 1.5);
    const jupiter = new Planets(5, 'jupiter', 60, 100);
    const saturn = new Planets(4.5, 'saturn', 75, 250);
    const uranus = new Planets(3.5, 'uranus', 90, 400);
    const neptune = new Planets(3.1, 'neptune', 100, 700);
    planets = sun.getPos()[3]; 

    // init planet p2
    let planets2 = new THREE.Group();
    const sun2 = new Planets(15, 'sun', -10-200, 0);
    const mercury2 = new Planets(1, 'mercury', 15-200, 300);
    const venus2 = new Planets(1.8, 'venus', 25-200, 200, 2);
    const earth2 = new Planets(2, 'earth', 35-200, 0);
    const mars2 = new Planets(1.4, 'mars', 45-200, 150, 1.5);
    const jupiter2 = new Planets(5, 'jupiter', 60-200, 100);
    const saturn2 = new Planets(4.5, 'saturn', 75-200, 250);
    const uranus2 = new Planets(3.5, 'uranus', 90-200, 400);
    const neptune2 = new Planets(3.1, 'neptune', 100-200, 700);
    planets2 = sun2.getPos()[4];

    // camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(30, 0, 30);

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
        './static/resources/right.png',
        './static/resources/left.png',
        './static/resources/top.png',
        './static/resources/bottom.png',
        './static/resources/front.png',
        './static/resources/back.png',
    ]);
    

// rocket loader
    rocketCurrent = new THREE.Group();
    var rocket = new GLTFLoader();
    rocket.load('./static/resources/glbs/rocketfuture.glb', function ( gltf ) {
    // rocket.load('./static/resources/Rocketship.glb', function ( gltf ) {
        gltf.animations;
        rocketscene = gltf.scene;
        rocketCurrent.add(rocketscene);
        rocketscene.position.y = 0;
        rocketscene.scale.set(0.15, 0.15, 0.15); 
        scene.add( rocketCurrent );
    },);
    rocketCurrent.position.set(35, 1.85, 0);

    rocketCurrent2 = new THREE.Group();
    // rocket.load('./static/resources/glbs/rocketfuture.glb', function ( gltf ) {
    rocket.load('./static/resources/glbs/Rocketship.glb', function ( gltf ) {
        gltf.animations;
        rocketscene2 = gltf.scene;
        rocketCurrent2.add(rocketscene2);
        rocketscene2.position.y = 0;
        rocketscene2.scale.set(0.15, 0.15, 0.15); 
        scene.add( rocketCurrent2 );
    },);
    rocketCurrent2.position.set(35-200, 1.85, 0);
    camera.position.x = rocketCurrent.position.x;

// flags loader
    var flag = new GLTFLoader();
    let flag0, flag1, flag2, flag3, flag4, flag5, flag6, flag7 = null;
    flagCurrent = new THREE.Group();
    flag.load('./static/resources/glbs/Flag red.glb', function ( gltf ) {
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

    let flagCurrent2 = new THREE.Group();
    flag.load('./static/resources/glbs/Flag blue.glb', function ( gltf ) {
        gltf.animations;
        flag0 = gltf.scene;
        flagCurrent2.add(flag0);
        flag0.scale.set(0.5, 0.4, 0.5);
        flag0.rotateZ(Math.PI/8); 
        flag0.position.x = -200;
        flag0.visible = false;
        flag1 = flag0.clone(true);
        flag1.position.x = 10-200
        flag1.position.y = 1
        flag2 = flag0.clone(true);
        flag2.position.x = 20-200
        flag2.position.y = 1.25
        flag3 = flag0.clone(true);
        flag3.position.x = 30-200
        flag3.position.y = 0.5
        flag4 = flag0.clone(true);
        flag4.position.x = 45-200
        flag4.position.y = 4
        flag5 = flag0.clone(true);
        flag5.position.x = 60-200
        flag5.position.y = 3.75
        flag6 = flag0.clone(true);
        flag6.position.x = 75-200
        flag6.position.y = 2.5
        flag7 = flag0.clone(true);
        flag7.position.x = 85-200
        flag7.position.y = 2
        flag2.visible = true;
        flagCurrent2.add(flag1, flag2, flag3, flag4, flag5, flag6, flag7);
        scene.add( flagCurrent2 );
    },);
    flagCurrent2.position.set(14.5, 0.75, 0);

// light
    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    let light2 = new THREE.AmbientLight(0xFFFFFF, 0.5);
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

// if the window is resize the game will too
    window.addEventListener('resize', () => {
        let width = window.innerWidth;
        let height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    })

// capture of planets p1 and p2
    let currentPlanet = "";
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
    let halosis2 = [
        {planet: "sun", capt: false, left:"none", right:"none", price:sun2.getPos()[2]},
        {planet: "mercury", capt: false, left:"sun", right:"venus", price:mercury2.getPos()[2]},
        {planet: "venus", capt: false, left:"mercury", right:"earth", price:venus2.getPos()[2]},
        {planet: "earth", capt: true, left:"venus", right:"mars", price:earth2.getPos()[2]},
        {planet: "mars", capt: false, left:"earth", right:"jupiter", price:mars2.getPos()[2]},
        {planet: "jupiter", capt: false, left:"mars", right:"saturn", price:jupiter2.getPos()[2]},
        {planet: "saturn", capt: false, left:"jupiter", right:"uranus", price:saturn2.getPos()[2]},
        {planet: "uranus", capt: false, left:"saturn", right:"neptune", price:uranus2.getPos()[2]},
        {planet: "neptune", capt: false, left:"uranus", right:"pluto", price:neptune2.getPos()[2]},
    ];

//find what planet we are currently on
    function whatPlanet(){
        if (round(rocketCurrent.position.x) == sun.getPos()[1] && player1 == true || round(rocketCurrent2.position.x) == sun2.getPos()[1] && player2 == true){
            currentPlanet = {number:"0", name:"sun"};
        } if (round(rocketCurrent.position.x) == mercury.getPos()[1] && player1 == true || round(rocketCurrent2.position.x) == mercury2.getPos()[1] && player2 == true){
            currentPlanet = {number:"1", name:"mercury"};
        } if (round(rocketCurrent.position.x) == venus.getPos()[1] && player1 == true || round(rocketCurrent2.position.x) == venus2.getPos()[1] && player2 == true){
            currentPlanet = {number:"2", name:"venus"};
        } if (round(rocketCurrent.position.x) == earth.getPos()[1] && player1 == true || round(rocketCurrent2.position.x) == earth2.getPos()[1] && player2 == true){
            currentPlanet = {number:"3", name:"earth"};
        } if (round(rocketCurrent.position.x) == mars.getPos()[1] && player1 == true || round(rocketCurrent2.position.x) == mars2.getPos()[1] && player2 == true){
            currentPlanet = {number:"4", name:"mars"};
        } if (round(rocketCurrent.position.x) == jupiter.getPos()[1] && player1 == true || round(rocketCurrent2.position.x) == jupiter2.getPos()[1] && player2 == true){
            currentPlanet = {number:"5", name:"jupiter"};
        } if (round(rocketCurrent.position.x) == saturn.getPos()[1] && player1 == true || round(rocketCurrent2.position.x) == saturn2.getPos()[1] && player2 == true){
            currentPlanet = {number:"6", name:"saturn"};
        } if (round(rocketCurrent.position.x) == uranus.getPos()[1] && player1 == true || round(rocketCurrent2.position.x) == uranus2.getPos()[1] && player2 == true){
            currentPlanet = {number:"7", name:"uranus"};
        } if (round(rocketCurrent.position.x) == neptune.getPos()[1] && player1 == true || round(rocketCurrent2.position.x) == neptune2.getPos()[1] && player2 == true){
            currentPlanet = {number:"8", name:"neptune"};
        }
    }

    // round a number
    function round(num){
        return Math.round(num);
    }
    // Uppercase first letter
    function uppercaseFirstLetter(input){
        return input.charAt(0).toUpperCase() + input.slice(1)
    }

    // if button press the keyboard action in the game
    let anim = false;
    function onDocumentKeyDown(event) {
        if (event.key == "ArrowLeft" || event.key == "q") {
            if (player1 == true){
                for (let i = 0; i < planets.children.length; i++) {
                    whatPlanet()
                    if(currentPlanet.name == "sun"){
                        text.innerHTML = "Reload the page... You have lost...";
                    } else if(halosis[i].planet == currentPlanet.name && currentPlanet.name == "mercury" && anim == false){
                        targetPositionX = planets.children[i-1].position.x;
                        text.innerHTML = "In the sun? Really? Well you lost...";
                        sec = "lose";
                        way = -1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis[i].planet == currentPlanet.name && anim == false && halosis[i-1].capt == true){
                        targetPositionX = planets.children[i-1].position.x;
                        targetPositionY = planets.children[i-1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = -1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis[i].planet == currentPlanet.name && anim == false && mat >= halosis[i-1].price){
                        price = halosis[i-1].price;
                        targetPositionX = planets.children[i-1].position.x;
                        targetPositionY = planets.children[i-1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = -1;
                        socket.emit('price', player1, player2, price);
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis[i].planet == currentPlanet.name && anim == false && mat <= halosis[i-1].price){
                        text.innerHTML = "You don't have enough resources...";
                    }
                }
            } else if(player2 == true){
                for (let i = 0; i < planets2.children.length; i++) {
                    whatPlanet()
                    if(currentPlanet.name == "sun"){
                        text.innerHTML = "Reload the page... You have lost...";
                    } else if(halosis2[i].planet == currentPlanet.name && currentPlanet.name == "mercury" && anim == false){
                        targetPositionX = planets2.children[i-1].position.x;
                        text.innerHTML = "In the sun? Really? Well you lost...";
                        sec = "lose";
                        way = -1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis2[i].planet == currentPlanet.name && anim == false && halosis2[i-1].capt == true){
                        targetPositionX = planets2.children[i-1].position.x;
                        targetPositionY = planets2.children[i-1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = -1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis2[i].planet == currentPlanet.name && anim == false && mat2 >= halosis2[i-1].price){
                        price = halosis2[i-1].price;
                        targetPositionX = planets2.children[i-1].position.x;
                        targetPositionY = planets2.children[i-1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = -1;
                        socket.emit('price', player1, player2, price);
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis2[i].planet == currentPlanet.name && anim == false && mat2 <= halosis2[i-1].price){
                        text.innerHTML = "You don't have enough resources...";
                    }
                }
            }
        }
        if (event.key == "ArrowRight" || event.key == "d") {
            for (let i = 0; i < planets.children.length; i++) {
                if (player1 == true){
                    whatPlanet()
                    if(halosis[i].planet == currentPlanet.name && halosis[i].right == "pluto" && anim == false){
                        text.innerHTML = "Where are you going? Pluto is not a planet...";
                    } else if (halosis[i].planet == currentPlanet.name && anim == false && halosis[i].right == "none"){
                        text.innerHTML = "Reload the page... You have lost...";
                    } else if(halosis[i].planet == currentPlanet.name && anim == false && halosis[i+1].capt == true){
                        targetPositionX = planets.children[i+1].position.x;
                        targetPositionY = planets.children[i+1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = 1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis[i].planet == currentPlanet.name && anim == false && mat >= halosis[i+1].price){
                        price = halosis[i+1].price;
                        targetPositionX = planets.children[i+1].position.x;
                        targetPositionY = planets.children[i+1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = 1;
                        socket.emit('price', player1, player2, price);
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis[i].planet == currentPlanet.name && anim == false && mat <= halosis[i+1].price){
                        text.innerHTML = "You don't have enough resources...";
                    }
                } else if (player2 == true){
                    whatPlanet()
                    if(halosis2[i].planet == currentPlanet.name && halosis2[i].right == "pluto" && anim == false){
                        text.innerHTML = "Where are you going? Pluto is not a planet...";
                    } else if (halosis2[i].planet == currentPlanet.name && anim == false && halosis2[i].right == "none"){
                        text.innerHTML = "Reload the page... You have lost...";
                    } else if(halosis2[i].planet == currentPlanet.name && anim == false && halosis2[i+1].capt == true){
                        targetPositionX = planets2.children[i+1].position.x;
                        targetPositionY = planets2.children[i+1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = 1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis2[i].planet == currentPlanet.name && anim == false && mat2 >= halosis2[i+1].price){
                        price = halosis2[i+1].price;
                        targetPositionX = planets2.children[i+1].position.x;
                        targetPositionY = planets2.children[i+1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = 1;
                        socket.emit('price', player1, player2, price);
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis2[i].planet == currentPlanet.name && anim == false && mat2 <= halosis2[i+1].price){
                        text.innerHTML = "You don't have enough resources...";
                    }
                }
            }
        }
        if (event.key == " " && anim == false || event.code == "Space" && anim == false && !(sec == 20)){
            socket.emit('resetTime');
            socket.emit('turnPlayer', mat, mat2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, recent);
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
                if(player1 == true){
                    whatPlanet();
                    if(halosis[i].right == intersects[0].object.name && currentPlanet.number == i && anim == false && halosis[i+1].capt == true){
                        targetPositionX = round(planets.children[i+1].position.x);
                        targetPositionY = planets.children[i+1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = 1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis[i].right == intersects[0].object.name && currentPlanet.number == i && anim == false && mat >= halosis[i+1].price){
                        price = halosis[i+1].price;
                        targetPositionX = round(planets.children[i+1].position.x);
                        targetPositionY = planets.children[i+1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = 1;
                        socket.emit('price', player1, player2, price);
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis[i].right == intersects[0].object.name && currentPlanet.number == i && anim == false && mat <= halosis[i+1].price){
                        text.innerHTML = "You don't have enough resources...";
                    } if(halosis[i].left == intersects[0].object.name && currentPlanet.number == i && halosis[i].left == "sun" && anim == false && currentPlanet.name == "mercury"){
                        targetPositionX = sun.getPos()[1];
                        text.innerHTML = "In the sun? Really? Well you lost...";
                        sec = "lose";
                        way = -1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } if(halosis[i].left == intersects[0].object.name && currentPlanet.number == i && anim == false && halosis[i-1].capt == true  && currentPlanet.name != "mercury"){
                        targetPositionX = round(planets.children[i-1].position.x);
                        targetPositionY = planets.children[i-1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = -1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis[i].left == intersects[0].object.name && currentPlanet.number == i && anim == false && mat >= halosis[i-1].price  && currentPlanet.name != "mercury"){
                        price = halosis[i-1].price;
                        targetPositionX = round(planets.children[i-1].position.x);
                        targetPositionY = planets.children[i-1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = -1;
                        socket.emit('price', player1, player2, price);
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis[i].left == intersects[0].object.name && currentPlanet.number == i && anim == false && mat <= halosis[i-1].price){
                        text.innerHTML = "You don't have enough resources...";
                    }
                } else if(player2 == true){
                    whatPlanet();
                    if(halosis2[i].right == intersects[0].object.name && currentPlanet.number == i && anim == false && halosis2[i+1].capt == true){
                        targetPositionX = round(planets2.children[i+1].position.x);
                        targetPositionY = planets2.children[i+1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = 1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis2[i].right == intersects[0].object.name && currentPlanet.number == i && anim == false && mat2 >= halosis2[i+1].price){
                        price = halosis2[i+1].price;
                        targetPositionX = round(planets2.children[i+1].position.x);
                        targetPositionY = planets2.children[i+1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = 1;
                        socket.emit('price', player1, player2, price);
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis2[i].right == intersects[0].object.name && currentPlanet.number == i && anim == false && mat2 <= halosis2[i+1].price){
                        text.innerHTML = "You don't have enough resources...";
                    } if(halosis2[i].left == intersects[0].object.name && currentPlanet.number == i && currentPlanet.name == "mercury" && anim == false){
                        targetPositionX = sun2.getPos()[1];
                        text.innerHTML = "In the sun? Really? Well you lost...";
                        sec = "lose"; 
                        way = -1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } if(halosis2[i].left == intersects[0].object.name && currentPlanet.number == i && anim == false && halosis2[i-1].capt == true && currentPlanet.name != "mercury"){
                        targetPositionX = round(planets2.children[i-1].position.x);
                        targetPositionY = planets2.children[i-1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = -1;
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis2[i].left == intersects[0].object.name && currentPlanet.number == i && anim == false && mat2 >= halosis2[i-1].price && currentPlanet.name != "mercury"){
                        price = halosis2[i-1].price;
                        targetPositionX = round(planets2.children[i-1].position.x);
                        targetPositionY = planets2.children[i-1].geometry.parameters.radius;
                        text.innerHTML = "Flying...";
                        way = -1;
                        socket.emit('price', player1, player2, price);
                        socket.emit('move', targetPositionX, targetPositionY, way);
                    } else if(halosis2[i].left == intersects[0].object.name && currentPlanet.number == i && anim == false && mat2 <= halosis2[i-1].price){
                        text.innerHTML = "You don't have enough resources...";
                    }
                }
            }
        }
    }

    // animation rocket from planets to planets
    function animRocket(){
        anim = true;
        if(player1 == true){
            whatPlanet();
            if(way == 1){
                if (rocketCurrent.position.x <= targetPositionX) {
                    rocketCurrent.position.x += 0.1;
                    if (rocketCurrent.position.y <= targetPositionY) {
                        rocketCurrent.position.y += 0.03;
                    } else if (rocketCurrent.position.y >= targetPositionY) {
                        rocketCurrent.position.y -= 0.03;
                    }
                    window.requestAnimationFrame(animRocket);
                } else {
                    rocketCurrent.position.x = round(rocketCurrent.position.x)
                    text.innerHTML = "You are on " + uppercaseFirstLetter(currentPlanet.name);
                    halosis[currentPlanet.number].capt = true;
                    flagCurrent.children[parseInt(currentPlanet.number-1)].visible = true;
                    if(halosis[1].capt == true && halosis[2].capt == true && halosis[3].capt == true && halosis[4].capt == true && halosis[5].capt == true && halosis[6].capt == true && halosis[7].capt == true && halosis[8].capt == true){
                        text.innerHTML = "Player 1 won the game!";
                        socket.emit('resetTime', 1000);
                        camera.position.x = rocketCurrent.position.x;
                        endData();
                    } else {
                        setTimeout(function(){
                            camera.position.x = rocketCurrent2.position.x;
                            anim = false;
                            socket.emit('resetTime');
                            socket.emit('turnPlayer', mat, mat2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, recent);
                        },2000)
                    }
                }
            } else {
                if (rocketCurrent.position.x >= targetPositionX) {
                    rocketCurrent.position.x -= 0.1;
                    if (rocketCurrent.position.y <= targetPositionY) {
                        rocketCurrent.position.y += 0.03;
                    } else if (rocketCurrent.position.y >= targetPositionY) {
                        rocketCurrent.position.y -= 0.03;
                    }
                    window.requestAnimationFrame(animRocket);
                } else if(currentPlanet.name == "sun"){
                    anim = false;
                } else {
                    rocketCurrent.position.x = round(rocketCurrent.position.x)
                    text.innerHTML = "You are on " + uppercaseFirstLetter(currentPlanet.name);
                    halosis[currentPlanet.number].capt = true;
                    flagCurrent.children[currentPlanet.number-1].visible = true;
                    if(halosis[1].capt == true && halosis[2].capt == true && halosis[3].capt == true && halosis[4].capt == true && halosis[5].capt == true && halosis[6].capt == true && halosis[7].capt == true && halosis[8].capt == true){
                        text.innerHTML = "Player 1 won the game!";
                        socket.emit('resetTime', 1000);
                        camera.position.x = rocketCurrent.position.x;
                        endData();
                    } else {
                        setTimeout(function(){
                            camera.position.x = rocketCurrent2.position.x;
                            anim = false;
                            socket.emit('resetTime');
                            socket.emit('turnPlayer', mat, mat2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, recent);
                        },2000)
                    }
                }
            }  
        } else if(player2 == true) {
            whatPlanet();
            if(way == 1){
                if (rocketCurrent2.position.x <= targetPositionX) {
                    rocketCurrent2.position.x += 0.1;
                    if (rocketCurrent2.position.y <= targetPositionY) {
                        rocketCurrent2.position.y += 0.03;
                    } else if (rocketCurrent2.position.y >= targetPositionY) {
                        rocketCurrent2.position.y -= 0.03;
                    }
                    window.requestAnimationFrame(animRocket);
                } else {
                    rocketCurrent2.position.x = round(rocketCurrent2.position.x)
                    text.innerHTML = "You are on " + uppercaseFirstLetter(currentPlanet.name);
                    halosis2[currentPlanet.number].capt = true;
                    flagCurrent2.children[parseInt(currentPlanet.number-1)].visible = true;
                    if(halosis2[1].capt == true && halosis2[2].capt == true && halosis2[3].capt == true && halosis2[4].capt == true && halosis2[5].capt == true && halosis2[6].capt == true && halosis2[7].capt == true && halosis2[8].capt == true){
                        text.innerHTML = "Player 2 won the game!";
                        socket.emit('resetTime', 1000);
                        camera.position.x = rocketCurrent2.position.x;
                        endData();
                    } else {
                        setTimeout(function(){
                            camera.position.x = rocketCurrent.position.x;
                            anim = false;
                            socket.emit('resetTime');
                            socket.emit('turnPlayer', mat, mat2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, recent);
                        },2000)
                    }
                }
            } else {
                if (rocketCurrent2.position.x >= targetPositionX) {
                    rocketCurrent2.position.x -= 0.1;
                    if (rocketCurrent2.position.y <= targetPositionY) {
                        rocketCurrent2.position.y += 0.03;
                    } else if (rocketCurrent2.position.y >= targetPositionY) {
                        rocketCurrent2.position.y -= 0.03;
                    }
                    window.requestAnimationFrame(animRocket);
                } else if(currentPlanet.name == "sun"){
                    anim = false;
                } else {
                    rocketCurrent2.position.x = round(rocketCurrent2.position.x)
                    text.innerHTML = "You are on " + uppercaseFirstLetter(currentPlanet.name);
                    halosis2[currentPlanet.number].capt = true;
                    flagCurrent2.children[currentPlanet.number-1].visible = true;
                    if(halosis2[1].capt == true && halosis2[2].capt == true && halosis2[3].capt == true && halosis2[4].capt == true && halosis2[5].capt == true && halosis2[6].capt == true && halosis2[7].capt == true && halosis2[8].capt == true){
                        text.innerHTML = "Player 2 won the game!";
                        socket.emit('resetTime', 10);
                        camera.position.x = rocketCurrent2.position.x;
                        endData();
                    } else {
                        setTimeout(function(){
                            camera.position.x = rocketCurrent.position.x;
                            anim = false;
                            socket.emit('resetTime');
                            socket.emit('turnPlayer', mat, mat2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, recent);
                        },2000)
                    }
                }
            }
        }
    }

    // socket handling :
    socket.on('pause', () => {
        socket.emit('resetTime', 120);
        text.innerHTML = "Game paused, a player is disconnected...";
        state = {
            p1: player1,
            p2: player2,
        }
        player1 = false;
        player2 = false;
        socket.emit('gameState', halosis, halosis2, rocketCurrent.position.x, rocketCurrent2.position.x, rocketCurrent.position.y, rocketCurrent2.position.y, state);
    });

    socket.on('loadGameState', (h1, h2, rpx1, rpx2, rpy1, rpy2, currentState) => {
        for (let i = 0; i < h1.length; i++) {
            if(h1[i].capt == true){
                flagCurrent.children[i-1].visible = true;
                halosis[i].capt = true;
            }
        }
        for (let i = 0; i < h2.length; i++) {
            if(h2[i].capt == true){
                flagCurrent2.children[i-1].visible = true;
                halosis2[i].capt = true;
            }
        }
        rocketCurrent.position.x = rpx1;
        rocketCurrent2.position.x = rpx2;
        rocketCurrent.position.y = rpy1;
        rocketCurrent2.position.y = rpy2;
        state = currentState;
        player1 = state.p2;
        player2 = state.p1;
        socket.emit('resetTime');
        socket.emit('turnPlayer', mat, mat2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, recent);
    });

    socket.on('move', (targetX, targetY, dir) => {
        socket.emit('resetTime', 10);
        targetPositionX = targetX;
        targetPositionY = targetY;
        way = dir;
        requestAnimationFrame(animRocket);
    });
    const text = document.querySelector(".halosis");
    const resource = document.querySelector(".resource")
    const resource2 = document.querySelector(".resource2")
    socket.on('price', (m1, m2) => {
        mat = m1;
        mat2 = m2;
        resource.innerHTML = "Moon Stone : " + mat;
        resource2.innerHTML = "Moon Stone p2 : " + mat2;
    });
    const time = document.querySelector(".timer")
    socket.on('time', (timer) => {
        sec = timer;
        time.innerHTML = "Timer : "+sec;  
    })
    socket.on('resetTime', (timer) => {
        sec = timer;
        time.innerHTML = "Timer : "+sec;  
    })
    socket.on('turnPlayer', (m1, m2, p1, p2) => {
        console.log("turnPlayer", p1, p2);
        recent = 1;
        price = 0;
        whatPlanet()
        player1 = p1;
        player2 = p2;
        mat = m1;
        mat2 = m2;
        resource.innerHTML = "Moon Stone : " + mat;
        resource2.innerHTML = "Moon Stone p2 : " + mat2;
        if(player1 == true){
            turnP1++;
            text.innerHTML = "Your turn player 1!<br>You are currently on " + uppercaseFirstLetter(currentPlanet.name);
            document.addEventListener("keydown", onDocumentKeyDown, false);
            document.addEventListener('mousedown', onMouseDown, false);
        } else if (player2 == true){
            turnP2++;
            text.innerHTML = "Your turn player 2!<br>You are currently on " + uppercaseFirstLetter(currentPlanet.name);
            document.addEventListener("keydown", onDocumentKeyDown, false);
            document.addEventListener('mousedown', onMouseDown, false);
        }
    })
    socket.on('startGame', () => {
        whatPlanet()
        player1 = true;
        player2 = false;
        socket.emit('resetTime', 20);
        text.innerHTML = "Your turn player 1!<br>You are currently on " + uppercaseFirstLetter(currentPlanet.name);
        document.addEventListener("keydown", onDocumentKeyDown, false);
        document.addEventListener('mousedown', onMouseDown, false);
    })

    socket.on('countInit', (players) => {
        if (players == 1){
            document.querySelector('.waiting').innerHTML = "Waiting for another player to join...";
        } else if (players == 2){
            document.querySelector('.waiting').innerHTML = "Another player has joined! Starting game...";
            setTimeout(function(){document.querySelector('.waiting').innerHTML = "";
            document.querySelector('.waiting').style.display = "none";
            document.querySelector('.resource').classList.remove("hidden");
            document.querySelector('.resource2').classList.remove("hidden");
            document.querySelector('canvas').classList.remove("hidden");
            document.querySelector('body').classList.remove("body");
            document.querySelector('.timer').classList.remove("hidden");}, 1500);
            socket.emit('startGame');
        }
    });
    mat = 150;
    mat2 = 0;
    resource.innerHTML = "Moon Stone : " + mat;
    resource2.innerHTML = "Moon Stone p2 : " + mat2;

// loop for the render and cam
let recent = 0;
    function loop(){
        socket.emit('time');
        if(player1 == true){
            camera.lookAt(rocketCurrent.position.x, rocketCurrent.position.y, rocketCurrent.position.z);
            camera.position.x = rocketCurrent.position.x;
            if(sec <= 0 && recent == 0){
                socket.emit('resetTime', 20);
                camera.position.x = rocketCurrent2.position.x;
                socket.emit('turnPlayer', mat, mat2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, recent);
            }
        } else if (player2 == true){
            camera.lookAt(rocketCurrent2.position.x, rocketCurrent2.position.y, rocketCurrent2.position.z);
            camera.position.x = rocketCurrent2.position.x;
            if(sec <= 0 && recent == 0){
                socket.emit('resetTime', 20);
                camera.position.x = rocketCurrent.position.x;
                socket.emit('turnPlayer', mat, mat2, player1, player2, capt1x15, capt2x15, capt1x2, capt2x2, recent);
            }
        }
        if(sec == 18){ recent = 0; }
        if (halosis[2].capt == true){
            capt1x2 = true;
        }
        if (halosis2[2].capt == true){
            capt2x2 = true;
        }
        if (halosis[4].capt == true){
            capt1x15 = true;
        }
        if (halosis2[4].capt == true){
            capt2x15 = true;
        }
        if(sec == 0 && player1 == false && player2 == false){
            text.innerHTML = "Player won the game by forfeit!";
        }
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        window.requestAnimationFrame(loop);
    }
    loop();

    // get data for stats
    let dataP1 = [];
    let dataP2 = [];
    let countP1 = 0;
    let countP2 = 0;
    function liveData(){
        countP1 = 0;
        countP2 = 0;
        for (let i = 1; i < planets.children.length; i++) {
            if (halosis[i].capt == true){
                countP1++;
            }
        }
        for (let i = 1; i < planets.children.length; i++) {
            if (halosis2[i].capt == true){
                countP2++;
            }
        }
        dataP1["resources"] = mat;
        dataP2["resources"] = mat;
        dataP1["turn"] = turnP1;
        dataP2["turn"] = turnP2;
        dataP1["capt"] = countP1;
        dataP2["capt"] = countP2;
    }
    function endData(){
        dataP1["resources"] = mat;
        dataP2["resources"] = mat2;
        dataP1["turn"] = turnP1;
        dataP2["turn"] = turnP2;
        countP1 = 0;
        countP2 = 0;
        for (let i = 1; i < planets.children.length; i++) {
            if (halosis[i].capt == true){
                countP1++;
            }
        }
        for (let i = 1; i < planets.children.length; i++) {
            if (halosis2[i].capt == true){
                countP2++;
            }
        }
        dataP1["capt"] = countP1;
        dataP2["capt"] = countP2;
        return;
    }
}
init();
}, []);
return (
    <div className='w-full'>

    </div>
);
}
export default MyThree