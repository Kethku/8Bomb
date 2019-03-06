import { print, setPixel, circStroke, circFill } from "../canvasApi";
import { Reset, DrawUI } from "./events";
import Vector from "./vector";
import { player } from "./player";
import { shortenedScore } from "./score";

const totalPixels = 128 * 128;
const circleUnderCoverage = 0.7;

const circleGrowthSpeed = 0.1;
const circleShrinkSpeed = 0.8;

let clearCircles = [];
let uncoveredPixels;

Reset.Subscribe(() => {
  uncoveredPixels = new Set();
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      uncoveredPixels.add(y * 128 + x);
    }
  }
});

function drawInstructions() {
  print(5, 5, "left/right to move");
  print(5, 13, "up to jump");
}

function drawCircles() {
  for (let { center: { x, y }, radius, color } of clearCircles) {
    circFill(x, y, radius, color);
  }
}

function growCircles()  {
  for (let circle of clearCircles) {
    if (circle.radius < circle.targetRadius) {
      let dr = circle.targetRadius - circle.radius;
      circle.radius += dr * circleGrowthSpeed;
    }
  }
}

function randomUncoveredPixel() {
  let elementsRemaining = Math.floor(Math.random() * uncoveredPixels.size);
  for (let index of uncoveredPixels) {
    if (elementsRemaining == 0) {
      return index;
    }
    elementsRemaining --;
  }
}

function markCoveredPixels(center, targetRadius) {
  let radiusVector = new Vector(targetRadius * circleUnderCoverage, targetRadius * circleUnderCoverage);
  for (let pixel of Vector.InRectangle(center.subtract(radiusVector).floor(), center.add(radiusVector).ceil())) {
    if (pixel.subtract(center).length > targetRadius * circleUnderCoverage) continue;
    if (pixel.x < 0 || pixel.x >= 128 || pixel.y < 0 || pixel.y >= 128) continue;

    let index = pixel.y * 128 + pixel.x;
    uncoveredPixels.delete(index);
  }
}

function addAdditionalCircles(emptyPixels) {
  if (uncoveredPixels.size > 0) {
    let centerIndex = randomUncoveredPixel();
    let center = new Vector(centerIndex % 128, Math.floor(centerIndex / 128));
    let targetRadius = Math.random() * 15 + 5;
    markCoveredPixels(center, targetRadius);
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
    circle.radius *= circleShrinkSpeed;
    if (circle.radius > 1) remainingCircles.push(circle);
  }
  clearCircles = remainingCircles;
}

function drawGameOverScreen() {
  drawCircles();

  if (player.dead) {
    growCircles();
    addAdditionalCircles();
    printResults();
  } else {
    shrinkCircles();
  }
}

DrawUI.Subscribe(() => {
  drawInstructions();
  drawGameOverScreen();
});
