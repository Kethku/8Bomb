import { print, setPixel } from "../canvasApi";
import { DrawUI } from "./events";
import Vector from "./vector";
import { player } from "./player";
import { shortenedScore } from "./score";

let clearCircles = [];

function drawInstructions() {
  print(5, 5, "left/right to move");
  print(5, 13, "up to jump");
}

function drawCircles() {
  let emptyPixels = [];

  for (let x = 0; x < 128; x++) {
    for (let y = 0; y < 128; y++) {
      let pixel = new Vector(x, y);

      let pixelDrawn = false;
      for (let circle of clearCircles) {
        if (pixel.subtract(circle.center).length < circle.radius) {
          setPixel(pixel.x, pixel.y, circle.color);
          pixelDrawn = true;
          break;
        }
      }

      if (!pixelDrawn) {
        emptyPixels.push(pixel);
      }
    }
  }

  return emptyPixels;
}

function growCircles()  {
  for (let circle of clearCircles) {
    if (circle.radius < circle.targetRadius) {
      let dr = circle.targetRadius - circle.radius;
      circle.radius += dr * 0.2;
    }
  }
}

function addAdditionalCircles(emptyPixels) {
  if (emptyPixels.length != 0) {
    let center = emptyPixels[Math.floor(Math.random() * emptyPixels.length)];
    let targetRadius = Math.random() * 15 + 5;
    let radius = 1;
    let color = Math.floor(Math.random() * 3) + 4;
    clearCircles.push({ center, radius, color, targetRadius });
  }
}

function printResults() {
  print(30, 50, "You died.");
  print(30, 60, "Score: " + shortenedScore());
  print(30, 70, "Jump to play again.");
}

function shrinkCircles() {
  let remainingCircles = [];
  for (let circle of clearCircles) {
    circle.radius *= 0.8;
    if (circle.radius > 1) remainingCircles.push(circle);
  }
  clearCircles = remainingCircles;
}

function drawGameOverScreen() {
  let emptyPixels = drawCircles();

  if (player.dead) {
    growCircles();
    addAdditionalCircles(emptyPixels);
    printResults();
  } else {
    shrinkCircles();
  }
}

DrawUI.Subscribe(() => {
  drawInstructions();
  drawGameOverScreen();
});
