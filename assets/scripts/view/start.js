var g = require("../common/global");
var r = require("../manager/request");
var c = require("../common/config");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("start onLoad");
        
        var btn = this.node.getChildByName("btn");
        btn.getChildByName("start").on("click", this.OnStart, this);
        btn.getChildByName("rank").on("click", this.OnRank, this);
    },

    register(){
        g.on("logined", this.logined, this);
        g.on("cancel", function(){g.showFloatTip("cancel")}, this);
    },

    logined()
    {
        g.showFloatTip("接受到logined消息");
    },

    onShow(params)
    {
        console.log("start onshow");
        console.log(params);
        if (!this.logined)
            this.getUserData();
        this.showParams = params;
    },

    start () {
           
    },

    OnStart(){
        g.showMessageBox({
            content:"测试一下确认框",
            node: this,
            confirm : (res) => {g.emit("logined")},
            cancel : (res) => {g.emit("cancel")},
        })
    },

    OnRank(){
        g.showFloatTip("这是排行榜");
    },
});
