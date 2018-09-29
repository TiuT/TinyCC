var app = require("./app");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        var self =  this;
        app.init(function(){
            self.uiInited();
        })
    },

    start () {
    },

    update (dt) {
        app.update(dt);
    },

    //UI初始化结束
    uiInited(){
        console.log("uiinited");
        app.ui.show("start");            
    }
});

