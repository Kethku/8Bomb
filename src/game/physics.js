import { PollManager0 } from "../eventManager";
import { sprite, setPixel } from "../canvasApi";

import { Update, DrawWorld } from "./events";
import { terrainAt } from "./terrain";

import Vector from "./vector";

const gravity = 0.06;
const groundFriction = 0.9;
const maxSpeed = 5;

export const PhysicsObjects = new PollManager0();

export function getPhysicsObjects() {
  return PhysicsObjects.Poll().flat();
}

export function createPhysicsObject(x, y, sprite, radius = 4) {
  return {
    previous: new Vector(x, y),
    position: new Vector(x, y),
    radius,
    sprite,
    grounded: false
  };
}

const standardBorderPixels = [
  new Vector(-3.5, 0.5),
  new Vector(-3.5, 1.5),
  new Vector(-2.5, 2.5),
  new Vector(-1.5, 3.5),
  new Vector(-0.5, 3.5),
  new Vector(0.5, 3.5),
  new Vector(1.5, 3.5),
  new Vector(2.5, 2.5),
  new Vector(3.5, 1.5),
  new Vector(3.5, 0.5),
  new Vector(3.5, -0.5),
  new Vector(3.5, -1.5),
  new Vector(2.5, -2.5),
  new Vector(1.5, -3.5),
  new Vector(0.5, -3.5),
  new Vector(-0.5, -3.5),
  new Vector(-1.5, -3.5),
  new Vector(-2.5, -2.5),
  new Vector(-3.5, -1.5),
  new Vector(-3.5, -0.5),
];

function updateVelocities(physicsObjects) {
  for (const obj of physicsObjects) {
    let velocity = obj.position.subtract(obj.previous);
    let speed = velocity.length;

    if (speed > maxSpeed) {
      velocity = velocity.multiply(maxSpeed).divide(speed);
    } else if(obj.grounded) {
      velocity = velocity.multiply(groundFriction);
    }

    obj.previous = obj.position;
    velocity.y += gravity;

    obj.position = obj.position.add(velocity);

    if (obj.position.x < 0) {
      obj.previous.x += 128;
      obj.position.x += 128;
    }

    if (obj.position.x >= 128) {
      obj.previous.x -= 128;
      obj.position.x -= 128;
    }
  }
}

function resolveTerrainCollisions(physicsObjects) {
  for (const obj of physicsObjects) {
    let total = Vector.zero;
    let count = 0;
    for (let positionOffset of standardBorderPixels) {
      let testPosition = obj.position.add(positionOffset.floor()).floor();

      if (terrainAt(testPosition.x, testPosition.y)) {
        if (positionOffset.y > 3) {
          obj.grounded = true;
        }
        total = total.add(positionOffset);
        count++;
      }
    }
    if (count == 0) {
      continue;
    }

    let collisionPosition = total.divide(count);
    let collisionDistance =  collisionPosition.length;
    let collisionDirection = collisionPosition.divide(collisionDistance);
    let displacement = obj.radius - collisionDistance;
    obj.position = obj.position.subtract(collisionDirection.multiply(displacement * 0.3));
  }
}

function resolveObjectCollisions(physicsObjects) {
  for (const first of physicsObjects) {
    for (const second of physicsObjects) {
      if (first == second) continue;
      let offset = first.position.subtract(second.position);
      let distance = offset.length;

      if (distance < first.radius + second.radius) {
        if (offset.y > 0) second.grounded = true;
        let amount = first.radius + second.radius - distance;
        let direction = offset.divide(distance);
        let correction = direction.multiply(amount / 2);

        first.position = first.position.add(correction);
        second.position = second.position.subtract(correction);
      }
    }
  }
}

DrawWorld.Subscribe(() => {
  let physicsObjects = getPhysicsObjects();

  for (let obj of physicsObjects) {
    sprite(obj.position.x - obj.radius, obj.position.y - obj.radius, obj.sprite);
  }
});

Update.Subscribe(() => {
  let physicsObjects = getPhysicsObjects();

  for (let object of physicsObjects) {
    object.grounded = false;
  }

  updateVelocities(physicsObjects);
  for (let i = 0; i < 5; i++) {
    resolveTerrainCollisions(physicsObjects);
  }
  resolveObjectCollisions(physicsObjects);
});

