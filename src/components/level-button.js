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

  // Only allow jumping to completed levels (unless we're in dev mode).
  // Jumping to the current level effectively resets it.
  let isLevelAvailable = (levelNumber <= currentLevelNumber) || inDevMode();

  return h('button.level-button', {
    className,
    key: levelNumber,
    onclick: isLevelAvailable ? () => {
      let event = new CustomEvent(LOAD_LEVEL, { detail: { levelNumber } });
      document.dispatchEvent(event);
    } : null,
    title: `Level ${levelNumber}`,
    type: 'button',
  }, levelNumber);
}
