
import getFrameFromTime from './utils_frameTime';

class LandingMech {

    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/mech_landing_sheet.png";
            return _img;
        })(),
        frameWidth: 500,
        frameHeight: 500,
        frameCount: 18 // EXCLUSIVE
    };

    constructor(canvas, ctx, landingSpotX, landingSpotY) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.landingSpotX = landingSpotX;
        this.landingSpotY = landingSpotY;
    }

    draw(timeStamp) {
        let frame = getFrameFromTime(timeStamp, LandingMech.animation.frameCount, 200);
        this.ctx.drawImage(
            LandingMech.animation.image,
            frame * LandingMech.animation.frameWidth, 0,
            LandingMech.animation.frameWidth, LandingMech.animation.frameHeight,
            200, 200, //TODO
            LandingMech.animation.frameWidth / 4, LandingMech.animation.frameHeight / 4
        );
    }
}

export default LandingMech;