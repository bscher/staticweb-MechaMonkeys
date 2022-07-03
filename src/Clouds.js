import getFrameFromTime from './utils_frameTime';

class Clouds {
    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/animated_clouds_sheet.png";
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
        let frame = getFrameFromTime(timeStamp, Clouds.animation.frameCount, 200);
        this.ctx.drawImage(
            Clouds.animation.image,
            frame * Clouds.animation.frameWidth, 0,
            Clouds.animation.frameWidth, Clouds.animation.frameHeight,
            0, 0,
            Clouds.animation.frameWidth, Clouds.animation.frameHeight
        );
    }
}

export default Clouds;