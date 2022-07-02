class EnterScreen {

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
    }

    draw() {
        this.ctx.drawImage(EnterScreen.image_comeBackSoon.image, 0, 0);
    }
}

class LandingMech {

    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/mech_landing.png";
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

        this.currentFrame = 0;
    }

    draw() {
        this.currentFrame = (this.currentFrame + 1) % LandingMech.animation.frameCount;
        this.ctx.drawImage(
            LandingMech.animation.image,
            this.currentFrame * LandingMech.animation.frameWidth, 0,
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

    draw() {
        this.ctx.fillText("Hello, world!", 100, 100);

        if (this.state === Scene.STATES.ENTER_INACTIVE) {
            this.enterScreen.draw();
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

        // Clear frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        scene.draw();

        requestAnimationFrame(updateFrame);
    }
    updateFrame();
});
