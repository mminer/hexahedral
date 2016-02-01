import * as tileCodes from 'tile-codes';

// Determines whether the player is allowed to move to the given coordinates.
export function canMoveTo (tiles, row, column) {
  let outOfBounds = (row < 0) || (column < 0) ||
    (row >= tiles.length) || (column >= tiles[0].length);

  if (outOfBounds) {
    return false;
  }

  let tile = tiles[row][column];
  let canMove = (tile === tileCodes.PRESSED) || (tile === tileCodes.UNPRESSED);
  return canMove;
}

// Gets the level number from the URL hash.
export function levelNumberFromHash () {
  let levelNumber = parseInt(location.hash.replace('#', '') || 0);
  return levelNumber;
}

// Determines whether the win conditions have been met.
export function winConditionsMet (tiles) {
  let offTilesRemain = tiles
    // Flatten.
    .reduce((tileArray, rowTiles) => tileArray.concat(rowTiles), [])
    .some(tile => tile === tileCodes.UNPRESSED);

  let conditionsMet = !offTilesRemain;
  return conditionsMet;
}
