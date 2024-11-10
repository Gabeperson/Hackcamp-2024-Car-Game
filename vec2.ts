class Vec2 {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  normalize() {
    let magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x = this.x / magnitude;
    this.y = this.y / magnitude;
  }

  add(vector: Vec2) {
    return new Vec2(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vec2) {
    return new Vec2(this.x - vector.x, this.y - vector.y);
  }

  dot(vector: Vec2) {
    return this.x * vector.x + this.y * vector.y;
  }
}
