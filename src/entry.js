import './main.css';
import fastClick from 'fastclick';
import render from 'render';
import store from 'store';
import { loadLevel, move, moveTo, reset } from 'game';
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

// Provides the UI with the game state.
function renderProps () {
  let props = store.getState();
  props.loadLevel = loadLevel;
  props.moveTo = moveTo;
  render(props);
}

fastClick.attach(document.body);
store.subscribe(renderProps);
renderProps();
