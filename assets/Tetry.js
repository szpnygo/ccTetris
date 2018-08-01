// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 2000,
        canMove:true,
        isOver:false,
        canLeftMove:true,
        canRightMove:true,
        tx:0,
        ty:3,
        initY:0,
        hasY:3,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initY = this.node.y
    },

    start () {

    },

    update (dt) {
        if(this.canMove){
            this.node.y -= this.moveSpeed * dt
        }
    },

    onCollisionEnter: function (other, self) {
        if(other.tag == 2){
            this.over()
        }
        //检测碰撞
        if(other.tag == 1){
            //说明是垂直的
            if(self.node.x == other.node.x){
                this.over()
            }else if(self.node.x > other.node.x){
                this.canLeftMove = false
            }else if(self.node.x < other.node.x){
                this.canRightMove = false
            }
        }
    },

    over(){
        this.canMove = false;
        if(!this.isOver){
            
            this.isOver = true;

            this.tx = Math.floor((this.initY - this.node.y)/this.node.height) - 1
            console.log(this.tx + "->" + this.ty)
            Global.gameObj.lArray[this.tx][this.ty] = this
            if(this.tx != 0){
                Global.gameObj.tetryStop();
                this.node.x = (this.ty - 3) * this.node.width
                this.node.y = Global.gameObj.baseLineY + (10-this.tx) * this.node.height - this.node.height/2;
            }else{
                console.log("game over");
                for(var i =9; i> 0;i--){
                    console.log(i + " line ========")
                    for(var j=0; j<7;j++){
                        if(Global.gameObj.lArray[i][j] != null){
                            console.log(j + " has")
                        }
                    }
                }
            }
        }
    },

    onCollisionExit: function (other, self) {
    },

    doLeft(){
        if(this.canMove && this.canLeftMove){
            this.node.x -= this.node.width
            this.canRightMove = true
            this.ty -= 1
            this.hasY -= 1
            if(this.hasY == 0){
                this.canLeftMove = false
            }
        }
    },

    doRight(){
        if(this.canMove && this.canRightMove){
            this.node.x += this.node.width
            this.canLeftMove = true
            this.ty += 1
            this.hasY += 1
            if(this.hasY == 6){
                this.canRightMove = false
            }
        }
    },

});
