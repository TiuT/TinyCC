// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var g = require("../common/global");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.params = null;

        var btn = this.node.getChildByName("btn");
        btn.getChildByName("cancel").on('click', this.onCancel, this);
        btn.getChildByName("sure").on('click', this.onSure, this);
    },

    start () {

    },

    // update (dt) {},

    onShow(params)
    {
        if (params == undefined)
        {
            console.error("invaild params to msgbox!");           
            g.hideUI("msgbox") ;
            return;
        }
        this.params = params;
        this.node.getChildByName("text").getComponent(cc.Label).string = params.content;
        this.node.getChildByName("btn").getChildByName("cancel").active = this.params.cancel != undefined
    },

    onSure()
    {
        g.hideUI("msgbox");
        if (this.params.confirm != undefined)
        {
            var node = this.params.node == undefined ? this : this.params.node;
            this.params.confirm.call(node);
        }            
    },

    onCancel()
    {
        g.hideUI("msgbox");
        if (this.params.cancel != undefined)
        {
            var node = this.params.node == undefined ? this : this.params.node;
            this.params.cancel.call(node);
        }            
    }
});
