import { h } from 'virtual-dom';
import { SQUARE_SIZE } from '../constants/misc';

export default function Player ({ column, row }) {
  const player = h('div.player', {
    key: 'player',
    style: {
      top: `${row * SQUARE_SIZE}rem`,
      left: `${column * SQUARE_SIZE}rem`,
    },
  });

  return player;
}
