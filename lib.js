/**
 * Get Random Integer
 * 
 * @param {int} max - Maximum number of a range from 0
 * 
 * @returns {int} - The random integer
 */
function getRandomInt(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Round Float Down
 * 
 * @param {float} value - Number to round down
 * @param {integer} multiple - Multiple to round to
 * 
 * @returns {integer} - Value rounded down to the nearest whole multiple
 */
function roundDown(value, multiple)
{
    return Math.round(value/multiple) * multiple;
}

export {
    getRandomInt,
    roundDown
};