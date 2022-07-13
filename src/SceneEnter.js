import Clouds1 from './scene_enter/Clouds1';
import Grass1 from './scene_enter/Grass1';
import TwitterBot from './TwitterBot';

class SceneEnter {

    static image_background = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_enter/welcome_background.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750
    };

    static image_comeBackSoon = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_enter/come_back_soon.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.clouds = new Clouds1(canvas, ctx);
        this.grass = new Grass1(canvas, ctx);
        this.twitterBot = new TwitterBot(canvas, ctx);
    }

    draw(timeStamp) {

        // Background
        this.ctx.drawImage(SceneEnter.image_background.image, 0, 0);

        // Grass
        this.grass.draw(timeStamp);

        // Twitter bot
        this.twitterBot.draw(timeStamp);

        // "Come back soon" overlay
        this.ctx.drawImage(SceneEnter.image_comeBackSoon.image, 0, 0);

        // Clouds
        this.clouds.draw(timeStamp);
    }
}

export default SceneEnter;