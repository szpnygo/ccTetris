// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        isShow:false,
        labelText:cc.Label,
        showText:"",
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    setDataText(text){
        this.showText = text
        if(text == "。"){
            this.isShow = true
            this.node.color = new cc.color(255,0,0,255)

        }
        this.labelText.string = text
    },

    checkText(text){
        if(this.isShow){
            return false
        }
        if(this.showText == text){
            this.isShow = true
            this.node.color = new cc.color(255,0,0,255)
        }
    }

});
