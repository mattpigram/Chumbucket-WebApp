import { MeshBasicMaterial, Mesh, Scene } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { World } from './World';
import '../scss/chumbucket.scss';

const world = new World('3d-window');

world.populateWorld([() => addText(world.scene, "Test text")])

world.update();

// function addCube(scene : Scene) : void {
//     const geometry = new BoxGeometry(1, 1, 1);
//     const material = new MeshBasicMaterial({
//         color: 0x00ff00
//     });
    
//     const cube = new Mesh(geometry, material);

//     scene.add(cube);
// }

function addText(scene: Scene, text: string) {
    const loader = new FontLoader();
    loader.load(
        'fonts/helvetiker_regular.typeface.json', 
        function(font : any) {
            const geometry = new TextGeometry(text, { 
                font: font, 
                size: 80, 
                height: 5, 
                curveSegments: 12, 
                bevelEnabled: true,
                bevelThickness: 10, 
                bevelSize: 8, 
                bevelOffset: 0, 
                bevelSegments: 5
            });

            const material = new MeshBasicMaterial({
                color: 0x00ff00
            });

            const text3d = new Mesh(geometry, material);
            scene.add(text3d);
    },
    undefined,
    function(err) {
        console.log(err);
    });
}