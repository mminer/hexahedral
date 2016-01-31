// Splits level rows into individual tiles.
function createLevelTiles (rows) {
  let levelTiles = rows.map(row => row.split(''));
  return levelTiles;
}

const levels = [
  {
    maxMoves: 7,
    player: { row: 2, column: 0 },
    tiles: createLevelTiles([
      "___",
      "___",
      "0_^",
    ]),
  },

  {
    maxMoves: 7,
    player: { row: 2, column: 0 },
    tiles: createLevelTiles([
      "0^_",
      "___",
      "0^_",
    ]),
  },

  {
    maxMoves: 14,
    player: { row: 2, column: 0 },
    tiles: createLevelTiles([
      "0^__",
      "____",
      "0^_^",
      "___0",
    ]),
  },

  {
    maxMoves: 24,
    player: { row: 2, column: 0 },
    tiles: createLevelTiles([
      "__^_",
      "^___",
      "__^_",
      "__^_",
    ]),
  },

  {
    maxMoves: 27,
    player: { row: 2, column: 0 },
    tiles: createLevelTiles([
      "^____",
      "__^__",
      "^_0__",
      "_00__",
      "_____",
    ]),
  },

  {
    maxMoves: 22,
    player: { row: 2, column: 0 },
    tiles: createLevelTiles([
      "0^___^",
      "____0_",
      "0^_^__",
      "___0__",
    ]),
  },

  {
    maxMoves: 32,
    player: { row: 2, column: 0 },
    tiles: createLevelTiles([
      "______",
      "_^_^__",
      "_^___0",
      "___^__",
      "_0____",
    ]),
  },
];

export default levels;
