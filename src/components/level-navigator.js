import { h } from 'virtual-dom';
import levels from 'levels';
import LevelButton from 'components/level-button';

export default function LevelNavigator ({ currentLevelNumber }) {
  return h('nav', levels.map((level, levelNumber) =>
    LevelButton({ currentLevelNumber, levelNumber })
  ));
}
