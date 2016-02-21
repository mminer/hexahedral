import * as tileCodes from 'tile-codes';
import { SQUARE_SIZE } from 'constants';
import { MOVE_TO } from 'events';

const mainElement = document.querySelector('main');
let cellElements = [];

// Generates divs to represent the level.
function init (gameState) {
  let { tiles } = gameState;

  mainElement.style.height = `${tiles.length * SQUARE_SIZE}rem`;
  mainElement.style.width = `${tiles[0].length * SQUARE_SIZE}rem`;

  let cellCount = tiles.length * tiles[0].length;
  cellElements = Array.from(document.querySelectorAll('.cell'));
  cellElements = addMissingElements(cellElements, cellCount);
  cellElements = removeExtraElements(cellElements, cellCount);

  let elementIndex = 0;

  // This is a good candidate for an ES2015 generator, but the increased file
  // size from the required Babel polyfill make it less worthwhile.
  for (let row = 0; row < tiles.length; row += 1) {
    for (let column = 0; column < tiles[0].length; column += 1) {
      let tile = tiles[row][column];
      let element = cellElements[elementIndex];
      element.classList.toggle('broken', tile === tileCodes.BROKEN);
      element.style.top = `${row * SQUARE_SIZE}rem`;
      element.style.left = `${column * SQUARE_SIZE}rem`;

      element.onclick = () => {
        let event = new CustomEvent(MOVE_TO, { detail: { row, column } });
        document.dispatchEvent(event);
      };

      elementIndex += 1;
    }
  }
}

// Sets the classes of the cell divs to reflect their updated state.
function update (gameState) {
  let { tiles } = gameState;
  let elementIndex = 0;

  for (let row = 0; row < tiles.length; row += 1) {
    for (let column = 0; column < tiles[0].length; column += 1) {
      let tile = tiles[row][column];
      let element = cellElements[elementIndex];
      element.classList.toggle('pressed', tile === tileCodes.PRESSED);
      element.classList.toggle('unpressed', tile === tileCodes.UNPRESSED);
      elementIndex += 1;
    }
  }
}

// Generates new divs if more are needed to represent the level.
function addMissingElements (elements, cellCount) {
  let missingCount = cellCount - elements.length;
  let newElements = [];

  for (let i = 0; i < missingCount; i++) {
    let element = document.createElement('div');
    element.className = 'cell';
    newElements.push(element);
  }

  let fragment = document.createDocumentFragment();
  newElements.forEach(element => fragment.appendChild(element));
  mainElement.appendChild(fragment);
  elements = elements.concat(newElements);
  return elements;
}

// Removes extraneous divs if fewer are needed to represent the level.
function removeExtraElements (elements, cellCount) {
  elements.slice(cellCount).forEach(element =>
    mainElement.removeChild(element)
  );

  elements = elements.slice(0, cellCount);
  return elements;
}

export default { init, update };
