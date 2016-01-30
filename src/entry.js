import './main.css';
import d3 from 'd3';

const KEYCODE_LEFT = 37;
const KEYCODE_UP = 38;
const KEYCODE_RIGHT = 39;
const KEYCODE_DOWN = 40;

let squareSize = 10;

let playerData = {
  x: 0,
  y: 2,
};

const SWITCH_ON = '0';
const SWITCH_OFF = '_';
const SWITCH_BROKEN = 'X';

let level = [
  ['0', 'X', '_'],
  ['_', '_', '_'],
  ['0', 'X', '_'],
];

// Flatten out level into array of square objects.
let squareData = level.reduce((squareDataArray, row, y) => {
  let rowSquareData = row.map((type, x) => ({ type, x, y }));
  return squareDataArray.concat(rowSquareData);
}, []);

d3.select('body')
  .on('keydown', handleKeyDown)
  .on('keyup', handleKeyUp);

const wrapper = d3.select('#wrapper');
let needsUpdate = true;

const keyHandlers = {
  [KEYCODE_LEFT] () {
    movePlayer(-1, 0);
  },

  [KEYCODE_UP] () {
    movePlayer(0, -1);
  },

  [KEYCODE_RIGHT] () {
    movePlayer(1, 0);
  },

  [KEYCODE_DOWN] () {
    movePlayer(0, 1);
  },
};

let keysCurrentlyPressed = new Set();

function canPlayerMoveToPosition (x, y) {
  let outOfBounds = (y < 0) || (x < 0) ||
    (y >= level.length) || (x >= level[0].length);

  if (outOfBounds) {
    return false;
  }

  let squareType = level[y][x];
  let canMove = (squareType === SWITCH_ON) || (squareType === SWITCH_OFF);
  return canMove;
}

function movePlayer (deltaX, deltaY) {
  let newX = playerData.x + deltaX;
  let newY = playerData.y + deltaY;

  if (!canPlayerMoveToPosition(newX, newY)) {
    return;
  }

  playerData.x = newX;
  playerData.y = newY;
  toggleSwitch(newX, newY);
  needsUpdate = true;
}

function getSquare (x, y) {
  let square = squareData.find(square => square.x === x && square.y === y);
  return square;
}

function toggleSwitch (x, y) {
  let square = getSquare(x, y);
  console.assert(square.type === SWITCH_ON || square.type === SWITCH_OFF);

  switch (square.type) {
    case SWITCH_ON:
      square.type = SWITCH_OFF;
      break;

    case SWITCH_OFF:
      square.type = SWITCH_ON;
      break;
  }
}

function didWin () {
  let unswitchedRemain = squareData.some(square => square.type === SWITCH_OFF);
  let win = !unswitchedRemain;
  return win;
}

function handleKeyDown () {
  let { event } = d3;
  let { keyCode } = event;
  let keyHandler = keyHandlers[keyCode];

  // Ignore keys that we lack a handler for.
  if (!keyHandler) {
    return;
  }

  // Prevent keys from repeating.
  if (keysCurrentlyPressed.has(keyCode)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  keysCurrentlyPressed.add(keyCode);
  keyHandler();
  update();
}

function handleKeyUp () {
  keysCurrentlyPressed.delete(d3.event.keyCode);
}

function update () {
  if (!needsUpdate) {
    return;
  }

  // Squares:

  let squares = wrapper.selectAll('.square').data(squareData);

  // Enter
  squares.enter().append('div')
    .attr('class', 'square')
    .style({
      height: `${squareSize}rem`,
      left: d => `${d.x * squareSize}rem`,
      top: d => `${d.y * squareSize}rem`,
      width: `${squareSize}rem`,
    });

  // Enter + Update
  squares.classed({
    'on': d => d.type === SWITCH_ON,
    'off': d => d.type === SWITCH_OFF,
    'broken': d => d.type === SWITCH_BROKEN,
  });

  // Player:

  let player = wrapper.selectAll('.player').data([playerData]);

  // Enter
  player.enter().append('div')
    .attr('class', 'player')
    .style({
      height: `${squareSize}rem`,
      width: `${squareSize}rem`,
    });

  // Enter + Update
  player.style({
    left: d => `${d.x * squareSize}rem`,
    top: d => `${d.y * squareSize}rem`,
  });

  if (didWin()) {
    if (confirm('You won! Play again?')) {
      document.location.reload();
    }
  }

  needsUpdate = false;
}

update();
