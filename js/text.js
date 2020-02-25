function main() {

// Initialize all important stuff
    const renderer = new THREE.WebGLRenderer( { antialias: false,  alpha: true  }); renderer.setClearColor( 0x000000, 0 );
    const loader = new THREE.GLTFLoader();
    const camera = new THREE.PerspectiveCamera(15, 3080 / 1080, 0.005, 10000);
    const scene = new THREE.Scene();

// set up camera, renderer, scene, and append it all to #main
    renderer.setSize(360, 140);
    camera.position.set(4, 0, 0);
    camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(new THREE.AmbientLight(0xFFFFFFF));
    document.getElementById('logo').appendChild( renderer.domElement );

// use loader to load the gltf & traverse it to set the material
    loader.load("js/sean.gltf", gltf => {
		var sean = gltf.scene;
	  sean.traverse((node) => {
	     if (!node.isMesh) return;
	       node.material.wireframe = true;
       });

//position scene and place model in center
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.rotation.set(0, 1.57, 0);
    gltf.scene.position.set(0, 0, 0);
    scene.add(sean);
  });

// Start animating,render each frame & camera
  (function animate() {
    scene.rotation.x += 0.000;
    scene.rotation.y -= 0.005;
    scene.rotation.z += 0.000;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();


//end of main
}

// this doesnt run main, i swear
main();
