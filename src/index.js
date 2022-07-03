import EnterScreen from './EnterScreen';

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
        canvas.width = 750; //canvas.offsetWidth;
        canvas.height = 750; //canvas.offsetHeight;
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
