import { h } from 'virtual-dom';
import Level from 'components/level';
import LevelNavigator from 'components/level-navigator';
import Progress from 'components/progress';

export default function Game (gameState) {
  return h('div#game', [
    Progress(gameState),
    Level(gameState),
    LevelNavigator(gameState),
  ]);
}
