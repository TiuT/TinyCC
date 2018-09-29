var audioBuff = {};

var musicOn = null;

var Aduio = {
    on(open)
    {
        if (open !== undefined)
        {
            if (musicOn != open)
            {
                cc.sys.localStorage.setItem("music", open ? 1 : 0);
            }
            musicOn = open;   
            if (!open)
                this.stopBgm();
            else
                this.playBgm()        
        }
        else
        {
            if (musicOn === null)
            {
                var local = cc.sys.localStorage.getItem("music");
                musicOn = ("" === local || null === local || local == 1);
            }            
            return musicOn;
        }        
    },

    playEffect(name)
    {
        if (!musicOn) return;
        if (audioBuff[name] == undefined)
        {
            cc.loader.loadRes("audios/" + name, function (err, audio) {   
                audioBuff[name] = audio;         
                cc.audioEngine.play(audio, false);
            })
        }
        else
        {
            cc.audioEngine.play(audioBuff[name], false);
        }
    },

    playBgm()
    {
        if (!musicOn) return;
        if (audioBuff["bgm"] == undefined)
        {
            cc.loader.loadRes("audios/bgm", function (err, audio) {   
                audioBuff["bgm"] = audio;         
                cc.audioEngine.play(audio, true);
            })
        }
        else
        {
            cc.audioEngine.play(audioBuff["bgm"], true);
        }
    },

    stopBgm()
    {
        // cc.audioEngine.stop(audioBuff["bgm"], true);
        cc.audioEngine.stopAll();
    }
}

module.exports = Aduio;