var c = require('../common/config');
var qs = require('querystring')

var event = require("../manager/event");

var Launch = {
    query : "",
    feedback : null,
    system : {},
    network : 0,

    init : function()
    {
        if (CC_WECHATGAME)
        {
            // wx.setPreferredFramesPerSecond(10);
            var res = wx.getLaunchOptionsSync();
            this.query = res.query;
            console.log("启动:" + this.query);

            wx.onShow((res) => {      
                console.log("wx.onShow");
                this.query = res.query;
                console.log(this.query);
                event.emit("wxshow");
            });

            //右上角分享
            wx.showShareMenu({
                withShareTicket : true,
            });    
            wx.updateShareMenu({
                withShareTicket: true
              })        
            
            wx.onShareAppMessage((shareTickets) =>{
                var content = c.shareContent("normal");
                return {
                    title : content.text,
                    imageUrl : content.img,
                };
            });

            //反馈按钮
            this.feedback = wx.createFeedbackButton({
                type: 'text',
                text: '意见反馈',
                style: {
                    left: 10,
                    top: 10,
                    width: 60,
                    height: 30,
                    lineHeight: 30,
                    backgroundColor: '#88888855',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 12,
                    borderRadius: 4
                }
            })

            //网络状态
            wx.getNetworkType({
                success: function(res) {
                // 返回网络类型, 有效值：
                // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                var networkType = res.networkType
                console.log("network:" + networkType);
                this.network = networkType != "none";
                }
            })
            wx.onNetworkStatusChange((res) => {            
                this.network = res.isConnected;
                if (!this.network)
                {
                    wx.showModal({
                        title : "提示",
                        content : "请确认网络是否连接",
                        showCancel : false,
                        cancelText : "",
                        confirmText : "确定",
                        success : (res) => {
                            if (res.confirm)
                            {                        
                                this.loginTime = 0;
                                self.getUserData();                        
                            }
                        }
                    });
                }          
            })
            this.system = wx.getSystemInfoSync();
        }
        else if (CC_QQPLAY)
        {
            BK.Script.logToConsole = 1;
            BK.Script.log(0, 0, "launch init");

            if (GameStatusInfo.gameParam != undefined && GameStatusInfo.gameParam != '')
            {
                this.query = qs.parse(GameStatusInfo.gameParam);
            }

            new BK.Game({                
                onShare : function(app) {//点击“分享游戏”后响应。（可选）
                    var index = Math.floor(Math.random() * 2);
                    let shareInfo = {
                        summary:"女子在厕所受困4个小时，原因竟是因为这条狗!",          //QQ聊天消息标题
                        picUrl:cc.url.raw(c.shareTexture[index]),               //QQ聊天消息图片
                        extendInfo:"",    //QQ聊天消息扩展字段                
                        gameName:"狗粮大作战"          //游戏名，暂用与生成二维码
                    }
                    return shareInfo;
                },

                onLoad : function(app){ //程序启动事件。游戏脚本加载完成后，进到此处
                    console.log("BK.GAME onload");
                },

                onMinmize : function(app){  //最小化事件，用户点击"收起游戏"
                    console.log("BK.GAME onMinmize");
                },

                onClose : function(app){  //游戏关闭事件。用户点击右上角"关闭"图标，关闭游戏
                    console.log("BK.GAME onClose");
                },

                onEnterbackground : function(app)  {//退后台事件。用户按home键将手Q退至后台。
                    console.log("BK.GAME onEnterbackground");
                },

                onEnterforeground : function(app) { //回到前台事件。手Q进程从后台回到前台。
                    console.log("BK.GAME onEnterforeground");
                },

                onShareComplete : function(app){//分享成功
                    console.log("BK.GAME onShareComplete");
                },

                onNetworkChange : function(app){ //网络状态
                    BK.Script.log(1, 1, "STATE :" + state);
                },

                //全局异常监听
                onException: function () {
                    BK.Script.log(1, 0, "msg = " + this.errorMessage() + ", stack = " + this.errorStacktrace());
                }
            })
        }
    }
}

module.exports = Launch;