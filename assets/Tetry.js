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
        color:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initY = this.node.y
        this.color = Math.floor(Math.random() * 3);
        if(this.color == 0){
            this.node.color = new cc.color(255,0,0,255)
        }else if(this.color == 1){
            this.node.color = new cc.color(0,255,0,255)
        }else if(this.color == 2){
            this.node.color = new cc.color(0,0,255,255)
        }

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
                this.node.x = (this.ty - 3) * this.node.width
                this.node.y = Global.gameObj.baseLineY + (10-this.tx) * this.node.height - this.node.height/2;
                this.getAroundTetry()
                Global.gameObj.tetryStop();
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

    checkAround(tetryNode){
        let that = this
        if(tetryNode == null){
            return false
        }
        let tetry = tetryNode.getComponent('Tetry')
        console.log("around color" + tetry.color + " this color " + this.color)
        if(tetry.color == this.color){
            var moveFinsih = cc.callFunc(function(target){
                Global.gameObj.lArray[that.tx][that.ty] = null
            })

            //颜色一样，进行合并
            let seq = cc.sequence(cc.moveTo(0.2, cc.p(tetryNode.node.x, tetryNode.node.y)), moveFinsih);
            this.node.runAction(seq)
            return true
        }
        return false
    },

    getAroundTetry(){
        //bottom
        if(this.tx != 9){
            let tetry =  Global.gameObj.lArray[this.tx + 1][this.ty]
            if(tetry){
                console.log("bottom")
            }
            if(this.checkAround(tetry)){
                return 
            }
        }
        //left
        if(this.ty != 0){
            let tetry =  Global.gameObj.lArray[this.tx][this.ty - 1]
            if(tetry){
                console.log("left")
            }
            if(this.checkAround(tetry)){
                return 
            }
        }
        //right
        if(this.ty != 6){
            let tetry =  Global.gameObj.lArray[this.tx][this.ty + 1]
            if(tetry){
                console.log("right")
            }
            if(this.checkAround(tetry)){
                return 
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
