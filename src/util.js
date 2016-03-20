import { audioDisabled, devModeEnabled } from 'prefs';

const isChrome = navigator.userAgent.toLowerCase().includes('chrome');

// Creates a Redux reducer that maps action types to handlers.
export function createReducer (initialState, handlers = {}) {
  // Adapted from http://redux.js.org/docs/recipes/ReducingBoilerplate.html.
  let reducer = (state = initialState, action) => {
    let handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };

  return reducer;
}

// Determines the distance between two points (i.e. with no diagonal movement).
export function findDistance (position1, position2) {
  let rowDistance = Math.abs(position1.row - position2.row);
  let columnDistance = Math.abs(position1.column - position2.column);
  let distance = rowDistance + columnDistance;
  return distance;
}

// Gets the level number from the URL hash.
export function levelNumberFromHash () {
  let levelNumber = parseInt(location.hash.replace('#', '') || 0);
  return levelNumber;
}

// Logs a console message.
export function log (consoleFunction, ...args) {
  if (!devModeEnabled) {
    return;
  }

  console[consoleFunction](...args);
}

// Plays an audio clip from the beginning.
export function playSoundEffect (audio) {
  if (audioDisabled) {
    return;
  }

  // This is horrible, but currently audio really slows down Safari.
  // In lieu of a better solution just disable it.
  if (!isChrome) {
    return;
  }

  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
