import './style.css'
import { World } from './World/World.js'

function main() {
    const container = document.querySelector('#app')

    // 1.创建World应用实例
    const world = new World(container)

    // 2.渲染场景
    world.render()
}

main()
