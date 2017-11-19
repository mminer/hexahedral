import { h } from 'virtual-dom';
import DifficultyRow from '../components/difficulty-row';
import DifficultySelector from '../components/difficulty-selector';

export default function LevelNavigator ({
  currentDifficulty,
  currentLevelNumber,
  maxLevelReached,
}) {
  return h('nav', [
    DifficultySelector({ currentDifficulty }),
    DifficultyRow({ currentDifficulty, currentLevelNumber, maxLevelReached }),
  ]);
}
