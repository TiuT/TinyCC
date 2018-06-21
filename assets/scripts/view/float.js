cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("float onLoad");
    },

    start () {       
        console.log("float start");
    },

    onShow(parms)
    {
        console.log("float show");
        this.node.stopAllActions();
        this.node.getChildByName("text").getComponent(cc.Label).string = parms.content;
        this.node.setPosition(0,0);
        var self = this;
        var callback = cc.callFunc(function (){
            self.node.active = false;
        })
        var seq = cc.sequence(
            cc.moveBy(parms.during, 0, 200),
            callback
        )
        this.node.runAction(seq);
    },

    update (dt) {
      
    },
});
