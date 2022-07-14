import { getNumberAsFixedString } from "../utils";

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
            enabledAtUTCTime: 1657846555000,
            mouseHoveringOver_mm: false,
            mouseHoveringOver_gme: false,
            isAssociated: false,
            mouseHoveringOver_mint: false,
        };

        const state = this.state;
        this.clickregion_associate_mm = document.getElementById('screen_clickregion_associate_mm');
        (() => {
            this.clickregion_associate_mm.hidden = true;
            this.clickregion_associate_mm.addEventListener('mouseover', (event) => { state.mouseHoveringOver_mm = true; });
            this.clickregion_associate_mm.addEventListener('mouseleave', (event) => { state.mouseHoveringOver_mm = false; });
            this.clickregion_associate_mm.addEventListener('click', (event) => {
                console.log("Clicked associate MM!");
                //...
            });
        })();
        this.clickregion_associate_gme = document.getElementById('screen_clickregion_associate_gme');
        (() => {
            this.clickregion_associate_gme.hidden = true;
            this.clickregion_associate_gme.addEventListener('mouseover', (event) => { state.mouseHoveringOver_mm = true; });
            this.clickregion_associate_gme.addEventListener('mouseleave', (event) => { state.mouseHoveringOver_mm = false; });
            this.clickregion_associate_gme.addEventListener('click', (event) => {
                console.log("Clicked associate GME!");
                //...
            });
        })();
        this.clickregion_mint = document.getElementById('screen_clickregion_mint');
        (() => {
            this.clickregion_mint.hidden = true;
            this.clickregion_mint.addEventListener('mouseover', (event) => { state.mouseHoveringOver_mint = true; });
            this.clickregion_mint.addEventListener('mouseleave', (event) => { state.mouseHoveringOver_mint = false; });
            this.clickregion_mint.addEventListener('click', (event) => {
                console.log("Clicked mint!");
                //...
            });
        })();
    }

    drawTimer(timeStamp) {

        const totalMillisRemaining = Math.max(0, this.state.enabledAtUTCTime - timeStamp);
        console.log(totalMillisRemaining);

        const millis_str = getNumberAsFixedString(totalMillisRemaining % 1000, 3);
        const secs_str = getNumberAsFixedString(Math.floor(totalMillisRemaining / 1000) % 60, 2);
        const mins_str = getNumberAsFixedString(Math.floor(totalMillisRemaining / 1000 / 60) % 60, 2);
        const hours_str = getNumberAsFixedString(Math.floor(totalMillisRemaining / 1000 / 60 / 60) % 60, 2);
        const days_str = getNumberAsFixedString(Math.min(99, Math.floor(totalMillisRemaining / 1000 / 60 / 60 / 24)), 2);

        this.ctx.save();
        this.ctx.fillStyle = 'rgba(255,0,0,1)';
        this.ctx.font = "bold 26px monospace";
        this.ctx.fillText(`${days_str}:${hours_str}:${mins_str}:${secs_str}.${millis_str}`, 270, 653);
        this.ctx.restore();
    }

    draw(timeStamp) {
        // Console image
        let frame = Station.animation.frame_rrr;
        if (this.state.enabled) {
            //...
        } else {
            this.ctx.drawImage(
                Station.animation.image,
                frame * Station.animation.frameWidth, 0,
                Station.animation.frameWidth, Station.animation.frameHeight,
                0, 0,
                Station.animation.frameWidth, Station.animation.frameHeight
            );
        }

        this.drawTimer(timeStamp);
    }
}

export default Station;