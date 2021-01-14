
import { Block, BLOCK_SIZE, BLOCK_DRAW_SIZE, snapToGrid } from "./Block.js"

const APPLE_COLOR = '#db3737'

/**
 * The Apple the snake eats
 */
class Apple extends Block {

    /**
     * Constructor for Apple objects
     *
     * @param {number} width  the width of the canvas being drawn to
     * @param {number} height the height of the canvas being draw to
     */
    constructor(width, height) {
        super(0, 0)
        
        /**
         * Generates a random coordinate value
         *
         * @param {number} lim highest value
         * @return {number} the coordinate
         */
        const randCoord = (lim) => snapToGrid((Math.random() * BLOCK_SIZE) * (lim / BLOCK_SIZE))
    
        /**
         * Moves this Apple to a random location on the grid that the given snake is not already
         * occupying
         *
         * @param {Snake} snake the snake eating this Apple
         */
        this.eat = (snake) => {
            do {
                this.x = randCoord(width)
                this.y = randCoord(height)
            } while(snake.occupied(this))
        }

        /**
         * draws this Apple to the canvas
         *
         * @param {CanvasRenderingContext2D} context the context of the canvas
         */
        this.draw = (context) => {
            context.fillStyle = APPLE_COLOR
            context.fillRect(this.x + 1, this.y + 1, BLOCK_DRAW_SIZE, BLOCK_DRAW_SIZE)
        }

        // initialize Position
        {
            let x, y
            const snakeHeadX = width / 2
            const snakeTailX = snakeHeadX - BLOCK_SIZE
            const snakeY = height / 2
            do {
                x = randCoord(width)
                y = randCoord(height)
            } while(y === snakeY && (x === snakeHeadX || x === snakeTailX))
            this.x = x
            this.y = y
        }
        
    }
}

export { APPLE_COLOR, Apple }
export default Apple
