import { PROGRESS_STEP_SIZE } from 'constants';

const headerElement = document.querySelector('header');
const progressElement = document.querySelector('.progress');

// Changes the width of the progress bar to indicate number of moves remaining.
function update (gameState) {
  let { maxMoves, moveCount } = gameState;
  headerElement.style.width = `${maxMoves * PROGRESS_STEP_SIZE}rem`;
  headerElement.title = `Move ${moveCount} of ${maxMoves}`;
  progressElement.style.width = `${moveCount * PROGRESS_STEP_SIZE}rem`;
}

export default { update };
