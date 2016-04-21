import { combineReducers } from 'redux';
import levels from 'levels';
import { createReducer } from 'util';
import { LOAD_LEVEL, LOSE, MOVE, WIN } from 'constants/actions';
import { STARTING_LEVEL_NUMBERS } from 'constants/difficulty';
import { EASY, MEDIUM, HARD } from 'constants/difficulty-levels';
import { LOST, MAIN_MENU, PLAYING, WON } from 'constants/game-statuses';
import { PRESSED, UNPRESSED } from 'constants/tile-codes';

export default combineReducers({
  currentDifficulty: createReducer(EASY, {
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
  }),

  currentLevelNumber: createReducer(0, {
    [LOAD_LEVEL] (state, { levelNumber }) {
      return levelNumber;
    },
  }),

  maxMoves: createReducer(Infinity, {
    [LOAD_LEVEL] (state, { levelNumber }) {
      let level = levels[levelNumber];
      return level.maxMoves;
    },
  }),

  moveCount: createReducer(0, {
    [LOAD_LEVEL] () {
      return 0;
    },

    [MOVE] (state) {
      return state + 1;
    },
  }),

  playerPosition: createReducer({ row: 0, column: 0 }, {
    [LOAD_LEVEL] (state, { levelNumber }) {
      let level = levels[levelNumber];
      let { row, column } = level.playerPosition;
      return { row, column };
    },

    [MOVE] (state, { row, column }) {
      return { row, column };
    },
  }),

  status: createReducer(MAIN_MENU, {
    [LOAD_LEVEL] () {
      return PLAYING;
    },

    [LOSE] () {
      return LOST;
    },

    [WIN] () {
      return WON;
    },
  }),

  tiles: createReducer([[]], {
    [LOAD_LEVEL] (state, { levelNumber }) {
      let level = levels[levelNumber];
      return level.tiles.map(rowTiles => rowTiles.slice());
    },

    [MOVE] (state, { row, column }) {
      // Toggle the tile at the new position.
      let currentTile = state[row][column];
      let newTile = currentTile === PRESSED ? UNPRESSED : PRESSED;
      state = state.map(rowTiles => rowTiles.slice());
      state[row][column] = newTile;
      return state;
    },
  }),
});
