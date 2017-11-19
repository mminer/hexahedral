import levels from './levels';
import { createReducer } from './util';
import { LOAD_LEVEL, LOSE, MOVE, WIN } from './constants/actions';
import { STARTING_LEVEL_NUMBERS } from './constants/difficulty';
import { EASY, MEDIUM, HARD } from './constants/difficulty-levels';
import { LOST, MAIN_MENU, PLAYING, WON } from './constants/game-statuses';
import { PRESSED, UNPRESSED } from './constants/tile-codes';

export const currentDifficulty = createReducer(EASY, {
  [LOAD_LEVEL] (state, { levelNumber }) {
    if (levelNumber < STARTING_LEVEL_NUMBERS[MEDIUM]) {
      state = EASY;
    } else if (levelNumber < STARTING_LEVEL_NUMBERS[HARD]) {
      state = MEDIUM;
    } else {
      state = HARD;
    }

    return state;
  },
});

export const currentLevelNumber = createReducer(0, {
  [LOAD_LEVEL] (state, { levelNumber }) {
    return levelNumber;
  },
});

export const maxLevelReached = createReducer(0, {
  [LOAD_LEVEL] (state, { levelNumber }) {
    return Math.max(state, levelNumber);
  },
});

export const maxMoves = createReducer(Infinity, {
  [LOAD_LEVEL] (state, { levelNumber }) {
    const level = levels[levelNumber];
    return level.maxMoves;
  },
});

export const moveCount = createReducer(0, {
  [LOAD_LEVEL] () {
    return 0;
  },

  [MOVE] (state) {
    return state + 1;
  },
});

export const playerPosition = createReducer({ row: 0, column: 0 }, {
  [LOAD_LEVEL] (state, { levelNumber }) {
    const level = levels[levelNumber];
    const { row, column } = level.playerPosition;
    return { row, column };
  },

  [MOVE] (state, { row, column }) {
    return { row, column };
  },
});

export const status = createReducer(MAIN_MENU, {
  [LOAD_LEVEL] () {
    return PLAYING;
  },

  [LOSE] () {
    return LOST;
  },

  [WIN] () {
    return WON;
  },
});

export const tiles = createReducer([[]], {
  [LOAD_LEVEL] (state, { levelNumber }) {
    const level = levels[levelNumber];
    return level.tiles.map(rowTiles => rowTiles.slice());
  },

  [MOVE] (state, { row, column }) {
    // Toggle the tile at the new position.
    const currentTile = state[row][column];
    const newTile = currentTile === PRESSED ? UNPRESSED : PRESSED;
    state = state.map(rowTiles => rowTiles.slice());
    state[row][column] = newTile;
    return state;
  },
});
