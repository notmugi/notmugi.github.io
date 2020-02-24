var camera;
var scene;
var renderer;
var mesh1,;
var maxX, maxY, maxZ;
var first=true;

window.onload = function()
{
		init();
		animate();
};

function init()
{
		var loader = new THREE.GLTFLoader();
		var sceneWidth = window.innerWidth/2;
		var sceneHeight = window.innerHeight/2 + 100;
		// camera: vertical-field-of-view, aspect-ratio, near, far
		camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 1, 10000 );
		camera.position.z = 1000;

		// Define the geometry of the object
		geometry1 = new THREE.OctahedronGeometry( 200, 0 );
		geometry2 = new THREE.IcosahedronGeometry( 200, 0 );
		geometry3 = new THREE.PlaneGeometry( 200, 200, 10, 10 );
		geometry4 = new THREE.CylinderGeometry( 200, 300, 300, 32, 3, true );
		geometry5 = new THREE.TetrahedronGeometry( 200, 0 );
		geometry6 = new THREE.CubeGeometry( 200, 200, 200, 3, 3, 3 );
		geometry7 = new THREE.TorusGeometry( 200, 32, 8, 32 );
		geometry8 = new THREE.TorusKnotGeometry( 200, 32, 8, 16 , 1, 2);
		geometry9 = new THREE.SphereGeometry( 200, 32, 32 );

		// An object becomes visible only if its material-type is defined.
		material1 = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
		material2 = new THREE.MeshNormalMaterial( { color: 0xff0000, wireframe: false } );

		// Mesh actually creates the 3D object from the geometry and the material
		mesh1 = new THREE.Mesh( geometry1, material1 );
		mesh2 = new THREE.Mesh( geometry2, material1 );
		mesh3 = new THREE.Mesh( geometry3, material1 );
		mesh4 = new THREE.Mesh( geometry4, material1 );
		mesh5 = new THREE.Mesh( geometry5, material2 );
		mesh6 = new THREE.Mesh( geometry6, material2 );
		mesh7 = new THREE.Mesh( geometry7, material1 );
		mesh8 = new THREE.Mesh( geometry8, material1 );
		mesh9 = new THREE.Mesh( geometry9, material1 );

		scene = new THREE.Fog(0x55AAFF);
		scene = new THREE.Scene();

		loader.load( 'sean.gltf', function ( gltf ) {
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

		mesh1.position.x = x2;
		mesh1.position.y = x1;

		mesh2.position.x = 0;
		mesh2.position.y = x1;

		mesh3.position.x = x1;
		mesh3.position.y = x1;

		mesh4.position.x = x2;
		mesh4.position.y = 0;

		mesh5.position.x = 0;
		mesh5.position.y = 0;

		mesh6.position.x = x1;
		mesh6.position.y = 0;

		mesh7.position.x = x2;
		mesh7.position.y = x2;

		mesh8.position.x = 0;
		mesh8.position.y = x2;

		mesh9.position.x = x1;
		mesh9.position.y = x2;

		// Render finally
		renderer.render( scene, camera );
}

function animate()
{
		// Calls its function argument when the browser page is available to be refreshed
		requestAnimationFrame( animate );

		// make some changes to the object so that it appears in motion
		rotate(mesh1);
		rotate(mesh2);
		rotate(mesh3);
		rotate(mesh4);
		rotate(mesh5);
		rotate(mesh6);
		rotate(mesh7);
		rotate(mesh8);
		rotate(mesh9);

		renderer.render( scene, camera );
}

function rotate (m)
{
		m.rotation.x += 0.01;
		m.rotation.y += 0.02;
		m.rotation.z += 0.03;
}
