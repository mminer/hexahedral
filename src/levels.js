// Splits level rows into individual tiles.
function createLevelTiles (rows) {
  const levelTiles = rows.map(row => row.split(''));
  return levelTiles;
}

const levels = [
  // Easy:

  {
    maxMoves: 3,
    playerPosition: { row: 0, column: 1 },
    tiles: createLevelTiles([
      '0_',
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
    playerPosition: { row: 2, column: 0 },
    tiles: createLevelTiles([
      '_00',
      '00x',
      '0_0',
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
      '_0x',
      '0_0',
      'x_0',
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
    maxMoves: 8,
    playerPosition: { row: 2, column: 1 },
    tiles: createLevelTiles([
      '00_',
      '0x_',
      '_x0',
    ]),
  },

  {
    maxMoves: 10,
    playerPosition: { row: 1, column: 1 },
    tiles: createLevelTiles([
      '00x',
      '0_0',
      '0x0',
    ]),
  },

  {
    maxMoves: 12,
    playerPosition: { row: 0, column: 2 },
    tiles: createLevelTiles([
      'x0_',
      '0x_',
      '___',
    ]),
  },

  {
    maxMoves: 12,
    playerPosition: { row: 0, column: 2 },
    tiles: createLevelTiles([
      '0_0',
      '_x_',
      '0_0',
    ]),
  },

  // Medium:

  {
    maxMoves: 12,
    playerPosition: { row: 0, column: 2 },
    tiles: createLevelTiles([
      '_0__',
      'x_x_',
      '0_00',
      '0000',
    ]),
  },

  {
    maxMoves: 13,
    playerPosition: { row: 3, column: 3 },
    tiles: createLevelTiles([
      '__x0',
      'x___',
      '0_x0',
      '_x00',
    ]),
  },

  {
    maxMoves: 10,
    playerPosition: { row: 2, column: 1 },
    tiles: createLevelTiles([
      '_x00',
      '0_0_',
      'x_0_',
      '_0__',
    ]),
  },

  {
    maxMoves: 11,
    playerPosition: { row: 2, column: 3 },
    tiles: createLevelTiles([
      'x00x',
      '_000',
      'x_0x',
      '0_xx',
    ]),
  },

  {
    maxMoves: 12,
    playerPosition: { row: 3, column: 0 },
    tiles: createLevelTiles([
      '000_',
      '0x_0',
      '00_0',
      '_x__',
    ]),
  },

  {
    maxMoves: 9,
    playerPosition: { row: 1, column: 2 },
    tiles: createLevelTiles([
      '__0_',
      'x000',
      '_00_',
      '_0__',
    ]),
  },

  {
    maxMoves: 17,
    playerPosition: { row: 0, column: 1 },
    tiles: createLevelTiles([
      '00__',
      'x_x_',
      'x_x0',
      'x0x0',
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
    maxMoves: 12,
    playerPosition: { row: 2, column: 2 },
    tiles: createLevelTiles([
      '0_00',
      '_0_0',
      '____',
      '0___',
    ]),
  },

  // Hard:

  {
    maxMoves: 17,
    playerPosition: { row: 3, column: 4 },
    tiles: createLevelTiles([
      '__0__',
      '_xx_x',
      '0_0_0',
      'x0xxx',
      '_0000',
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
    maxMoves: 21,
    playerPosition: { row: 4, column: 2 },
    tiles: createLevelTiles([
      '___00',
      '0x0x0',
      '_x_x0',
      '_x0x0',
      '0__00',
    ]),
  },

  {
    maxMoves: 20,
    playerPosition: { row: 2, column: 2 },
    tiles: createLevelTiles([
      '00_00',
      '0_0_0',
      '000__',
      '___00',
      'x__00',
    ]),
  },

  {
    maxMoves: 24,
    playerPosition: { row: 2, column: 2 },
    tiles: createLevelTiles([
      '00_00',
      '0x_x0',
      '__000',
      '0x_x_',
      '0_0__',
    ]),
  },

  {
    maxMoves: 23,
    playerPosition: { row: 1, column: 3 },
    tiles: createLevelTiles([
      '00x00',
      '00_x0',
      '0x_0_',
      '000_0',
      'x____',
    ]),
  },

  {
    maxMoves: 17,
    playerPosition: { row: 3, column: 3 },
    tiles: createLevelTiles([
      '00_xx',
      '0___x',
      '____0',
      '_00x0',
      '_00_x',
    ]),
  },

  {
    maxMoves: 23,
    playerPosition: { row: 2, column: 3 },
    tiles: createLevelTiles([
      '___00',
      '0000_',
      '0x0x_',
      '00x__',
      '_00_0',
    ]),
  },
];

export default levels;
