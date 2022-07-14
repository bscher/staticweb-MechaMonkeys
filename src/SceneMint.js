import Clouds2 from './scene_mint/Clouds2';
import Grass2 from './scene_mint/Grass2';
import Station from './scene_mint/Station';
import { getFrameFromTime } from './utils';

class SceneMint {

    static image_background = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_mint/army_background.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.grass = new Grass2(canvas, ctx);
        this.clouds = new Clouds2(canvas, ctx);
        this.station = new Station(canvas, ctx);
    }

    draw(timeStamp) {

        // Clouds
        this.clouds.draw(timeStamp);

        // Background
        this.ctx.drawImage(SceneMint.image_background.image, 0, 0);

        // Station
        this.station.draw(timeStamp);

        // Grass
        this.grass.draw(timeStamp);
    }
}

export default SceneMint;