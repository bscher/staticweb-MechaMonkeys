
class UIButtonsAndMusic {
    static mute_button_sheet = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/mute_sound_button_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        frameCount: 2 // EXCLUSIVE
    };

    static music = {
        audio: (() => {
            let _music = new Audio("/audio/music.mp3");
            _music.volume = 0.35;
            _music.muted = false;
            _music.loop = true;
            _music.autoplay = true;
            return _music;
        })()
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.state = {
            musicMuted: true,
            mouseHoveringOver_muteButton: false
        };

        const state = this.state;
        this.clickregion_mute = document.getElementById('screen_clickregion_mute');
        this.clickregion_mute.addEventListener('mouseover', (event) => { state.mouseHoveringOver_muteButton = true; });
        this.clickregion_mute.addEventListener('mouseleave', (event) => { state.mouseHoveringOver_muteButton = false; });
        this.clickregion_mute.addEventListener('click', (event) => {
            state.musicMuted = !state.musicMuted;
            UIButtonsAndMusic.music.audio.muted = state.musicMuted;
            if (!state.muted) {
                UIButtonsAndMusic.music.audio.play();
            }
        });
    }

    draw(timeStamp) {
        if (this.state.musicMuted) {
            this.ctx.drawImage(
                UIButtonsAndMusic.mute_button_sheet.image,
                1 * UIButtonsAndMusic.mute_button_sheet.frameWidth, 0,
                UIButtonsAndMusic.mute_button_sheet.frameWidth, UIButtonsAndMusic.mute_button_sheet.frameHeight,
                0, 0,
                UIButtonsAndMusic.mute_button_sheet.frameWidth, UIButtonsAndMusic.mute_button_sheet.frameHeight
            );
        } else {
            this.ctx.drawImage(
                UIButtonsAndMusic.mute_button_sheet.image,
                0, 0,
                UIButtonsAndMusic.mute_button_sheet.frameWidth, UIButtonsAndMusic.mute_button_sheet.frameHeight,
                0, 0,
                UIButtonsAndMusic.mute_button_sheet.frameWidth, UIButtonsAndMusic.mute_button_sheet.frameHeight
            );
        }
    }
}

export default UIButtonsAndMusic;