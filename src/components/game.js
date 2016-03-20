import { h } from 'virtual-dom';
import Level from 'components/level';
import LevelNavigator from 'components/level-navigator';
import Progress from 'components/progress';

export default function Game (state) {
  return h('div#game', { className: state.status.toLowerCase() }, [
    Progress(state),
    Level(state),
    LevelNavigator(state),
  ]);
}
