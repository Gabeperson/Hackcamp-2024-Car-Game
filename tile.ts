const SIDE_LENGTH = 50; // change later if needed
ctx.strokeStyle = "red";
ctx.lineWidth = 2;

class Tile {
  edge: { l: boolean; r: boolean; t: boolean; b: boolean };
  x: number;
  y: number;
  sideLength: number;
  id: number;

  constructor(x, y) {
    // edges { l: Left, r: Right, t: Top, b: Bottom }. false is no edge, true is edge
    this.edge = { l: true, r: true, t: true, b: true };
    this.x = x;
    this.y = y;
    this.sideLength = SIDE_LENGTH;
    ctx.rect(x, y, SIDE_LENGTH, SIDE_LENGTH);
  }

  getBoundingBox() {
    return {
      left: this.x,
      right: this.x + this.sideLength,
      top: this.y,
      bottom: this.y + this.sideLength,
    };
  }
}
