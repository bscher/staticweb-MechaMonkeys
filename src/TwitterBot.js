import { getFrameFromTime } from "./utils";

class TwitterBot {
    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/twitter_rollout_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        frameCount: 15, // EXCLUSIVE
        framePeriod: 200, //ms
        frame_hightlight: 15 // Special frame
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.initialTime = (new Date()).getTime();
        this.state = {
            readyToBePressed: false,
            mouseHoveringOver: false
        };

        this.clickregion_twitter = document.getElementById('screen_clickregion_twitter');
        this.clickregion_twitter.addEventListener('mouseover', (event) => { this.state.mouseHoveringOver = true; });
        this.clickregion_twitter.addEventListener('mouseleave', (event) => { this.state.mouseHoveringOver = false; });
        this.clickregion_twitter.addEventListener('click', (event) => {
            if (this.state.readyToBePressed) {
                window.open("https://twitter.com/mecha_monkeys", "_blank");
            }
        });
    }

    draw(timeStamp) {

        if (this.state.readyToBePressed) {

            if (this.state.mouseHoveringOver) {
                // Draw special highlight frame
                this.ctx.drawImage(
                    TwitterBot.animation.image,
                    (TwitterBot.animation.frame_hightlight) * TwitterBot.animation.frameWidth, 0,
                    TwitterBot.animation.frameWidth, TwitterBot.animation.frameHeight,
                    0, 0,
                    TwitterBot.animation.frameWidth, TwitterBot.animation.frameHeight
                );
            } else {
                // Draw last animation frame
                this.ctx.drawImage(
                    TwitterBot.animation.image,
                    (TwitterBot.animation.frameCount - 1) * TwitterBot.animation.frameWidth, 0,
                    TwitterBot.animation.frameWidth, TwitterBot.animation.frameHeight,
                    0, 0,
                    TwitterBot.animation.frameWidth, TwitterBot.animation.frameHeight
                );
            }

        } else {

            const totalAnimationTime = TwitterBot.animation.frameCount * TwitterBot.animation.framePeriod;
            const elapsedTime = timeStamp - this.initialTime;
            let frame = 0;
            if (elapsedTime < totalAnimationTime) {
                frame = getFrameFromTime(elapsedTime, TwitterBot.animation.frameCount, TwitterBot.animation.framePeriod);
            } else {
                this.state.readyToBePressed = true;
                frame = TwitterBot.animation.frameCount - 1;
            }
            this.ctx.drawImage(
                TwitterBot.animation.image,
                frame * TwitterBot.animation.frameWidth, 0,
                TwitterBot.animation.frameWidth, TwitterBot.animation.frameHeight,
                0, 0,
                TwitterBot.animation.frameWidth, TwitterBot.animation.frameHeight
            );
        }
    }
}

export default TwitterBot;