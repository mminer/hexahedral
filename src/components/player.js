import { h } from 'virtual-dom';
import { SQUARE_SIZE } from 'constants';

export default function Player ({ row, column }) {
  return h('div.player', {
    key: 'player',
    style: {
      top: `${row * SQUARE_SIZE}rem`,
      left: `${column * SQUARE_SIZE}rem`,
    },
  });
}
