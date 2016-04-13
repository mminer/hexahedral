import { h } from 'virtual-dom';

export default function DifficultyOption ({
  currentDifficulty,
  difficulty,
  label,
}) {
  return h('option', {
    selected: currentDifficulty === difficulty,
    value: difficulty,
  }, label);
}

