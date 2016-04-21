import { h } from 'virtual-dom';
import DifficultyRow from 'components/difficulty-row';
import DifficultySelector from 'components/difficulty-selector';

export default function LevelNavigator ({
  currentDifficulty,
  currentLevelNumber,
  loadLevel,
}) {
  return h('nav', [
    DifficultySelector({ currentDifficulty, loadLevel }),
    DifficultyRow({ currentDifficulty, currentLevelNumber, loadLevel }),
  ]);
}
