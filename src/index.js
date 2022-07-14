import Scene from "./Scene";


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
