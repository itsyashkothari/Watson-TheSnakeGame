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
var camRadius =200;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.set( 0 , 100,camRadius );
camera.lookAt(new THREE.Vector3(0, 0, 0));
var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.autoClear = false;
renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.setClearColor( 0x000000, 1);
scene.background = new THREE.Color(0,0,0);
document.body.appendChild( renderer.domElement );
var geometry1 = new THREE.CubeGeometry(200, 200, 200);
var material1 = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});
var light = new THREE.PointLight( 0xff0000, 10 );
light.position.set( 0,100, 0 );
scene.add( light );
var light2 = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light2 );
mesh = new THREE.Mesh(geometry1, material1);
scene.add(mesh);
// Keyboard controls
var keyboard = new THREEx.KeyboardState();
function createWall()
{
    var geometryWall = new THREE.BoxGeometry( 10, 220, 50 );
    var materialWall = new THREE.MeshBasicMaterial( {color: 0x00f0ff,opacity:0.6,transparent:true} );
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
//controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change', render ); // remove when using animation loop
// enable animation loop when using damping or autorotation
//controls.enableDamping = true;
//controls.dampingFactor = 0.25;
//controls.enableZoom = false;
createWall();
var size = 200;
var divisions = 20;
function createGrid(scene){
    var grid = new THREE.GridHelper( size, divisions, 0x1711b2,0x234876 );
    grid.position.set(0,0,0);
    scene.add( grid );
}
var snake = new Snake(scene,1000);

createGrid(scene);
var axisHelper = new THREE.AxisHelper( 500 );
scene.add( axisHelper );
renderer.render(scene,camera);
/*
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
renderer.clearDepth(); // important! clear the depth buffer

*/
var cameraTheta = 0,incUnit=0.2;
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
    if(keyboard.pressed("q"))
        if(snake.direction != 6|| snake.direction != 6 )
        {   snake.direction = 5;change = true;}
    if(keyboard.pressed("e"))
        if(snake.direction != 5|| snake.direction != 6 )
            snake.direction =6;
    if(keyboard.pressed("right"))
        cameraTheta+=incUnit;
    if(keyboard.pressed("left"))
        cameraTheta-=incUnit;

    camera.position.x = camRadius*Math.sin(cameraTheta);

    camera.position.z = camRadius*Math.cos(cameraTheta);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

}
function gameOver(){
    clearInterval(animation);
    while(scene.children.length > 0){
        scene.remove(scene.children[0]);
    }
 //   scene.add()
}
function getEmptyBox() {

    var position ={x:10*Math.floor(Math.random()*18-9)+5,y:10*Math.floor(Math.random()*18-9)+5,z:10*Math.floor(Math.random()*18-9)+5};
    snake.body.forEach(function (part) {
        if(part.position === position)
            return getEmptyBox();
    });
    return position;
}
function Food(scene,id){
    this.position={x:0,y:0};
    this.id = id ;
    this.scene = scene;
    this.geometry = new THREE.SphereGeometry(5,32,32);
    this.material = new THREE.MeshLambertMaterial({color:0xe21212});
}
Food.prototype = {
    remove: function () {
        this.scene.remove(scene.getObjectByName(this.id));
    },
    add: function () {
        var temp = new THREE.Mesh(this.geometry,this.material);
        temp.name = this.id;
        this.position = getEmptyBox();
        temp.position.set(this.position.x,this.position.y,this.position.z);
        this.scene.add(temp);
        console.log("hello",this.position);
    }
}
function isFoodCollision() {
    if(snake.body[0].position === food.position)
    {
        food.remove();
        food.add();
        return true;
    }
    else
        return false;
}
var food = new Food(scene,"food");
food.add();
var t=0;
function render(){
        if(isFoodCollision())
            snake.add();
        if(snake.isSelfCrash())
            gameOver();
        keyboardInput();
        if(t%5 == 0)
            if(!snake.move())
            gameOver();
	    renderer.render( scene, camera );
	    t++;
}
snake.init();
var fps = 30;
var animation = setInterval( render, 1000/fps  );


