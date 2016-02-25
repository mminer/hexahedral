import { findDistance } from 'util';
import * as tileCodes from 'constants/tile-codes';

// Determines whether the player is allowed to move to the given coordinates.
export function canMoveTo (gameState, row, column) {
  if (isPositionOutOfBounds(gameState, row, column)) {
    return false;
  }

  let tile = gameState.tiles[row][column];
  let canMove = (tile === tileCodes.PRESSED) || (tile === tileCodes.UNPRESSED);
  return canMove;
}

// Determines how far away the given row and column are from the player.
export function distanceFromPlayer (gameState, row, column) {
  let distance = findDistance(gameState.playerPosition, { row, column });
  return distance;
}

// Determines whether the user has hit the maximum allowed moves.
export function maxMovesMet (gameState) {
  let { maxMoves, moveCount } = gameState;
  let movesMet = moveCount >= maxMoves;
  return movesMet;
}

// Determines whether the win conditions have been met.
export function winConditionsMet (gameState) {
  let offTilesRemain = gameState.tiles
    // Flatten.
    .reduce((tileArray, rowTiles) => tileArray.concat(rowTiles), [])
    .some(tile => tile === tileCodes.UNPRESSED);

  let conditionsMet = !offTilesRemain;
  return conditionsMet;
}

// Determines whether a given position is beyond the level's boundaries.
function isPositionOutOfBounds (gameState, row, column) {
  let { tiles } = gameState;
  let outOfBounds = (row < 0) || (column < 0) ||
    (row >= tiles.length) || (column >= tiles[0].length);
  return outOfBounds;
}
