import "./style.css";
import { World } from "./World/World.js";

async function main() {
	const container = document.querySelector("#app");

	// 1.创建World应用实例
	const world = new World(container);

	await world.init();
	world.start();
}

main();
