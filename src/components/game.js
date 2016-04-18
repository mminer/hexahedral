import { h } from 'virtual-dom';
import DifficultyButtons from 'components/difficulty-buttons';
import Level from 'components/level';
import LevelNavigator from 'components/level-navigator';
import Progress from 'components/progress';
import { MAIN_MENU } from 'constants/game-statuses';

export default function Game (props) {
  let { status } = props;

  let children = status === MAIN_MENU ? [
    DifficultyButtons(props),
  ] : [
    Progress(props),
    Level(props),
    LevelNavigator(props),
  ];

  return h('div#game', {
    className: status.toLowerCase().replace('_', '-'),
  }, children);
}
