import Clouds from './Clouds';
import Grass1 from './Grass1';
import TwitterBot from './TwitterBot';

class EnterScreen {

    static image_background = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/welcome_background.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750
    };

    static image_comeBackSoon = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/come_back.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.clouds = new Clouds(canvas, ctx);
        this.grass = new Grass1(canvas, ctx);
        this.twitterBot = new TwitterBot(canvas, ctx);
    }

    draw(timeStamp) {

        // Background
        this.ctx.drawImage(EnterScreen.image_background.image, 0, 0);

        // Grass
        this.grass.draw(timeStamp);

        // Twitter bot
        this.twitterBot.draw(timeStamp);

        // "Come back soon" overlay
        this.ctx.drawImage(EnterScreen.image_comeBackSoon.image, 0, 0);

        // Clouds
        this.clouds.draw(timeStamp);
    }
}

export default EnterScreen;