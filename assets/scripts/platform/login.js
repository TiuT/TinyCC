var c = require('../common/config');
var r = require('../manager/request');

var ui = require("../manager/ui");
var userdata = require("../data/userdata");

var Login = {
    login : function(callback){
        console.log("login");
        ui.showLoading();
        if (CC_WECHATGAME)
        {
            wx.login({
                success : (res) =>{                                        
                    var p = {Code : res.code}
                    r.request(c.gameSvrUrl.normal, p, (res) => {
                        var data = JSON.parse(res);
                        if (data.Result == 0)
                        {
                            userdata.openid = data.Openid;
                            userdata.canPay = data.IsShow;
                            ui.hideLoading();
                            callback();
                        }                
                    })
                }
            });
        }
        else if (CC_QQPLAY)
        {
            var code = GameStatusInfo.openId;
            BK.Script.log(0, 0, "openid:" + code);
            BK.MQQ.Account.getNick(code, function(openid, nick){
                userdata.nickname = nick;
            })
            BK.MQQ.Account.getHeadEx(code, function (openId, imgPath) {
                //openId为图片对应openid
                //imgPath为头像保存至本地的路径
                userdata.icon = imgPath;            
            });

            BK.QQ.fetchOpenKey(function (errCode, cmd, data) {
                console.log("fetch open key:" + errCode)
                if (errCode == 0) {
                    var openKey = data.openKey;
                    console.log("openkey:" + openKey);
                    var p = {QQLogin : code + '|' + openKey}
                    r.request(c.gameSvrUrl.normal, p, (res) => {
                        console.log(res);
                        var data = JSON.parse(res);
                        console.log(data.Result + "  " + typeof data.Result);
                        if (parseInt(data.Result) === 0)
                        {            
                            userdata.openid = data.Openid;
                            userdata.canPay = data.IsShow; 
                            callback();
                            console.log("get openid success");
                        }
                        else
                        {
                            ui.showFloatTip("登录失败，请重试");   
                            ui.hideLoading();     
                        }                
                    })
                }
                else
                {
                    // callback();
                    ui.showFloatTip("登录失败，请重试");
                    ui.hideLoading();
                }
            });
        }
        else
        {
            setTimeout(function(){
                callback();
                ui.hideLoading();
            }, 1000)
        }
    }
}

module.exports = Login;