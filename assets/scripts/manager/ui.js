var uitype = new Array(  //新加UI需要在这个数组里面添加
    {prefab: "start", order : 15, script:"start"},
    {prefab: "float", order : 50, script:"float"},
    {prefab: "msgbox", order : 50, script:"msgbox"},
)

var panelList = new Array();

var inited = false;

module.exports = {
    inited : inited,

    show : function(name, params)
    {
        if (panelList[name] != undefined)
        {            
            panelList[name].node.active = true;                
            if (panelList[name].script.onShow != undefined)
                panelList[name].script.onShow(params);
        }
    },

    hide : function(name, params)
    {
        if (panelList[name] != undefined)
        {
            if (panelList[name].node.active)
            {
                panelList[name].node.active = false;
                if (panelList[name].script.onHide != undefined)
                    panelList[name].script.onHide(params);
            }            
        }
    },

    isShow : function(name)
    {
        if (panelList[name] != undefined)
        {
            return panelList[name].node.active 
        }
    },

    load(callback){
        if (inited)
        {
            console.log("uimanager has been loaded");
            if (callback != undefined)
                callback();
            return;
        }
        console.log("uimanager load");
        var r = cc.find("Canvas");
        if (r.childrenCount > 0)
        {
            for (var i = 0; i < r.childrenCount; ++i)
            {
                r.children[i].destroy();
            }
        }        
        //ui管理
        var urls = new Array();
        var data = uitype;
        for(var i = 0; i < data.length-1; i++){
            for(var j = 0; j < data.length - 1 - i; j++){
                if(data[j].order > data[j+1].order){
                    var temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                }
            }        
        }
        for (var k in uitype)
        {
            urls[k] = "prefab/" + uitype[k].prefab;
        }
        cc.loader.loadResArray(urls, cc.Prefab, function(err, assets){
            if (err) {
                cc.error(err);
            }
            for (var i = 0; i < assets.length; ++i)
            {
                var name = assets[i].name;
                console.log("Load " + name + " successfully");
                var node = cc.instantiate(assets[i]);
                node.name = name;
                node.active = false;
                panelList[name] = {};
                panelList[name].node = node;
                cc.find("Canvas").addChild(node);
                panelList[name].script = node.addComponent(uitype[i].script)
                if (panelList[name].script == undefined)
                {
                    console.error(name + "add component " + uitype[i].script + " failure");
                }
                else
                {
                    if (typeof panelList[name].script.register == "function")                    
                        panelList[name].script.register();
                }
            }
            inited = true;             
            if (callback != undefined)
                callback();
        });        
    }
}