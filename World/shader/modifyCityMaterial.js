import * as THREE from "three";

function modifyCityMaterial(mesh) {
	mesh.geometry.computeBoundingBox();
	// console.log(mesh.geometry.boundingBox);

	let { min, max } = mesh.geometry.boundingBox;
	// 获取物体的高度差
	let uHeight = max.y - min.y;

	mesh.material.onBeforeCompile = (shader) => {
		// console.log("xxx", shader.vertexShader);
		// console.log("xxx", shader.fragmentShader);

		shader.uniforms.uTopColor = {
			value: new THREE.Color("#1B2569"),
		};
		shader.uniforms.uHeight = {
			value: uHeight,
		};

		shader.vertexShader = shader.vertexShader.replace(
			`#include <common>`,
			`
            #include <common>
            varying vec3 vPosition;
            `
		);

		shader.vertexShader = shader.vertexShader.replace(
			`#include <begin_vertex>`,
			`
            #include <begin_vertex>
            vPosition = position;
            `
		);

		shader.fragmentShader = shader.fragmentShader.replace(
			`#include <common>`,
			`
            #include <common>

            uniform vec3 uTopColor;
            uniform float uHeight;
            varying vec3 vPosition;
            `
		);

		shader.fragmentShader = shader.fragmentShader.replace(
			`#include <dithering_fragment>`,
			`
            #include <dithering_fragment>
            vec4 distGradColor = gl_FragColor;
            // 设置渐变色比例
            float gradMix = (vPosition.y + uHeight/2.0) / uHeight;
            // 设置渐变效果 mix(a,b,r) = (1-r)*a + br
            vec3 gradMixColor = mix(distGradColor.xyz, uTopColor, gradMix);
            // 片元赋色
            gl_FragColor = vec4(gradMixColor,0.8);
            `
		);
	};
}

export { modifyCityMaterial };
