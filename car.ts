// width & height
const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 400;
// key events
let keys = { ArrowRight: false, ArrowLeft: false };

class Car {
  direction: number;
  v: number;
  coord;
  rotationSpeed: number;
  height: number;
  width: number;

  constructor() {
    let direction = Math.PI / 2; // start direction
    let v = 10; // start velocity
    let coord = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 4 }; // coordinates
    let height = 20; // height
    let width = 20; // width
    let rotationSpeed = 0.15;
  }

  /**
   *
   */
  update() {
    // update direction on key press
    if (keys.ArrowLeft) {
      this.direction += this.rotationSpeed;
    }
    if (keys.ArrowRight) {
      this.direction -= this.rotationSpeed;
    }

    if (this.coord.y - this.v <= CANVAS_HEIGHT) this.coord.y -= this.v;

    // update position based on velocity and direction
    this.coord.x += Math.cos(this.direction) * this.v;
    this.coord.y -= Math.sin(this.direction) * this.v;

    // keep car in canvas bounds
    this.coord.x = Math.max(
      this.width / 2,
      Math.min(this.coord.x, CANVAS_WIDTH - this.width / 2)
    );
    this.coord.y = Math.max(
      this.height / 2,
      Math.min(this.coord.y, CANVAS_HEIGHT - this.height / 2)
    );
  }

  getBoundingBox() {
    return {
      left: this.coord.x - this.width / 2,
      right: this.coord.x + this.width / 2,
      top: this.coord.y - this.height / 2,
      bottom: this.coord.y + this.height / 2,
    };
  }
}

// function collisionDetection(car: Car) {}

function collisionWithTile(tile: Tile, car: Car) {
  const carBox = car.getBoundingBox();
  const tileBox = tile.getBoundingBox();

  return !(
    (carBox.right < tileBox.left && tile.edge.l) ||
    (carBox.left > tileBox.right && tile.edge.r) ||
    (carBox.bottom < tileBox.top && tile.edge.t) ||
    (carBox.top > tileBox.bottom && tile.edge.b)
  );
}

document.addEventListener("keydown", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
});
