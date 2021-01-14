/**
 * the context used to draw
 *
 * @type {CanvasRenderingContext2D}
 */
let context = null

/**
 * sets the context to use to draw
 *
 * @param {CanvasRenderingContext2D} ctx the context to draw with
 */
const setContext = (ctx) => {
    if(ctx instanceof CanvasRenderingContext2D) {
        context = ctx
    }
}

/**
 * Returns the context used to draw
 * @return {CanvasRenderingContext2D} the context used
 */
const getContext = () => context

/**
 * Default font size
 *
 * @type {number}
 */
const FONT_SIZE = 10


const shfRt = (x, amt, sz = FONT_SIZE) => x + (sz * amt)
const shfUp = (y, amt, sz = FONT_SIZE) => y - (sz * amt)

/**
 * clears the specified region
 *
 * @param {number} x - x position of the area
 * @param {number} y - y position of the area
 * @param {number} w - width of the area
 * @param {number} h - height of the area
 */
const clearRect = (x, y, w, h) => context.clearRect(x, y, w, h)

/**
 * fills the current context path according to the fillStyle
 *
 * @param {"evenodd"|"nonzero"} [fillRule = "evenodd"] The algorithm used to determine where to fill
 * @see CanvasRenderingContext2D.fill
 */
const fill = (fillRule) => context.fill(fillRule)

/**
 * strokes out the current path according to the strokeStyle
 *
 * @see CanvasRenderingContext2D.stroke
 */
const stroke = () => context.stroke()

/**
 * draws (but does not render) the described rectangle
 *
 * @param {number} x x position of the rectangle
 * @param {number} y y position of the rectangle
 * @param {number} w width of the rectangle
 * @param {number} h height of the rectangle
 * @param {number} s scalar for width and height
 */
function drawRect(x, y, w, h, s = FONT_SIZE) {
    w = w === 1 ? s : w * s
    h = h === 1 ? s : h * s
    context.rect(x, y, w, h)
}

/**
 * draws (but does not render) the letter 'A'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawA(x, y, s = FONT_SIZE) {
    const up5 = shfUp(y, 5, s)
    const rt1 = shfRt(x, 1, s)
    drawRect(x, up5, 1, 6, s)
    drawRect(rt1, shfUp(y, 6, s), 2, 1, s)
    drawRect(shfRt(x, 3, s), up5, 1, 6, s)
    drawRect(rt1, shfUp(y, 3, s), 2, 1, s)
    return shfRt(x, 5, s)
}

/**
 * draws (but does not render) the letter 'D'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawD(x, y, s = FONT_SIZE) {
    const up6 = shfUp(y, 6, s)
    const rt1 = shfRt(x, 1, s)
    drawRect(x, up6, 1, 7, s)
    drawRect(rt1, up6, 3, 1, s)
    drawRect(shfRt(x, 4), shfUp(y, 5), 1, 5, s)
    drawRect(rt1, y, 3, 1, s)
    return shfRt(x, 5, s)
}

/**
 * draws (but does not render) the letter 'E'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawE(x, y, s = FONT_SIZE) {
    const up6 = shfUp(y, 6, s)
    const rt1 = shfRt(x, 1, s)
    drawRect(x, up6, 1, 7, s)
    drawRect(rt1, y, 3, 1, s)
    drawRect(rt1, shfUp(y, 3, s), 2, 1, s)
    drawRect(rt1, up6, 3, 1, s)
    return shfRt(x, 5, s)
}

/**
 * draws (but does not render) the letter 'G'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawG(x, y, s = FONT_SIZE) {
    const rt1 = shfRt(x, 1,s)
    drawRect(rt1, y, 3, 1, s)
    drawRect(x, shfUp(y, 5, s), 1, 5, s)
    drawRect(rt1, shfUp(y, 6, s), 3, 1, s)
    drawRect(shfRt(x, 4, s), shfUp(y, 2), 1, 2, s)
    drawRect(shfRt(x, 2, s), shfUp(y, 3), 2, 1, s)
    return shfRt(x, 6, s)
}

/**
 * draws (but does not render) the letter 'M'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawM(x, y, s = FONT_SIZE) {
    const up5 = shfUp(y, 5, s), up6 = shfUp(y, 6, s)
    drawRect(x, up6, 1, 7, s)
    drawRect(shfRt(x, 1, s), up5, 1, 1, s)
    drawRect(shfRt(x, 2, s), shfUp(y, 4, s), 1, 1, s)
    drawRect(shfRt(x, 3, s), up5, 1, 1, s)
    drawRect(shfRt(x, 4, s), up6, 1, 7, s)
    return shfRt(x, 6, s)
}

/**
 * draws (but does not render) the letter 'O'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawO(x, y, s = FONT_SIZE) {
    const up5 = shfUp(y, 5, s)
    const rt1 = shfRt(x, 1, s)
    drawRect(x, up5, 1, 5, s)
    drawRect(rt1, shfUp(y, 6, s), 3, 1, s)
    drawRect(rt1, y, 3, 1, s)
    drawRect(shfRt(x, 4, s), up5, 1, 5, s)
    return shfRt(x, 6, s)
}

/**
 * draws (but does not render) the letter 'P'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawP(x, y, s = FONT_SIZE) {
    const up6 = shfUp(y, 6, s)
    const rt1 = shfRt(x, 1, s)
    drawRect(x, up6, 1, 7, s)
    drawRect(rt1, up6, 2, 1, s)
    drawRect(shfRt(x, 3, s), shfUp(y, 5, s), 1, 2, s)
    drawRect(rt1, shfUp(y, 3, s), 2, 1, s)
    return shfRt(x, 5, s)
}

/**
 * draws (but does not render) the letter 'R'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawR(x, y, s = FONT_SIZE) {
    const up6 = shfUp(y, 6, s)
    const rt1 = shfRt(x, 1, s), rt3 = shfRt(x, 3, s)
    drawRect(x, up6, 1, 7, s)
    drawRect(rt1, up6, 2, 1, s)
    drawRect(rt1, shfUp(y, 3, s), 2, 1, s)
    drawRect(rt3, shfUp(y, 5, s), 1, 2, s)
    drawRect(rt3, shfUp(y, 2, s), 1, 3, s)
    return shfRt(x, 5, s)
}

/**
 * draws (but does not render) the letter 'S'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawS(x, y, s = FONT_SIZE) {
    const rt1 = shfRt(x, 1, s)
    drawRect(rt1, shfUp(y, 6, s), 3, 1, s)
    drawRect(x, shfUp(y, 5, s), 1, 2, s)
    drawRect(rt1, shfUp(y, 3, s), 2, 1, s)
    drawRect(shfRt(x, 3, s), shfUp(y, 2, s), 1, 2, s)
    drawRect(x, y, 3, 1, s)
    return shfRt(x, 5, s)
}

/**
 * draws (but does not render) the letter 'T'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawT(x, y, s = FONT_SIZE) {
    drawRect(shfRt(x, 2, s), shfUp(y, 5, s), 1, 6, s)
    drawRect(x, shfUp(y, 6, s), 5, 1, s)
    return shfRt(x, 6, s)
}

/**
 * draws (but does not render) the letter 'U'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawU(x, y, s = FONT_SIZE) {
    const up6 = shfUp(y, 6, s)
    drawRect(x, up6, 1, 6, s)
    drawRect(shfRt(x, 1, s), y, 2, 1, s)
    drawRect(shfRt(x, 3, s), up6, 1, 6, s)
    return shfRt(x, 5, s)
}

/**
 * draws (but does not render) the letter 'V'
 *
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter of the same word
 */
function drawV(x, y, s = FONT_SIZE) {
    const up2 = shfUp(y, 2, s)
    drawRect(x, shfUp(y, 6, s), 1, 4, s)
    drawRect(shfRt(x, 1, s), up2, 1, 2, s)
    drawRect(shfRt(x, 2, s), y, 1, 1, s)
    drawRect(shfRt(x, 3, s), up2, 1, 2, s)
    drawRect(shfRt(x, 4, s), shfUp(y, 6, s), 1, 4, s)
    return shfRt(x, 6)
}

/**
 * draws (but does not render) the character '?'
 *
 * @param {number} x - x position of the character
 * @param {number} y - y position of the character
 * @param {number} [s = FONT_SIZE] - size of the font
 *
 * @return {number} x position of the next letter
 */
function drawQuestMrk(x, y, s = FONT_SIZE) {
    drawRect(x, shfUp(y, 6, s), 3, 1, s)
    drawRect(shfRt(x, 3, s), shfUp(y, 5, s), 1, 2, s)
    drawRect(shfRt(x, 1, s), shfUp(y, 3, s), 2, 1, s)
    drawRect(x, shfUp(y, 2, s), 1, 1, s)
    drawRect(x, y, 1, 1, s)
    return shfRt(x, 5, s)
}

/**
 * Draws the specified letter
 *
 * @param {string} letter - the letter to draw
 * @param {number} x - x position of the letter
 * @param {number} y - y position of the letter
 * @param {number} [s = FONT_SIZE] - size of the font
 * @return {number} the x position of the next letter or -1 if the specified letter is supported
 */
function drawLetter(letter, x, y, s = FONT_SIZE) {
    letter = (letter + '').toLowerCase().charAt(0)
    let drawer
    
    if(letter === 'a') {
        drawer = drawA
    } else if(letter === 'd') {
        drawer = drawD
    } else if(letter === 'e') {
        drawer = drawE
    } else if(letter === 'g') {
        drawer = drawG
    } else if(letter === 'm') {
        drawer = drawM
    } else if(letter === 'o') {
        drawer = drawO
    } else if(letter === 'p') {
        drawer = drawP
    } else if(letter === 'r') {
        drawer = drawR
    } else if(letter === 's') {
        drawer = drawS
    } else if(letter === 't') {
        drawer = drawT
    } else if(letter === 'u') {
        drawer = drawU
    } else if(letter === 'v') {
        drawer = drawV
    }
    
    return drawer ? drawer(x, y, s) : -1
}

export {
    FONT_SIZE,
    getContext,
    setContext,
    drawLetter,
    drawRect,
    clearRect,
    fill,
    stroke,
    drawQuestMrk,
    drawA,
    drawD,
    drawE,
    drawG,
    drawM,
    drawO,
    drawP,
    drawR,
    drawS,
    drawT,
    drawU,
    drawV,
}
