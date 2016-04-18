import { h } from 'virtual-dom';
import DifficultyOption from 'components/difficulty-option';
import { EASY, MEDIUM, HARD } from 'constants/difficulty-levels';
import { STARTING_LEVEL_NUMBERS } from 'constants/difficulty';

export default function DifficultySelector ({ currentDifficulty, loadLevel }) {
  return h('select.difficulty-selector', {
    onchange: evt => {
      let newDifficulty = evt.target.value;
      let newLevelNumber = STARTING_LEVEL_NUMBERS[newDifficulty];
      loadLevel(newLevelNumber);
    },
    title: 'Difficulty',
  }, [EASY, MEDIUM, HARD].map(difficulty =>
    DifficultyOption({ currentDifficulty, difficulty })
  ));
}
