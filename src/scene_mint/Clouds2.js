import { getFrameFromTime } from '../utils';

class Clouds2 {
    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_mint/clouds2_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        frameCount: 15 // EXCLUSIVE
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    draw(timeStamp) {
        let frame = getFrameFromTime(timeStamp, Clouds2.animation.frameCount, 200);
        this.ctx.drawImage(
            Clouds2.animation.image,
            frame * Clouds2.animation.frameWidth, 0,
            Clouds2.animation.frameWidth, Clouds2.animation.frameHeight,
            0, 0,
            Clouds2.animation.frameWidth, Clouds2.animation.frameHeight
        );
    }
}

export default Clouds2;