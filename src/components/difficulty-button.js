import { h } from 'virtual-dom';
import {
  DIFFICULTY_LABELS,
  STARTING_LEVEL_NUMBERS,
} from '../constants/difficulty';

export default function DifficultyButton ({ difficulty, loadLevel }) {
  return h('button.difficulty-button', {
    key: difficulty,
    onclick: () => loadLevel(STARTING_LEVEL_NUMBERS[difficulty]),
  }, DIFFICULTY_LABELS[difficulty]);
}
