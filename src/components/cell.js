import { h } from 'virtual-dom';
import { MOVE_TO } from 'constants/events';
import { SQUARE_SIZE } from 'constants/misc';
import { BROKEN, PRESSED, UNPRESSED } from 'constants/tile-codes';

const classNames = {
  [BROKEN]: 'broken',
  [PRESSED]: 'pressed',
  [UNPRESSED]: 'unpressed',
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
