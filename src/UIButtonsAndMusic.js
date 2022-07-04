
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
            _music.volume = 0.5;
            _music.muted = false;
            _music.loop = true;
            _music.autoplay = true;
            return _music;
        })()
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.initialMusicPlay = false;
        this.muted = true;

        // Follow mouse actions
        this.mouse = {
            x: 0, y: 0,
            clicked: false
        };
        const mouse = this.mouse;
        window.addEventListener('mousedown', (event) => { mouse.clicked = true; });
        window.addEventListener('mouseup', (event) => { mouse.clicked = false; });
        window.addEventListener('mousemove', (event) => {
            let canvasPosition = canvas.getBoundingClientRect();
            mouse.x = event.x - canvasPosition.left;
            mouse.y = event.y - canvasPosition.top;
        });
    }

    isMouseOverMuteButton() {
        return (
            this.mouse.x > 644 && this.mouse.x < 730 &&
            this.mouse.y > 655 && this.mouse.y < 722
        );
    }

    isMouseOverTwitterButton() {
        return (
            this.mouse.x > 644 && this.mouse.x < 730 &&
            this.mouse.y > 655 && this.mouse.y < 722
        );
    }

    draw(timeStamp) {
        if (this.mouse.clicked && this.isMouseOverMuteButton()) {
            this.muted = !this.muted;
            UIButtonsAndMusic.music.audio.muted = this.muted;
            if (!this.muted) {
                UIButtonsAndMusic.music.audio.play();
            }
            this.mouse.clicked = false;
        }

        if (this.muted) {
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