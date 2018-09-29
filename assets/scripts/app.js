var ad = require("./platform/ad");
var friendrank = require("./platform/friendrank");
var launch = require("./platform/launch");
var login = require("./platform/login");
var share = require("./platform/share");

var ui = require("./manager/ui");
var event = require("./manager/event");
var audio = require("./manager/aduio");
var request = require("./manager/request");
var storage = require("./manager/storage");
var subpackage = require("./manager/subpackage");

var app = {
    init : function(callback){
        launch.init();
        ui.load(callback);
    },

    update(dt)
    {
        event.update(dt);
    },

    login : function(callback)
    {
        login.login(callback);
    },

    ui : ui,
    event : event,
    audio : audio,
    request : request,
};

module.exports = app;