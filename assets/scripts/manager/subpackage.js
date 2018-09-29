if (CC_WECHATGAME)
    var fs = wx.getFileSystemManager();

var urls = new Array(
    "fish/K1.png",
    "fish/K2.png",
    "fish/K3.png",
    "fish/K4.png",
    "fish/K5.png",
    "fish/K6.png",
    "fish/K7.png",
    "fish/K8.png",
    "fish/K9.png",
    "fish/K10.png",
    "fish/K11.png",
    "fish/K12.png",
    "fish/K13.png",
    "fish/K14.png",
    "fish/K15.png",
    "fish/K16.png",
    "fish/K17.png",
    "fish/K18.png",
    "fish/K19.png",
    "fish/K20.png",
    "fish/K21.png",
    "fish/K22.png",
    "fish/K23.png",
    "fish/K24.png",
    "fish/K25.png",
    "fish/K26.png",
    "fish/K27.png",
    "fish/K28.png",
    "fish/K29.png",
    "fish/K30.png",
    "fish/K31.png",
    "fish/K32.png",
    "fish/K33.png",
    "fish/K34.png",
    "fish/K35.png",
    "fish/K101.png",
)
var sharesUrl = new Array(
    "share/1.jpg",
    "share/2.jpg",
    "share/3.jpg",
    "share/4.jpg",
    "share/5.jpg",
    "share/6.jpg",
    "share/7.jpg",
    "share/8.jpg",
    "share/9.jpg",
    "share/10.jpg",
    "share/11.jpg",
)

var subpackage = {
    fishImg : new Array(),
    shareTexture : new Array(),
    fishLoaded : false,
    shareLoaded : false,

    setFishImg : function(url, i)
    {
        this.loadSprite(url, (sp) => {
            this.fishImg[i] = sp;
        })
    },

    load : function()
    {
        if (!CC_WECHATGAME)
        {
            return;
        }

        var self = this;
        wx.loadSubpackage({
            name: 'fish', // name 可以填 name 或者 root
            success: function(res) {
              // 分包加载成功后通过 success 回调
              console.log("fish 分包加载成功");
              for (var i = 0; i < urls.length; ++i)
                {
                    self.setFishImg(urls[i], i);
                }
                self.fishLoaded = true;
            },
            fail: function(res) {
              // 分包加载失败通过 fail 回调
            }
          })

          wx.loadSubpackage({
            name: 'share', // name 可以填 name 或者 root
            success: function(res) {
              // 分包加载成功后通过 success 回调
              console.log("share 分包加载成功");
              self.shareTexture = sharesUrl;
              self.shareLoaded = true;
            },
            fail: function(res) {
              // 分包加载失败通过 fail 回调
            }
          })
    },

    getFish(index)
    {
        return this.fishImg[index];
    },

    getShareImg(index)
    {
        return this.shareTexture[index];
    },

    loadSprite : function(url, callback)
    {
        let image = wx.createImage();
        image.src = url;
        image.onload = function () {
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            callback(new cc.SpriteFrame(texture));
        };        
    }
}

module.exports = subpackage;