const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const PI = Math.PI;
let canvas_height: number, canvas_width: number;

// // TESING
// let image = function() {
//     let elem = new Image();
//     elem.src = "road.webp";
//     return elem;
// }();

function rotateAroundOrigin(x: number, y: number, rot: number) {
  let newX = x * Math.cos(rot) - y * Math.sin(rot);
  let newY = x * Math.sin(rot) + y * Math.cos(rot);
  return { newX, newY };
}

function drawRect(x: number, y: number, size: number, rot: number) {
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.rect(-size / 2, -size / 2, size, size);
  ctx.stroke();
  ctx.rotate(-rot);
  ctx.translate(-x, -y);
}

function drawCircle(x: number, y: number, size: number) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * PI);
  // ctx.lineWidth = 4;
  // ctx.strokeStyle = "blue";
  ctx.stroke();
}

function drawText(x: number, y: number, text: string) {
  ctx.fillText(text, x, y);
}

function drawImage(
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  rot: number
) {
  rot = rot - PI / 2;
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.drawImage(image, -width / 2, -height / 2, width, height);
  ctx.rotate(-rot);
  ctx.translate(-x, -y);
}

function drawLine(start: [number, number], end: [number, number]) {
  let [sx, sy] = start;
  let [ex, ey] = end;
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(ex, ey);
  ctx.stroke();
}

function drawRoad(
  carX: number,
  carY: number,
  roadX: number,
  roadY: number,
  dir: number,
  roadSize: number
) {
  let rot = dir + PI / 2;
  let relX = carX - roadX;
  let relY = carY - roadY;
  let { newX, newY } = rotateAroundOrigin(relX, relY, rot);
  drawRect(newX + carX, newY + carY, roadSize, rot);
}

// Resize canvas
const resizeHandler = function () {
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  canvas.height = canvas_height;
  canvas.width = canvas_width;
};
document.addEventListener("resize", resizeHandler);
resizeHandler();
