import { h } from 'virtual-dom';
import { PROGRESS_STEP_SIZE } from '../constants/misc';

export default function Progress ({ maxMoves, moveCount }) {
  return h('header', {
    style: { width: `${maxMoves * PROGRESS_STEP_SIZE}rem` },
    title: `Move ${moveCount} of ${maxMoves}`,
  }, [
    h('div.progress', {
      style: { width: `${moveCount * PROGRESS_STEP_SIZE}rem` },
    }),
  ]);
}
