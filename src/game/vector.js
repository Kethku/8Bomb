class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  distance(other) {
    return this.subtract(other).length;
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  subtract(other) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  multiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  divide(scalar) {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  normalize() {
    return this.divide(this.length);
  }

  floor() {
    return new Vector(Math.floor(this.x), Math.floor(this.y));
  }
}

Vector.zero = new Vector(0, 0);

Vector.InRectangle = function* (topLeft, bottomRight, xJump = 1, yJump = 1) {
  for (let y = topLeft.y; y < bottomRight.y; y += yJump) {
    for (let x = topLeft.x; x < bottomRight.x; x += xJump) {
      yield new Vector(x, y);
    }
  }
};

export default Vector;
