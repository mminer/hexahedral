import { h } from 'virtual-dom';

export default function DifficultyOption ({
  currentDifficulty,
  difficulty,
  label,
}) {
  return h('option', {
    key: difficulty,
    selected: currentDifficulty === difficulty,
    value: difficulty,
  }, label);
}
