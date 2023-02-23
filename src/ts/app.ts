import * as THREE from 'three';
import { World } from './World';
import '../scss/chumbucket.scss';

const world = new World('3d-window');

addCube(world);

world.update();


function addCube(world : World) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    
    const cube = new THREE.Mesh(geometry, material);

    world.scene.add(cube);
}