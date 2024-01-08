import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;
  const axesHelper = new THREE.AxesHelper(1500)
  // forward controls.update to our custom .tick method
  controls.tick = () => controls.update();

  return controls;
}

export { createControls };
