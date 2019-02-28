import { getPhysicsObjects, createPhysicsObject } from "./utils";
import { cutTerrain } from "./terrain";

const fuzeTime = 100;
const fuzeSpeed = 0.75;
const bombRadius = 30;
const knockBack = 50;

export function spawnBombs({ player,  bombs, score }) {
  if (Math.random() * 100 <= score / 400 + 0.5) {
    bombs.push(createPhysicsObject(Math.random() * 112 + 8, player.position.y - 300, 2));
  }
}

export function updateBombs(state) {
  let bombsToExplode = [];
  let remainingBombs = [];

  // Update Bomb Timers
  for (const bomb of state.bombs) {
    if (bomb.timeLeft != undefined) {
      // Reset Bomb Sprite
      bomb.sprite = 2;
      // Decrement timer
      bomb.timeLeft -= 1;
      if (bomb.timeLeft <= 0) {
        // Halve next timer length
        bomb.fuze = bomb.fuze * 0.75;
        if (bomb.fuze < 1 && bomb.grounded) {
          // Fuze finished. Explode
          bombsToExplode.push(bomb);
          continue;
        } else {
          // Not enough iterations yet. Flicker again
          bomb.timeLeft = bomb.fuze;
          bomb.sprite = 3;
        }
      }
    } else if (bomb.grounded) {
      // Start fuze since the bomb has hit the ground
      bomb.timeLeft = fuzeTime;
      bomb.fuze = fuzeTime;
    }

    // Preserve this bomb
    remainingBombs.push(bomb);
  }
  // Preserve all remaining bombs
  state.bombs = remainingBombs;

  // Blog up bombs
  let physicsObjects = getPhysicsObjects(state);
  for (const bomb of bombsToExplode) {
    cutTerrain(bomb.position.x, bomb.position.y, bombRadius, state.terrain);
    for (const object of physicsObjects) {
      // Find the distance to the object
      let dx = object.position.x - bomb.position.x;
      let dy = object.position.y - bomb.position.y;
      let length = Math.sqrt(dx * dx + dy * dy);

      // If the object is the player, and the length is less than 3/4 of the
      // bomb radius, the player has lost.
      if (object == state.player && length < bombRadius * 0.75) location.reload();

      // Otherwise knockback the object by the distance * knockBack / length^2;
      let lengthSquared = length * length;
      object.position.x += dx * knockBack / lengthSquared;
      object.position.y += dy * knockBack / lengthSquared;
    }
  }
}