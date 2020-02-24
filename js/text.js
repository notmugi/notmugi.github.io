var camera;
var scene;
var renderer;
var mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8, mesh9;
var maxX, maxY, maxZ;
var first=true;






window.onload = function()
{
		init();
		animate();
};

function init()
{
		var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		var dirLight = new THREE.DirectionalLight( 0xffffff );
		var loader = new THREE.GLTFLoader();
		var sceneWidth = window.innerWidth;
		var sceneHeight = window.innerHeight + 100;
		// camera: vertical-field-of-view, aspect-ratio, near, far
		camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 1, 10000 );
		camera.position.z = 1000;
		hemiLight.position.set( 0, 300, 0 );
		dirLight.position.set( 75, 300, -75 );

		// Define the geometry of the object


		// An object becomes visible only if its material-type is defined.

		// Mesh actually creates the 3D object from the geometry and the material

		scene = new THREE.Fog(0x55AAFF);
		scene = new THREE.Scene();

//maybe here
var loader = new THREE.GLTFLoader();
loader.load('sean.glb', function(gltf) {
    var sean = gltf.scene;
    sean.traverse((object) => {
      if (!object.isMesh) return;
      object.material.wireframe = true;
    });
    scene.add(sean);
});

scene.add( hemiLight );
scene.add( dirLight );

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( sceneWidth, sceneHeight );
		maxX = sceneWidth/2;
		maxY = sceneHeight/2;
		maxZ = maxX/2;

		document.getElementById("main").appendChild( renderer.domElement );

		/* Move the objects away from each other */

		// Render finally
		renderer.render( scene, camera );
}

function animate()
{
		// Calls its function argument when the browser page is available to be refreshed
		requestAnimationFrame( animate );

		// make some changes to the object so that it appears in motion

		renderer.render( scene, camera );
}

function rotate (m)
{
		m.rotation.x += 0.01;
		m.rotation.y += 0.02;
		m.rotation.z += 0.03;
}
