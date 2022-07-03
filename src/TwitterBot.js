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

    static animation_button = {
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

        // Handle mouse click
        this.mouse = {
            x: 0, y: 0,
            clicked: false
        };
        const mouse = this.mouse;
        function onMouseDown(event) {
            let canvasPosition = canvas.getBoundingClientRect();
            mouse.x = event.x - canvasPosition.left;
            mouse.y = event.y - canvasPosition.top;
            mouse.clicked = true;
        }
        function onMouseUp(_) {
            mouse.clicked = false;
        }
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
    }

    draw(timeStamp) {
        if (this.readyToBePressed) {
            let frame = 0;
            if (this.mouse.clicked) {
                if (
                    this.mouse.x > 58 && this.mouse.x < 172 &&
                    this.mouse.y > 586 && this.mouse.y < 663
                ) {
                    window.open("https://twitter.com/mecha_monkeys", "_blank");
                    this.mouse.clicked = false;
                }
            }

            this.ctx.drawImage(
                TwitterBot.animation_button.image,
                frame * TwitterBot.animation_button.frameWidth, 0,
                TwitterBot.animation_button.frameWidth, TwitterBot.animation_button.frameHeight,
                0, 0,
                TwitterBot.animation_button.frameWidth, TwitterBot.animation_button.frameHeight
            );

        } else {
            let timeSinceInitial = timeStamp - this.initialTime;
            let frame = 0;
            const frameMillis = 150;
            if (timeSinceInitial > 2000) {
                if (timeSinceInitial >= 2000 + (TwitterBot.animation_entry.frameCount * frameMillis)) {
                    frame = TwitterBot.animation_entry.frameCount - 1;
                    this.readyToBePressed = true;
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