/// Returns a deterministic frame number with just the current time
function getFrameFromTime(timeStamp, totalFrames, millisPerFrame) {
    const animationPeriod = totalFrames * millisPerFrame;
    return Math.floor((timeStamp % animationPeriod) / millisPerFrame);
}

class Clouds {
    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/animated_clouds_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        frameCount: 16 // EXCLUSIVE
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    draw(timeStamp) {
        let frame = getFrameFromTime(timeStamp, Clouds.animation.frameCount, 200);
        this.ctx.drawImage(
            Clouds.animation.image,
            frame * Clouds.animation.frameWidth, 0,
            Clouds.animation.frameWidth, Clouds.animation.frameHeight,
            0, 0,
            Clouds.animation.frameWidth, Clouds.animation.frameHeight
        );
    }
}

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
    }

    draw(timeStamp) {

        // Background
        this.ctx.drawImage(EnterScreen.image_background.image, 0, 0);

        // "Come back soon" overlay
        this.ctx.drawImage(EnterScreen.image_comeBackSoon.image, 0, 0);

        // Clouds
        this.clouds.draw(timeStamp);
    }
}

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

class Scene {
    static STATES = Object.freeze({
        ENTER_INACTIVE: 0,
        ENTER: 1,
        ENTERING: 2,
        MINT: 3,
        POST_MINT: 4
    });

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.state = Scene.STATES.ENTER_INACTIVE;

        this.enterScreen = new EnterScreen(canvas, ctx);

        // EXAMPLE
        //this.mech = new LandingMech(canvas, ctx, "TODO", "TODO");
    }

    draw(timeStamp) {
        this.ctx.fillText("Hello, world!", 100, 100);

        if (this.state === Scene.STATES.ENTER_INACTIVE) {
            this.enterScreen.draw(timeStamp);
        } else if (this.state === Scene.STATES.ENTER) {
            // TODO
        } else if (this.state === Scene.STATES.ENTERING) {
            // TODO
        } else if (this.state === Scene.STATES.MINT) {
            // TODO
        } else if (this.state === Scene.STATES.POST_MINT) {
            // TODO
        }
    }
}

$(function () {
    // Setup
    const canvas = document.getElementById("screen_canvas");
    const ctx = canvas.getContext("2d");

    // Handle window resizing
    function onWindowResized() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    onWindowResized();
    window.addEventListener('resize', onWindowResized);

    // Scene
    let scene = new Scene(canvas, ctx);

    // Frame update loop
    function updateFrame() {

        let timeStamp_now = (new Date()).getTime();

        // Clear frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render the frame
        scene.draw(timeStamp_now);

        // Call for next frame
        requestAnimationFrame(updateFrame);
    }
    updateFrame();
});
