function Snake(scene){
    this.body = [];
    this.length = 10;
    this.scene = scene;
    this.direction = 1;
    this.geometry = new THREE.BoxGeometry(10,2,10);
    this.material = new THREE.MeshLambertMaterial( { color: 0x00ff25 } );
}
Snake.prototype = {
    init : function(){
        var x = 10*Math.floor(Math.random()*18-9);
        var y = 10*Math.floor(Math.random()*16-8);
        for(var i=0;i<10;i++)
        {
            var temp = new THREE.Mesh(this.geometry,this.material);
            temp.position.set(x+5,1+y,5);
            y+=2;
            this.body.push(temp);
        }
    },
    move : function(){
        var temp = this.body.pop();
      switch (this.direction){
          case 1 : temp.position.y +=2;break;
          case 2 : temp.position.x +=2;break;
          case 3 : temp.position.y -=2;break;
          case 4 : temp.position.x -=2;break;
      }
      this.body.unshift(temp);
      render();
    },
    render : function(){
        this.body.forEach(function(part){
            this.scene.add(part);
        })
    },
    changeCorner: function () {
        var temp = [];
        for(var i=0;i<5;i++)
            temp[i] = this.body.shift();
        switch (this.direction){
            case 1 :var x = temp[2].position.x,y = temp[2].position.y-4;
                    for(var j =0;j<4;j++)
                    {
                        temp[i].rotation.z= Math.PI/2;
                        temp[i].position.set(x,y,5);
                        y+=2;
                    }
                    break;
            case 2 :temp.position.x +=2;break;
            case 3 : temp.position.y -=2;break;
            case 4 : temp.position.x -=2;break;
        }
        for(var j =4;j>=0;j--)
            this.body.unshift(temp[j]);
    }

}