// Splits level rows into individual tiles.
function createLevelTiles (rows) {
  let levelTiles = rows.map(row => row.split(''));
  return levelTiles;
}

const levels = [
  {
    maxMoves: 3,
    playerPosition: { row: 1, column: 1 },
    tiles: createLevelTiles([
      '0_',
      '__',
    ]),
  },

  {
    maxMoves: 8,
    playerPosition: { row: 0, column: 1 },
    tiles: createLevelTiles([
      '0__',
      '_^_',
      '0__',
    ]),
  },

  {
    maxMoves: 6,
    playerPosition: { row: 1, column: 1 },
    tiles: createLevelTiles([
      '^0_',
      '_0_',
      '0_^',
    ]),
  },

  {
    maxMoves: 8,
    playerPosition: { row: 2, column: 0 },
    tiles: createLevelTiles([
      '0__',
      '__^',
      '_0_',
    ]),
  },

  {
    maxMoves: 7,
    playerPosition: { row: 2, column: 2 },
    tiles: createLevelTiles([
      '0^_',
      '___',
      '0^_',
    ]),
  },

  {
    maxMoves: 15,
    playerPosition: { row: 1, column: 3 },
    tiles: createLevelTiles([
      '_0_0',
      '^_^_',
      '__^_',
      '____',
    ]),
  },

  {
    maxMoves: 13,
    playerPosition: { row: 2, column: 1 },
    tiles: createLevelTiles([
      '0^__',
      '__0_',
      '0^_^',
      '___0',
    ]),
  },

  {
    maxMoves: 20,
    playerPosition: { row: 2, column: 1 },
    tiles: createLevelTiles([
      '__^_',
      '^___',
      '__^_',
      '__^_',
    ]),
  },
  {
    maxMoves: 21,
    playerPosition: { row: 2, column: 3 },
    tiles: createLevelTiles([
      '_____',
      '^0_0_',
      '_0_0_',
      '_0^0_',
      '_____',
    ]),
  },

  {
    maxMoves: 27,
    playerPosition: { row: 2, column: 0 },
    tiles: createLevelTiles([
      '^____',
      '__^__',
      '^_0__',
      '_00__',
      '_____',
    ]),
  },

  {
    maxMoves: 27,
    playerPosition: { row: 2, column: 1 },
    tiles: createLevelTiles([
      '_____',
      '^_^__',
      '^___0',
      '__^__',
      '0____',
    ]),
  },

  {
    maxMoves: 30,
    playerPosition: { row: 2, column: 0 },
    tiles: createLevelTiles([
      '0^___^',
      '0^___^',
      '____0_',
      '0^_^__',
      '___0__',
      '___0__',
    ]),
  },
];

export default levels;
