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

export {
    getRandomInt
};