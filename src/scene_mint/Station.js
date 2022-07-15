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

    static image_cover = {
        image: (() => {
            const _img = new Image();
            _img.src = "img/scene_mint/station_cover.png";
            return _img;
        })(),
        frameWidth: 750,
        frameHeight: 750,
    };

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.state = {
            enabledAtUTCTime: 1657933200000,
            mouseHoveringOver_mm: false,
            mouseHoveringOver_gme: false,
            isAssociated: false,
            isGME: false,
            isEth: false,
            mouseHoveringOver_mint: false,
            doneWithStation: false,
            doneWithStationTimeStamp: 0
        };

        this.clickregion_associate_mm = document.getElementById('screen_clickregion_associate_mm');
        (() => {
            this.clickregion_associate_mm.hidden = true;
            this.clickregion_associate_mm.addEventListener('mouseover', (event) => { this.state.mouseHoveringOver_mm = true; });
            this.clickregion_associate_mm.addEventListener('mouseleave', (event) => { this.state.mouseHoveringOver_mm = false; });
            this.clickregion_associate_mm.addEventListener('click', (event) => {
                console.log("Clicked associate MM!");
                this.attemptToConnectToEthWallet();
            });
        })();
        this.clickregion_associate_gme = document.getElementById('screen_clickregion_associate_gme');
        (() => {
            this.clickregion_associate_gme.hidden = true;
            this.clickregion_associate_gme.addEventListener('mouseover', (event) => { this.state.mouseHoveringOver_gme = true; });
            this.clickregion_associate_gme.addEventListener('mouseleave', (event) => { this.state.mouseHoveringOver_gme = false; });
            this.clickregion_associate_gme.addEventListener('click', (event) => {
                console.log("Clicked associate GME!");
                this.attemptToConnectToGMEWallet();
            });
        })();
        this.clickregion_mint = document.getElementById('screen_clickregion_mint');
        (() => {
            this.clickregion_mint.hidden = true;
            this.clickregion_mint.addEventListener('mouseover', (event) => { this.state.mouseHoveringOver_mint = true; });
            this.clickregion_mint.addEventListener('mouseleave', (event) => { this.state.mouseHoveringOver_mint = false; });
            this.clickregion_mint.addEventListener('click', (event) => {
                console.log("Clicked mint!");
                if (this.state.isAssociated) {
                    this.attemptToMint()
                        .then((success) => {
                            console.log("Tried to mint. Returned non-error.");
                            if (success) {
                                this.startYoinkAnimation((new Date()).getTime());
                            }
                        })
                        .catch((error) => {
                            console.log("Failed to mint.");
                            console.log(error);
                        });
                }
            });
        })();

        this.toggleAllButtons(false);
    }

    attemptToConnectToEthWallet() {
        connectToEthWallet()
            .then((connectSuccess) => {
                console.log("Connect returned: " + connectSuccess);
                if (connectSuccess) {
                    this.state.isAssociated = true;
                    this.state.isEth = true;
                }
            })
            .catch((err) => {
                console.log("Failed to connect to Eth wallet: " + err);
            });
    }

    attemptToConnectToGMEWallet() {
        connectToGMEWallet()
            .then((connectSuccess) => {
                console.log("Connect returned: " + connectSuccess);
                if (connectSuccess) {
                    this.state.isAssociated = true;
                    this.state.isGME = true;
                }
            })
            .catch((err) => {
                console.log("Failed to connect to GME wallet: " + err);
            });
    }


    async attemptToMint() {
        // if (this.state.isEth) {
        //     return await attemptEthMint();
        // } else {
        //     return await attemptGMEMint();
        // }
    }

    startYoinkAnimation(timeStamp) {
        // this.state.doneWithStation = true;
        // this.state.doneWithStationTimeStamp = timeStamp;
        // this.toggleAllButtons(false);
    }

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

    drawTimer(timeStamp, totalMillisRemainingUntilMint) {
        if (totalMillisRemainingUntilMint > 0) {
            const millis_str = getNumberAsFixedString(totalMillisRemainingUntilMint % 1000, 3);
            const secs_str = getNumberAsFixedString(Math.floor(totalMillisRemainingUntilMint / 1000) % 60, 2);
            const mins_str = getNumberAsFixedString(Math.floor(totalMillisRemainingUntilMint / 1000 / 60) % 60, 2);
            const hours_str = getNumberAsFixedString(Math.floor(totalMillisRemainingUntilMint / 1000 / 60 / 60) % 60, 2);
            const days_str = getNumberAsFixedString(Math.min(99, Math.floor(totalMillisRemainingUntilMint / 1000 / 60 / 60 / 24)), 3);

            this.ctx.save();
            this.ctx.fillStyle = 'rgba(255,0,0,1)';
            this.ctx.font = "bold 26px monospace";
            this.ctx.fillText(`${days_str}:${hours_str}:${mins_str}:${secs_str}.${millis_str}`, 265, 653);
            this.ctx.restore();
        } else {
            this.toggleAllButtons(true);
            if (timeStamp % 1500 > 750) {
                this.ctx.save();
                this.ctx.fillStyle = 'rgba(255,0,0,1)';
                this.ctx.font = "bold 26px monospace";
                this.ctx.fillText(`UPDATE IN PROGRESS`, 265, 653);
                this.ctx.restore();
            }
        }
    }

    draw(timeStamp) {
        const totalMillisRemainingUntilMint = Math.max(0, this.state.enabledAtUTCTime - timeStamp);

        let frame = Station.animation.frame_justPlatform;
        // if (totalMillisRemainingUntilMint === 0) {
        //     if (this.state.isAssociated) {
        //         if (this.state.doneWithStation) {
        //             const elapsedTime = timeStamp - this.state.doneWithStationTimeStamp;
        //             const maxAnimationTime = Station.animation.frameCount * Station.animation.framePeriod;
        //             if (elapsedTime > maxAnimationTime) {
        //                 frame = Station.animation.frame_justPlatform;
        //             } else {
        //                 frame = getFrameFromTime(elapsedTime, Station.animation.frameCount, Station.animation.framePeriod);
        //             }
        //         } else {
        //             frame = Station.animation.frame_ggg;
        //         }
        //     } else {
        //         if (this.state.mouseHoveringOver_mm) {
        //             frame = Station.animation.frame_grr;
        //         } else if (this.state.mouseHoveringOver_gme) {
        //             frame = Station.animation.frame_rgr;
        //         } else {
        //             frame = Station.animation.frame_rrr;
        //         }
        //     }
        // }
        this.ctx.drawImage(
            Station.animation.image,
            frame * Station.animation.frameWidth, 0,
            Station.animation.frameWidth, Station.animation.frameHeight,
            0, 0,
            Station.animation.frameWidth, Station.animation.frameHeight
        );

        // if (totalMillisRemainingUntilMint > 0) {
        //     this.ctx.drawImage(
        //         Station.image_cover.image,
        //         0, 0,
        //         Station.image_cover.frameWidth, Station.image_cover.frameHeight,
        //         0, 0,
        //         Station.image_cover.frameWidth, Station.image_cover.frameHeight
        //     );
        // }

        this.drawTimer(timeStamp, totalMillisRemainingUntilMint);
    }
}

export default Station;