
class FullScreenColor {

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.target_rgb = null;
        this.target_toFullOpaque = true;

        this.initial_time = 0;
        this.interpolation_step = 0; //0..1 exclusive
    }

    start(timeStamp, r, g, b, toFullOpaque, transitionTime) {
        this.target_rgb = `${r},${g},${b}`;
        this.target_toFullOpaque = toFullOpaque;
        this.initial_time = timeStamp;
        this.transitionTime = transitionTime;
        this.interpolation_step = 0;
    }

    isDone() {
        return (this.interpolation_step === 1);
    }

    draw(timeStamp) {
        if (this.target_rgb === null) {
            return;
        }
        const elapsedTime = timeStamp - this.initial_time;
        if (elapsedTime < this.transitionTime) {
            this.interpolation_step = elapsedTime / this.transitionTime;
            if (!this.target_toFullOpaque) {
                this.interpolation_step = 1 - this.interpolation_step;
            }
        } else {
            this.interpolation_step = this.target_toFullOpaque ? 1 : 0;
        }
        let alpha = Math.min(1, this.interpolation_step.toFixed(2));
        this.ctx.save();
        this.ctx.fillStyle = `rgba(${this.target_rgb},${alpha})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }
}

export default FullScreenColor;