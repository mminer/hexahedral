import { h } from 'virtual-dom';
import DifficultyButton from '../components/difficulty-button';
import { EASY, MEDIUM, HARD } from '../constants/difficulty-levels';

export default function DifficultyButtons ({ loadLevel }) {
  return h('div.difficulty-buttons', [EASY, MEDIUM, HARD].map(difficulty =>
    DifficultyButton({ difficulty, loadLevel })
  ));
}
