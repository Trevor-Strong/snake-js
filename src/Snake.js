
import { isDefined } from "./util.js"
import { Block, BLOCK_SIZE } from "./Block.js"

/**
 * the color used to draw the Snake
 *
 * @type {string}
 */
const SNAKE_COLOR = '#21a921'

/**
 * Direction of the snake
 * @enum
 */
const Direction = (() => {
    const Direction = {
        UP: Symbol('KeyW'),
        DOWN: Symbol('KeyS'),
        RIGHT: Symbol('KeyD'),
        LEFT: Symbol('KeyA'),
        flip(direc) {
            if(direc === Direction.RIGHT)
                return Direction.LEFT
            else if(direc === Direction.LEFT)
                return Direction.RIGHT
            else if(direc === Direction.DOWN)
                return Direction.UP
            else if(direc === Direction.UP)
                return Direction.DOWN
        }
    }
    Object.freeze(Direction)
    return Direction
})()

/**
 * Body of the snake
 *
 * @private to Snake class
 */
class Body extends Array {

    /**
     * Constructor for the Body
     *
     * @param {number} x head x position
     * @param {number} y head y position
     */
    constructor(x, y) {
        super();
        this.push(new Block(x, y), new Block(x - BLOCK_SIZE, y)) // insert starting body parts

        Object.defineProperties(this, {

            /**
             * first element (head) of the snake
             */
            head: {
                get: () => this[0],
                set: (value) => this[0] = value,
                enumerable: false,
                configurable: false,
            },

            /**
             * last element (tail) of the snake
             */
            tail: {
                get: () => this[this.length - 1],
                set: (value) => this[this.length - 1] = value,
                enumerable: false,
                configurable: false
            }
        })
    }
}

/**
 * The Snake
 */
class Snake {

    /**
     * Constructor for Snake, the passed x and y is the position of the head.
     * Initial length is an optional argument, if the value passed is not a number greater than 2
     * and less than
     *
     * @param {number} x the initial x position of the head
     * @param {number} y the initial y position of the head
     */
    constructor(x, y) {
        const body = new Body(x, y)
        let newEnd = null
        let headDirec = Direction.RIGHT

        /**
         * length of the snake
         *
         * @type {number}
         */
        Object.defineProperty(this, 'length', {
            get: () => body.length + (newEnd !== null ? 1 : 0),
            set: ()  => {},
            enumerable: false,
            configurable: false
        })

        /**
         * Moves this Snake in the given direction
         *
         * @param {Direction} direc direction to move
         */
        this.move = (direc) => {
            if(Direction.flip(direc) === headDirec) {
                headDirec = null
                return
            } else {
                headDirec = direc
            }

            for(let i = body.length - 1; i > 0; i--)
                body[i].moveTo(body[i - 1])

            if(direc === Direction.RIGHT)
                body.head.x += BLOCK_SIZE
            else if(direc === Direction.LEFT)
                body.head.x -= BLOCK_SIZE
            else if(direc === Direction.DOWN)
                body.head.y += BLOCK_SIZE
            else if(direc === Direction.UP)
                body.head.y -= BLOCK_SIZE

            if(newEnd !== null) {
                body.push(newEnd)
                newEnd = null
            }
        }

        /**
         * Draws this Snake to the canvas
         *
         * @param {CanvasRenderingContext2D} context - the context of the canvas
         */
        this.draw = (context) => {
            context.beginPath()
            body.forEach(part => part.draw(context))
            context.closePath()
            context.fillStyle = SNAKE_COLOR
            context.fill()
        }

        /**
         * Tests if this Snake is in the canvas bounds
         *
         * @param {number} width  - width of the canvas
         * @param {number} height - height of the canvas
         *
         * @return {boolean} true if this Snake is in bounds, otherwise false
         */
        this.isInBounds = (width, height) => {
            if(headDirec === null) {
                return false
            }
            const { head } = body
            const { x, y } = head
            const inBounds = x >= 0 && x <= (width - BLOCK_SIZE) &&
                y >= 0 && y <= (height - BLOCK_SIZE)
            if(inBounds) {
                if(head.equals(newEnd) || head.equals(body.tail)) {
                    return false
                }
                const len = body.length
                for(let i = 1; i < len; i++) {
                    if(head.equals(body[i])) {
                        return false
                    }
                }
            }
            return inBounds
        }

        /**
         * Eats the apple if able
         *
         * @param {Apple} apple - the apple to try to eat
         */
        this.tryEat = (apple) => {
            if(apple && body.head.equals(apple)) {
                apple.eat(this)
                newEnd = body.tail.copy()
            }
        }
    
        /**
         * tests if the given point is occupied
         *
         * @param {x, y} point the point to test
         * @param {number} point.x the x position of the point
         * @param {number} point.y the y position of the point
         *
         * @return {boolean} true if this Snake is at the given point, else false
         */
        this.occupied = (point) => {
            if(point && isDefined(point.x) && isDefined(point.y)) {
                if(body.head.equals(point) ||
                    body.tail.equals(point) ||
                    (newEnd && newEnd.equals(point))) {
                    return true
                } else {
                    const len = this.length
                    for(let i = 1; i < len; i++) {
                        if(body[i].equals(point)) {
                            return true
                        }
                    }
                }
            }
            return false
        }
    }
}

export { Direction, Snake, SNAKE_COLOR }
export default Snake
