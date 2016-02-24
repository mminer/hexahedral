const isChrome = navigator.userAgent.toLowerCase().includes('chrome');

// Batch applies styles to an element; more efficient than setting individually.
export function applyStyles (element, styles) {
  let cssText = Object.keys(styles)
    .map(key => `${key}: ${styles[key]}`)
    .join(';');

  element.style.cssText = cssText;
}

// Determines the distance between two points (i.e. with no diagonal movement).
export function findDistance (position1, position2) {
  let rowDistance = Math.abs(position1.row - position2.row);
  let columnDistance = Math.abs(position1.column - position2.column);
  let distance = rowDistance + columnDistance;
  return distance;
}

// Determines whether development mode is enabled.
export function inDevMode () {
  const devMode = localStorage.getItem('devMode') === 'true';
  return devMode;
}

// Gets the level number from the URL hash.
export function levelNumberFromHash () {
  let levelNumber = parseInt(location.hash.replace('#', '') || 0);
  return levelNumber;
}

// Logs a console message.
export function log (consoleFunction, ...args) {
  if (!inDevMode()) {
    return;
  }

  console[consoleFunction](...args);
}

// Plays an audio clip from the beginning.
export function playSoundEffect (audio) {
  // This is horrible, but currently audio really slows down Safari.
  // In lieu of a better solution just disable it.
  if (!isChrome) {
    return;
  }

  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
