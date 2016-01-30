import './main.css';
import d3 from 'd3';
import * as keyCodes from 'key-codes';
import * as tileCodes from 'tile-codes';

// Width and height of level squares.
const CELL_SIZE = 10;

let level = [];
let keysCurrentlyPressed = new Set();
let player = { row: 2, column: 0 };

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
function handleKeyDown () {
  let keyCode = d3.event.keyCode;

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

  d3.event.preventDefault();
  d3.event.stopPropagation();
}

// Responds to keyup events.
function handleKeyUp () {
  keysCurrentlyPressed.delete(d3.event.keyCode);
}

// Moves the player up, down, left, or right.
function move (rowDelta, columnDelta) {
  let newRow = player.row + rowDelta;
  let newColumn = player.column + columnDelta;

  if (!canMoveTo(newRow, newColumn)) {
    return;
  }

  player.row = newRow;
  player.column = newColumn;
  toggleTile(newRow, newColumn);
}

// Determines whether the player is allowed to move to the given coordinates.
function canMoveTo (row, column) {
  let outOfBounds = (row < 0) || (column < 0) ||
    (row >= level.length) || (column >= level[0].length);

  if (outOfBounds) {
    return false;
  }

  let tile = level[row][column];

  switch (tile) {
    case tileCodes.ON:
    case tileCodes.OFF:
      return true;

    default:
      return false;
  }
}

// Switches ON tile to OFF; OFF tile to ON.
function toggleTile (row, column) {
  let tile = level[row][column];

  switch (tile) {
    case tileCodes.ON:
      level[row][column] = tileCodes.OFF;
      break;

    case tileCodes.OFF:
      level[row][column] = tileCodes.ON;
      break;

    default:
      throw new Error('Tile should either be ON or OFF; received ${tile}.');
  }
}

// Determines whether the win conditions have been met.
function didWin () {
  let offTilesRemain = level
    // Flatten.
    .reduce((tileArray, rowTiles) => tileArray.concat(rowTiles), [])
    .some(tile => tile === tileCodes.OFF)

  let win = !offTilesRemain;
  return win;
}

// Redraws the level and player.
function update () {
  let wrapper = d3.select('#wrapper').style({
    height: `${level.length * CELL_SIZE}rem`,
    width: `${level[0].length * CELL_SIZE}rem`,
  });

  updateLevel(wrapper);
  updatePlayer(wrapper);

  // Player:
  if (didWin()) {
    if (confirm('You won! Play again?')) {
      document.location.reload();
    }
  }
}

// Redraws the level.
function updateLevel (wrapper) {
  let selection = wrapper.selectAll('.cell').data(() => {
    return level.reduce((cellArray, rowTiles, row) => {
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

// Redraws the player.
function updatePlayer (wrapper) {
  let selection = wrapper.selectAll('.player').data([player]);

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

// Loads a new level.
function loadLevel (levelNumber) {
  let url = `levels/${levelNumber}.txt`;

  d3.text(url, data => {
    // Convert level data to matrix.
    level = data.split('\n')
      // Remove empty lines.
      .filter(line => line.length > 0)
      .map(line => line.split(''));

    update();
  });
}

// Gets the level number from the URL hash.
function levelNumberFromHash () {
  let levelNumber = location.hash.replace('#', '');
  return levelNumber;
}

// Initialization:

d3.select('body').on({
  keydown: handleKeyDown,
  keyup: handleKeyUp,
});

let levelNumber = levelNumberFromHash() || 1;
loadLevel(levelNumber);
