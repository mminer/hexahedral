import d3 from 'd3';
import * as tileCodes from 'tile-codes';

// Determines whether the player is allowed to move to the given coordinates.
export function canMoveTo (tiles, row, column) {
  let outOfBounds = (row < 0) || (column < 0) ||
    (row >= tiles.length) || (column >= tiles[0].length);

  if (outOfBounds) {
    return false;
  }

  let tile = tiles[row][column];
  let canMove = (tile === tileCodes.ON) || (tile === tileCodes.OFF);
  return canMove;
}

// Gets the level number from the URL hash.
export function levelNumberFromHash () {
  let levelNumber = location.hash.replace('#', '');
  return levelNumber;
}

// Determines whether the win conditions have been met.
export function winConditionsMet (tiles) {
  let offTilesRemain = tiles
    // Flatten.
    .reduce((tileArray, rowTiles) => tileArray.concat(rowTiles), [])
    .some(tile => tile === tileCodes.OFF)

  let conditionsMet = !offTilesRemain;
  return conditionsMet;
}
