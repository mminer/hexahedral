import { h } from 'virtual-dom';
import { DEV_MODE_ENABLED } from '../constants/prefs';
import { loadLevel } from '../game';

function getClassName (levelNumber, currentLevelNumber, maxLevelReached) {
  if (levelNumber === currentLevelNumber) {
    return 'current';
  } else if (levelNumber <= maxLevelReached) {
    return 'complete';
  } else {
    return '';
  }
}

export default function LevelButton ({
  currentLevelNumber,
  levelNumber,
  maxLevelReached,
}) {
  // Only allow jumping to completed levels (unless we're in dev mode).
  // Jumping to the current level effectively resets it.
  const isLevelAvailable = DEV_MODE_ENABLED ||
    (levelNumber <= maxLevelReached);

  return h('button.level-button', {
    className: getClassName(levelNumber, currentLevelNumber, maxLevelReached),
    key: levelNumber,
    onclick: isLevelAvailable ? () => loadLevel(levelNumber) : null,
    title: `Level ${levelNumber}`,
    type: 'button',
  }, levelNumber);
}
