import { findDistance } from './util';
import { PRESSED, UNPRESSED } from './constants/tile-codes';

// Determines whether the player is allowed to move to the given coordinates.
export function canMoveTo (state, row, column) {
  if (isPositionOutOfBounds(state, row, column)) {
    return false;
  }

  const tile = state.tiles[row][column];
  const canMove = (tile === PRESSED) || (tile === UNPRESSED);
  return canMove;
}

// Determines how far away the given row and column are from the player.
export function distanceFromPlayer (state, row, column) {
  const distance = findDistance(state.playerPosition, { row, column });
  return distance;
}

// Determines whether the user has hit the maximum allowed moves.
export function maxMovesMet (state) {
  const { maxMoves, moveCount } = state;
  const movesMet = moveCount >= maxMoves;
  return movesMet;
}

// Determines whether the win conditions have been met.
export function winConditionsMet (state) {
  const offTilesRemain = state.tiles
    // Flatten.
    .reduce((tileArray, rowTiles) => tileArray.concat(rowTiles), [])
    .some(tile => tile === UNPRESSED);

  const conditionsMet = !offTilesRemain;
  return conditionsMet;
}

// Determines whether a given position is beyond the level's boundaries.
function isPositionOutOfBounds (state, row, column) {
  const { tiles } = state;
  const outOfBounds = (row < 0) || (column < 0) ||
    (row >= tiles.length) || (column >= tiles[0].length);
  return outOfBounds;
}
