const SIDE_LENGTH = 50; // change later if needed
ctx.strokeStyle = "red";
ctx.lineWidth = 2;

class Tile {
  edge;
  x: number;
  y: number;
  sideLength: number;
  constructor(x, y) {
    // edges { l: Left, r: Right, t: Top, b: Bottom }
    let edge = { l: false, r: false, t: false, b: false };
    this.x = x;
    this.y = y;
    this.sideLength = SIDE_LENGTH;
    ctx.rect(x, y, SIDE_LENGTH, SIDE_LENGTH);
  }
}
