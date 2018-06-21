var eventList = new Array();
var callbacks = {};

function on(event, callback, node)
{    
    if (callbacks[event] == undefined)
    {
        callbacks[event] = new Array();
    }
    callbacks[event].push({f: callback, n: node});    
}

function emit(event, params)
{
    eventList.push(
        {
            e : event,
            p : params,
        }
    )
}

module.exports = {
    on : on,
    emit : emit,

    update(dt)
    {
        while(eventList.length > 0)
        {
            var event = eventList.shift();
            var fArray = callbacks[event.e];
            for (var i = 0; i < fArray.length; ++i)
            {
                var a = fArray[i];
                if (a != undefined)
                {
                    if (a.n.node.active)
                    {
                        a.f.call(a.n, event.p);
                    }
                    else
                    {
                        console.log("Node:" + a.n.node.name + " hasn't active");
                    }                    
                }                
                else
                {
                    console.error(event + " hasn't callback");
                }
            }
        }
    }
}