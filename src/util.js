import levels from './levels';
import { EASY, MEDIUM, HARD } from './constants/difficulty-levels';
import { AUDIO_DISABLED, DEV_MODE_ENABLED } from './constants/prefs';

const allLevelNumbers = levels.map((level, levelNumber) => levelNumber);
const isChrome = navigator.userAgent.toLowerCase().includes('chrome');

// Creates a Redux reducer that maps action types to handlers.
export function createReducer (initialState, handlers = {}) {
  // Adapted from http://redux.js.org/docs/recipes/ReducingBoilerplate.html.
  const reducer = (state = initialState, action) => {
    const handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };

  return reducer;
}

// Determines the distance between two points (i.e. with no diagonal movement).
export function findDistance (position1, position2) {
  const rowDistance = Math.abs(position1.row - position2.row);
  const columnDistance = Math.abs(position1.column - position2.column);
  const distance = rowDistance + columnDistance;
  return distance;
}

// Gets the level numbers that are part of the given difficulty range.
export function levelNumbersInDifficulty (difficulty) {
  let levelNumbers = [];

  switch (difficulty) {
    case EASY:
      levelNumbers = allLevelNumbers.slice(0, 10);
      break;

    case MEDIUM:
      levelNumbers = allLevelNumbers.slice(10, 20);
      break;

    case HARD:
      levelNumbers = allLevelNumbers.slice(20, 30);
      break;
  }

  return levelNumbers;
}

// Logs a console message.
export function log (consoleFunction, ...args) {
  if (!DEV_MODE_ENABLED) {
    return;
  }

  console[consoleFunction](...args);
}

// Plays an audio clip from the beginning.
export function playSoundEffect (audio) {
  if (AUDIO_DISABLED) {
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
