
import { getFrameFromTime } from '../utils';

class Meteor {
    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_enter/meteor_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        framePeriod: 200, //ms
        frameCount: 18, // EXCLUSIVE
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.playAnimation = false;
    }

    play() {
        this.playAnimation = true;
        this.playInitialTime = (new Date()).getTime();
    }

    isDonePlaying() {
        return this.hasFinishedPlaying;
    }

    draw(timeStamp) {
        if (this.playAnimation) {
            let timeSincePlayStart = timeStamp - this.playInitialTime;
            let frame = getFrameFromTime(timeSincePlayStart, Meteor.animation.frameCount, Meteor.animation.framePeriod);
            if (timeSincePlayStart > Meteor.animation.frameCount * Meteor.animation.framePeriod) {
                frame = Meteor.animation.frameCount - 1;
                this.hasFinishedPlaying = true;
            }
            this.ctx.drawImage(
                Meteor.animation.image,
                frame * Meteor.animation.frameWidth, 0,
                Meteor.animation.frameWidth, Meteor.animation.frameHeight,
                0, 0,
                Meteor.animation.frameWidth, Meteor.animation.frameHeight
            );
        } else {
            this.ctx.drawImage(
                Meteor.animation.image,
                0, 0,
                Meteor.animation.frameWidth, Meteor.animation.frameHeight,
                0, 0,
                Meteor.animation.frameWidth, Meteor.animation.frameHeight
            );
        }
    }
}

export default Meteor;