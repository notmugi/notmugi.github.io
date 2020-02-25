"use strict";

// simplified on three.js/examples/webgl_loader_GLTF.html
function main() {

    // renderer
    const renderer = new THREE.WebGLRenderer( { antialias: false,  alpha: true  }); renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(360, 140);
    document.getElementById('main').appendChild( renderer.domElement );

    // camera
    const camera = new THREE.PerspectiveCamera(20, 3080 / 1080, 0.005, 10000);
    camera.position.set(4, 0, 0); // settings in `sceneList` "Monster"
    camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
		//camera.zoom(1);
    // scene and lights
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xFFFFFFF));

    // load gltf model and texture
    const objs = [];
    const loader = new THREE.GLTFLoader();
    loader.load("js/sean.gltf", gltf => {
			var sean = gltf.scene;
	    sean.traverse((node) => {
	      if (!node.isMesh) return;
	      node.material.wireframe = true;

	    });

        // settings in `sceneList` "Monster"
        gltf.scene.scale.set(1, 1, 1);
        gltf.scene.rotation.set(0, 1.57, 0);
        gltf.scene.position.set(0, 0, 0);

        scene.add(sean);
        objs.push({gltf});
    });

    // animation rendering
    const clock = new THREE.Clock();
    (function animate() {
      scene.rotation.x += 0.000;
      scene.rotation.y -= 0.005;
      scene.rotation.z += 0.000;
        // animation with THREE.AnimationMixer.update(timedelta)
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    })();
    return objs;
}
const objs = main();
