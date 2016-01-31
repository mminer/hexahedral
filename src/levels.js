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
    player: { row: 2, column: 2 },
    tiles: createLevelTiles([
      "0^_",
      "___",
      "0^_",
    ]),
  },

  {
    maxMoves: 13,
    player: { row: 2, column: 0 },
    tiles: createLevelTiles([
      "0__",
      "__^",
      "___",
    ]),
  },

  {
    maxMoves: 15,
    player: { row: 1, column: 3 },
    tiles: createLevelTiles([
      "_0_0",
      "^_^_",
      "__^_",
      "____",
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
    maxMoves: 20,
    player: { row: 2, column: 1 },
    tiles: createLevelTiles([
      "__^_",
      "^___",
      "__^_",
      "__^_",
    ]),
  },
  {
    maxMoves: 21,
    player: { row: 2, column: 3 },
    tiles: createLevelTiles([
      "_____",
      "^0_0_",
      "_0_0_",
      "_0^0_",
      "_____",
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
    maxMoves: 27,
    player: { row: 2, column: 1 },
    tiles: createLevelTiles([
      "_____",
      "^_^__",
      "^___0",
      "__^__",
      "0____",
    ]),
  },

  {
    maxMoves: 34,
    player: { row: 2, column: 0 },
    tiles: createLevelTiles([
      "0^___^",
      "0^___^",
      "____0_",
      "0^_^__",
      "___0__",
      "___0__",
    ]),
  },
];

export default levels;
