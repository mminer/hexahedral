import { h } from 'virtual-dom';
import { SQUARE_SIZE } from '../constants/misc';
import { BROKEN, PRESSED, UNPRESSED } from '../constants/tile-codes';
import { moveTo } from '../game';

const classNames = {
  [BROKEN]: 'broken',
  [PRESSED]: 'pressed',
  [UNPRESSED]: 'unpressed',
};

export default function Cell ({ column, row, tile }) {
  return h('div.cell', {
    className: classNames[tile],
    key: `${row} ${column}`,
    onclick: () => moveTo(row, column),
    style: {
      top: `${row * SQUARE_SIZE}rem`,
      left: `${column * SQUARE_SIZE}rem`,
    },
  });
}
