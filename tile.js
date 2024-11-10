const HEIGHT = 50;
const WIDTH = 50;

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Tile {
  constructor() {
    let edge = { l: false, r: false, t: false, b: false };
    let tile = new Rectangle(HEIGHT, WIDTH);
  }
}
