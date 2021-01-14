
/**
 * checks if x IS NOT undefined or null
 *
 * @param {any} x the thing checked
 * @return {boolean} true if x is not undefined or null
 */
const isDefined = (x) => x !== undefined && x !== null

/**
 * checks if x IS undefined or null
 *
 * @param {any} x the thing checked
 * @return {boolean} true if x is undefined or null
 */
const isUndefined = (x) => x === undefined || x === null

export { isDefined, isUndefined }
