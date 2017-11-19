import './main.css';
import fastClick from 'fastclick';
import render from './render';
import store from './store';
import { move, reset } from './game';
import { PLAYING } from './constants/game-statuses';
import { DOWN, LEFT, R, RIGHT, UP } from './constants/key-codes';

const keyHandlers = {
  [LEFT]: () => move(0, -1),
  [UP]: () => move(-1, 0),
  [RIGHT]: () => move(0, 1),
  [DOWN]: () => move(1, 0),
  [R]: reset,
};

const keysCurrentlyPressed = new Set();

document.addEventListener('keydown', evt => {
  const { keyCode } = evt;

  // Prevent keys from repeating.
  if (keysCurrentlyPressed.has(keyCode)) {
    return;
  }

  const isPlaying = store.getState().status === PLAYING;

  // Ignore key presses when we're transitioning between levels.
  if (!isPlaying) {
    return;
  }

  const handler = keyHandlers[keyCode];

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
  const props = store.getState();
  render(props);
}

fastClick.attach(document.body);
store.subscribe(renderProps);
renderProps();
