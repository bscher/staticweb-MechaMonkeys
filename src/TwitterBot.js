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
        frameCount: 16 // EXCLUSIVE
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    draw(timeStamp) {
        let frame = getFrameFromTime(timeStamp, TwitterBot.animation_entry.frameCount, 200);
        this.ctx.drawImage(
            TwitterBot.animation_entry.image,
            frame * TwitterBot.animation_entry.frameWidth, 0,
            TwitterBot.animation_entry.frameWidth, TwitterBot.animation_entry.frameHeight,
            0, 0,
            TwitterBot.animation_entry.frameWidth, TwitterBot.animation_entry.frameHeight
        );
    }
}

export default TwitterBot;