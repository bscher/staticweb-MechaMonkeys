/// Returns a deterministic frame number with just the current time
function getFrameFromTime(timeStamp, totalFrames, millisPerFrame) {
    const animationPeriod = totalFrames * millisPerFrame;
    return Math.floor((timeStamp % animationPeriod) / millisPerFrame);
}

export default getFrameFromTime;