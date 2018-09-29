String.prototype.format = function(){
    if(arguments.length == 0) return this;  
    var param = arguments[0];  
    var s = this;  
    if(typeof(param) == 'object') {  
        for(var key in param)  
        s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);  
        return s;  
    } 
    else 
    {  
        for(var i = 0; i < arguments.length; i++)  
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]); 
        return s;  
    }
}

//cocoscreator拓展
cc.Node.prototype.findChild = function(path){
    var paths = path.split("/");
    var parent = this;
    var child = this;
    for (var i = 0; i < paths.length; ++i)
    {
        child = parent.getChildByName(paths[i]);
        parent = child;
    }
    return child;
}

var util = {
    //数组去重
    unique(array)
    {
       var result=new Array()
       for(var i=0;i<array.length;i++)
       {
           if(array.indexOf(array[i],i+1)===-1)
           {
               result.push(array[i])
           }
       }
       return result
    },

    //数组乱序
    unOrderSort(array)
    {
       array=array.sort(function(){
           return Math.random()>.5?-1:1
       })
       return array
    },

    //时间开关
    checkInTime()
    {
        var date = new Date();      
        if(date > 1532527200000)
            return true
        return false
    },

    //log
    log(str)
    {
        if(true)//上线的时候把这个关掉
            console.log(str)
    },
}

module.exports = util;

