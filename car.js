// width & height
const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 400;
// PI constant so we dont have to always type Math.PI
const PI = Math.PI;
// canvas
const canvas = document.getElementById("canvas");
// key events
let keys = { ArrowRight: false, ArrowLeft: false };

class Car {
  constructor() {
    let direction = PI / 2; // start direction
    let v = 10; // start velocity
    let coord = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 4 }; // coordinates
    let height = 20; // height
    let width = 20; // width
    rotationSpeed = 0.15;
  }

  update() {
    // update direction on key press
    if (keys.ArrowLeft) {
      this.direction += this.rotationSpeed;
    }
    if (keys.ArrowRight) {
      this.direction -= this.rotationSpeed;
    }

    // update position based on velocity and direction
    this.x += Math.cos(this.direction) * this.velocity;
    this.y -= Math.sin(this.direction) * this.velocity;

    // keep car in canvas bounds
    this.x = Math.max(
      this.width / 2,
      Math.min(this.x, CANVAS_WIDTH - this.width / 2)
    );
    this.y = Math.max(
      this.height / 2,
      Math.min(this.y, CANVAS_HEIGHT - this.height / 2)
    );
  }
}

function collisionDetection() {}

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
