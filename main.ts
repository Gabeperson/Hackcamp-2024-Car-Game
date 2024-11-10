const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const PI = Math.PI;
let canvas_height: number, canvas_width: number;

// TESITNG VARS
let image = function() {
    let elem = new Image();
    elem.src = "road.webp";
    return elem;
}();

const rotateAroundOrigin = function(x: number, y: number, rot: number) {
    let newX = x * Math.cos(rot) - y * Math.sin(rot);
    let newY = x * Math.sin(rot) + y * Math.cos(rot);
    return { newX, newY };
}

/**
 * Draws rectangle on canvas
 * @param {number} x - The x coord of center of rectangle
 * @param {number} y - THe y coord of center of rectangle
 * @param {number} size 
 * @param {number} rot 
 */
const drawRect = function(x, y, size, rot) {
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.rect(-size / 2, -size / 2, size, size);
    ctx.stroke();
    ctx.rotate(-rot);
    ctx.translate(-x, -y);
}

const drawImage = function(image, x, y, width, height, rot) {
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.rotate(-rot);
    ctx.translate(-x, -y);
}

const drawRoad = function(carX, carY, roadX, roadY, dir, roadSize) {
    let rot = dir + PI / 2;
    let relX = carX - roadX;
    let relY = carY - roadY;
    let { newX, newY } = rotateAroundOrigin(relX, relY, rot);
    console.log(`relX:${relX}`);
    console.log(`relY:${relY}`);
    console.log(`newX:${newX}`);
    console.log(`newY:${newY}`);

    drawRect(newX+carX, newY+carY, roadSize, rot);
}


const resizeHandler = function() {
    canvas_height = window.innerHeight;
    canvas_width = window.innerWidth;
    canvas.height = canvas_height;
    canvas.width = canvas_width;
};
document.addEventListener("resize", resizeHandler);
resizeHandler();

ctx.moveTo(0, 0);
ctx.lineTo(200, 200);
ctx.stroke();
drawRect(300, 300, 50, 0);
