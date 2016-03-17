import { h } from 'virtual-dom';
import levels from 'levels';
import DifficultyRow from 'components/difficulty-row';

const levelNumbers = levels.map((level, levelNumber) => levelNumber);
const levelNumbersEasy = levelNumbers.slice(0, 10);
const levelNumbersMedium = levelNumbers.slice(10, 20);
const levelNumbersHard = levelNumbers.slice(20, 30);

export default function LevelNavigator ({ currentLevelNumber }) {
  return h('nav', [
    DifficultyRow({ currentLevelNumber, levelNumbers: levelNumbersEasy }),
    DifficultyRow({ currentLevelNumber, levelNumbers: levelNumbersMedium }),
    DifficultyRow({ currentLevelNumber, levelNumbers: levelNumbersHard }),
  ]);
}
