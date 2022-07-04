
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
        this.readyToBePressed = false;

        // Follow mouse actions
        this.mouse = {
            x: 0, y: 0,
            clicked: false
        };
        const mouse = this.mouse;
        window.addEventListener('mousedown', (event) => { mouse.clicked = true; });
        window.addEventListener('mousemove', (event) => {
            let canvasPosition = canvas.getBoundingClientRect();
            mouse.x = event.x - canvasPosition.left;
            mouse.y = event.y - canvasPosition.top;
        });
    }

    isMouseOverTwitterButton() {
        return (
            this.mouse.x > 58 && this.mouse.x < 172 &&
            this.mouse.y > 586 && this.mouse.y < 663
        );
    }

    draw(timeStamp) {

        if (this.readyToBePressed) {
            if (this.mouse.clicked) {
                if (
                    this.mouse.x > 58 && this.mouse.x < 172 &&
                    this.mouse.y > 586 && this.mouse.y < 663
                ) {
                    window.open("https://twitter.com/mecha_monkeys", "_blank");
                }
                this.mouse.clicked = false;
            }

            if (this.isMouseOverTwitterButton()) {
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
                    this.readyToBePressed = true;
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