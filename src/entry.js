import './main.css';
import fastClick from 'fastclick';
import levels from 'levels';
import render from 'render';
import * as audio from 'audio';
import {
  canMoveTo,
  distanceFromPlayer,
  maxMovesMet,
  winConditionsMet,
} from 'helpers';
import { levelNumberFromHash, log, playSoundEffect } from 'util';
import * as keyCodes from 'constants/key-codes';
import * as tileCodes from 'constants/tile-codes';
import * as gameStatuses from 'constants/game-statuses';
import { NEXT_LEVEL_DELAY } from 'constants/misc';
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
  tiles: [[]],
};

let keysCurrentlyPressed = new Set();

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

// Moves the player up, down, left, or right.
function move (rowDelta, columnDelta) {
  let { playerPosition } = gameState;
  let row = playerPosition.row + rowDelta;
  let column = playerPosition.column + columnDelta;
  moveTo(row, column);
}

// Moves the player to a specific location.
function moveTo (row, column) {
  if (!canMoveTo(gameState, row, column)) {
    return;
  }

  let invalidMoveDistance = distanceFromPlayer(gameState, row, column) !== 1;

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
  if (winConditionsMet(gameState)) {
    win();
  } else if (maxMovesMet(gameState)) {
    lose();
  }

  document.body.className = gameState.status.toLowerCase();
  render(gameState);
}

// Congratulates the player then move onto the next level.
function win () {
  gameState.status = gameStatuses.WON;
  playSoundEffect(audio.win);
  loadNextLevelAfterDelay();
  log('info', `Completed in ${gameState.moveCount} moves.`);
}


// Components communicate with the upper layer via custom events.

document.addEventListener(LOAD_LEVEL, event => {
  let { levelNumber } = event.detail;
  loadLevel(levelNumber);
});

document.addEventListener(MOVE_TO, event => {
  let { row, column } = event.detail;
  moveTo(row, column);
});

// Initialization
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
fastClick.attach(document.body);
reset();
