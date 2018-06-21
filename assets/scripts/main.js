// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var g = require("./common/global");
var c = require("./common/config");


cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        var self =  this;

        //微信的那些启动参数可以在这里获取

        g.load(function(){
            self.uiInited();
        });        
    },

    start () {
    },

    update (dt) {
        g.update(dt);
    },

    //UI初始化结束
    uiInited(){
        console.log("uiinited");
        g.showUI("start");            
    }
});

