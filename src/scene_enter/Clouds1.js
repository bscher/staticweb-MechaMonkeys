import { getFrameFromTime } from '../utils';

class Clouds1 {
    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_enter/clouds1_sheet.png";
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
        let frame = getFrameFromTime(timeStamp, Clouds1.animation.frameCount, 200);
        this.ctx.drawImage(
            Clouds1.animation.image,
            frame * Clouds1.animation.frameWidth, 0,
            Clouds1.animation.frameWidth, Clouds1.animation.frameHeight,
            0, 0,
            Clouds1.animation.frameWidth, Clouds1.animation.frameHeight
        );
    }
}

export default Clouds1;