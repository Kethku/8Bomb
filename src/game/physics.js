import { PollManager0 } from "../eventManager";
import { sprite, setPixel } from "../canvasApi";

import { Update, DrawWorld } from "./events";
import { terrainAt } from "./terrain";

const gravity = 0.06;
const groundFriction = 0.99;
const maxSpeed = 5;

export const PhysicsObjects = new PollManager0();

export function getPhysicsObjects() {
  return PhysicsObjects.Poll().flat();
}

export function createPhysicsObject(x, y, sprite, radius = 4) {
  return {
    previous: {
      x,
      y
    },
    position: {
      x,
      y
    },
    radius,
    sprite,
    grounded: false
  };
}

function* getBorderPixels() {
  yield { x: -3.5, y: 0.5 };
  yield { x: -3.5, y: 1.5 };
  yield { x: -2.5, y: 2.5 };
  yield { x: -1.5, y: 3.5 };
  yield { x: -0.5, y: 3.5 };
  yield { x: 0.5, y: 3.5 };
  yield { x: 1.5, y: 3.5 };
  yield { x: 2.5, y: 2.5 };
  yield { x: 3.5, y: 1.5 };
  yield { x: 3.5, y: 0.5 };
  yield { x: 3.5, y: -0.5 };
  yield { x: 3.5, y: -1.5 };
  yield { x: 2.5, y: -2.5 };
  yield { x: 1.5, y: -3.5 };
  yield { x: 0.5, y: -3.5 };
  yield { x: -0.5, y: -3.5 };
  yield { x: -1.5, y: -3.5 };
  yield { x: -2.5, y: -2.5 };
  yield { x: -3.5, y: -1.5 };
  yield { x: -3.5, y: -0.5 };
}

function updateVelocities(physicsObjects) {
  for (const obj of physicsObjects) {
    let vx = obj.position.x - obj.previous.x;
    let vy = obj.position.y - obj.previous.y;

    let speed = Math.sqrt(vx * vx + vy * vy);
    if (speed > maxSpeed) {
      vx = vx * maxSpeed / speed;
      vy = vy * maxSpeed / speed;
    } else if(obj.grounded) {
      vx = vx * groundFriction;
      vy = vy * groundFriction;
    }

    obj.previous.x = obj.position.x;
    obj.previous.y = obj.position.y;
    vy += gravity;

    obj.position.x += vx;
    obj.position.y += vy;

    if (obj.position.x - obj.radius < 0) {
      obj.position.x = obj.radius;
    }

    if (obj.position.x + obj.radius > 128) {
      obj.position.x = 128 - obj.radius;
    }
  }
}

function resolveTerrainCollisions(physicsObjects) {
  for (const obj of physicsObjects) {
    let totalX = 0;
    let totalY = 0;
    let count = 0;
    for (let { x: dx, y: dy } of getBorderPixels()) {
      let x = Math.floor(obj.position.x + Math.floor(dx));
      let y = Math.floor(obj.position.y + Math.floor(dy));

      if (terrainAt(x, y)) {
        if (dy > 3) {
          obj.grounded = true;
        }
        totalX += dx;
        totalY += dy;
        count++;
      }
    }
    if (count == 0) {
      continue;
    }

    let dx = totalX / count;
    let dy = totalY / count;

    let length = Math.sqrt(dx * dx + dy * dy);
    let nx = dx / length;
    let ny = dy / length;

    let displacement = obj.radius - length;

    obj.position.x -= nx * displacement * 0.3;
    obj.position.y -= ny * displacement * 0.3;
  }
}

function resolveObjectCollisions(physicsObjects) {
  for (const first of physicsObjects) {
    for (const second of physicsObjects) {
      if (first == second) continue;
      let dx = first.position.x - second.position.x;
      let dy = first.position.y - second.position.y;

      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < first.radius + second.radius) {
        if (dy > 0) second.grounded = true;
        let amount = first.radius + second.radius - distance;

        let nx = dx / distance;
        let ny = dy / distance;

        first.position.x += nx * amount / 2;
        first.position.y += ny * amount / 2;
        second.position.x -= nx * amount / 2;
        second.position.y -= ny * amount / 2;
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

