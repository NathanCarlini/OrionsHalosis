import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import scene from './script.js';
// init planets (to optimize by using them in a different script)
let planets = new THREE.Group();
let planets2 = new THREE.Group();
let num = 0;
const Planets = class {
    constructor(size, texture, position, price, moonStone){
        if (texture == 'sun'){
            num++;
        }
        const Geometry = new THREE.SphereGeometry( size, 32, 32 );
        const texturePlanet = new THREE.TextureLoader().load('/static/resources/'+texture+'.jpg' ); 
        if (texture == "earth"){
            const textureEarthBump = new THREE.TextureLoader().load('/static/resources/earthbump.jpg' ); 
            const textureEarthSpec = new THREE.TextureLoader().load('/static/resources/earthspec.jpg' );
            const Material = new THREE.MeshPhongMaterial({map: texturePlanet, bumpMap: textureEarthBump, specular: textureEarthSpec}); 
            const Mesh = new THREE.Mesh(Geometry, Material);
            Mesh.position.x = position;
            Mesh.name = texture;
            if(num == 2){
                planets2.add(Mesh);
                scene.add(planets2)
            } else {
                planets.add(Mesh);
                scene.add(planets)
            }
        } else {
            const Material = new THREE.MeshPhongMaterial({map: texturePlanet}); 
            const Mesh = new THREE.Mesh(Geometry, Material);
            Mesh.position.x = position;
            Mesh.name = texture;
            if(num == 2){
                planets2.add(Mesh);
            } else {
                planets.add(Mesh);
            }
            if (texture == "saturn"){// add ring to saturn
                const SaturnRingGeometry = new THREE.RingGeometry( 5, 8, 64 ); 
                const SaturnRingMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide } );
                SaturnRingMaterial.transparent = true;
                SaturnRingMaterial.opacity = 0.2;
                const SaturnRingMesh = new THREE.Mesh( SaturnRingGeometry, SaturnRingMaterial ); 
                if(num == 2){
                    SaturnRingMesh.position.x = 75-200;
                } else {
                    SaturnRingMesh.position.x = 75;
                }
                SaturnRingMesh.rotateX(-Math.PI/3);
                SaturnRingMesh.rotateY(-Math.PI/6);
                scene.add( SaturnRingMesh );
            }
        
            const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
            const points = [];
            points.push( new THREE.Vector3( position, 0, 0 ) );
            points.push( new THREE.Vector3( position+1.25, size+1, 0 ) );
            points.push( new THREE.Vector3( position+6, size+1, 0 ) );
            const geometry = new THREE.BufferGeometry().setFromPoints( points );
            const line = new THREE.Line( geometry, material );
            scene.add( line );
        
            const loader = new FontLoader();
            loader.load( '/static/font/space-font.json', function ( font ) {
                const geometry = new TextGeometry( 'Price : '+price, {
                    font: font,
                    size: 0.4,
                    height: 0.1,
                } );
                const material = new THREE.MeshStandardMaterial({
                    color: 'white',
                });
                const textMesh = new THREE.Mesh(geometry, material);
                textMesh.position.set(position+1.65, size+1.5, 0);
                scene.add(textMesh);
            } );
            if (typeof moonStone !== 'undefined'){
                loader.load( '/static/font/space-font.json', function ( font ) {
                    const geometry = new TextGeometry( 'Resource x'+moonStone, {
                        font: font,
                        size: 0.4,
                        height: 0.1,
                    } );
                    const material = new THREE.MeshStandardMaterial({
                        color: 'white',
                    });
                    const textMesh = new THREE.Mesh(geometry, material);
                    textMesh.position.set(position+1.65, size+2.25, 0);
                    scene.add(textMesh);
                } );
            }
        }
        this.texture = texture;
        this.position = position;
        this.price = price;
        this.planets = planets;
        this.planets2 = planets2;
    }
    getPos(){
        let obj = [this.texture, this.position,this.price, this.planets, this.planets2];
        return obj;
    }
}

export default Planets;