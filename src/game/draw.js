import { setPixel, sprite, print, camera } from "../canvasApi";
import { terrainAt } from "./utils";

export function drawPhysicsObjects(objects) {
  for (let obj of objects) {
    sprite(obj.position.x - obj.radius, obj.position.y - obj.radius, obj.sprite);
  }
}

export function drawScoreMarker({ score }) {
  sprite(0, score, 1);
  sprite(120, score, 1, 0, true);
}

export function drawInstructions() {
  print(5, 5, "left/right to move");
  print(5, 13, "up to jump");
}

export function drawScore({ cameraY, score }) {
  camera();
  let scoreText = Math.max(score - 68, 0).toString();
  if (scoreText.length > 5) scoreText = scoreText.substring(0, 5);
  print(5, 120, scoreText, 6);
}
