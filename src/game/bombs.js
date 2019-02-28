import { getPhysicsObjects, createPhysicsObject } from "./utils";
import { cutTerrain } from "./terrain";

const fuzeTime = 100;
const fuzeSpeed = 0.75;
const bombRadius = 30;
const knockBack = 50;

export function spawnBombs({ player,  bombs, score }) {
  if (Math.random() * 100 <= 0.5 * (score / 100)) {
    bombs.push(createPhysicsObject(Math.random() * 112 + 8, player.position.y - 300, 2));
  }
}

export function updateBombs(state) {
  let bombsToExplode = [];
  let remainingBombs = [];

  for (const bomb of state.bombs) {
    if (bomb.timeLeft != undefined) {
      bomb.sprite = 2;
      bomb.timeLeft -= 1;
      if (bomb.timeLeft <= 0) {
        bomb.fuze = bomb.fuze * 0.75;
        if (bomb.fuze < 1 && bomb.grounded) {
          bombsToExplode.push(bomb);
          continue;
        } else {
          bomb.timeLeft = bomb.fuze;
          bomb.sprite = 3;
        }
      }
    } else if (bomb.grounded) {
      bomb.timeLeft = fuzeTime;
      bomb.fuze = fuzeTime;
    }

    remainingBombs.push(bomb);
  }

  state.bombs = remainingBombs;

  let physicsObjects = getPhysicsObjects(state);

  for (const bomb of bombsToExplode) {
    cutTerrain(bomb.position.x, bomb.position.y, bombRadius, state.terrain);
    for (const object of physicsObjects) {
      let dx = object.position.x - bomb.position.x;
      let dy = object.position.y - bomb.position.y;

      let length = Math.sqrt(dx * dx + dy * dy);

      if (object == state.player && length < bombRadius * 0.75) location.reload();

      let nx = dx / length;
      let ny = dy / length;

      object.position.x += nx * knockBack / length;
      object.position.y += ny * knockBack / length;
    }
  }
}
