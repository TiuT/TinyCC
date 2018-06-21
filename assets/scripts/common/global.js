var ui = require("../manager/ui");
var event = require("../manager/event");

//用户数据暂存此处,可考虑提出去
var userData = {
    openid : "",
    nickname : "",
    icon : "",
    gold : 0,
};

module.exports = {
    userData : userData,

    showUI : function(name, params)
    {
        ui.show(name, params);
    },

    hideUI : function(name, params)
    {
        ui.hide(name, params);        
    },

    isUIShow : function(name)
    {
        return ui.isShow(name);
    },

    showFloatTip(content, during)
    {
        if (during == undefined) during = 1;
        if (content == undefined) content ="";
        this.showUI("float", {
            during : during,
            content : content,
        })
    },

    showMessageBox(params)
    {
        var p = {};
        if (params == undefined)
        {
            console.error("invaild params to msgbox");            
            return;
        }
        if (params.content == undefined)
        {
            p.content = "null";
        }
        this.showUI("msgbox", params);
    },

    on(e, f, n)
    {
        event.on(e, f, n);
    },

    emit(e, d)
    {
        event.emit(e, d);
    },

    load(callback)
    {
        ui.load(callback);
    },

    update(dt)
    {
        event.update(dt);
    },
}