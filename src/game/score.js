import { setPixel, sprite, print, camera } from "../canvasApi";

import { player } from "./player";
import { Update, DrawWorld, DrawUI } from "./events";

export let score = 0;

Update.Subscribe(() => {
  if (player.position.y > score) {
    score = player.position.y;
  }
});

DrawWorld.Subscribe(() => {
  sprite(0, score, 1);
  sprite(120, score, 1, 0, true);
});

DrawUI.Subscribe(() => {
  let scoreText = Math.max(score - 68, 0).toString();
  if (scoreText.length > 5) scoreText = scoreText.substring(0, 5);
  print(5, 120, scoreText, 6);
});
