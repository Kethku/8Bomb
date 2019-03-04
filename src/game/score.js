import { setPixel, sprite, print, camera } from "../canvasApi";

import { player } from "./player";
import { Reset, Update, DrawWorld, DrawUI } from "./events";

export let base, score;

Reset.Subscribe(() => {
  base = null;
  score = 0;
});

export function shortenedScore() {
  if (!base) return "0";

  let integer = Math.floor(score);
  let decimal = (score - integer).toString().substring(1, 4);
  return integer + decimal;
}

Update.Subscribe(() => {
  if (!base && player.grounded) {
    base = player.position.y;
  }

  if (base) {
    if (player.position.y - base > score) {
      score = player.position.y - base;
    }
  }
});

DrawWorld.Subscribe(() => {
  sprite(0, score + (base || 0), 1);
  sprite(120, score + (base || 0), 1, 0, true);
});

DrawUI.Subscribe(() => {
  print(5, 120, shortenedScore(), 6);
});
