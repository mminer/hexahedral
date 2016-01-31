// Determines the distance between two points (i.e. with no diagonal movement).
export function findDistance (row1, column1, row2, column2) {
  let rowDistance = Math.abs(row1 - row2);
  let columnDistance = Math.abs(column1 - column2);
  let distance = rowDistance + columnDistance;
  return distance;
}

// Plays an audio clip from the beginning.
export function playSoundEffect (audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
