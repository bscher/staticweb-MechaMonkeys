
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

        const state = this.state;
        this.clickregion_twitter = document.getElementById('screen_clickregion_twitter');
        this.clickregion_twitter.addEventListener('mouseover', (event) => { state.mouseHoveringOver = true; });
        this.clickregion_twitter.addEventListener('mouseleave', (event) => { state.mouseHoveringOver = false; });
        this.clickregion_twitter.addEventListener('click', (event) => {
            if (state.readyToBePressed) {
                window.open("https://twitter.com/mecha_monkeys", "_blank");
            }
        });
    }

    draw(timeStamp) {

        if (this.state.readyToBePressed) {
            //

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
            let timeSinceInitial = timeStamp - this.initialTime;
            let frame = 0;
            const frameMillis = 150;
            if (timeSinceInitial > 2000) {
                if (timeSinceInitial >= 2000 + (TwitterBot.animation.frameCount * frameMillis)) {
                    frame = TwitterBot.animation.frameCount - 1;
                    this.state.readyToBePressed = true;
                } else {
                    frame = Math.floor(((timeSinceInitial - 2000) % (TwitterBot.animation.frameCount * frameMillis)) / frameMillis);
                }
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