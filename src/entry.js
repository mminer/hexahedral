import './main.css';
import d3 from 'd3';
import levels from 'levels';
import {
  canMoveTo,
  levelNumberFromHash,
  winConditionsMet,
} from 'level-manager';
import * as keyCodes from 'key-codes';
import * as tileCodes from 'tile-codes';

// Width and height of level squares.
const CELL_SIZE = 10;

let keysCurrentlyPressed = new Set();
let maxMoves = Infinity;
let moveCount = 0;
let player = { row: 2, column: 0 };
let tiles = {};

const moveCountElement = document.getElementById('move-count');
const maxMovesElement = document.getElementById('max-moves');

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
};

// Responds to keydown events.
function handleKeyDown (event) {
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
  update();

  event.preventDefault();
  event.stopPropagation();
}

// Responds to keyup events.
function handleKeyUp (event) {
  keysCurrentlyPressed.delete(event.keyCode);
}

// Moves the player up, down, left, or right.
function move (rowDelta, columnDelta) {
  let newRow = player.row + rowDelta;
  let newColumn = player.column + columnDelta;

  if (!canMoveTo(tiles, newRow, newColumn)) {
    return;
  }

  player.row = newRow;
  player.column = newColumn;
  toggleTile(newRow, newColumn);
  moveCount += 1;
}

// Switches ON tile to OFF; OFF tile to ON.
function toggleTile (row, column) {
  let tile = tiles[row][column];
  console.assert(tile === tileCodes.ON || tile === tileCodes.OFF);

  switch (tile) {
    case tileCodes.ON:
      tiles[row][column] = tileCodes.OFF;
      break;

    case tileCodes.OFF:
      tiles[row][column] = tileCodes.ON;
      break;
  }
}

// Redraws the level and player.
function update () {
  let container = d3.select('main').style({
    height: `${tiles.length * CELL_SIZE}rem`,
    width: `${tiles[0].length * CELL_SIZE}rem`,
  });

  updateLevel(container);
  updateMoveCounter();
  updatePlayer(container);

  let moveCountExceeded = moveCount > maxMoves;

  if (moveCountExceeded) {
    let message = 'Maximum moves exceeded! Play again?';

    if (confirm(message)) {
      reset();
    }
  }

  if (winConditionsMet(tiles)) {
    let message = `You won in ${moveCount} moves. Play again?`;

    if (confirm(message)) {
      reset();
    }
  }
}

// Redraws the level.
function updateLevel (container) {
  let selection = container.selectAll('.cell').data(() => {
    return tiles.reduce((cellArray, rowTiles, row) => {
      let cells = rowTiles.map((tile, column) => ({ tile, row, column }));
      return cellArray.concat(cells);
    }, []);
  });

  // Enter
  selection.enter().append('div')
    .attr('class', 'cell')
    .style({
      height: `${CELL_SIZE}rem`,
      left: d => `${d.column * CELL_SIZE}rem`,
      top: d => `${d.row * CELL_SIZE}rem`,
      width: `${CELL_SIZE}rem`,
    });

  // Enter + Update
  selection.classed({
    'on': d => d.tile === tileCodes.ON,
    'off': d => d.tile === tileCodes.OFF,
    'broken': d => d.tile === tileCodes.BROKEN,
  });
}

// Redraws the move counter.
function updateMoveCounter () {
  moveCountElement.innerText = moveCount;
  maxMovesElement.innerText = maxMoves;
}

// Redraws the player.
function updatePlayer (container) {
  let selection = container.selectAll('.player').data([player]);

  // Enter
  selection.enter().append('div')
    .attr('class', 'player')
    .style({
      height: `${CELL_SIZE}rem`,
      width: `${CELL_SIZE}rem`,
    });

  // Enter + Update
  selection.style({
    left: d => `${d.column * CELL_SIZE}rem`,
    top: d => `${d.row * CELL_SIZE}rem`,
  });
}

// Resets the game.
function reset () {
  let levelNumber = levelNumberFromHash() || 0;
  let level = levels[levelNumber];

  // Make copy of level tiles.
  tiles = level.tiles.map(rowTiles => rowTiles.slice());

  player = { row: 2, column: 0 };
  maxMoves = level.maxMoves;
  moveCount = 0;
  update();
}

// Initialization:

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.getElementById('reset').onclick = reset;
reset();
