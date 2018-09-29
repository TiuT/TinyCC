// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var app = require("../app");

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
            app.ui.hide("msgbox") ;
            return;
        }
        this.params = params;
        this.btn = this.node.getChildByName("btn");
        this.node.getChildByName("text").getComponent(cc.RichText).string = params.content;        
        this.btn.getChildByName("cancel").active = this.params.cancel != undefined
        if (params.confirmText != undefined && params.confirmText != "")
        {
            this.btn.getChildByName("sure").getChildByName("label").getComponent(cc.Label).string = params.confirmText;
        }
        else
        {
            this.btn.getChildByName("sure").getChildByName("label").getComponent(cc.Label).string = "确定";
        }
        if (params.cancelText != undefined && params.cancelText != "")
        {
            this.btn.getChildByName("cancel").getChildByName("label").getComponent(cc.Label).string = params.cancelText;
        }
    },

    onSure()
    {
        app.ui.hide("msgbox");
        if (this.params.confirm != undefined)
        {
            var node = this.params.node == undefined ? this : this.params.node;
            this.params.confirm.call(node);
        }            
    },

    onCancel()
    {
        app.ui.hide("msgbox");
        if (this.params.cancel != undefined)
        {
            var node = this.params.node == undefined ? this : this.params.node;
            this.params.cancel.call(node);
        }            
    }
});
