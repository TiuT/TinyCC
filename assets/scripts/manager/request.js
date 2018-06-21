var officialURL = "https://a.qtong0033.xyz/worldcup";

module.exports = {
    request : function(params, callback){
        var pStr = new Array();
        for (var p in params)
        {
            pStr.push(p + "=" + params[p]);
        }
        var str = "";        
        for (var i = 0; i < pStr.length; ++i)
        {
            str += pStr[i];
            if (i != pStr.length - 1)
                str += "&";
        }         
        var url = officialURL + "/WorldCup.aspx";
        console.log('request:' + url + "?" + str);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                callback(response);
            }
        };
        xhr.open("POST", url, true);
        xhr.send(params);
    }
};