import { h } from 'virtual-dom';
import DifficultyOption from '../components/difficulty-option';
import { EASY, MEDIUM, HARD } from '../constants/difficulty-levels';
import { STARTING_LEVEL_NUMBERS } from '../constants/difficulty';
import { loadLevel } from '../game';

export default function DifficultySelector ({ currentDifficulty }) {
  return h('select.difficulty-selector', {
    onchange: evt => {
      const newDifficulty = evt.target.value;
      const newLevelNumber = STARTING_LEVEL_NUMBERS[newDifficulty];
      loadLevel(newLevelNumber);
    },
    title: 'Difficulty',
  }, [EASY, MEDIUM, HARD].map(difficulty =>
    DifficultyOption({ currentDifficulty, difficulty })
  ));
}
