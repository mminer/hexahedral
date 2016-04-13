import { h } from 'virtual-dom';
import { fireLoadLevelEvent } from 'util';
import { DEV_MODE_ENABLED } from 'constants/prefs';

export default function LevelButton ({ currentLevelNumber, levelNumber }) {
  let className = '';

  if (levelNumber < currentLevelNumber) {
    className = 'complete';
  } else if (levelNumber === currentLevelNumber) {
    className = 'current';
  }

  // Only allow jumping to completed levels (unless we're in dev mode).
  // Jumping to the current level effectively resets it.
  let isLevelAvailable = DEV_MODE_ENABLED ||
    (levelNumber <= currentLevelNumber);

  return h('button.level-button', {
    className,
    key: levelNumber,
    onclick: isLevelAvailable ? () => fireLoadLevelEvent(levelNumber) : null,
    title: `Level ${levelNumber}`,
    type: 'button',
  }, levelNumber);
}
