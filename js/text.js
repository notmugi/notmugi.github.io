//Random y spin value between 0.0005 and 0.02
const randSpeedY = Math.random() * (0.02 - 0.0005) + 0.0005;

//Random z spin value between 0.0005 and 0.02
const randSpeedZ = Math.random() * (0.02 - 0.0005) + 0.0005;

//Randomize the start type to either 1(y spin) or 0(z spin)
const randStartType = Math.round(Math.random());

//SpEcIaL SpIn TyPe UwU 1 iN 10 ChAnCe
const specialSpin = Math.round(Math.random() * (10 - 0) + 0);


function main() {

// Initialize all important stuff
    const renderer = new THREE.WebGLRenderer( { antialias: false,  alpha: true  }); renderer.setClearColor( 0x000000, 0 );
    const loader = new THREE.GLTFLoader();
    const camera = new THREE.PerspectiveCamera(13, 3080 / 1080, 0.005, 10000);
    const scene = new THREE.Scene();

// set up camera, renderer, scene, and append it all to #main
    renderer.setSize(360, 140);
    camera.position.set(4, 0, 0);
    camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(new THREE.AmbientLight(0xFFFFFFF));
    document.getElementById('logo').appendChild( renderer.domElement );

// use loader to load the gltf & traverse it to set the material
    loader.load("js/name.gltf", gltf => {
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

//if the random start type is 1, do y spin, else do z spin
  (function animate() {
    if (randStartType == 1) {
      scene.rotation.y -= randSpeedY;
    }else if (randStartType == 0){
      scene.rotation.z += randSpeedZ;
    }

//special spin(both spin types!!!!!!!!!!!!!! wow)
    if (specialSpin == 10){
      scene.rotation.y -= randSpeedY;
      scene.rotation.z += randSpeedZ;
    }

//render the stuff and things
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();

//end of main
}

// this doesnt run main, i swear
main();
