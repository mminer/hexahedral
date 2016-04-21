import levels from 'levels';
import { findDistance } from 'util';
import { DIFFICULTY_IDS } from 'constants/difficulty';
import { PRESSED, UNPRESSED } from 'constants/tile-codes';

// Determines whether the player is allowed to move to the given coordinates.
export function canMoveTo (state, row, column) {
  if (isPositionOutOfBounds(state, row, column)) {
    return false;
  }

  let tile = state.tiles[row][column];
  let canMove = (tile === PRESSED) || (tile === UNPRESSED);
  return canMove;
}

// Determines how far away the given row and column are from the player.
export function distanceFromPlayer (state, row, column) {
  let distance = findDistance(state.playerPosition, { row, column });
  return distance;
}

// Determines whether the player completed the final level.
export function isFinalLevelComplete (state) {
  let isComplete = (state.currentLevelNumber + 1) % 10 === 0;
  return isComplete;
}

// Determines whether the user has hit the maximum allowed moves.
export function maxMovesMet (state) {
  let { maxMoves, moveCount } = state;
  let movesMet = moveCount >= maxMoves;
  return movesMet;
}

// Tells the parent frame that the player has completed the game.
export function notifyParentOfCompletion (state) {
  let difficultyID = DIFFICULTY_IDS[state.currentDifficulty];
  parent.postMessage(`gameOver:${difficultyID}:100`, '*');
}

// Determines whether the win conditions have been met.
export function winConditionsMet (state) {
  let offTilesRemain = state.tiles
    // Flatten.
    .reduce((tileArray, rowTiles) => tileArray.concat(rowTiles), [])
    .some(tile => tile === UNPRESSED);

  let conditionsMet = !offTilesRemain;
  return conditionsMet;
}

// Determines whether a given position is beyond the level's boundaries.
function isPositionOutOfBounds (state, row, column) {
  let { tiles } = state;
  let outOfBounds = (row < 0) || (column < 0) ||
    (row >= tiles.length) || (column >= tiles[0].length);
  return outOfBounds;
}
