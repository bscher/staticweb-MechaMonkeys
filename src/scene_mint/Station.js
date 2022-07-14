
class Station {

    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_mint/station_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        frame_rrr: 0,
        frame_rgr: 1,
        frame_grr: 2,
        frame_ggg: 3,
        frame_ggg_pressed: 4,
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.state = {
            enabled: false,
            mouseHoveringOverAssociate: false,
        };

        const state = this.state;
        this.clickregion_associate = document.getElementById('screen_clickregion_associate');
        this.clickregion_associate.hidden = true;
        this.clickregion_associate.addEventListener('mouseover', (event) => { state.mouseHoveringOverAssociate = true; });
        this.clickregion_associate.addEventListener('mouseleave', (event) => { state.mouseHoveringOverAssociate = false; });
        this.clickregion_associate.addEventListener('click', (event) => {
            console.log("Clicked associate!");
            //...
        });
    }

    draw(timeStamp) {
        let frame = Station.animation.frame_rrr;
        if (this.state.enabled) {
            //...
        }
        this.ctx.drawImage(
            Station.animation.image,
            frame * Station.animation.frameWidth, 0,
            Station.animation.frameWidth, Station.animation.frameHeight,
            0, 0,
            Station.animation.frameWidth, Station.animation.frameHeight
        );
    }
}

export default Station;