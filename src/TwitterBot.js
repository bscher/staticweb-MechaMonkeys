import getFrameFromTime from './utils_frameTime';

class TwitterBot {
    static animation_entry = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/twitter_rollout_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        frameCount: 15 // EXCLUSIVE
    };
    static animation_botton = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/twitter_button_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        frameCount: 17 // EXCLUSIVE
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.initialTime = (new Date()).getTime();
        this.readyToBePressed = false;
    }

    draw(timeStamp) {
        if (this.readyToBePressed) {

        } else {
            let timeSinceInitial = timeStamp - this.initialTime;
            let frame = 0;
            const frameMillis = 150;
            if (timeSinceInitial > 2000) {
                if (timeSinceInitial >= 2000 + (TwitterBot.animation_entry.frameCount * frameMillis)) {
                    frame = TwitterBot.animation_entry.frameCount - 1;
                } else {
                    frame = Math.floor(((timeSinceInitial - 2000) % (TwitterBot.animation_entry.frameCount * frameMillis)) / frameMillis);
                }
            }
            this.ctx.drawImage(
                TwitterBot.animation_entry.image,
                frame * TwitterBot.animation_entry.frameWidth, 0,
                TwitterBot.animation_entry.frameWidth, TwitterBot.animation_entry.frameHeight,
                0, 0,
                TwitterBot.animation_entry.frameWidth, TwitterBot.animation_entry.frameHeight
            );
        }
    }
}

export default TwitterBot;