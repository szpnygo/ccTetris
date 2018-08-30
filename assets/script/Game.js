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
var Queue = require('Queue');

cc.Class({
    extends: cc.Component,

    properties: {
        tetryPrefab: cc.Prefab,
        gameLabel: cc.Prefab,
        currentTetry: {
            type: cc.Prefab,
            default: null
        },
        lArray:Array,
        initY:0,
        border: cc.Node,
        baseLineY:0,

        tetryHeight:8,

        pointLabel: cc.Label,
        point:0,

        queue:null,

        nextLabel:cc.Label,
        nextTitle:"",

        textResult:null,

        textLayout:cc.Layout
    },

    onLoad () {
        this.tetryHeight = Math.floor((this.node.height - 300) / 64)
        console.log("tetryHeight:",this.tetryHeight)

        Global.keyDictory.sort(function() {
            return .5 - Math.random();
        })

        this.queue = new Queue(Global.keyDictory.length)
        if(this.queue.size() < Global.keyDictory.length){
            for(var i =0;i < Global.keyDictory.length;i++){
                this.queue.push(Global.keyDictory[i])
            }
        }

        this.nextTitle = this.queue.pop()

        this.initLocationArray()
        Global.gameObj = this.node.getComponent('Game')

        cc.director.getCollisionManager().enabled = true;

        this.setInputControl()
        this.createNewTetry()

        this.pointLabel.string = this.point

        //test

        // let tongji = []

        // let dictory = Global.dictory
        // for(let key in dictory){
        //     if(!tongji[key[0]]){
        //         tongji[key[0]] = 1
        //     }else{
        //         tongji[key[0]] += 1
        //     }
        //     if(!tongji[key[1]]){
        //         tongji[key[1]] = 1
        //     }else{
        //         tongji[key[1]] += 1
        //     }
        // }
        // var tongji2 = Object.keys(tongji).sort(
        //     function(a, b){
        //         return tongji[b] - tongji[a];
        //     }
        // );

        // //统计key中的字出现次数
        // for(let key in tongji2){
        //     console.log(tongji2[key]+"=>"+tongji[tongji2[key]])
        // }

        // console.log("=========")
        // console.log("=========")
        // console.log("=========")
        // console.log("=========")
        // console.log("=========")

        // let tongji3 = []

        // //统计值在key中的出现次数，就是二次利用的概率
        // for(let key in dictory){
        //     // console.log(dictory[key] + "==" + tongji[dictory[key]])
        //     if(tongji[dictory[key]]){
        //         tongji3[dictory[key]] = tongji[dictory[key]]
        //     }else{
        //         tongji3[dictory[key]] = 0
        //     }
        // }

        // var tongji4 = Object.keys(tongji3).sort(
        //     function(a, b){
        //         return tongji3[b] - tongji3[a];
        //     }
        // );

        // for(let key in tongji4){
        //     console.log(tongji4[key]+"=="+tongji3[tongji4[key]])
        // }


        // 当你能飞的时候就不要放弃飞。当你能梦的时候就不要放弃梦
        this.textResult = []

        let str = "当你能飞的时候就不要放弃飞。"
        for(let key in str){
            console.log(str[key])
            this.textResult[key] = this.createLabel(str[key])
        }
    },

    createLabel(text){
        let label = cc.instantiate(this.gameLabel)
        let component = label.getComponent('GameLabel')
        component.setDataText(text)

        label.parent = this.textLayout.node

        return component
    },

    checkResult(text){
        for(let key in this.textResult){
            console.log("check result " + text)
            let com = this.textResult[key]
            // .getComponent('GameLabel')
            if(com.checkText(text)){
                break
            }
        }
    },

    addPoint(){
        this.point += 1
        this.pointLabel.string = this.point
    },

    getTitle(){
        return this.nextTitle
    },

    showNextTitle(){
        this.nextTitle = this.queue.pop()
        this.nextLabel.string = this.nextTitle
        this.queue.push(Global.keyDictory[Math.floor(Math.random() * Global.keyDictory.length)])
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

    tetryStop(){
        this.createNewTetry()
    },

    createNewTetry(){
        let tetry = cc.instantiate(this.tetryPrefab)
        tetry.x = 0
        tetry.y = this.border.y + this.tetryHeight * 64 + 96
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
    },

});
