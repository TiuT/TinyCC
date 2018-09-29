var r = require("../manager/request");
var c = require("../common/config");

var userdata = require("../data/userdata");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.lamp = this.node.getChildByName("mask");
        this.lampindex = 0;
        this.lamp.active = false;
        this.lampShowTime = 8;
        this.lampHideTime = 10;
        this.lampTime = this.lampHideTime;
        this.lampList = new Array();
        var p = {GetAwardMoneyList : 0}
        var self = this;
        r.request(c.gameSvrUrl.normal, p, (res) => {
            var data = JSON.parse(res);
            console.log(data);
            if (data.Result == 0)
            {
                self.lampList = data.AwardMoneyList;
            }
        })
    },

    start () {

    },

    update (dt) {
        this.lampTime -= dt;
        if (this.lampTime < 0)
        {
            if (this.lamp.active)
            {
                this.lamp.active = false;
                this.lampTime = this.lampHideTime;
            }
            else
            {
                if (this.lampList.length == 0)
                {
                    return;
                }
                this.lampindex++;
                this.lamp.active = true;
                this.lampTime = this.lampShowTime;
                var textNode = this.lamp.getChildByName("text");
                this.lampindex = this.lampindex >= this.lampList.length ? 0 : this.lampindex;
                if (userdata.openid == this.lampList[this.lampindex].OpenID)
                    this.lampindex++;
                this.lampindex = this.lampindex >= this.lampList.length ? 0 : this.lampindex;
                var data = this.lampList[this.lampindex];
                var rstr = "";                
                var name = data.Name;
                for (var i = 1; i < name.length; ++i)
                {
                    rstr += "*";
                }
                name = data.Name.substr(0, 1) + rstr;
                textNode.getComponent(cc.RichText).string = "<color=#00ff00>" + name +  "</c>提现了通关奖励" + data.Award + "元";
                textNode.position = cc.v2(500, 0);
                var action = cc.moveTo(this.lampShowTime, -500, 0);
                textNode.runAction(action);
            }
        }
    },

    onShow(params)
    {        
    },
});
