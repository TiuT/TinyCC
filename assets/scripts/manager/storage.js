var c = require('../common/config');
var userdata = require("../data/gamedata");

var fishData = null;

var Storage = {
    writeData(){
        var key = userdata.openid + '_pool';
        var data = JSON.stringify(fishData);
        cc.sys.localStorage.setItem(key, data);
    },

    setData(index, data)
    {
        {
            return;
        }
        fishData[index] = data
        this.writeData();
    },
    
    getFishData(){        
        var key = userdata.openid + '_pool';
        var pool = cc.sys.localStorage.getItem(key);
        if (pool === null || pool === "")
        {
            fishData = new Array();
            for (var i = 0; i < 12; ++i)
            {        
                fishData[i] = {i : 1, t : 0, p : 0};  //i = idle , t = type, p = pool
            }
        }
        else
        {
            fishData = JSON.parse(pool);   
        }              
        console.log(JSON.stringify(fishData));
        return fishData;
    },

    saveGold()
    {
        {
            return;
        }
        var key = userdata.openid + '_gold';        
        cc.sys.localStorage.setItem(key, userdata.gold);
    },

    getGold()
    {
        var key = userdata.openid + '_gold';        
        var gold = cc.sys.localStorage.getItem(key);
        if (gold === null || gold === "")
        {
            gold = userdata.gold;
        }
        return parseInt(gold);
    },

    saveBuyData()
    {
        {
            return;
        }
        var key = userdata.openid + '_buy';  
        var data = JSON.stringify(userdata.buytime);
        console.log("data:" + data);
        cc.sys.localStorage.setItem(key, data);
    },

    getBuyData(){
        var key = userdata.openid + '_buy';  
        var data = cc.sys.localStorage.getItem(key);
        if (data === null || data === "")
        {
            data = new Array(c.fishCount);
            for (var i = 0; i < c.fishCount; ++i)
            {
                data[i] = 0;
            }
        }
        else
        {
            data = JSON.parse(data);
        }
        console.log("buy:" + data);
        return data;
    },
};

module.exports = Storage;