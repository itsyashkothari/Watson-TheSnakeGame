function Snake(scene){
    this.body = [];
    this.length = 2;
    this.scene = scene;
    this.direction = 5 ;
    this.geometry = new THREE.BoxGeometry(10,10,10);
    this.material = new THREE.MeshLambertMaterial( { color: 0x00ff25 } );
}
Snake.prototype = {
    init: function () {
        var x = 10 * Math.floor(Math.random() * 18 - 9);
        var y = -10 * Math.floor(Math.random() * 6);
        var z = 10 * Math.floor(Math.random() * 18 - 9);

        for (var i = 0; i < 2; i++) {
            var temp = new THREE.Mesh(this.geometry, this.material);
            temp.position.set(x + 5,  y+5, z+5);
            y -= 10;
            this.body.push(temp);
        }
        this.body.forEach(function (part) {
            this.scene.add(part);
        })
    },
    move: function () {
        var temp = this.body.pop();
        var firstpos = this.body[0].position;
        switch (this.direction) {
            case 1 :
                temp.position.x = firstpos.x;
                temp.position.y = firstpos.y;
                temp.position.z = firstpos.z - 10;
                break;
            case 2 :
                temp.position.x = firstpos.x + 10;
                temp.position.y = firstpos.y;
                temp.position.z = firstpos.z;
                break;
            case 3 :
                temp.position.x = firstpos.x;
                temp.position.y = firstpos.y;
                temp.position.z = firstpos.z + 10;
                break;
            case 4 :
                temp.position.x = firstpos.x - 10;
                temp.position.y = firstpos.y;
                temp.position.z = firstpos.z;
                break;
            case 5 :
                temp.position.x = firstpos.x;
                temp.position.y = firstpos.y + 10;
                temp.position.z = firstpos.z;
                break;
            case 6 :
                temp.position.x = firstpos.x;
                temp.position.y = firstpos.y - 10;
                temp.position.z = firstpos.z;
                break;
        }
        this.body.unshift(temp);
    }
}



