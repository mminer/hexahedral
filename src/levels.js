// Splits level rows into individual tiles.
function createLevelTiles (rows) {
  let levelTiles = rows.map(row => row.split(''));
  return levelTiles;
}

const levels = [
  {
    maxMoves: 3,
    playerPosition: { row: 0, column: 1 },
    tiles: createLevelTiles([
      '0_',
      '00',
    ]),
  },

  {
    maxMoves: 3,
    playerPosition: { row: 1, column: 1 },
    tiles: createLevelTiles([
      '_0',
      '00',
    ]),
  },

  {
    maxMoves: 4,
    playerPosition: { row: 1, column: 0 },
    tiles: createLevelTiles([
      '_0',
      '0x',
    ]),
  },

  {
    maxMoves: 8,
    playerPosition: { row: 0, column: 1 },
    tiles: createLevelTiles([
      '_00',
      '0x0',
      '_00',
    ]),
  },

  {
    maxMoves: 6,
    playerPosition: { row: 1, column: 1 },
    tiles: createLevelTiles([
      'x_0',
      '0_0',
      '_0x',
    ]),
  },

  {
    maxMoves: 8,
    playerPosition: { row: 2, column: 0 },
    tiles: createLevelTiles([
      '_00',
      '00x',
      '0_0',
    ]),
  },

  {
    maxMoves: 7,
    playerPosition: { row: 2, column: 2 },
    tiles: createLevelTiles([
      '_x0',
      '000',
      '_x0',
    ]),
  },

  {
    maxMoves: 20,
    playerPosition: { row: 2, column: 1 },
    tiles: createLevelTiles([
      '___',
      '_x_',
      '_x0',
    ]),
  },

  {
    maxMoves: 15,
    playerPosition: { row: 1, column: 3 },
    tiles: createLevelTiles([
      '0_0_',
      'x0x0',
      '00x0',
      '0000',
    ]),
  },

  {
    maxMoves: 13,
    playerPosition: { row: 2, column: 1 },
    tiles: createLevelTiles([
      '_x00',
      '00_0',
      '_x0x',
      '000_',
    ]),
  },

  {
    maxMoves: 20,
    playerPosition: { row: 2, column: 1 },
    tiles: createLevelTiles([
      '00x0',
      'x000',
      '00x0',
      '00x0',
    ]),
  },

  {
    maxMoves: 21,
    playerPosition: { row: 2, column: 3 },
    tiles: createLevelTiles([
      '00000',
      'x_0_0',
      '0_0_0',
      '0_x_0',
      '00000',
    ]),
  },

  {
    maxMoves: 27,
    playerPosition: { row: 2, column: 0 },
    tiles: createLevelTiles([
      'x0000',
      '00x00',
      'x0_00',
      '0__00',
      '00000',
    ]),
  },

  {
    maxMoves: 27,
    playerPosition: { row: 2, column: 1 },
    tiles: createLevelTiles([
      '00000',
      'x0x00',
      'x000_',
      '00x00',
      '_0000',
    ]),
  },

  {
    maxMoves: 30,
    playerPosition: { row: 2, column: 0 },
    tiles: createLevelTiles([
      '_x000x',
      '_x000x',
      '0000_0',
      '_x0x00',
      '000_00',
      '000_00',
    ]),
  },
];

export default levels;
