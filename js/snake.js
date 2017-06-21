function Snake(scene,boxsize){
    this.body = [];
    this.length = 2;
    this.scene = scene;
    this.direction = 5 ;
    this.geometry = new THREE.BoxGeometry(10,10,10);
    this.material = new THREE.MeshLambertMaterial();
    this.material.color = new THREE.Color(0,0,255)
    this.boxsize = boxsize;
}
Snake.prototype = {
    init: function () {
        var x = 10 * Math.floor(Math.random() * 18 - 9);
        var y = -10 * Math.floor(Math.random() * 6);
        var z = 10 * Math.floor(Math.random() * 18 - 9);

        for (var i = 0; i < 15; i++) {
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
        if(this.isWallImpact())
            return false;
        else
            return true;
    },
    isWallImpact: function(){
        console.log(this.body[0].position);
        if(this.body[0].position.x >= this.boxsize ||this.body[0].position.x <= -this.boxsize )
            return true;
        if(this.body[0].position.y >= this.boxsize ||this.body[0].position.y <= -this.boxsize )
            return true;
        if(this.body[0].position.z >= this.boxsize ||this.body[0].position.z <= -this.boxsize )
            return true;
        return false;
    },
    add: function () {
        var temp = new THREE.Mesh(this.geometry, this.material);
        var last = this.body[this.body.length-1];
        temp.position.set(last.position);
        this.body.push(temp);
        this.scene.add(temp);
    },
    isSelfCrash: function () {
        var count = 0;
        var head = this.body[0];
        this.body.forEach(function (part) {
          if(part.position == head.position)
              count++;
        });
        console.log(count);
        if(count>1)
            return true;
        else
            return false;
    }
}



