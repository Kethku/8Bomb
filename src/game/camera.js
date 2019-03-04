import { player } from "./player";
import { Reset, Update } from "./events";

const cameraMomentum = 0.8;
const cameraLag = 0.2;
const shakeFalloff = 0.7;

let previousCameraPosition, cameraPosition, shake;
export let cameraX, cameraY;

Reset.Subscribe(() => {
  previousCameraPosition = 0;
  cameraPosition = 0;
  shake = 0;

  cameraY = 0;
  cameraX = 0;
});

export function shakeCamera(amount) {
  shake = amount;
}

Update.Subscribe(() => {
  shake *= shakeFalloff;

  let vy = cameraPosition - previousCameraPosition;
  previousCameraPosition = cameraPosition;
  cameraPosition += vy * cameraMomentum;

  if (player.position.y > cameraPosition + 96) {
    let cameraDiff = player.position.y - (cameraPosition + 96);
    cameraPosition += cameraDiff * cameraLag;
  }

  if (player.position.y < cameraPosition + 32) {
    let cameraDiff = player.position.y - (cameraPosition + 32);
    cameraPosition += cameraDiff * 0.2;
  }

  cameraX = Math.random() * shake;
  cameraY = cameraPosition + Math.random() * shake;
});

