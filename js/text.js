"use strict";

// simplified on three.js/examples/webgl_loader_GLTF.html
function main() {

    // renderer
    const renderer = new THREE.WebGLRenderer( { antialias: false,  alpha: true  }); renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(800, 800);
    document.body.appendChild(renderer.domElement);

    // camera
    const camera = new THREE.PerspectiveCamera(60, 1080 / 1080, 1, 10000);
    camera.position.set(5, 0, 0); // settings in `sceneList` "Monster"
    camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
		//camera.zoom(1);
    // scene and lights
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xcccccc));

    // load gltf model and texture
    const objs = [];
    const loader = new THREE.GLTFLoader();
    loader.load("https://raw.githubusercontent.com/notmugi/notmugi.github.io/master/js/sean.glb", gltf => {
			var sean = gltf.scene;
	    sean.traverse((node) => {
	      if (!node.isMesh) return;
	      node.material.wireframe = true;
	    });

        // settings in `sceneList` "Monster"
        gltf.scene.scale.set(0.4, 0.4, 0.4);
        gltf.scene.rotation.copy(new THREE.Euler(90, 90, 90));
        gltf.scene.position.set(2, 1, 0);

        scene.add(sean);
        objs.push({gltf});
    });

    // animation rendering
    const clock = new THREE.Clock();
    (function animate() {
        // animation with THREE.AnimationMixer.update(timedelta)
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    })();
    return objs;
}
const objs = main();
