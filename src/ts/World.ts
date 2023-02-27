import { PerspectiveCamera, Camera, Scene, WebGLRenderer, Object3D, DirectionalLight, PCFSoftShadowMap } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

export class World {

    public readonly scene : Scene;
    public readonly camera : Camera;
    public readonly renderer : WebGLRenderer;
    public readonly composer : EffectComposer;
    public objectsToAnimate : Object3D<Event>[];

    constructor(canvasTargetDOM : string) {

        const canvasTarget = document.getElementById(canvasTargetDOM);

        if (!canvasTarget) {
            throw "Error, no target DOM element supplied for canvas to be created";
        }

        this.scene = new Scene();
        
        this.objectsToAnimate = [];
        
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 90;
        this.camera.position.y = 0;
        
        this.renderer = new WebGLRenderer({
            canvas: canvasTarget
        });
        this.renderer.setSize(window.innerWidth * .90, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        
        this.composer = new EffectComposer(this.renderer);

        this.setLights();

        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
    }

    setLights() {
        const directionalLight = new DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, .5);
        directionalLight.castShadow = true;
        
        this.scene.add(directionalLight);
    }

    populateWorld(populateCallbacks : any[] ) {
        populateCallbacks.forEach(cb => {
            const animatedObject = cb();

            if (animatedObject){
                this.objectsToAnimate.push(animatedObject);
            }
        });
    }

    update() {
        window.requestAnimationFrame(() => this.update());

        this.objectsToAnimate.forEach(object => {
            if (object) {
                object.rotation.x += 0.01;
                object.rotation.y += 0.01;
            }
        });

        this.composer.render();
    }
}