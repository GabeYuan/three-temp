import { createCamera } from "./components/camera.js";
import { createCube } from "./components/cube.js";
import { createScene } from "./components/scene.js";
import { createLights } from "./components/lights.js";
import { createAxesHelper } from "./components/axesHelper.js";

import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";

let scene;
let camera;
let renderer;
let controls;
let loop;

class World {
	constructor(container) {
		scene = createScene(); // 私有属性
		camera = createCamera(); // 私有属性
		renderer = createRenderer(); // 私有属性
		loop = new Loop(camera, scene, renderer);

		container.append(renderer.domElement); // 将渲染结果添加到容器中

		controls = createControls(camera, renderer.domElement);

		const cube = createCube();
		scene.add(cube);

		const axesHelper = createAxesHelper();
		scene.add(axesHelper);

		const { ambientLight, mainLight } = createLights();

		loop.updatables.push(controls);
		scene.add(ambientLight, mainLight);

		const resizer = new Resizer(container, camera, renderer);
	}

	render() {
		renderer.render(scene, camera);
	}

	async init() {
		// TODO:
	}

	start() {
		loop.start();
	}

	stop() {
		loop.stop();
	}
}

export { World };
