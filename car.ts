// width & height
// const CANVAS_WIDTH = 200;
// const CANVAS_HEIGHT = 400;
const INITIAL_CAR_X = 300;
const INITIAL_CAR_Y = 300;
// key events
let keys = { ArrowRight: false, ArrowLeft: false };

class Car {
  direction: number;
  v: number;
  coord: { x: number; y: number };
  rotationSpeed: number;
  height: number;
  width: number;

  constructor() {
    this.direction = Math.PI / 2; // start direction
    this.v = 1; // start velocity
    this.coord = { x: INITIAL_CAR_X, y: INITIAL_CAR_Y }; // coordinates
    this.height = 20; // height
    this.width = 20; // width
    this.rotationSpeed = 0.01;
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

    // if (this.coord.y - this.v <= canvas_height) this.coord.y -= this.v;

    // update position based on velocity and direction
    this.coord.x += Math.cos(-this.direction) * this.v;
    this.coord.y -= Math.sin(this.direction) * this.v;

    // // keep car in canvas bounds
    // this.coord.x = Math.max(
    //   this.width / 2,
    //   Math.min(this.coord.x, canvas_width - this.width / 2)
    // );
    // this.coord.y = Math.max(
    //   this.height / 2,
    //   Math.min(this.coord.y, canvas_height - this.height / 2)
    // );
  }

  renderCar() {
    ctx.save();
    ctx.translate(INITIAL_CAR_X, INITIAL_CAR_Y); // Move the car to its coordinates
    // ctx.rotate(-this.direction); // Rotate the car based on its direction
  
    // Draw the car body
    ctx.fillStyle = "blue";
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
  
    // Draw the front indicator (triangle)
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(0, -this.height / 2); // Point at the front of the car
    ctx.lineTo(-this.width / 4, -this.height / 4); // Left side of the triangle
    ctx.lineTo(this.width / 4, -this.height / 4); // Right side of the triangle
    ctx.closePath();
    ctx.fill();
  
    ctx.restore();
  }

  getBoundingBox() {
    const cos = Math.cos(this.direction);
    const sin = Math.sin(this.direction);

    // Calculate the half dimensions
    const hw = this.width / 2;
    const hh = this.height / 2;

    // Calculate the four corners of the rotated rectangle
    const corners = [
      {
        x: this.coord.x + cos * hw - sin * hh,
        y: this.coord.y + sin * hw + cos * hh,
      },
      {
        x: this.coord.x - cos * hw - sin * hh,
        y: this.coord.y - sin * hw + cos * hh,
      },
      {
        x: this.coord.x + cos * hw + sin * hh,
        y: this.coord.y + sin * hw - cos * hh,
      },
      {
        x: this.coord.x - cos * hw + sin * hh,
        y: this.coord.y - sin * hw - cos * hh,
      },
    ];

    // Find the minimum and maximum x and y coordinates
    const left = Math.min(...corners.map((c) => c.x));
    const right = Math.max(...corners.map((c) => c.x));
    const top = Math.min(...corners.map((c) => c.y));
    const bottom = Math.max(...corners.map((c) => c.y));

    return {
      left,
      right,
      top,
      bottom,
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
