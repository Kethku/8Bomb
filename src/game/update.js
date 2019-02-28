import { terrainAt } from "./terrain";

const gravity = 0.07;
const cameraMomentum = 0.8;
const cameraLag = 0.2;
const maxSpeed = 5;
const groundFriction = 0.99;

export function updatePhysicsObjects(objects) {
  for (const obj of objects) {
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

  for (const first of objects) {
    for (const second of objects) {
      if (first == second) continue;
      let dx = first.position.x - second.position.x;
      let dy = first.position.y - second.position.y;

      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < first.radius + second.radius) {
        if (dy < 0) first.grounded = true;
        else second.grounded = true;
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

export function handleTerrainCollisions(terrain, objects) {
  for (let i = 0; i < 5; i++) {
    for (const obj of objects) {
      let totalX = 0;
      let totalY = 0;
      let count = 0;
      for (let r = 0; r < Math.PI * 2; r += Math.PI / 8) {
        let dx = Math.cos(r) * obj.radius;
        let dy = Math.sin(r) * obj.radius;
        let x = Math.floor(obj.position.x + dx);
        let y = Math.floor(obj.position.y + dy);

        if (terrainAt(x, y, terrain)) {
          if (dy > 3) {
            obj.grounded = true;
          }
          totalX += dx;
          totalY += dy;
          count++;
        }
      }
      if (count == 0) {
        obj.grounded = false;
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
}

export function updateCamera(state) {
  if (state.previousCameraY) {
    let vy = state.cameraY - state.previousCameraY;
    state.previousCameraY = state.cameraY;
    state.cameraY += vy * cameraMomentum;
  }

  if (state.player.position.y > state.cameraY + 96) {
    let cameraDiff = state.player.position.y - (state.cameraY + 96);
    state.cameraY += cameraDiff * cameraLag;
  }

  if (state.player.position.y < state.cameraY + 32) {
    let cameraDiff = state.player.position.y - (state.cameraY + 32);
    state.cameraY += cameraDiff * 0.2;
  }

  if (!state.previousCameraY) {
    state.previousCameraY = state.cameraY;
  }
}

export function updateScore(state) {
  if (state.player.position.y > state.score) {
    state.score = state.player.position.y;
  }
}
