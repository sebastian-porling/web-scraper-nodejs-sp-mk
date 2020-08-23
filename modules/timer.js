var time;

/**
 * Starts the timer
 */
module.exports.start = () => {
    time = process.hrtime();
};

/**
 * Ends the timer
 * @returns elapsed time with seconds and milliseconds as string
 */
module.exports.stop = () => {
    if (time === undefined) return;
    const precision = 3;
    const elapsed = process.hrtime(time)[1] / 1000000;
    const sec = process.hrtime(time)[0];
    const ms = elapsed.toFixed(precision);
    time = undefined;
    return `${sec}s, ${ms}ms`;
};
