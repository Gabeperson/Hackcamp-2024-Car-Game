const SIDE_LENGTH = 50; // change later if needed
ctx.strokeStyle = "red";
ctx.lineWidth = 2;

// // TESING
// let image = function() {
//     let elem = new Image();
//     elem.src = "road.webp";
//     return elem;
// }();

const IMAGE_UP_DOWN = function () {
  let elem = new Image();
  elem.src = "./road_images/image_top_down.webp";
  return elem;
};
const IMAGE_UP_TURN_RIGHT = function () {
  let elem = new Image();
  elem.src = "./road_images/image_left_up.webp";
  return elem;
};
const IMAGE_DOWN_TURN_LEFT = function () {
  let elem = new Image();
  elem.src = "./road_images/image_up_right.webp";
  return elem;
};
const IMAGE_DOWN_TURN_RIGHT = function () {
  let elem = new Image();
  elem.src = "./road_images/image-down-right.webp";
  return elem;
};
const IMAGE_UP_TURN_LEFT = function () {
  let elem = new Image();
  elem.src = "./road_images/image-left-down.webp";
  return elem;
};
const IMAGE_SIDE = function () {
  let elem = new Image();
  elem.src = "./road_images/image-side.webp";
  return elem;
};

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
