import { SQUARE_SIZE } from 'constants';

const playerElement = document.querySelector('.player');

// Moves the player to a new position.
function update (gameState) {
  let { row, column } = gameState.playerPosition;
  let { style } = playerElement;
  style.top = `${row * SQUARE_SIZE}rem`;
  style.left = `${column * SQUARE_SIZE}rem`;
}

export default { update };
