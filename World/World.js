import { createCamera } from './components/camera.js'
import { createCube } from './components/cube.js'
import { createScene } from './components/scene.js'

import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'

let scene
let camera
let renderer

class World {
    constructor(container) {
        scene = createScene() // 私有属性
        camera = createCamera() // 私有属性
        renderer = createRenderer() // 私有属性

        container.append(renderer.domElement) // 将渲染结果添加到容器中

        const cube = createCube()

        scene.add(cube)

        const resizer = new Resizer(container, camera, renderer)
    }

    render() {
        renderer.render(scene, camera)
    }
}

export { World }
