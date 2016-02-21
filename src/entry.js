import './main.css';
import d3 from 'd3';
import fastClick from 'fastclick';
import levels from 'levels';
import {
  canMoveTo,
  levelNumberFromHash,
  winConditionsMet,
} from 'level-manager';
import { findDistance, playSoundEffect } from 'util';
import * as keyCodes from 'key-codes';
import * as tileCodes from 'tile-codes';
import * as gameStatuses from 'game-statuses';

const PROGRESS_STEP_WIDTH = 2;
const LOAD_NEXT_LEVEL_DELAY = 2000;
const SQUARE_SIZE = 10;

const elements = {
  header: document.querySelector('header'),
  progress: document.querySelector('header .progress'),

  // Audio
  loseAudio: document.querySelector('audio.lose'),
  moveAudio: document.querySelector('audio.move'),
  winAudio: document.querySelector('audio.win'),
};

let gameStatus = gameStatuses.PLAYING;
let keysCurrentlyPressed = new Set();
let maxMoves = Infinity;
let moveCount = 0;
let player = {};
let tiles = {};

const keyHandlers = {
  [keyCodes.LEFT] () {
    move(0, -1);
  },

  [keyCodes.UP] () {
    move(-1, 0);
  },

  [keyCodes.RIGHT] () {
    move(0, 1);
  },

  [keyCodes.DOWN] () {
    move(1, 0);
  },

  [keyCodes.R] () {
    reset();
  },
};

// Responds to keydown events.
function handleKeyDown (event) {
  if (gameStatus !== gameStatuses.PLAYING) {
    return;
  }

  let keyCode = event.keyCode;

  // Prevent keys from repeating.
  if (keysCurrentlyPressed.has(keyCode)) {
    return;
  }

  let handler = keyHandlers[keyCode];

  // Ignore keys that we lack a handler for.
  if (!handler) {
    return;
  }

  handler();
  keysCurrentlyPressed.add(keyCode);

  event.preventDefault();
  event.stopPropagation();
}

// Responds to keyup events.
function handleKeyUp (event) {
  keysCurrentlyPressed.delete(event.keyCode);
}

// Determines whether development mode is enabled.
function inDevMode () {
  const devMode = localStorage.getItem('devMode') === 'true';
  return devMode;
}

// Logs a console message.
function log (consoleFunction, ...args) {
  if (!inDevMode()) {
    return;
  }

  console[consoleFunction](...args);
}

// Moves the player up, down, left, or right.
function move (rowDelta, columnDelta) {
  let newRow = player.row + rowDelta;
  let newColumn = player.column + columnDelta;
  moveTo(newRow, newColumn);
}

// Moves the player to a specific location.
function moveTo (row, column) {
  if (!canMoveTo(tiles, row, column)) {
    return;
  }

  let moveDistance = findDistance(player.row, player.column, row, column);
  let invalidMoveDistance = moveDistance !== 1;

  // Ensure player only move one spot at a time.
  if (invalidMoveDistance) {
    return;
  }

  player.row = row;
  player.column = column;
  toggleTile(row, column);
  moveCount += 1;
  playSoundEffect(elements.moveAudio);
  update();
}

// Switches ON tile to UNPRESSED; UNPRESSED tile to PRESSED.
function toggleTile (row, column) {
  let tile = tiles[row][column];

  switch (tile) {
    case tileCodes.PRESSED:
      tiles[row][column] = tileCodes.UNPRESSED;
      break;

    case tileCodes.UNPRESSED:
      tiles[row][column] = tileCodes.PRESSED;
      break;
  }
}

// Redraws the level and player.
function update () {
  let maxMovesMet = moveCount >= maxMoves;

  if (winConditionsMet(tiles)) {
    win();
  } else if (maxMovesMet) {
    lose();
  }

  let rowCount = tiles.length;
  let columnCount = tiles[0].length;

  d3.select('body').attr('class', gameStatus.toLowerCase());

  d3.select('main')
    .style({
      height: `${rowCount * SQUARE_SIZE}rem`,
      width: `${columnCount * SQUARE_SIZE}rem`,
    });

  updateLevel();
  updateLevelNavigator();
  updatePlayer();
  updateProgress();
}

// Redraws the level.
function updateLevel () {
  let selection = d3.select('main').selectAll('.cell').data(() => {
    return tiles.reduce((cellArray, rowTiles, row) => {
      let cells = rowTiles.map((tile, column) => ({ tile, row, column }));
      return cellArray.concat(cells);
    }, []);
  });

  // Enter
  selection.enter().append('div').attr('class', 'cell');

  // Enter + Update
  selection
    .classed({
      'pressed': d => d.tile === tileCodes.PRESSED,
      'unpressed': d => d.tile === tileCodes.UNPRESSED,
      'broken': d => d.tile === tileCodes.BROKEN,
    })
    .on('click', d => moveTo(d.row, d.column))
    .style({
      left: d => `${d.column * SQUARE_SIZE}rem`,
      top: d => `${d.row * SQUARE_SIZE}rem`,
    });

  // Exit
  selection.exit().remove();
}

// Redraws the level navigator.
function updateLevelNavigator () {
  let currentLevelNumber = levelNumberFromHash();

  let data = d3.range(levels.length).map(levelNumber => {
    return {
      complete: currentLevelNumber > levelNumber,
      current: currentLevelNumber === levelNumber,
      levelNumber,
    };
  });

  let selection = d3.select('nav').selectAll('.level-button').data(data);

  // Enter
  selection.enter().append('button')
    .attr({
      'class': 'level-button',
      'title': d => `Level ${d.levelNumber}`,
      'type': 'button',
    })
    .on('click', d => {
      // Do nothing when clicking on current level.
      if (d.current) {
        return;
      }

      // Only allow jumping to completed levels (unless we're in dev mode).
      if (!d.complete && !inDevMode()) {
        return;
      }

      loadLevel(d.levelNumber);
    })
    .text(d => d.levelNumber);

  // Enter + Update
  selection.classed({
    'complete': d => d.complete,
    'current': d => d.current,
  });

  // Exit
  selection.exit().remove();
}

// Redraws the player.
function updatePlayer () {
  let selection = d3.select('main').selectAll('.player').data([player]);

  // Enter
  selection.enter().append('div').attr('class', 'player');

  // Enter + Update
  selection.style({
    left: d => `${d.column * SQUARE_SIZE}rem`,
    top: d => `${d.row * SQUARE_SIZE}rem`,
  });
}

// Changes the width of the progress bar to indicate number of moves remaining.
function updateProgress () {
  let { header, progress } = elements;
  header.style.width = `${maxMoves * PROGRESS_STEP_WIDTH}rem`;
  header.title = `Move ${moveCount} of ${maxMoves}`;
  progress.style.width = `${moveCount * PROGRESS_STEP_WIDTH}rem`;
}

// Loads the given level.
function loadLevel (levelNumber) {
  let levelExists = levelNumber in levels;

  if (!levelExists) {
    log('warn', `There is no level ${levelNumber}.`);
    loadLevel(0);
    return;
  }

  location.hash = levelNumber;
  reset();
}

// Loads the next level after a pause.
function loadNextLevelAfterDelay () {
  setTimeout(() => {
    let currentLevelNumber = levelNumberFromHash();
    let nextLevelNumber = currentLevelNumber + 1;
    loadLevel(nextLevelNumber);
  }, LOAD_NEXT_LEVEL_DELAY);
}

// Reloads the current level after a pause.
function resetAfterDelay () {
  setTimeout(reset, LOAD_NEXT_LEVEL_DELAY);
}

// Loads the level.
function reset () {
  let levelNumber = levelNumberFromHash();
  let level = levels[levelNumber];

  gameStatus = gameStatuses.PLAYING;
  moveCount = 0;
  maxMoves = level.maxMoves;
  player = Object.assign({}, level.player);

  // Make copy of level tiles.
  tiles = level.tiles.map(rowTiles => rowTiles.slice());

  update();
}

// Congratulates the player then move onto the next level.
function win () {
  gameStatus = gameStatuses.WON;
  playSoundEffect(elements.winAudio);
  loadNextLevelAfterDelay();
  log('info', `Completed in ${moveCount} moves.`);
}

// Admonishes the player then restarts the current level.
function lose () {
  gameStatus = gameStatuses.LOST;
  playSoundEffect(elements.loseAudio);
  resetAfterDelay();
}

// Initialization:

fastClick.attach(document.body);
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.getElementsByClassName('reset-button')[0].onclick = reset;
reset();
