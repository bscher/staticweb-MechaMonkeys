/// Returns a deterministic frame number with just the current time
function getFrameFromTime(timeStamp, totalFrames, millisPerFrame) {
    const animationPeriod = totalFrames * millisPerFrame;
    return Math.floor((timeStamp % animationPeriod) / millisPerFrame);
}

function getNumberAsFixedString(num, targetLength) {
    return String(num).padStart(targetLength, '0');
}

export { getFrameFromTime, getNumberAsFixedString };