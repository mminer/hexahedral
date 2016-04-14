import levels from 'levels';
import store from 'store';
import {
  canMoveTo,
  distanceFromPlayer,
  maxMovesMet,
  winConditionsMet,
} from 'helpers';
import { levelNumberFromHash, log, playSoundEffect } from 'util';
import { LOAD_LEVEL, LOSE, MOVE, WIN } from 'constants/actions';
import { LOSE_AUDIO, MOVE_AUDIO, WIN_AUDIO } from 'constants/audio';
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

// Loads the given level.
function loadLevel (levelNumber) {
  let levelExists = levelNumber in levels;

  if (!levelExists) {
    log('warn', `There is no level ${levelNumber}.`);
    levelNumber = 0;
  }

  store.dispatch({ type: LOAD_LEVEL, levelNumber });
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
  playSoundEffect(LOSE_AUDIO);
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
  playSoundEffect(MOVE_AUDIO);
  checkForWinOrLoss();
}

// Resets the current level.
function reset () {
  let { currentLevelNumber } = store.getState();
  loadLevel(currentLevelNumber);
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
  playSoundEffect(WIN_AUDIO);
  loadNextLevelAfterDelay();
}

export { loadLevel, move, moveTo, reset };
