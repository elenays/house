import { AmbientLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { OBJLoader } from "./OBJLoader";

export class Loader {

    constructor() {
        this.loader = new OBJLoader()
        this.scene = new Scene()
        this.camera = new PerspectiveCamera(64, innerWidth / innerHeight, .1, 1000)
        this.lump = new AmbientLight(0xAAAAAA, 1.5)
        this.lump.position.set(0, 5, 0)

        this.renderer = new WebGLRenderer()
        this.renderer.setSize(innerWidth, innerHeight)
        document.body.appendChild(this.renderer.domElement);
        this.init()
        this.render()
    }


    init() {
        this.scene.add(this.lump)
        this.camera.position.z = 5;
        this.camera.lookAt(new Vector3(0, 0, 0))

        this.loader.load('3d/house.obj', (object) => {
            object.scale.x = 1;
            object.scale.y = 1;
            object.scale.z = 1;
            this.scene.add(object);
        })

    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.setClearColor(0xDDDDDD, 1);
        this.renderer.render(this.scene, this.camera);
    }

}

