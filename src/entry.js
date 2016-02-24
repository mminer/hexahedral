import './main.css';
import fastClick from 'fastclick';
import levels from 'levels';
import * as audio from 'audio';
import * as keyCodes from 'key-codes';
import * as tileCodes from 'tile-codes';
import * as gameStatuses from 'game-statuses';
import Level from 'components/level';
import LevelNavigator from 'components/level-navigator';
import Player from 'components/player';
import Progress from 'components/progress';
import { findDistance, levelNumberFromHash, log, playSoundEffect } from 'util';
import { NEXT_LEVEL_DELAY } from 'constants';
import { LOAD_LEVEL, MOVE_TO } from 'events';

const keyHandlers = {
  [keyCodes.LEFT] () {
    move(0, -1);
  },

  [keyCodes.UP] () {
    move(-1, 0);
  },

  [keyCodes.RIGHT] () {
    move(0, 1);
  },

  [keyCodes.DOWN] () {
    move(1, 0);
  },

  [keyCodes.R] () {
    reset();
  },
};

let gameState = {
  currentLevelNumber: 0,
  maxMoves: Infinity,
  moveCount: 0,
  playerPosition: { row: 0, column: 0 },
  status: gameStatuses.PLAYING,
};

let keysCurrentlyPressed = new Set();

// Determines whether the player is allowed to move to the given coordinates.
function canMoveTo (row, column) {
  if (isPositionOutOfBounds(row, column)) {
    return false;
  }

  let tile = gameState.tiles[row][column];
  let canMove = (tile === tileCodes.PRESSED) || (tile === tileCodes.UNPRESSED);
  return canMove;
}

// Determines how far away the given row and column are from the player.
function distanceFromPlayer (row, column) {
  let distance = findDistance(gameState.playerPosition, { row, column });
  return distance;
}

// Responds to keydown events.
function handleKeyDown (event) {
  if (gameState.status !== gameStatuses.PLAYING) {
    return;
  }

  let { keyCode } = event;

  // Prevent keys from repeating.
  if (keysCurrentlyPressed.has(keyCode)) {
    return;
  }

  let handler = keyHandlers[keyCode];

  // Ignore keys that we lack a handler for.
  if (!handler) {
    return;
  }

  handler();
  keysCurrentlyPressed.add(keyCode);

  event.preventDefault();
  event.stopPropagation();
}

// Responds to keyup events.
function handleKeyUp (event) {
  keysCurrentlyPressed.delete(event.keyCode);
}

// Determines whether a given position is beyond the level's boundaries.
function isPositionOutOfBounds (row, column) {
  let { tiles } = gameState;
  let outOfBounds = (row < 0) || (column < 0) ||
    (row >= tiles.length) || (column >= tiles[0].length);
  return outOfBounds;
}

// Loads the given level.
function loadLevel (levelNumber) {
  let levelExists = levelNumber in levels;

  if (!levelExists) {
    log('warn', `There is no level ${levelNumber}.`);
    loadLevel(0);
    return;
  }

  location.hash = levelNumber;
  reset();
}

// Loads the next level after a pause.
function loadNextLevelAfterDelay () {
  let nextLevelNumber = gameState.currentLevelNumber + 1;
  setTimeout(() => loadLevel(nextLevelNumber), NEXT_LEVEL_DELAY);
}

// Admonishes the player then restarts the current level.
function lose () {
  gameState.status = gameStatuses.LOST;
  playSoundEffect(audio.lose);
  resetAfterDelay();
}

// Determines whether the user has hit the maximum allowed moves.
function maxMovesMet () {
  let { maxMoves, moveCount } = gameState;
  let movesMet = moveCount >= maxMoves;
  return movesMet;
}

// Moves the player up, down, left, or right.
function move (rowDelta, columnDelta) {
  let { playerPosition } = gameState;
  let row = playerPosition.row + rowDelta;
  let column = playerPosition.column + columnDelta;
  moveTo(row, column);
}

// Moves the player to a specific location.
function moveTo (row, column) {
  if (!canMoveTo(row, column)) {
    return;
  }

  let invalidMoveDistance = distanceFromPlayer(row, column) !== 1;

  // Ensure player only move one spot at a time.
  if (invalidMoveDistance) {
    return;
  }

  gameState.moveCount += 1;
  gameState.playerPosition = { row, column };
  toggleTile(row, column);
  playSoundEffect(audio.move);
  update();
}

// Loads the level.
function reset () {
  let currentLevelNumber = levelNumberFromHash();
  let level = levels[currentLevelNumber];
  let { maxMoves, playerPosition, tiles } = level;

  gameState = {
    currentLevelNumber,
    maxMoves,
    moveCount: 0,
    status: gameStatuses.PLAYING,

    // Create copy of level data to avoid mutating original objects.
    playerPosition: Object.assign({}, playerPosition),
    tiles: tiles.map(rowTiles => rowTiles.slice()),
  };

  Level.init(gameState);
  LevelNavigator.update(gameState);
  update();
}

// Reloads the current level after a pause.
function resetAfterDelay () {
  setTimeout(reset, NEXT_LEVEL_DELAY);
}

// Switches ON tile to UNPRESSED; UNPRESSED tile to PRESSED.
function toggleTile (row, column) {
  let { tiles } = gameState;
  let tile = tiles[row][column];

  switch (tile) {
    case tileCodes.PRESSED:
      tiles[row][column] = tileCodes.UNPRESSED;
      break;

    case tileCodes.UNPRESSED:
      tiles[row][column] = tileCodes.PRESSED;
      break;
  }
}

// Updates the level components with the new game state.
function update () {
  if (winConditionsMet()) {
    win();
  } else if (maxMovesMet()) {
    lose();
  }

  document.body.className = gameState.status.toLowerCase();
  Level.update(gameState);
  Player.update(gameState);
  Progress.update(gameState);
}

// Congratulates the player then move onto the next level.
function win () {
  gameState.status = gameStatuses.WON;
  playSoundEffect(audio.win);
  loadNextLevelAfterDelay();
  log('info', `Completed in ${gameState.moveCount} moves.`);
}

// Determines whether the win conditions have been met.
function winConditionsMet () {
  let offTilesRemain = gameState.tiles
    // Flatten.
    .reduce((tileArray, rowTiles) => tileArray.concat(rowTiles), [])
    .some(tile => tile === tileCodes.UNPRESSED);

  let conditionsMet = !offTilesRemain;
  return conditionsMet;
}


// Initialization:

// Components communicate with the upper layer via custom events.

document.addEventListener(LOAD_LEVEL, event => {
  let { levelNumber } = event.detail;
  loadLevel(levelNumber);
});

document.addEventListener(MOVE_TO, event => {
  let { row, column } = event.detail;
  moveTo(row, column);
});


document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.getElementsByClassName('reset-button')[0].onclick = reset;
fastClick.attach(document.body);
LevelNavigator.init();
reset();
