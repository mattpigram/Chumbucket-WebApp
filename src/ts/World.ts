import { PerspectiveCamera, Camera, Scene, WebGLRenderer } from 'three';
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

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new WebGLRenderer({
            canvas: canvasTarget
        });
        this.composer = new EffectComposer(this.renderer);

        this.renderer.setSize(window.innerWidth * .90, window.innerHeight);

        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
    }

    populateWorld(populateCallbacks : any[] ) {
        populateCallbacks.forEach(cb => {
            cb();
        });
    }

    update() {
        window.requestAnimationFrame(() => this.update);

        this.composer.render();
    }
}