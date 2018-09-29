var c = require("../common/config");
var r = require("../manager/request");
var userdata = require("../data/userdata");
var event = require("../manager/event");
var ui = require("../manager/ui");

var share = {
    sensitive : function (){
        var s = !(userdata.city == "广州" || userdata.city == "深圳") //&& g.version != null && g.version >= c.localVersion;
        return s;
    },

    toCheckUnique(shareTickets, callback)
    {
        wx.getShareInfo({
            shareTicket : shareTickets,
            success : (res) => {                            
                console.log(res);
                var p = {Only : userdata.openid + "|" + res.encryptedData + "|" + res.iv}
                r.request(c.gameSvrUrl.normal, p, (rres) => {
                    console.log(rres);
                    var d = JSON.parse(rres);
                    if (d.Result == 0)
                    {
                        if (callback)
                            callback(true);
                    }
                    else if (d.Result == 1)
                    {
                        event.emit("relogin");
                    }
                    else if (d.Result == 2)
                    {
                        // this.showFloatTip("已在3小时内分享过此群");
                        ui.showMessageBox({
                            content : "请勿频繁骚扰同一拨小伙伴!"
                        })
                        if (callback)
                            callback(false);
                    }
                    else if (d.Result == 3)
                    {
                        console.log("解密失败,但还是给了奖励");
                        if (callback)
                            callback(true);
                    }
                })                            
            }
        }) 
    },

    share(title, imgUrl, query, unique, callback){   
        query = query || "";
        console.log("query: "+ query);
        if (CC_WECHATGAME)
        {
            wx.shareAppMessage({
                title : title,
                imageUrl : imgUrl,
                query : query,
                success : (res) => {
                    var shareTickets = res.shareTickets
                    console.log("转发结果:"+shareTickets)
                    if(shareTickets==0 || typeof shareTickets=="undefined")
                    {
                        //this.showFloatTip("分享失败");
                        ui.showMessageBox({
                            content : "分享到群才有效"
                        })
                    }
                    else
                    {
                        if (typeof callback == "undefined" || callback == null)
                        {
                            console.log('the callback is nil');
                            return;
                        }
                        if (!unique)
                        {
                            console.log('不需要判断群唯一');
                            if (callback)
                                callback(true);
                            return;
                        }
                        this.toCheckUnique(shareTickets, callback)                   
                    }
                },
                fail : (res) => {
                    if (callback)
                        callback(false);
                }
            })
        }
        else if(CC_QQPLAY)
        {
            console.log('qq share');
            // BK.QQ.shareToArk(0, title, imgUrl, true, query, function(errCode){
            //     if(errCode == 0){
            //         //分享成功
            //         BK.Script.log(1, 1, "分享成功");
            //     }else{
            //         //分享失败
            //         BK.Script.log(1, 1, "分享失败");
            //     }
            // });
            console.log("img:" + imgUrl);
            var shareInfo = {
                summary:title,          //QQ聊天消息标题
                picUrl:imgUrl,               //QQ聊天消息图片
                extendInfo:query,    //QQ聊天消息扩展字段                
                gameName:"狗粮大作战"          //游戏名，暂用与生成二维码
            };
            BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
                BK.Script.log(1, 1, "retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
                if (retCode == 0) {
                    if (shareDest == 0 /* QQ */) {
                        //聊天窗
                        BK.Script.log(1, 1, "成功分享至QQ");
                    }
                    else if (shareDest == 1 /* QZone */) {
                        //空间
                        BK.Script.log(1, 1, "成功分享至空间");
                    }
                    else if (shareDest == 2 /* WX */) {
                        //微信
                        BK.Script.log(1, 1, "成功分享至微信");
                    }
                    else if (shareDest == 3 /* WXCircle */) {
                        // 朋友圈
                        BK.Script.log(1, 1, "成功分享至朋友圈");
                    }
                    if (callback)
                        callback(true);
                }
                else if (retCode == 1) {
                    BK.Script.log(1, 1, "分享失败" + retCode);
                    if (callback)
                        callback(false);
                }
                else if (retCode == 2) {
                    BK.Script.log(1, 1, "分享失败，用户取消分享：" + retCode);
                    if (callback)
                        callback(false);
                }
            });
        }
    },
};

module.exports = share;