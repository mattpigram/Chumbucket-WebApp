import * as THREE from 'three';
import { Camera, Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

export class World {

    public readonly scene : Scene;
    public readonly camera : Camera;
    public readonly renderer : WebGLRenderer;
    public readonly composer : EffectComposer;

    constructor(canvasTargetDOM : string) {

        const canvasTarget = document.getElementById(canvasTargetDOM);

        if (!canvasTarget) {
            throw "Error, no target DOM element supplied for canvas to be created";
        }

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer();
        this.composer = new EffectComposer(this.renderer);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        canvasTarget.appendChild(this.renderer.domElement);

        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
    }

    update() {
        window.requestAnimationFrame(() => this.update);

        this.composer.render();
    }
}