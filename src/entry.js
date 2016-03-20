import './main.css';
import fastClick from 'fastclick';
import levels from 'levels';
import render from 'render';
import store from 'store';
import { loseAudio, moveAudio, winAudio } from 'audio';
import {
  canMoveTo,
  distanceFromPlayer,
  maxMovesMet,
  winConditionsMet,
} from 'helpers';
import { levelNumberFromHash, log, playSoundEffect } from 'util';
import { LOSE, MOVE, RESET, WIN } from 'constants/actions';
import { LOAD_LEVEL, MOVE_TO } from 'constants/events';
import { PLAYING } from 'constants/game-statuses';
import { DOWN, LEFT, R, RIGHT, UP } from 'constants/key-codes';
import { NEXT_LEVEL_DELAY } from 'constants/misc';

// Checks whether the level has been won or lost.
function checkForWinOrLoss () {
  let state = store.getState();

  if (winConditionsMet(state)) {
    win();
  } else if (maxMovesMet(state)) {
    lose();
  }
}

// Sets up the key press listeners.
function initializeKeyHandlers () {
  const keyHandlers = {
    [LEFT]: () => move(0, -1),
    [UP]: () => move(-1, 0),
    [RIGHT]: () => move(0, 1),
    [DOWN]: () => move(1, 0),
    [R]: reset,
  };

  let keysCurrentlyPressed = new Set();

  document.addEventListener('keydown', evt => {
    let { keyCode } = evt;

    // Prevent keys from repeating.
    if (keysCurrentlyPressed.has(keyCode)) {
      return;
    }

    let isPlaying = store.getState().status === PLAYING;

    // Ignore key presses when we're transitioning between levels.
    if (!isPlaying) {
      return;
    }

    let handler = keyHandlers[keyCode];

    // Ignore keys that we lack a handler for.
    if (!handler) {
      return;
    }

    handler();
    keysCurrentlyPressed.add(keyCode);

    evt.preventDefault();
    evt.stopPropagation();
  });

  document.addEventListener('keyup', evt => {
    keysCurrentlyPressed.delete(evt.keyCode);
  });
}

// Loads the given level.
function loadLevel (levelNumber) {
  let levelExists = levelNumber in levels;

  if (!levelExists) {
    log('warn', `There is no level ${levelNumber}.`);
    levelNumber = 0;
  }

  location.hash = levelNumber;
  reset();
}

// Loads the next level after a pause.
function loadNextLevelAfterDelay () {
  let { currentLevelNumber } = store.getState();
  let nextLevelNumber = currentLevelNumber + 1;
  setTimeout(() => loadLevel(nextLevelNumber), NEXT_LEVEL_DELAY);
}

// Admonishes the player then restarts the current level.
function lose () {
  store.dispatch({ type: LOSE });
  playSoundEffect(loseAudio);
  resetAfterDelay();
}

// Moves the player up, down, left, or right.
function move (rowDelta, columnDelta) {
  let { playerPosition } = store.getState();
  let row = playerPosition.row + rowDelta;
  let column = playerPosition.column + columnDelta;
  moveTo(row, column);
}

// Moves the player to a specific location.
function moveTo (row, column) {
  let state = store.getState();

  if (!canMoveTo(state, row, column)) {
    return;
  }

  let invalidMoveDistance = distanceFromPlayer(state, row, column) !== 1;

  // Ensure player only move one spot at a time.
  if (invalidMoveDistance) {
    return;
  }

  store.dispatch({ type: MOVE, row, column });
  playSoundEffect(moveAudio);
  checkForWinOrLoss();
}

// Resets the current level.
function reset () {
  let currentLevelNumber = levelNumberFromHash();
  store.dispatch({ type: RESET, levelNumber: currentLevelNumber });
}

// Reloads the current level after a pause.
function resetAfterDelay () {
  setTimeout(reset, NEXT_LEVEL_DELAY);
}

// Congratulates the player then move onto the next level.
function win () {
  let { moveCount } = store.getState();
  log('info', `Completed in ${moveCount} moves.`);
  store.dispatch({ type: WIN });
  playSoundEffect(winAudio);
  loadNextLevelAfterDelay();
}


// Components communicate with the upper layer via custom events:

document.addEventListener(LOAD_LEVEL, evt => {
  let { levelNumber } = evt.detail;
  loadLevel(levelNumber);
});

document.addEventListener(MOVE_TO, evt => {
  let { row, column } = evt.detail;
  moveTo(row, column);
});


// Initialization:

store.subscribe(() => {
  let state = store.getState();
  render(state);
});

initializeKeyHandlers();
fastClick.attach(document.body);
reset();
