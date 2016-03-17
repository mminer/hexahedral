import { h } from 'virtual-dom';
import levels from 'levels';
import LevelButton from 'components/level-button';

export default function DifficultyRow ({ currentLevelNumber, levelNumbers }) {
  let currentLevelInDifficulty = levelNumbers.indexOf(currentLevelNumber) > -1;
  let className = currentLevelInDifficulty ? 'active' : '';

  return h('div.difficulty-row', { className }, levelNumbers.map(
    levelNumber => LevelButton({ currentLevelNumber, levelNumber })
  ));
}
