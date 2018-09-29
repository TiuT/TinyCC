var event = require("../manager/event");
var launch = require("../platform/launch");

var gcb;
var cancelListen = function()
{
    ad.cancelListen();
}
var callexe = false;

const WX_VDIEO_ADUNITID = 'adunit-94a3b78d77e3a539';

var ad = {
    banner : null,
    bannerID : null,    
    bannerDuring : 0,
    
    videoad : null,
    videoLoaded : null,
    videoCB : null,
    videoduring : null,

    load : function(){
        if (CC_WECHATGAME)
        {
            //视频广告
            this.videoad = wx.createRewardedVideoAd({
                adUnitId: WX_VDIEO_ADUNITID,
            })
        
            this.videoad.load().then(
                () => {
                    //console.log("成功加载激励视频");                                    
                }
            ).catch(err => {
                console.log("首次拉取广告失败");
            });
            this.videoduring = 0;
            this.videoLoaded = false;
            var self = this;
            this.videoad.onLoad(function (){
                console.log("成功加载激励视频");   
                self.videoLoaded = true;
            });
            this.videoad.onError(function() {
                self.videoLoaded = false;
            });
        }
        else if (CC_QQPLAY)
        {

            //banner广告
            var self = this;
            BK.Advertisement.fetchBannerAd(function (retCode, msg, adBannerHandle) {
                if (retCode == 0) {
                    this.banner = adBannerHandle;
                    //2.开发者 使用adBannerHanlde 

                    //2.1 决定是否展示
                    //this.showBannerAd();
                    
                    //2.3 开发者监听事件
                    adBannerHandle.onClickContent(function () {
                        //用户点击了落地页
                    });
                    adBannerHandle.onClickClose(function () {
                        //用户点击了X关闭广告
                    });
                }
                else {
                    BK.Script.log(1, 1, "fetchBannerAd failed. retCode:" + retCode);
                }
            }.bind(this));
        }
    },

    update : function(dt)
    {
        this.videoduring += dt;
        if (CC_WECHATGAME)
        {
            if (!this.videoLoaded && this.videoduring > 10)
            {
                console.log("检测视频");
                var self = this;
                this.videoad.load().then(
                    () => {
                        self.videoLoaded = true;
                        event.emit("videoAdLoaded");
                        console.log("成功加载激励视频 update");                                    
                    }
                ).catch(err => {
                    console.log("拉取广告失败");
                });
                this.videoduring = 0;
            }
            if (this.banner != null)
            {
                this.bannerDuring += dt;
                if (this.bannerDuring > 15)
                {
                    this.showBannerAd(this.bannerID);
                    this.bannerDuring = 0;
                }
            }
        }        
        else if (CC_QQPLAY)
        {

        }
    },

    isVideoLoaded : function()
    {
        return this.videoLoaded;
    },
    
    cancelListen : function()
    {
        this.videoad.offClose(this.videoCallback);
    },
    
    videoCallback : function(status)
    {
        if (status && status.isEnded || status == undefined)
        {
            // this.videoCB();        
            if (!callexe)
            {
                console.log("exe callback");
                gcb();
                callexe = true;
            }            
        }
        cancelListen();
        // this.cancelListen();
    },
    
    showVideoAd : function(callback, adtype)
    {
        console.log("showVideoAd");
        this.hideBannerAd();
        callexe = false;
        if (CC_WECHATGAME)
        {
            var self = this;
            if (!this.videoLoaded)
            {
                this.videoad.load().then(
                    () => {
                        self.videoLoaded = true;
                        event.emit("videoAdLoaded");
                        console.log("成功加载激励视频 update");                                    
                    }
                ).catch(err => {
                    console.log("拉取广告失败");
                });
                wx.showModal({
                    title : "提示",
                    content : "加载视频失败,请稍后重试",
                    showCancel : false,
                    cancelText : "",
                    confirmText : "确定",
                    success : (res) => {
                        // videoad.load();
                    }
                })
                return;
            }                    
            gcb = callback;
            this.videoad.show();
            this.videoad.onClose(this.videoCallback);
        }
        else if (CC_QQPLAY)
        {
            //1.拉取广告
            var videoType = 0; //激励视频广告场景 0.游戏页面挂件广告 1.游戏结算页广告 2.游戏任务广告  3.游戏复活广告 
            var status = 0; //0没达到时长要求，1，达到

            var vHandle = undefined;
            BK.Advertisement.fetchVideoAd(adtype,function(retCode,msg,handle){
                    //retCode 返回错误码 
                    //msg       返回信息 
                    //handle  广告句柄 

                    //返回码0表示成功 
                if (retCode == 0) {
                    vHandle = handle;
                        //2.监听事件 
                        vHandle.setEventCallack(
                        function(code,msg){ //关闭游戏（不再使用不需要监听）
                            BK.Script.log(1,1,"closeGame"); 
                        }.bind(this),
                        function(code,msg){  //达到看广告时长要求，可以下发奖励                             
                            status = 1;
                            BK.Script.log(1,1,"1endVide code:"+code+" msg:"+msg);
                        }.bind(this),
                        function(code,msg){ //关闭视频webview 
                            BK.Script.log(1,1,"2endVide code:"+code+" msg:"+msg);
                            if (status === 1)
                                callback();
                        }.bind(this),
                        function(code,msg){ //开始播放视频 
                            BK.Script.log(1,1,"3endVide code:"+code+" msg:"+msg);
                        }.bind(this));
                //3.跳转至播放界面 
                        vHandle.jump();
                }else{
                    BK.Script.log(1,1,"error:"+retCode+" msg:"+msg); //拉取视频广告失败
                }
                }.bind(this))
        }
    },
    
    showBannerAd : function(id)
    {
        console.log("showBannerAd")
        if (CC_WECHATGAME)
        {
            if (this.banner != null)
            this.banner.destroy();
            var sw = launch.system.screenWidth;
            var sh = launch.system.screenHeight;
            var adw = Math.min(sw, 720);
            if (sw / sh > 0.5625) //肥的,如ipad
                adw = sw * 0.7;
            var adh = adw / 3;
            var x = (sw - adw) / 2;       
            var y = sh - adh; 
            this.banner = wx.createBannerAd({
                adUnitId: id,
                style: {
                    left: x,
                    top: y,
                    width: adw,
                    height: adh
                }
            });
            if (this.banner != null)  
            {
                this.bannerID = id;
                this.banner.show();
                this.bottomDuring = 0;
            }
        }
        else if (CC_QQPLAY)
        {
            if (this.banner != null)
            {
                this.banner.show(function (succCode, msg, handle) {
                    if (succCode == 0) {
                        //
                    }
                    else {
                        BK.Script.log(1, 1, "展示失败 msg:" + msg);
                    }
                });
            }
        }
    },
    
    hideBannerAd : function()
    {
        {
            return;
        }
        console.log("hideBannerAd")
        if (this.banner != null)
        {
            if (CC_WECHATGAME)
            {
                this.banner.destroy();
                this.banner = null;
            }
            else if (CC_QQPLAY)
            {
                this.banner.close();
            }
        }
    }
}

module.exports = ad;