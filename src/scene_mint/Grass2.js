import { getFrameFromTime } from '../utils';

class Grass2 {
    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_mint/grass2_sheet.png";
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
        let frame = getFrameFromTime(timeStamp, Grass2.animation.frameCount, 250);
        this.ctx.drawImage(
            Grass2.animation.image,
            frame * Grass2.animation.frameWidth, 0,
            Grass2.animation.frameWidth, Grass2.animation.frameHeight,
            0, -75,
            Grass2.animation.frameWidth, Grass2.animation.frameHeight
        );
    }
}

export default Grass2;