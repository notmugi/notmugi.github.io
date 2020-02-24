var parentDiv, camera, scene, renderer, group, mesh;
const fontJson = require( "./fonts/gentilis_bold.typeface.json" );
const font = new THREE.Font( fontJson );
// rotation along x direction controls y-rotation
var targetRotationY = 0;
var targetRotationYOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;

// rotation along y direction controls x-rotation
var targetRotationX = 0;
var targetRotationXOnMouseDown = 0;
var mouseY = 0;
var mouseYOnMouseDown = 0;

// Capture screen parameters
var WIDTH = window.innerWidth * 0.4;
var HEIGHT = window.innerHeight * 0.6;

init();
animate();

function init()
{
		// Add camera to the DIV main
		parentDiv = document.getElementById( 'main' );
		camera = new THREE.PerspectiveCamera( 50, WIDTH / HEIGHT, 1, 1000 );
		camera.position.set( 0, 0, 500 );

		scene = new THREE.Scene();

		// Note: The font name must be lowercase even if the file which contains it has uppercase name.
		var textOptions = { size: 40, height: 10, curveSegments: 5, font: fontJson };
		var textGeom = new THREE.TextGeometry( "Hello World", textOptions);

		var material = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: true } );
		mesh = new THREE.Mesh( textGeom, material );

		// Calculate the text dimensions so that we can position it correctly
		textGeom.computeBoundingBox();
		var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
		mesh.position.set(-0.5 * textWidth, 0, 0);

		group = new THREE.Object3D();
		group.add( mesh );

		scene.add( group );

		renderer = new THREE.CanvasRenderer();
		renderer.setSize( WIDTH, HEIGHT );

		parentDiv.appendChild( renderer.domElement );

		parentDiv.addEventListener( 'mousedown', onDocumentMouseDown, false );
		parentDiv.addEventListener( 'touchstart', onDocumentTouchStart, false );
		parentDiv.addEventListener( 'touchmove', onDocumentTouchMove, false );
		window.addEventListener  ( 'resize', onWindowResize, false );
}

function onWindowResize()
{
		WIDTH = window.innerWidth * 0.4;
		HEIGHT = window.innerHeight * 0.6;
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
		renderer.setSize( WIDTH, HEIGHT );
}

function onDocumentMouseDown( event )
{
		event.preventDefault();

		parentDiv.addEventListener( 'mousemove', onDocumentMouseMove, false );
		parentDiv.addEventListener( 'mouseup', onDocumentMouseUp, false );
		parentDiv.addEventListener( 'mouseout', onDocumentMouseOut, false );

		mouseXOnMouseDown = event.clientX - WIDTH;
		targetRotationYOnMouseDown = targetRotationY;

		mouseYOnMouseDown = event.clientY - HEIGHT;
		targetRotationXOnMouseDown = targetRotationX;
}

function onDocumentMouseMove( event )
{
		mouseX = event.clientX - WIDTH;
		targetRotationY = targetRotationYOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

		mouseY = event.clientY - HEIGHT;
		targetRotationX = targetRotationXOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.02;
}

function onDocumentMouseUp( event )
{
		parentDiv.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		parentDiv.removeEventListener( 'mouseup', onDocumentMouseUp, false );
		parentDiv.removeEventListener( 'mouseout', onDocumentMouseOut, false );
 }

function onDocumentMouseOut( event )
{
		parentDiv.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		parentDiv.removeEventListener( 'mouseup', onDocumentMouseUp, false );
		parentDiv.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentTouchStart( event )
{
		if ( event.touches.length == 1 )
		{
				event.preventDefault();
				mouseXOnMouseDown = event.touches[ 0 ].pageX - WIDTH;
				targetRotationYOnMouseDown = targetRotationY;
		}
}

function onDocumentTouchMove( event )
{
		if ( event.touches.length == 1 )
		{
				event.preventDefault();
				mouseX = event.touches[ 0 ].pageX - WIDTH;
				targetRotationY = targetRotationYOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
		}
}

function animate()
{
		requestAnimationFrame( animate );
		render();
}

function render()
{
		mesh.material.visible = $("#visible")[0].checked;
		mesh.material.wireframe = $("#wireframe")[0].checked;
		mesh.material.transparent = $("#transparent")[0].checked;
		mesh.material.skinning = $("#skinning")[0].checked;
		mesh.material.opacity = $("#opacity")[0].value;

		scale = $("#scale")[0].value;
		mesh.scale.set(scale, scale, scale);

		//mesh.castShadow = true;

		group.rotation.x += ( targetRotationX - group.rotation.x ) * 0.02;
		group.rotation.y += ( targetRotationY - group.rotation.y ) * 0.02;
		renderer.render( scene, camera );
}
