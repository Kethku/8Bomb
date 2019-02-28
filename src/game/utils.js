export function getPhysicsObjects({ player, bombs }) {
  return [player].concat(bombs);
}

export function createPhysicsObject(x, y, sprite) {
  return {
    previous: {
      x,
      y
    },
    position: {
      x,
      y
    },
    radius: 4,
    sprite,
    grounded: false
  };
}
