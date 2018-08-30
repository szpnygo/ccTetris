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
        hasY:3,
        color:0,
        title:cc.Label,
        mTitleKey:"",
    },

    onLoad () {
        this.mTitleKey = Global.gameObj.getTitle()
        this.title.string = this.mTitleKey
        Global.gameObj.showNextTitle()
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
            this.tx = Global.gameObj.tetryHeight - Math.round(Math.abs((this.node.y - Global.gameObj.border.y)/this.node.height)) - 1

            Global.gameObj.lArray[this.tx][this.ty] = this
            if(this.tx != 0){
                this.node.x = (this.ty - 3) * this.node.width
                this.node.y =  Global.gameObj.border.y + (Global.gameObj.tetryHeight - 1 -this.tx) * this.node.height;
                this.getAroundTetry()
                Global.gameObj.tetryStop();
            }else{
                // cc.director.loadScene('welcome');
            }
        }
    },

    checkAround(otx,oty){
        let that = this
        let tetryNode = Global.gameObj.lArray[otx][oty]

        if(tetryNode == null){
            return false
        }
        let tetry = tetryNode.getComponent('Tetry')

        let key1 = tetry.mTitleKey+this.mTitleKey
        let key2 = this.mTitleKey + tetry.mTitleKey

        let useKey = null
        if(Global.dictory[key1] == undefined){
            if(Global.dictory[key2] != undefined){
                useKey = key2
            }
        }else{
            useKey = key1
        }
        if(useKey){
            console.log(useKey + "=>" + Global.dictory[useKey])
            var moveFinsih = cc.callFunc(function(target){

                tetryNode.title.string = Global.dictory[useKey]
                tetryNode.mTitleKey = Global.dictory[useKey]

                Global.gameObj.lArray[that.tx][that.ty] = null
                that.node.destroy()
                tetry.getAroundTetry()
            })

            //颜色一样，进行合并
            let seq = cc.sequence(cc.moveTo(0.2, cc.v2(tetryNode.node.x, tetryNode.node.y)), moveFinsih);
            this.node.runAction(seq)
            Global.gameObj.addPoint()
            Global.gameObj.checkResult(Global.dictory[useKey])
            return true
        }

        return false
    },

    getAroundTetry(){
        //bottom
        if(this.tx != Global.gameObj.tetryHeight - 1){
            if(this.checkAround(this.tx + 1,this.ty)){
                return 
            }
        }
        //left
        if(this.ty != 0){
            if(this.checkAround(this.tx,this.ty - 1)){
                return 
            }
        }
        //right
        if(this.ty != 6){
            if(this.checkAround(this.tx,this.ty + 1)){
                return 
            }
        }
        Global.gameObj.checkResult(this.mTitleKey)
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
