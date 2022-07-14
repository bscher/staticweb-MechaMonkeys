/// Returns a deterministic frame number with just the current time
function getFrameFromTime(timeStamp, totalFrames, millisPerFrame) {
    const animationPeriod = totalFrames * millisPerFrame;
    return Math.floor((timeStamp % animationPeriod) / millisPerFrame);
}

function getNumberAsFixedString(num, targetLength) {
    let x = String(num).padStart(targetLength, '0');
    //console.log(`${(typeof num)} ${num} - ${targetLength} - ${x}`);
    return x;
}

export { getFrameFromTime, getNumberAsFixedString };