import { h } from 'virtual-dom';
import { SQUARE_SIZE } from 'constants/misc';
import Cell from 'components/cell';
import Player from 'components/player';

export default function Level ({ moveTo, playerPosition, tiles }) {
  let cells = tiles.reduce((cellArray, rowTiles, row) => {
    let rowCells = rowTiles.map((tile, column) =>
      Cell({ column, moveTo, row, tile })
    );

    return cellArray.concat(rowCells);
  }, []);

  return h('main', h('div.level', {
    style: {
      height: `${tiles.length * SQUARE_SIZE}rem`,
      width: `${tiles[0].length * SQUARE_SIZE}rem`,
    },
  }, [
    Player(playerPosition),
    ...cells,
  ]));
}
