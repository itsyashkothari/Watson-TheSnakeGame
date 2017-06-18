/*
// Check WebGL Compatibility


if (Detector.webgl) {
    init();
    animate();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
*/

// Basic Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.set( 0 , -100,50 );
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 0);
document.body.appendChild( renderer.domElement );

function createWall()
{
    var geometryWall = new THREE.BoxGeometry( 10, 220, 50 );
    var materialWall = new THREE.MeshBasicMaterial( {color: 0x00f220,opacity:0.6,transparent:true} );
    var cube1 = new THREE.Mesh( geometryWall, materialWall );
    var cube2 = new THREE.Mesh( geometryWall, materialWall );
    var cube3 = new THREE.Mesh( geometryWall, materialWall );
    var cube4 = new THREE.Mesh( geometryWall, materialWall );
    cube1.position.set(105,0,25);
    cube2.position.set(-105,0,25);
    cube3.rotation.z = Math.PI /2;
    cube3.position.set(0,105,25);
    cube4.rotation.z = Math.PI /2;
    cube4.position.set(0,-105,25);
    scene.add( cube1 );
    scene.add( cube2 );
    scene.add( cube3 );
    scene.add( cube4 );
}

createWall();
var size = 200;
var divisions = 20;
function createGrid(scene){
    var grid = new THREE.GridHelper( size, divisions, 0x000fff,0x234876 );
    grid.position.set(0,0,0);
    grid.rotation.x=Math.PI/2 ;

    scene.add( grid );
}
createGrid(scene);
//var axisHelper = new THREE.AxisHelper( 500 );
//scene.add( axisHelper );
renderer.render(scene, camera);
function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
var snake = new Snake(scene);
snake.init();
snake.render();
setInterval(function(){
    var k = 10 ;
    while(k--)
        snake.move();

},100);
render();
