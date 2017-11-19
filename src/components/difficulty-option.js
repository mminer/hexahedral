import { h } from 'virtual-dom';
import { DIFFICULTY_LABELS } from '../constants/difficulty';

export default function DifficultyOption ({ currentDifficulty, difficulty }) {
  return h('option.difficulty-option', {
    key: difficulty,
    selected: currentDifficulty === difficulty,
    value: difficulty,
  }, DIFFICULTY_LABELS[difficulty]);
}
