import { setPixel } from "../canvasApi";

const startingRadius = 30;
const animationSpeed = 2;

let explosions = [];

export function newExplosion(x, y) {
  explosions.push({
    x,
    y,
    r: startingRadius,
    c: 0,
    delay: 5
  });
}

export function updateExplosions() {
  let remainingExplosions = [];

  for (let explosion of explosions) {
    if (explosion.delay > 0) {
      explosion.delay--;
      remainingExplosions.push(explosion)
    } else {
      if (explosion.c == 7) continue;
      remainingExplosions.push(explosion);
      explosion.c += 1;
      explosion.r *= 0.8;
      explosion.delay = animationSpeed;
    }
  }

  explosions = remainingExplosions;
}

export function drawExplosions() {
  for (let explosion of explosions) {
    for (let x = explosion.x - explosion.r; x < explosion.x + explosion.r; x++) {
      for (let y = explosion.y - explosion.r; y < explosion.y + explosion.r; y++) {
        let dx = x - explosion.x;
        let dy = y - explosion.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= explosion.r) {
          setPixel(x, y, explosion.c);
        }
      }
    }
  }
}
