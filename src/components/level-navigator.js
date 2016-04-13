import { h } from 'virtual-dom';
import DifficultyRow from 'components/difficulty-row';
import DifficultySelector from 'components/difficulty-selector';
import { difficultyFromLevelNumber } from 'util';

export default function LevelNavigator ({ currentLevelNumber }) {
  let currentDifficulty = difficultyFromLevelNumber(currentLevelNumber);

  return h('nav', [
    DifficultySelector({ currentDifficulty }),
    DifficultyRow({ currentDifficulty, currentLevelNumber }),
  ]);
}
