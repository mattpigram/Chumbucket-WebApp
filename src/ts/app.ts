import { BoxGeometry, MeshBasicMaterial, Mesh, Scene, Object3D, PlaneGeometry, MeshStandardMaterial } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { World } from './World';
import '../scss/chumbucket.scss';

const world = new World('3d-window');

world.populateWorld([() => addGroundPlane(world.scene), () => addCube(world.scene), () => addText(world.scene, "Test text")])

world.update();

function addGroundPlane(scene : Scene) : Object3D | undefined {
    const geometry = new PlaneGeometry(200, 200, 64, 64);
    const material = new MeshStandardMaterial({
        color: 0xff00ff
    });

    const plane = new Mesh(geometry, material);
    plane.position.z = -10;
    plane.rotateX(270);
    plane.receiveShadow = true;

    scene.add(plane);

    return undefined;
}

function addCube(scene : Scene) : Object3D | undefined{
    const geometry = new BoxGeometry(10, 10, 10);
    const material = new MeshBasicMaterial({
        color: 0x00ff00
    });
    
    const cube = new Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.y = 0.5;

    scene.add(cube);

    return cube;
}

function addText(scene: Scene, text: string) : Object3D | undefined {
    const loader = new FontLoader();
    loader.load(
        'fonts/helvetiker_regular.typeface.json', 
        function(font : any) {
            const geometry = new TextGeometry(text, { 
                font: font, 
                size: 20, 
                height: 2, 
                curveSegments: 12, 
                bevelEnabled: true,
                bevelThickness: .5, 
                bevelSize: .5, 
                bevelOffset: 0, 
                bevelSegments: 5
            });

            const material = new MeshBasicMaterial({
                color: 0x0aa0fa
            });

            const text3d = new Mesh(geometry, material);
            text3d.position.x = -50;
            text3d.position.y = 10;
            text3d.receiveShadow = true;
            text3d.castShadow = true;
            
            scene.add(text3d);

            return text3d;
    },
    undefined,
    function(err) {
        console.log(err);
    });

    return undefined;
}