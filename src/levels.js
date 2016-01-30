// Splits level rows into individual tiles.
function createLevelTiles (rows) {
  let levelTiles = rows.map(row => row.split(''));
  return levelTiles;
}

const levels = [
  {
    maxMoves: 7,
    tiles: createLevelTiles([
      "___",
      "___",
      "0_^",
    ]),
  },

  {
    maxMoves: 7,
    tiles: createLevelTiles([
      "0^_",
      "___",
      "0^_",
    ]),
  },

  {
    maxMoves: 22,
    tiles: createLevelTiles([
      "0^___^",
      "____0_",
      "0^_^__",
      "___0__",
    ]),
  },

  {
    maxMoves: 32,
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
