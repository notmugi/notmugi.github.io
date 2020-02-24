var camera;
var scene;
var renderer;
var textmesh;
var loader;
var maxX, maxY, maxZ;
var first=true;

window.onload = function()
{
    init();
    animate();
};

function init()
{
//init
    var sceneWidth = window.innerWidth/2;
    var sceneHeight = window.innerHeight/2 + 100;
		loader = new THREE.GLTFLoader();
		camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 1, 10000 );
		camera.position.z = 1000;

//loader
		loader.load( 'sean.gltf', function ( gltf ) {
			scene.add( gltf.scene );
			}, undefined, function ( error ) {
				console.error( error );
			} );

//
