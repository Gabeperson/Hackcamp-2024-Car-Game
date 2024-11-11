const SIDE_LENGTH = 50; // change later if needed
ctx.strokeStyle = "red";
ctx.lineWidth = 2;

const IMAGE_UP_DOWN = "imgUpDown";

const IMAGE_UP_TURN_RIGHT = "imgUpTurnRight";
const IMAGE_DOWN_TURN_LEFT = "imgDownTurnLeft";
const IMAGE_DOWN_TURN_RIGHT = "imgDownTurnRight";
const IMAGE_UP_TURN_LEFT = "imgUpTurnLeft";
const IMAGE_SIDE = "imgSide";

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

  getImage() {
    if (!this.edge.t && !this.edge.b) {
      return IMAGE_UP_DOWN;
    }

    if (!this.edge.r && !this.edge.l) {
      return IMAGE_SIDE;
    }

    if (!this.edge.t && !this.edge.r) {
      return IMAGE_DOWN_TURN_RIGHT;
    }

    if (!this.edge.t && !this.edge.l) {
      return IMAGE_DOWN_TURN_LEFT;
    }

    if (!this.edge.r && !this.edge.b) {
      return IMAGE_UP_TURN_RIGHT;
    }

    if (!this.edge.l && !this.edge.b) {
      return IMAGE_UP_TURN_LEFT;
    }
  }
}
