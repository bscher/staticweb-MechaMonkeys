import { getNumberAsFixedString, getFrameFromTime } from "../utils";
import {
    connectToEthWallet,
    attemptEthMint
} from "../EthLink";
import {
    connectToGMEWallet,
    attemptGMEMint
} from "../GMELink";


class Station {

    static animation = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_mint/station_sheet.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
        frameCount: 15,
        framePeriod: 150, //ms
        frame_rrr: 15,
        frame_rgr: 16,
        frame_grr: 17,
        frame_ggg: 18,
        frame_ggg_pressed: 19,
        frame_justPlatform: 14
    };

    // static image_cover = {
    //     image: (() => {
    //         const _img = new Image();
    //         _img.src = "img/scene_mint/station_cover.png";
    //         return _img;
    //     })(),
    //     frameWidth: 750,
    //     frameHeight: 750,
    // };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.state = {
            countdown1Timestamp: 1657933200000, // Friday, July 15, 2022 6:00:00 PM GMT-07:00
            countdown1FinishedTimestamp: 0,
            countdownIntermissionMillis: 10000,
            countdownIntermissionStarted: false,
            countdownIntermissionEnded: false,
            countdown2Timestamp: 1659142800000, // Friday, July 29, 2022 6:00:00 PM GMT-07:00
            countdown2FinishedTimestamp: 0,
            //mouseHoveringOver_mm: false,
            //mouseHoveringOver_gme: false,
            //isAssociated: false,
            //isGME: false,
            //isEth: false,
            //mouseHoveringOver_mint: false,
            //doneWithStation: false,
            //doneWithStationTimeStamp: 0
        };

        this.TIME_DIFF = null;

        // Skip countdown #1 if after time
        const utcNow = (new Date()).getTime();
        if (utcNow > this.state.countdown1Timestamp) {
            this.state.countdownIntermissionStarted = true;
            this.state.countdownIntermissionEnded = true;
        }

        this.clickregion_associate_mm = document.getElementById('screen_clickregion_associate_mm');
        // (() => {
        //     this.clickregion_associate_mm.addEventListener('mouseover', (event) => { this.state.mouseHoveringOver_mm = true; });
        //     this.clickregion_associate_mm.addEventListener('mouseleave', (event) => { this.state.mouseHoveringOver_mm = false; });
        //     this.clickregion_associate_mm.addEventListener('click', (event) => {
        //         console.log("Clicked associate MM!");
        //         this.attemptToConnectToEthWallet();
        //     });
        // })();
        this.clickregion_associate_gme = document.getElementById('screen_clickregion_associate_gme');
        // (() => {
        //     this.clickregion_associate_gme.addEventListener('mouseover', (event) => { this.state.mouseHoveringOver_gme = true; });
        //     this.clickregion_associate_gme.addEventListener('mouseleave', (event) => { this.state.mouseHoveringOver_gme = false; });
        //     this.clickregion_associate_gme.addEventListener('click', (event) => {
        //         console.log("Clicked associate GME!");
        //         this.attemptToConnectToGMEWallet();
        //     });
        // })();
        this.clickregion_mint = document.getElementById('screen_clickregion_mint');
        // (() => {
        //     this.clickregion_mint.addEventListener('mouseover', (event) => { this.state.mouseHoveringOver_mint = true; });
        //     this.clickregion_mint.addEventListener('mouseleave', (event) => { this.state.mouseHoveringOver_mint = false; });
        //     this.clickregion_mint.addEventListener('click', (event) => {
        //         console.log("Clicked mint!");
        //         if (this.state.isAssociated) {
        //             this.attemptToMint()
        //                 .then((success) => {
        //                     console.log("Tried to mint. Returned non-error.");
        //                 })
        //                 .catch((error) => {
        //                     console.log("Failed to mint.");
        //                     console.log(error);
        //                 });
        //         }
        //     });
        // })();

        this.toggleAllButtons(false);
    }

    // attemptToConnectToEthWallet() {
    //     connectToEthWallet()
    //         .then((connectSuccess) => {
    //             console.log("Connect returned: " + connectSuccess);
    //             if (connectSuccess) {
    //                 this.state.isAssociated = true;
    //                 this.state.isEth = true;
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("Failed to connect to Eth wallet: " + err);
    //         });
    // }

    // attemptToConnectToGMEWallet() {
    //     connectToGMEWallet()
    //         .then((connectSuccess) => {
    //             console.log("Connect returned: " + connectSuccess);
    //             if (connectSuccess) {
    //                 this.state.isAssociated = true;
    //                 this.state.isGME = true;
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("Failed to connect to GME wallet: " + err);
    //         });
    // }

    // async attemptToMint() {
    //     if (this.state.isEth) {
    //         return await attemptEthMint();
    //     } else {
    //         return await attemptGMEMint();
    //     }
    // }

    toggleMintButton(isButtonEnabled) {
        this.clickregion_mint.hidden = !isButtonEnabled;
    }

    toggleWalletLinkButtons(areButtonsEnabled) {
        this.clickregion_associate_mm.hidden = !areButtonsEnabled;
        this.clickregion_associate_gme.hidden = !areButtonsEnabled;
    }

    toggleAllButtons(areButtonsEnabled) {
        this.toggleWalletLinkButtons(areButtonsEnabled);
        this.toggleMintButton(areButtonsEnabled);
    }

    drawMechs() {

    }

    drawTimer(timeStamp, totalMillisRemaining, textOverride) {
        let textToRender = textOverride;
        if (!textToRender) {
            const millis_str = getNumberAsFixedString(totalMillisRemaining % 1000, 3);
            const secs_str = getNumberAsFixedString(Math.floor(totalMillisRemaining / 1000) % 60, 2);
            const mins_str = getNumberAsFixedString(Math.floor(totalMillisRemaining / 1000 / 60) % 60, 2);
            const hours_str = getNumberAsFixedString(Math.floor(totalMillisRemaining / 1000 / 60 / 60) % 60, 2);
            const days_str = getNumberAsFixedString(Math.min(99, Math.floor(totalMillisRemaining / 1000 / 60 / 60 / 24)), 3);

            textToRender = `${days_str}:${hours_str}:${mins_str}:${secs_str}.${millis_str}`;
        }
        if (textOverride && ((timeStamp % 1500) > 750)) {
            // Render nothing
        } else {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(255,0,0,1)';
            this.ctx.font = "bold 26px courier";
            this.ctx.fillText(textToRender, 253, 652);
            this.ctx.restore();
        }
    }

    draw(timeStamp) {
        if (this.TIME_DIFF) {
            timeStamp += this.TIME_DIFF;
        }

        this.ctx.drawImage(
            Station.animation.image,
            Station.animation.frame_justPlatform * Station.animation.frameWidth, 0,
            Station.animation.frameWidth, Station.animation.frameHeight,
            0, 0,
            Station.animation.frameWidth, Station.animation.frameHeight
        );

        if (!this.state.countdownIntermissionStarted && !this.state.countdownIntermissionEnded) {
            // Render timer for #1
            this.drawTimer(timeStamp, this.state.countdown1Timestamp - timeStamp, null);

            if (timeStamp > this.state.countdown1Timestamp) {
                this.state.countdown1FinishedTimestamp = timeStamp;
                this.state.countdownIntermissionStarted = true;
            }
        } else if (this.state.countdownIntermissionStarted && !this.state.countdownIntermissionEnded) {
            // Render text for revealed
            this.drawTimer(timeStamp, 0, "-- REVEAL, GO --");
            this.drawMechs();

            if ((timeStamp - this.state.countdown1FinishedTimestamp) > this.state.countdownIntermissionMillis) {
                this.state.countdownIntermissionEnded = true;
            }
        } else if (this.state.countdownIntermissionStarted && this.state.countdownIntermissionEnded) {
            // Render timer for #2
            if (timeStamp < this.state.countdown2Timestamp) {
                this.drawTimer(timeStamp, this.state.countdown2Timestamp - timeStamp, null);
            } else {
                // Render text for completed
                this.drawTimer(timeStamp, 0, "--  COMPLETE  --");
            }
            this.drawMechs();
        }
    }
}

export default Station;