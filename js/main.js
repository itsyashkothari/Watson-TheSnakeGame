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
camera.position.set( 0 , 0,200 );
camera.lookAt(new THREE.Vector3(0, 0, 0));
var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.autoClear = false;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 0);
document.body.appendChild( renderer.domElement );
var geometry1 = new THREE.CubeGeometry(200, 200, 200);
var material1 = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});

mesh = new THREE.Mesh(geometry1, material1);
scene.add(mesh);
// Keyboard controls
var keyboard = new THREEx.KeyboardState();
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
//OrbitControls
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render ); // remove when using animation loop
// enable animation loop when using damping or autorotation
//controls.enableDamping = true;
//controls.dampingFactor = 0.25;
controls.enableZoom = false;
createWall();
var size = 200;
var divisions = 20;
function createGrid(scene){
    var grid = new THREE.GridHelper( size, divisions, 0x000fff,0x234876 );
    grid.position.set(0,0,0);
    scene.add( grid );
}
var snake = new Snake(scene);

createGrid(scene);
var axisHelper = new THREE.AxisHelper( 500 );
scene.add( axisHelper );
renderer.render(scene,camera);
window.addEventListener( 'resize', onWindowResize, false );
renderer.clearDepth(); // important! clear the depth buffer
function keyboardInput() {
    var change =false;
    if(keyboard.pressed("w"))
        if(snake.direction != 3 || snake.direction != 1 )
        {  snake.direction = 1;change=true; }
    if(keyboard.pressed("d"))
        if(snake.direction != 4|| snake.direction != 2 )
        {   snake.direction = 2;change = true ;}
    if(keyboard.pressed("s"))
        if(snake.direction != 1|| snake.direction != 3 )
        {   snake.direction = 3;change = true;}
    if(keyboard.pressed("a"))
        if(snake.direction != 2|| snake.direction != 4 )
        {   snake.direction = 4;change = true;}
    if(keyboard.pressed("up"))
        if(snake.direction != 6|| snake.direction != 6 )
        {   snake.direction = 5;change = true;}
    if(keyboard.pressed("down"))
        if(snake.direction != 5|| snake.direction != 6 )
        {   snake.direction =6;change = true;}
   // return change;
}
function render(){

        keyboardInput();
        snake.move();
	    renderer.render( scene, camera );
}
snake.init();
var fps = 7;
setInterval( render, 1000/fps  );


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}