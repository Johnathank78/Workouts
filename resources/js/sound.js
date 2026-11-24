// Kept for the GHADD_ lines of the build: the players are now thin adapters over webSound,
// so no extra AudioContext is ever created (iOS limits them) and the GHADD_ calls stay valid.

const beepPath = './resources/sounds/beep.mp3';
const beep2x3Path = './resources/sounds/beep2x3.mp3';

var beepPlayer = false;
var beep2x3Player = false;

function constructPlayer(url, interval, volume = false) {
    const name = url.includes('beep2x3') ? 'beep2x3' : 'beep';

    return {
        setVolume: (newVolume) => webSound.setVolume(newVolume),
        setTimes: () => {},
        suspendAudioContext: () => {},
        resumeAudioContext: () => webSound.resume(),
        isContextValid: () => true,
        close: () => {},
        play: () => webSound.play(name)
    };
};

function playBeep(player, times){
    player.play();
};