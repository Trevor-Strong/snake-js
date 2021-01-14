import IllegalArgumentError from "./IllegalArgumentError.js";

const BLOCK_SIZE = 20
const BLOCK_DRAW_SIZE = 18

/**
 * floors the passed number to the nearest coordinate that is on the grid
 *
 * @param {number} coord the coordinate to snap to the grid
 *
 * @return {number} the number rounded down such that it is on the grid
 */
function snapToGrid(coord) {
    coord = Math.floor(+coord)
    let rem = coord % 20
    if(rem !== 0) {
        coord -= rem
    }
    return coord
}

/**
 * A 2-Dimensional Block that can be draw to a canvas
 */
class Block {
    
    /**
     * Constructor for Block objects
     *
     * @param {number} [x = 0] x position of this Block
     * @param {number} [y = 0] y position of this Block
     */
    constructor(x = 0, y = 0) {
        x = snapToGrid(x)
        y = snapToGrid(y)
        let drawX = x + 1
        let drawY = y + 1
        Object.defineProperties(this, {
            x: {
                get: () => x,
                set: (v) => {
                    if(!isNaN(v) && (v = +v) >= 0) {
                        x = v;
                        drawX = x + 1;
                    }
                },
                enumerable: true,
                configurable: false
            },
            y: {
                get: () => y,
                set: (v) => {
                    if(!isNaN(v) && (v = +v) >= 0) {
                        y = v;
                        drawY = y + 1;
                    }
                },
                enumerable: true,
                configurable: false
            }
        })
        
        /**
         * Draws this Block to the canvas of the passed context
         *
         * @param {CanvasRenderingContext2D} context the context to draw on
         */
        this.draw = (context) => {
            context.rect(drawX, drawY, BLOCK_DRAW_SIZE, BLOCK_DRAW_SIZE)
        }
        
        /**
         * Moves this Block to the given coordinates
         *
         * @param {{x: number, y: number}|[number, number]} coordinates the coordinates to move to,
         * the coordinates may be passed as an object with "x" and "y" properties, or as separate
         * values where the x value is first and the y value is second
         */
        this.moveTo = (...coordinates) => {
            const length = coordinates.length
            let x1, y1
            if(length === 1) {
                const coord = coordinates[0]
                if(coord.hasOwnProperty('x') && coord.hasOwnProperty('y')) {
                    x1 = coord.x
                    y1 = coord.y
                } else {
                    throw new IllegalArgumentError(`Invalid coordinate object: ${coord}`)
                }
            } else if(length === 2) {
                x1 = coordinates[0]
                y1 = coordinates[1]
            } else {
                throw new IllegalArgumentError(
                    `Invalid argument for the moveTo method: [${coordinates}]`)
            }
            x = x1
            y = y1
            drawX = x + 1
            drawY = y + 1
        }
        
        /**
         * creates a copy of this Block
         *
         * @return {Block} the copy
         */
        this.copy = () => new Block(x, y)
        
        /**
         * checks if this Block is equal to some other object
         *
         * @param {any} other the other object
         * @return {boolean} true if the object's x and y properties are equal to this Block's
         *                   x and y properties
         */
        this.equals = (other) => other && x === other.x && y === other.y
    }
}



export { Block, BLOCK_SIZE, BLOCK_DRAW_SIZE, snapToGrid }
