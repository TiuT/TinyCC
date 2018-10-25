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

//返回一个string 保存number位小数
Number.prototype.toUnit = function(number){
    var units = [
        {size : 1e3, unit: 'K'}, 
        {size : 1e6, unit: 'M'}, 
        {size : 1e9, unit: 'G'}, 
        {size : 1e12, unit: 'T'}, 
        {size : 1e15, unit: 'P'}, 
        {size : 1e18, unit: 'E'}, 
        {size : 1e21, unit: 'B'},
        {size : 1e24, unit: 'kB'},
        {size : 1e27, unit: 'mB'},
        {size : 1e30, unit: 'gB'},
        {size : 1e33, unit: 'tB'},
        {size : 1e36, unit: 'pB'},
        {size : 1e39, unit: 'eB'},
        {size : 1e42, unit: 'bB'},
        {size : 1e45, unit: 'kBB'},
        {size : 1e48, unit: 'mBB'},
        {size : 1e51, unit: 'gBB'},
        {size : 1e54, unit: 'tBB'},
        {size : 1e57, unit: 'pBB'},
        {size : 1e60, unit: 'bBB'},
        {size : 1e63, unit: 'kBBB'},
        {size : 1e66, unit: 'mBBB'},
        {size : 1e69, unit: 'gBBB'},
        {size : 1e72, unit: 'tBBB'},
        {size : 1e75, unit: 'pBBB'},
        {size : 1e78, unit: 'bBBB'},
        {size : 1e81, unit: 'kBBBB'},
        {size : 1e84, unit: 'mBBBB'},
        {size : 1e87, unit: 'gBBBB'},
        {size : 1e90, unit: 'tBBBB'},
        {size : 1e93, unit: 'pBBBB'},
        {size : 1e96, unit: 'bBBBB'},
    ]    
    var index = -1;
    for (var i = 0; i < units.length; ++i)
    {        
        if (this < units[i].size)
            break;
        index = i
    }
    if (index == -1)
        return this.toFixed(0) + '';
    else
    {
        var floatVal =  (this / units[index].size).toFixed(number);
        // console.log(this + "  " + floatVal + "  " + units[index].size);
        return floatVal + units[index].unit;
    }
},

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

