import { AmbientLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer, TextureLoader, MeshStandardMaterial } from 'three';
import { OBJLoader } from "./libs/OBJLoader";

export class Loader {

    constructor() {
        this.loader = new OBJLoader()
        this.scene = new Scene()
        this.camera = new PerspectiveCamera(64, innerWidth / innerHeight, .1, 1000)
        this.lump = new AmbientLight(0xAAAAAA, 1.5)
        this.lump.position.set(0, 5, 0)
        this.textureLoader = new TextureLoader()

        this.renderer = new WebGLRenderer()
        this.renderer.setSize(innerWidth, innerHeight)
        document.body.appendChild(this.renderer.domElement);
        this.init()
        this.render()
    }


    init() {
        this.scene.add(this.lump)
        this.camera.position.z = -45;
        this.camera.lookAt(new Vector3(0, 0, 0))
        this.loader.load('3d/models/bochka.obj', (bochkaScene) => {
            bochkaScene.scale.x = 1;
            bochkaScene.scale.y = 1;
            bochkaScene.scale.z = 1;
            this.scene.add(bochkaScene);

            this.textureLoader.load('3d/texture/main.png', (texture) => {
                this.material = new MeshStandardMaterial({
                    map: texture
                })

                // установка материала на модель
                // traverse - проходит по всем детям в сцене и на все меши ставит this.material
                bochkaScene.traverse(object => {
                    object.material = this.material
                })

            })
        })

    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.setClearColor(0xDDDDDD, 1);
        this.renderer.render(this.scene, this.camera);
    }

}