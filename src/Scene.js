import SceneEnter from './SceneEnter';
import UIButtonsAndMusic from './UIButtonsAndMusic';
import FullScreenColor from './FullScreenColor';
import TwitterBot from './TwitterBot';
import SceneMint from './SceneMint';

class Scene {
    static STATES = Object.freeze({
        ENTER: 1,
        ENTERING: 2,
        MINT: 3,
        POST_MINT: 4
    });

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.state = Scene.STATES.ENTER;

        this.sceneEnter = new SceneEnter(canvas, ctx);
        this.sceneMint = new SceneMint(canvas, ctx);

        this.uiAndMusic = new UIButtonsAndMusic(canvas, ctx);
        this.fullScreenColor = new FullScreenColor(canvas, ctx);
        this.fullScreenColor_rgb = [255, 150, 0];
        this.twitterBot = new TwitterBot(canvas, ctx);
    }

    draw(timeStamp) {

        if (this.state === Scene.STATES.ENTER) {
            this.sceneEnter.draw(timeStamp);
            this.twitterBot.draw(timeStamp);
            this.uiAndMusic.draw(timeStamp);

            if (this.sceneEnter.isDone()) {
                this.state = Scene.STATES.ENTERING;
                this.sceneEnter.removeClickRegions();
                this.fullScreenColor.start(
                    timeStamp,
                    this.fullScreenColor_rgb[0], this.fullScreenColor_rgb[1], this.fullScreenColor_rgb[2], true,
                    600
                );
            }
        } else if (this.state === Scene.STATES.ENTERING) {
            this.sceneEnter.draw(timeStamp);
            this.twitterBot.draw(timeStamp);
            this.fullScreenColor.draw(timeStamp);
            this.uiAndMusic.draw(timeStamp);

            if (this.fullScreenColor.isDone()) {
                this.state = Scene.STATES.MINT;
                this.fullScreenColor.start(
                    timeStamp,
                    this.fullScreenColor_rgb[0], this.fullScreenColor_rgb[1], this.fullScreenColor_rgb[2], false,
                    600
                );
            }
        } else if (this.state === Scene.STATES.MINT) {
            this.sceneMint.draw(timeStamp);
            this.twitterBot.draw(timeStamp);
            if (!this.fullScreenColor.isDone()) {
                this.fullScreenColor.draw(timeStamp);
            }
            this.uiAndMusic.draw(timeStamp);
        } else if (this.state === Scene.STATES.POST_MINT) {
            // TODO
        }
    }
}

export default Scene;