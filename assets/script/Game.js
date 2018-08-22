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
        tetryPrefab: cc.Prefab,
        currentTetry: {
            type: cc.Prefab,
            default: null
        },
        lArray:Array,
        initY:0,
        border: cc.Node,
        baseLineY:0,
        mainView: cc.Node,

        tetryHeight:8,

        pointLabel: cc.Label,
        point:0,
    },

    onLoad () {
        this.tetryHeight = Math.floor(this.mainView.height/64)-2

        this.initLocationArray()
        console.log(this.lArray)
        Global.gameObj = this.node.getComponent('Game')

        this.baseLineY = this.border.y
        this.initY = this.baseLineY + this.tetryHeight * 64 + 96

        cc.director.getCollisionManager().enabled = true;

        this.setInputControl()
        this.createNewTetry()

        this.pointLabel.string = this.point
    },

    addPoint(){
        this.point += 1
        this.pointLabel.string = this.point
    },

    initLocationArray(){
        this.lArray = new Array(this.tetryHeight)
        for(var i =0; i< this.tetryHeight;i++){
            this.lArray[i] = new Array(7)
            for(var j=0; j<7;j++){
                this.lArray[i][j] = null
            }
        }
    },

    start () {

    },

    update (dt) {

    },

    tetryStop(){
        this.createNewTetry()
    },

    createNewTetry(){
        let tetry = cc.instantiate(this.tetryPrefab)
        tetry.x = 0
        tetry.y = this.initY
        tetry.parent = this.node
        this.currentTetry = tetry
    },


    setInputControl: function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this._mouseDown, this);
    },

    _mouseDown: function(event){
        
        if(event.getLocationX() < this.node.width/2){
            tetyr.doLeft()
        }else{
            tetyr.doRight()
        }
    },

    clickLeft: function(){
        let tetry = this.currentTetry.getComponent('Tetry')
        tetry.doLeft()
    },

    clickRight: function(){
        let tetry = this.currentTetry.getComponent('Tetry')
        tetry.doRight()
    }
});
