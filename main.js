
import Apple from './src/Apple.js'
import Snake from './src/Snake.js'
import { Direction } from "./src/Snake.js";
import {
    drawA, drawD, drawE, drawG, drawM, drawO, drawP, drawR, drawS,
    drawU, drawV, fill, clearRect, getContext, setContext, FONT_SIZE
} from './src/letter-sketch.js'

/**
 * color of the text drawn on the canvas when on the "Pause" and "Game Over" screen
 * @type {string}
 */
const FONT_COLOR  = '#d9d9d9'

/**
 * Length of time each frame is displayed in milliseconds
 * @type {number}
 */
const FRAME_LENGTH = 125

/**
 * draws 'GAME OVER' to the canvas
 */
function drawGameOver() {
    getContext().beginPath()
    getContext().fillStyle = FONT_COLOR
    const y = 400
    let x = 175
    x = drawG(x, y)
    x = drawA(x, y)
    x = drawM(x, y)
    x = drawE(x, y)
    x += FONT_SIZE
    x = drawO(x, y)
    x = drawV(x, y)
    x = drawE(x, y)
    drawR(x, y)
    fill()
}

/**
 * draws 'PAUSED' to the canvas
 */
function drawPaused() {
    getContext().beginPath()
    getContext().fillStyle = FONT_COLOR
    const y = 400
    let x = 250
    x = drawP(x, y)
    x = drawA(x, y)
    x = drawU(x, y)
    x = drawS(x, y)
    x = drawE(x, y)
    drawD(x, y)
    fill()
}

window.onload = () => {

    // HTML elements referenced

    let board = document.getElementById('board')
    setContext(board.getContext('2d'))
    let resetBtn = document.getElementById('reset-btn')
    let scoreDisplay = document.getElementById('score-display')

    // variables

    let loopId = -1
    let lastKey = null
    let ended = false
    let paused = false
    let direc = Direction.RIGHT
    let snake
    let apple

    const { width, height } = board

    const calcScore = () => Math.floor((snake.length - 2) * 10)

    const drawFrame = () => {
        clearRect(0, 0, width, height)
        snake.draw(getContext())
        apple.draw(getContext())
        scoreDisplay.innerText = `Score: ${calcScore()}`
    }

    const gameLoop = () => {
        snake.move(direc)
        snake.tryEat(apple)
        drawFrame()
        if(!snake.isInBounds(width, height)) {
            ended = true
            window.clearInterval(loopId)
            drawGameOver(getContext())
        }
    }

    const startGame = () => {
        snake = new Snake((width / 2), height / 2)
        apple = new Apple(width, height)
        direc = Direction.RIGHT
        drawFrame()
        loopId = window.setInterval(gameLoop, FRAME_LENGTH)
    }

    const pause = () => {
        if(!ended) {
            if(paused) {
                loopId = window.setInterval(gameLoop, FRAME_LENGTH)
            } else {
                window.clearInterval(loopId)
                drawPaused()
            }
            paused = !paused
        }
    }

    const reset = () => {
        if(ended) {
            ended = false
            paused = false
            lastKey = null
            startGame()
        }
    }

    window.onkeydown = (event) => {
        const key = event.code
        if(ended && key === 'KeyR') {
            reset()
        } else if(!ended) {
            if(key === 'KeyP') {
                pause()
            } else if(key !== lastKey) {
                lastKey = key
                if(key === 'KeyD') {
                    direc = Direction.RIGHT
                } else if(key === 'KeyA') {
                    direc = Direction.LEFT
                } else if(key === 'KeyW') {
                    direc = Direction.UP
                } else if(key === 'KeyS') {
                    direc = Direction.DOWN
                }
            }
        }
    }
    resetBtn.onclick = reset

    startGame()
}
