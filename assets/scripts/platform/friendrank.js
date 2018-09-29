//好友排行榜数据
//微信需要子域,QQ不需要- -
var friendrank = {
    upload : function(obj) {
        if (CC_WECHATGAME)
        {
            wx.postMessage({
                message : 'Record',
                level : obj.level
            });
        }  
        else if (CC_QQPLAY)
        {
            console.log('upload:' + obj.level);
            var data = {
                userData: [
                    {
                        openId: GameStatusInfo.openId,
                        startMs: ((new Date()).getTime()).toString(),    //必填。 游戏开始时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
                        endMs: ((new Date()).getTime()).toString(),  //必填。 游戏结束时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
                        scoreInfo: {
                            score: obj.level, //分数，类型必须是整型数
                        },
                    },
                ],
                attr: {
                    score: {   
                        type: 'rank',
                        order: 1,
                    }
                },
            }
            BK.QQ.uploadScoreWithoutRoom(1, data, function(errCode, cmd, data) {
                // 返回错误码信息
                if (errCode !== 0) {
                    BK.Script.log(1,1,'上传分数失败!错误码：' + errCode);
                }
                else
                {
                    console.log("上传分数成功");
                }
            });
        }
    },

    show : function(callback) {
        if (CC_WECHATGAME)
        {
            wx.postMessage({
                message : 'Show'                
            });
        } 
        else if (CC_QQPLAY)
        {
            console.log("friend rank refresh");
            var attr = "score";//使用哪一种上报数据做排行，可传入score，a1，a2等
            var order = 1;     //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
            var rankType = 0; //要查询的排行榜类型，0: 好友排行榜，1: 群排行榜，2: 讨论组排行榜，3: C2C二人转 (手Q 7.6.0以上支持)            
            BK.QQ.getRankListWithoutRoom(attr, order, rankType, function(errCode, cmd, data) {
                BK.Script.log(1,1,"getRankListWithoutRoom callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
                // 返回错误码信息
                if (errCode !== 0) {
                    BK.Script.log(1,1,'获取排行榜数据失败!错误码：' + errCode);
                    return;
                }
                // 解析数据
                if (callback)
                    callback(data);
                if (data) {
                    for(var i=0; i < data.data.ranking_list.length; ++i) {
                        var rd = data.data.ranking_list[i];
                        // rd 的字段如下:
                        //var rd = {
                        //    url: '',            // 头像的 url
                        //    nick: '',           // 昵称
                        //    score: 1,           // 分数
                        //    selfFlag: false,    // 是否是自己
                        //};
                    }
                }
            })
        }
    },

    hide : function() {
        if (CC_WECHATGAME)
        {
            wx.postMessage({
                message : 'Hide'                
            });
        } 
    },
}
module.exports = friendrank;