import { h } from 'virtual-dom';
import { SQUARE_SIZE } from 'constants';
import Cell from 'components/cell';
import Player from 'components/player';

export default function Level ({ playerPosition, tiles }) {
  let cells = tiles.reduce((cellArray, rowTiles, row) => {
    let rowCells = rowTiles.map((tile, column) => Cell({ tile, row, column }));
    return cellArray.concat(rowCells);
  }, []);

  return h('main', {
    style: {
      height: `${tiles.length * SQUARE_SIZE}rem`,
      width: `${tiles[0].length * SQUARE_SIZE}rem`,
    },
  }, [
    Player(playerPosition),
    ...cells,
  ]);
}
