import Clouds1 from './scene_enter/Clouds1';
import Grass1 from './scene_enter/Grass1';
import Meteor from './scene_enter/Meteor';
import TwitterBot from './TwitterBot';
import { getFrameFromTime } from './utils';

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

    static animation_enterPanel = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_enter/enterpanel_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        frameCount: 13,
        frame_red: 14 // Special frame
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.clouds = new Clouds1(canvas, ctx);
        this.grass = new Grass1(canvas, ctx);
        this.meteor = new Meteor(canvas, ctx);
        this.twitterBot = new TwitterBot(canvas, ctx);

        this.state = {
            enterHasBeenPressed: false,
            mouseHoveringOver: false
        };

        const state = this.state;
        const meteor = this.meteor;
        this.clickregion_enter = document.getElementById('screen_clickregion_enter');
        this.clickregion_enter.addEventListener('mouseover', (event) => { state.mouseHoveringOver = true; });
        this.clickregion_enter.addEventListener('mouseleave', (event) => { state.mouseHoveringOver = false; });
        this.clickregion_enter.addEventListener('click', (event) => {
            state.enterHasBeenPressed = true;
            meteor.play();
        });
    }

    draw(timeStamp) {

        // Background
        this.ctx.drawImage(SceneEnter.image_background.image, 0, 0);

        // Grass
        this.grass.draw(timeStamp);

        // Twitter bot
        this.twitterBot.draw(timeStamp);

        // Clouds
        this.clouds.draw(timeStamp);

        // "Enter" button
        if (this.state.enterHasBeenPressed) {
            this.ctx.drawImage(
                SceneEnter.animation_enterPanel.image,
                SceneEnter.animation_enterPanel.frame_red * SceneEnter.animation_enterPanel.frameWidth, 0,
                SceneEnter.animation_enterPanel.frameWidth, SceneEnter.animation_enterPanel.frameHeight,
                0, 0,
                SceneEnter.animation_enterPanel.frameWidth, SceneEnter.animation_enterPanel.frameHeight
            );
        } else {
            const frame = getFrameFromTime(timeStamp, SceneEnter.animation_enterPanel.frameCount, 200);
            this.ctx.drawImage(
                SceneEnter.animation_enterPanel.image,
                frame * SceneEnter.animation_enterPanel.frameWidth, 0,
                SceneEnter.animation_enterPanel.frameWidth, SceneEnter.animation_enterPanel.frameHeight,
                0, 0,
                SceneEnter.animation_enterPanel.frameWidth, SceneEnter.animation_enterPanel.frameHeight
            );
        }

        // Meteor
        this.meteor.draw(timeStamp);
    }
}

export default SceneEnter;