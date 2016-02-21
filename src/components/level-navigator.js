import levels from 'levels';
import { inDevMode, levelNumberFromHash } from 'util';
import { LOAD_LEVEL } from 'events';

let buttonElements = [];

// Generates buttons to jump to previously completed levels.
function init () {
  buttonElements = levels.map((level, levelNumber) => {
    let element = document.createElement('button');
    element.className = 'level-button';
    element.textContent = levelNumber;
    element.title = `Level ${levelNumber}`;
    element.type = 'button';

    element.onclick = () => {
      let currentLevelNumber = levelNumberFromHash();
      let isLevelCurrent = levelNumber === currentLevelNumber;

      // Do nothing when clicking on current level.
      if (isLevelCurrent) {
        return;
      }

      let isLevelComplete = levelNumber < currentLevelNumber;

      // Only allow jumping to completed levels (unless we're in dev mode).
      if (!isLevelComplete && !inDevMode()) {
        return;
      }

      let event = new CustomEvent(LOAD_LEVEL, { detail: { levelNumber } });
      document.dispatchEvent(event);
    };

    return element;
  });

  let fragment = document.createDocumentFragment();
  buttonElements.forEach(element => fragment.appendChild(element));
  document.querySelector('nav').appendChild(fragment);
}

// Changes level button classes to indicate which ones are complete.
function update (gameState) {
  let { currentLevelNumber } = gameState;

  buttonElements.forEach((element, levelNumber) => {
    let { classList } = element;
    // TODO: way to minimize repaints causes by toggling?
    classList.toggle('complete', levelNumber < currentLevelNumber);
    classList.toggle('current', levelNumber === currentLevelNumber);
  });
}

export default { init, update };
