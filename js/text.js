var camera;
var scene;
var renderer;
var loader = new THREE.GLTFLoader();
var maxX, maxY, maxZ;
var first=true;

window.onload = function()
{
		init();
		animate();
};

function init()
{

		var sceneWidth = window.innerWidth/2;
		var sceneHeight = window.innerHeight/2 + 100;
		// camera: vertical-field-of-view, aspect-ratio, near, far
		camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 1, 10000 );
		camera.position.z = 1000;

		// Define the geometry of the object

		// An object becomes visible only if its material-type is defined.
		material1 = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
		material2 = new THREE.MeshNormalMaterial( { color: 0xff0000, wireframe: false } );

		// Mesh actually creates the 3D object from the geometry and the material

		scene = new THREE.Fog(0x55AAFF);
		scene = new THREE.Scene();

		loader.load( 'path/to/model.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( sceneWidth, sceneHeight );
		maxX = sceneWidth/2;
		maxY = sceneHeight/2;
		maxZ = maxX/2;

		document.getElementById("main").appendChild( renderer.domElement );

		/* Move the objects away from each other */
		var x1=560, x2=-560;

		//mesh1.position.x = x2;
		//mesh1.position.y = x1;


		// Render finally
		renderer.render( scene, camera );
}

function animate()
{
		// Calls its function argument when the browser page is available to be refreshed
		requestAnimationFrame( animate );

		// make some changes to the object so that it appears in motion
		//rotate(mesh1);
		renderer.render( scene, camera );
}

function rotate (m)
{
		m.rotation.x += 0.01;
		m.rotation.y += 0.02;
		m.rotation.z += 0.03;
}
