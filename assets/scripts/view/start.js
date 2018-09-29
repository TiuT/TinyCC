var c = require("../common/config");

var app = require("../app");
var util = require("../common/util");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("start onLoad");
        
        var btn = this.node.getChildByName("btn");
        btn.getChildByName("start").on("click", this.onStart, this);        
    },

    register(){    
        app.event.on("cancel", function(){util.showFloatTip("cancel")}, this);
    },

    onlogined()
    {        
        app.ui.show("game");
        app.ui.hide("start");        
    },

    getQuakeAnim()
    {
        return cc.repeatForever(cc.sequence(
            cc.rotateBy(0.1, -10),
            cc.rotateBy(0.1, 20),
            cc.rotateBy(0.1, -20),
            cc.rotateBy(0.1, 20),
            cc.rotateBy(0.1, -10),
            cc.scaleTo(2, 1, 1)
        ))
    },

    onShow(params)
    {
        console.log("start onshow");
        // if (!this.logined)
        //     this.getUserData();        
    },

    onHide(params)
    {
        if (this.GameClubButton != undefined)
            this.GameClubButton.hide();
    },

    start () {
           
    },

    onStart(){
        var self = this;
        app.login(function(){
            self.onlogined();
        })        
    },
});
