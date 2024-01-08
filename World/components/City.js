import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

async function loadCity() {
	const gltfLoader = new GLTFLoader();
	const gltf = await gltfLoader.loadAsync("gltf/city.glb");
	console.log(gltf);
	gltf.scene.traverse((item) => {
		console.log("item", item);
		if (item.type === "Mesh") {
			item.material = new THREE.MeshBasicMaterial({
				color: new THREE.Color(0x00ffff),
			});
		}
	});
	return gltf;
}

export { loadCity };
