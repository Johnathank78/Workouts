// WEB SOUND ENGINE
//
// One AudioContext for the whole app, sounds decoded once.
// iOS (Safari and standalone PWA) rules this engine is built around:
//  - a context can only be started or resumed inside a user gesture (touchend / click), not from a timer,
//    a visibilitychange or a custom event dispatched by a setInterval (the old "fix sound" long click);
//  - after the app was in background, a call or Siri, the context is "interrupted" (not "suspended");
//  - the number of live contexts is limited: one was created per session and never closed before.
// So: resume on every gesture while the context is not running, and rebuild it (fix sound) on a gesture too.
// The HTMLAudio elements below stay as fallback when Web Audio is not available.
// It lives in its own file because the GitHub export replaces sound.js with its SOUNDADD block only:
// everything the online build needs from the engine must be here, not in sound.js.

var beep = new Audio('./resources/sounds/beep.mp3');
var beep2x3 = new Audio('./resources/sounds/beep2x3.mp3');

var webSound = (function(){
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const urls = {
        "beep": './resources/sounds/beep.mp3',
        "beep2x3": './resources/sounds/beep2x3.mp3'
    };

    let ctx = null;
    let gain = null;
    let volume = 0.5;
    let buffers = {};
    let loading = {};
    let sources = [];
    let fixRequested = false;

    function ensureContext(){
        if(!Ctx){return null};

        if(!ctx || ctx.state === "closed"){
            try{
                ctx = new Ctx();
            }catch(err){
                console.warn("webSound: cannot create AudioContext", err);
                ctx = null;
                return null;
            };

            gain = ctx.createGain();
            gain.gain.value = volume;
            gain.connect(ctx.destination);

            buffers = {};
            loading = {};
            sources = [];
        };

        return ctx;
    };

    function load(name){
        const context = ensureContext();
        if(!context){return Promise.resolve(null)};
        if(buffers[name]){return Promise.resolve(buffers[name])};

        if(!loading[name]){
            loading[name] = fetch(urls[name])
                .then(response => response.arrayBuffer())
                // callback form: the promise form of decodeAudioData is missing on older iOS
                .then(data => new Promise((resolve, reject) => context.decodeAudioData(data, resolve, reject)))
                .then(buffer => {
                    if(context === ctx){buffers[name] = buffer};
                    return buffer;
                })
                .catch(err => {
                    console.warn("webSound: cannot load " + name, err);
                    delete loading[name];
                    return null;
                });
        };

        return loading[name];
    };

    function preload(){
        Object.keys(urls).forEach(name => load(name));
    };

    function resume(){
        if(ctx && ctx.state !== "running" && ctx.state !== "closed"){
            return ctx.resume().catch(() => {});
        };

        return Promise.resolve();
    };

    function startBuffer(buffer){
        if(!ctx || !buffer){return};

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(gain);
        source.onended = () => {sources = sources.filter(s => s !== source)};
        source.start(0);

        sources.push(source);
    };

    function play(name){
        if(volume <= 0){return};

        const context = ensureContext();

        if(!context){
            const fallback = name == "beep2x3" ? beep2x3 : beep;
            fallback.play().catch(() => {});
            return;
        };

        resume();

        if(buffers[name]){
            startBuffer(buffers[name]);
        }else{
            load(name).then(buffer => startBuffer(buffer));
        };
    };

    function stop(){
        sources.forEach(source => {
            try{source.stop()}catch(err){};
        });

        sources = [];
    };

    function setVolume(value){
        volume = Math.max(0, Math.min(1, parseFloat(value) || 0));
        if(gain){gain.gain.value = volume};
    };

    function rebuild(){
        stop();

        if(ctx){
            try{ctx.close()}catch(err){};
        };

        ctx = null;
        ensureContext();
        resume();
        preload();
    };

    function onGesture(){
        if(fixRequested){
            fixRequested = false;
            rebuild();

            if(typeof bottomNotification === "function"){bottomNotification("fixSound")};
            return;
        };

        const firstUnlock = !ctx;
        const context = ensureContext();
        if(!context){return};

        if(context.state !== "running"){resume()};

        if(firstUnlock){
            // A silent buffer played inside the first gesture fully unlocks the output on iOS
            try{
                const silent = context.createBuffer(1, 1, 22050);
                const source = context.createBufferSource();
                source.buffer = silent;
                source.connect(context.destination);
                source.start(0);
            }catch(err){};

            preload();
        };
    };

    function requestFix(){
        // Called from a long click, which is not a user gesture for iOS: the rebuild runs on the finger release
        fixRequested = true;
    };

    function state(){
        return ctx ? ctx.state : "none";
    };

    ["touchend", "click", "keydown"].forEach(type => {
        document.addEventListener(type, onGesture, {capture: true, passive: true});
    });

    document.addEventListener("visibilitychange", () => {
        // Best effort only: iOS usually refuses a resume outside a gesture, the next touch will do it
        if(document.visibilityState === "visible"){resume()};
    });

    return {
        play,
        stop,
        setVolume,
        resume,
        requestFix,
        state
    };
})();
