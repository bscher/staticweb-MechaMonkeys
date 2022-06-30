class LandingMech {

    static animation = {
        image: (() => {
            const landingMechSheet = new Image();
            landingMechSheet.src = "img/mech_landing.png";
            return landingMechSheet;
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

$(function () {
    // Setup
    const canvas = document.getElementById("maincanvas");
    const ctx = canvas.getContext("2d");

    // Handle window resizing
    function onWindowResized() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    onWindowResized();
    window.addEventListener('resize', onWindowResized);

    // Scene
    let mech = new LandingMech(canvas, ctx, "TODO", "TODO");

    // Frame update loop
    function updateFrame() {

        // Clear frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillText("Hello, world!", 100, 100);
        mech.draw();

        requestAnimationFrame(updateFrame);
    }
    updateFrame();
});
