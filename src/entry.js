import './main.css';
import fastClick from 'fastclick';
import render from 'render';
import store from 'store';
import { loadLevel, move, moveTo, reset } from 'game';
import { LOAD_LEVEL, MOVE_TO } from 'constants/events';
import { PLAYING } from 'constants/game-statuses';
import { DOWN, LEFT, R, RIGHT, UP } from 'constants/key-codes';

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

document.addEventListener(LOAD_LEVEL, evt => {
  let { levelNumber } = evt.detail;
  loadLevel(levelNumber);
});

document.addEventListener(MOVE_TO, evt => {
  let { row, column } = evt.detail;
  moveTo(row, column);
});

store.subscribe(() => {
  let state = store.getState();
  render(state);
});

fastClick.attach(document.body);
reset();
