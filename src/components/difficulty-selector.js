import { h } from 'virtual-dom';
import DifficultyOption from 'components/difficulty-option';
import { fireLoadLevelEvent } from 'util';
import { EASY, MEDIUM, HARD } from 'constants/difficulty-levels';

export default function DifficultySelector ({ currentDifficulty }) {
  return h('select.difficulty-selector', {
    onchange: evt => {
      let newDifficulty = evt.target.value;

      switch (newDifficulty) {
        case EASY:
          fireLoadLevelEvent(0);
          break;

        case MEDIUM:
          fireLoadLevelEvent(10);
          break;

        case HARD:
          fireLoadLevelEvent(20);
          break;
      }
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

