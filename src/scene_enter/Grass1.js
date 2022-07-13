
import { getFrameFromTime } from '../utils';

class Grass1 {
    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_enter/grass1_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        frameCount: 17 // EXCLUSIVE
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    draw(timeStamp) {
        let frame = getFrameFromTime(timeStamp, Grass1.animation.frameCount, 250);
        this.ctx.drawImage(
            Grass1.animation.image,
            frame * Grass1.animation.frameWidth, 0,
            Grass1.animation.frameWidth, Grass1.animation.frameHeight,
            0, -50,
            Grass1.animation.frameWidth, Grass1.animation.frameHeight
        );
    }
}

export default Grass1;