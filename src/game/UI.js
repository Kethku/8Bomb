import { print, setPixel } from "../canvasApi";
import { DrawUI } from "./events";
import Vector from "./vector";
import { player } from "./player";
import { shortenedScore } from "./score";

const circleAdditionGap = 3;

let clearCircles = [];
let timeTillMoreCircles = 0;

function drawInstructions() {
  print(5, 5, "left/right to move");
  print(5, 13, "up to jump");
}

function drawGameOverScreen() {
  let topLeft = Vector.zero;
  let bottomRight = new Vector(128, 128);
  let emptyPixels = [];
  for (let pixel of Vector.InRectangle(topLeft, bottomRight)) {
    let latest = null;
    for (let circle of clearCircles) {
      if (pixel.subtract(circle.center).length < circle.radius) {
        latest = circle;
      }
    }
    if (latest) {
      setPixel(pixel.x, pixel.y, latest.color);
    } else {
      emptyPixels.push(pixel);
    }
  }

  if (player.dead) {
    for (let circle of clearCircles) {
      if (circle.radius < circle.targetRadius) {
        circle.radius *= 1.2;
      }
    }

    if (emptyPixels.length != 0) {
      console.log(emptyPixels.length);
      if (timeTillMoreCircles == 0) {
        timeTillMoreCircles = circleAdditionGap;

        for (let i = 0; i < 5; i++) {
          let center = emptyPixels[Math.floor(Math.random() * emptyPixels.length)];
          let targetRadius = Math.random() * 15 + 5;
          let radius = 1;
          let color = Math.floor(Math.random() * 3) + 4;
          clearCircles.push({ center, radius, color, targetRadius });
        }
      } else {
        timeTillMoreCircles--;
      }
    }


    print(30, 50, "You died.");
    print(30, 60, "Score: " + shortenedScore());
    print(30, 70, "Jump to play again.");
  } else {
    let remainingCircles = [];
    for (let circle of clearCircles) {
      circle.radius *= 0.5;
      if (circle.radius > 0.1) remainingCircles.push(circle);
    }
    clearCircles = remainingCircles;
  }
}

DrawUI.Subscribe(() => {
  drawInstructions();
  drawGameOverScreen();
});
