import { h } from 'virtual-dom';
import Level from 'components/level';
import LevelNavigator from 'components/level-navigator';
import Progress from 'components/progress';

export default function Game (props) {
  return h('div#game', { className: props.status.toLowerCase() }, [
    Progress(props),
    Level(props),
    LevelNavigator(props),
  ]);
}
