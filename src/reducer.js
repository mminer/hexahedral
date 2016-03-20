import { combineReducers } from 'redux';
import levels from 'levels';
import { createReducer } from 'util';
import { LOSE, MOVE, RESET, WIN } from 'constants/actions';
import { LOST, PLAYING, WON } from 'constants/game-statuses';
import { PRESSED, UNPRESSED } from 'constants/tile-codes';

export default combineReducers({
  currentLevelNumber: createReducer(0, {
    [RESET] (state, { levelNumber }) {
      return levelNumber;
    },
  }),

  maxMoves: createReducer(Infinity, {
    [RESET] (state, { levelNumber }) {
      let level = levels[levelNumber];
      return level.maxMoves;
    },
  }),

  moveCount: createReducer(0, {
    [MOVE] (state) {
      return state + 1;
    },

    [RESET] () {
      return 0;
    },
  }),

  playerPosition: createReducer({ row: 0, column: 0 }, {
    [MOVE] (state, { row, column }) {
      return { row, column };
    },

    [RESET] (state, { levelNumber }) {
      let level = levels[levelNumber];
      let { row, column } = level.playerPosition;
      return { row, column };
    },
  }),

  status: createReducer(PLAYING, {
    [LOSE] () {
      return LOST;
    },

    [RESET] () {
      return PLAYING;
    },

    [WIN] () {
      return WON;
    },
  }),

  tiles: createReducer([[]], {
    [MOVE] (state, { row, column }) {
      // Toggle the tile at the new position.
      let currentTile = state[row][column];
      let newTile = currentTile === PRESSED ? UNPRESSED : PRESSED;
      state = state.map(rowTiles => rowTiles.slice());
      state[row][column] = newTile;
      return state;
    },

    [RESET] (state, { levelNumber }) {
      let level = levels[levelNumber];
      return level.tiles.map(rowTiles => rowTiles.slice());
    },
  }),
});
