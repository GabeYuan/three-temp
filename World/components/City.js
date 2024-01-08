import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { modifyCityMaterial } from "../shader/modifyCityMaterial.js";
async function loadCity() {
	const gltfLoader = new GLTFLoader();
	const gltf = await gltfLoader.loadAsync("gltf/city.glb");
	// console.log(gltf);
	gltf.scene.traverse((item) => {
		console.log("item", item);
		if (item.type === "Mesh") {
			const cityMaterial = new THREE.MeshBasicMaterial({
				color: 0xA8CDED,
				transparent: true, // 透明度
			});
			item.material = cityMaterial;

			modifyCityMaterial(item);
		}
	});
	return gltf;
}

export { loadCity };
