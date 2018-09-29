function request(url, params, callback){
    var pStr = new Array();
    var str = "";        
    if (params != null)
    {
        for (var p in params)
        {
            pStr.push(p + "=" + params[p]);
        }            
        for (var i = 0; i < pStr.length; ++i)
        {
            str += pStr[i];
            if (i != pStr.length - 1)
                str += "&";
        }
    }    
    console.log('request:' + url + "?" + str);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {            
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;
            callback(response);
        }
    };
    xhr.open("POST", url, true);
    console.log(params);
    xhr.send(params);
}

module.exports = {
    request : request,
};