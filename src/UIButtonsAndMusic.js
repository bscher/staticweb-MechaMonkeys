
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

    constructor(canvas, ctx, onToggleMuteAction) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.onToggleMuteAction = onToggleMuteAction;

        this.state = {
            musicMuted: true,
            mouseHoveringOver_muteButton: false,
        };

        this.clickregion_mute = document.getElementById('screen_clickregion_mute');
        this.clickregion_mute.addEventListener('mouseover', (event) => { this.state.mouseHoveringOver_muteButton = true; });
        this.clickregion_mute.addEventListener('mouseleave', (event) => { this.state.mouseHoveringOver_muteButton = false; });
        this.clickregion_mute.addEventListener('click', (event) => {
            this.toggleMuted(!this.state.musicMuted);
        });
    }

    toggleMuted(isNowMuted) {
        this.state.musicMuted = isNowMuted;
        UIButtonsAndMusic.music.audio.muted = this.state.musicMuted;
        if (!this.state.muted) {
            UIButtonsAndMusic.music.audio.play();
        }
        this.onToggleMuteAction(isNowMuted);
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