import { h } from 'virtual-dom';
import { DEV_MODE_ENABLED } from 'constants/prefs';

function getClassName (levelNumber, currentLevelNumber) {
  let className = '';

  if (levelNumber < currentLevelNumber) {
    className = 'complete';
  } else if (levelNumber === currentLevelNumber) {
    className = 'current';
  }

  return className;
}

export default function LevelButton ({
  currentLevelNumber,
  levelNumber,
  loadLevel,
}) {
  // Only allow jumping to completed levels (unless we're in dev mode).
  // Jumping to the current level effectively resets it.
  let isLevelAvailable = DEV_MODE_ENABLED ||
    (levelNumber <= currentLevelNumber);

  return h('button.level-button', {
    className: getClassName(levelNumber, currentLevelNumber),
    key: levelNumber,
    onclick: isLevelAvailable ? () => loadLevel(levelNumber) : null,
    title: `Level ${levelNumber}`,
    type: 'button',
  }, levelNumber);
}
