//记录一些配置信息
var sysInfo = null;
function getSysInfo()
{
    console.log("getSysInfo");
    if (typeof wx != "undefined")
    {
        sysInfo = wx.getSystemInfoSync();    
    }    
}
getSysInfo();

module.exports = {
    sysInfo : sysInfo,

    sharePicture : new Array(
        "res/raw-assets/resources/image/share/1.jpg",
        "res/raw-assets/resources/image/share/2.jpg",
        "res/raw-assets/resources/image/share/3.jpg",        
    ),

    shareText : new Array(
    )
}