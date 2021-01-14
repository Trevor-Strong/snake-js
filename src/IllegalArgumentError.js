/**
 * value of the "name" property for IllegalArgumentError objects
 *
 * @type {string}
 * @private
 */
const _ILLEGAL_ARG_ERR_NAME = 'IllegalArgumentError'

/**
 * An Error to be thrown when an invalid argument is received by a function or method
 */
class IllegalArgumentError extends Error {
    
    /**
     * creates a new IllegalArgumentError with the given message
     *
     * @param {string} [message] - a message describing the error
     */
    constructor(message) {
        super(message)
        this.name = _ILLEGAL_ARG_ERR_NAME
    }
    
}

export { IllegalArgumentError }
export default IllegalArgumentError