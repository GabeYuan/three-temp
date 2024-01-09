import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { EdgesLine } from "../effect/EdgesLine";

import { modifyCityMaterial } from "../shader/modifyCityMaterial.js";
async function loadCity(scene) {
	const gltfLoader = new GLTFLoader();
	const gltf = await gltfLoader.loadAsync("gltf/city.glb");
	// console.log(gltf);
	gltf.scene.traverse((item) => {
		console.log("item", item);
		if (item.type === "Mesh") {
			const cityMaterial = new THREE.MeshBasicMaterial({
				color: 0xa8cded,
				transparent: true, // 透明度
			});
			item.material = cityMaterial;

			new EdgesLine(scene, item, new THREE.Color("#f1f2f3"));

			modifyCityMaterial(item);
		}
	});
	scene.add(gltf.scene);
	return gltf;
}

export { loadCity };
