import { h } from 'virtual-dom';
import * as tileCodes from 'constants/tile-codes';
import { SQUARE_SIZE } from 'constants/misc';
import { MOVE_TO } from 'events';

const classNames = {
  [tileCodes.BROKEN]: 'broken',
  [tileCodes.PRESSED]: 'pressed',
  [tileCodes.UNPRESSED]: 'unpressed',
};

export default function Cell ({ tile, row, column }) {
  return h('div.cell', {
    className: classNames[tile],
    key: `${row} ${column}`,
    onclick: () => {
      let event = new CustomEvent(MOVE_TO, { detail: { row, column } });
      document.dispatchEvent(event);
    },
    style: {
      top: `${row * SQUARE_SIZE}rem`,
      left: `${column * SQUARE_SIZE}rem`,
    },
  });
}
