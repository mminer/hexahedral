import { h } from 'virtual-dom';
import DifficultyOption from 'components/difficulty-option';
import { EASY, MEDIUM, HARD } from 'constants/difficulty-levels';

const startingLevelNumbers = {
  [EASY]: 0,
  [MEDIUM]: 10,
  [HARD]: 20,
};

export default function DifficultySelector ({ currentDifficulty, loadLevel }) {
  return h('select.difficulty-selector', {
    onchange: evt => {
      let newDifficulty = evt.target.value;
      let newLevelNumber = startingLevelNumbers[newDifficulty];
      loadLevel(newLevelNumber);
    },
    title: 'Difficulty',
  }, [
    DifficultyOption({
      currentDifficulty,
      difficulty: EASY,
      label: 'Easy',
    }),

    DifficultyOption({
      currentDifficulty,
      difficulty: MEDIUM,
      label: 'Medium',
    }),

    DifficultyOption({
      currentDifficulty,
      difficulty: HARD,
      label: 'Hard',
    }),
  ]);
}

