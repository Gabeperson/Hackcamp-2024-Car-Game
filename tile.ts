const SIDE_LENGTH = 50; // change later if needed
ctx.strokeStyle = "red";
ctx.lineWidth = 2;

class Tile {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  edge;
  x: number;
  y: number;
  constructor(x, y) {
    let edge = { l: false, r: false, t: false, b: false }; // edges { l: Left, r: Right, t: Top, b: Bottom }
    this.x = x;
    this.y = y;
    ctx.rect(x, y, SIDE_LENGTH, SIDE_LENGTH);
    this.drawEdges(edge);
  }

  /**
   *
   * @param {object} edge
   */
  drawEdges(edge = { l: false, r: false, t: false, b: false }) {
    // Draw the top border if `t` is true
    if (edge.t) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y); // Starting point of the top border
      ctx.lineTo(this.x + SIDE_LENGTH, this.y); // Ending point of the top border
      ctx.stroke();
    }

    // Draw the right border if `r` is true
    if (edge.r) {
      ctx.beginPath();
      ctx.moveTo(this.x + SIDE_LENGTH, this.y); // Starting point of the right border
      ctx.lineTo(this.x + SIDE_LENGTH, this.y + SIDE_LENGTH); // Ending point of the right border
      ctx.stroke();
    }

    // Draw the bottom border if `b` is true
    if (edge.b) {
      ctx.beginPath();
      ctx.moveTo(this.x + SIDE_LENGTH, this.y + SIDE_LENGTH); // Starting point of the bottom border
      ctx.lineTo(this.x, this.y + SIDE_LENGTH); // Ending point of the bottom border
      ctx.stroke();
    }

    // Draw the left border if `l` is true
    if (edge.l) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + SIDE_LENGTH); // Starting point of the left border
      ctx.lineTo(this.x, this.y); // Ending point of the left border
      ctx.stroke();
    }
  }
}
