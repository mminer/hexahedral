import { h } from 'virtual-dom';
import { inDevMode } from 'util';
import { LOAD_LEVEL } from 'events';

export default function LevelButton ({ currentLevelNumber, levelNumber }) {
  let className = '';

  if (levelNumber < currentLevelNumber) {
    className = 'complete';
  } else if (levelNumber === currentLevelNumber) {
    className = 'current';
  }

  return h('button.level-button', {
    className,
    key: levelNumber,
    onclick: () => {
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
    },
    title: `Level ${levelNumber}`,
    type: 'button',
  }, levelNumber);
}
