var textmesh;
var maxX, maxY, maxZ;
var first=true;

window.onload = function()
{
    init();
    //animate();
};

function init()
{
//init
		var scene = new THREE.Scene();
    var sceneWidth = window.innerWidth/2;
    var sceneHeight = window.innerHeight/2 + 100;
		var loader = new THREE.GLTFLoader();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

//loader
		loader.load( 'sean.gltf', function ( gltf ) {
			scene.add( gltf.scene );
			}, undefined, function ( error ) {
				console.error( error );
			} );
}
//
