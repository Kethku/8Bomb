import { setPixel } from "../canvasApi";
import { shakeCamera } from "./camera";
import Vector from "./vector";
import { Reset, Update, DrawWorld } from "./events";

const shakeAmount = 20;
const startingRadius = 25;
const animationSpeed = 3;

let explosions = [];

Reset.Subscribe(() => {
  explosions = [];
});

export function newExplosion(x, y) {
  explosions.push({
    x,
    y,
    r: startingRadius,
    c: 0,
    delay: animationSpeed
  });

  shakeCamera(shakeAmount);
}

Update.Subscribe(() => {
  let remainingExplosions = [];

  for (let explosion of explosions) {
    if (explosion.delay > 0) {
      explosion.delay--;
      remainingExplosions.push(explosion);
    } else {
      if (explosion.c == 7) continue;
      remainingExplosions.push(explosion);
      explosion.c += 1;
      explosion.r *= 0.8;
      explosion.delay = animationSpeed;
    }
  }

  explosions = remainingExplosions;
});

DrawWorld.Subscribe(() => {
  for (let explosion of explosions) {
    let radius = new Vector(explosion.r, explosion.r);
    let center = new Vector(explosion.x, explosion.y);
    let topLeft = center.subtract(radius);
    let bottomRight = center.add(radius);
    for (let pixel of Vector.InRectangle(topLeft, bottomRight)) {
      let offset = pixel.subtract(center);
      if (offset.length <= explosion.r) {
        setPixel(pixel.x, pixel.y, explosion.c);
      }
    }
  }
});
