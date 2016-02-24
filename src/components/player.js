import { applyStyles } from 'util';
import { SQUARE_SIZE } from 'constants';

const playerElement = document.querySelector('.player');

// Moves the player to a new position.
function update (gameState) {
  let { row, column } = gameState.playerPosition;

  applyStyles(playerElement, {
    top: `${row * SQUARE_SIZE}rem`,
    left: `${column * SQUARE_SIZE}rem`,
  });
}

export default { update };
