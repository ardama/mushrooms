export function fuzzyLocation(destination, radius) {
  const xOffset = Math.floor(Math.random() * radius * 2) - radius;
  const yOffset = Math.floor(Math.random() * radius * 2) - radius;

  return {
    x: destination.x + xOffset,
    y: destination.y + yOffset,
  };
}

export function randomInt(a, b) {
  if (b < a) {
    return 0;
  }

  const min = b ? a : 0;
  const max = b ? b : a;

  const delta = (max - min) + 1;
  return min + Math.floor(delta * Math.random());
}

export function toRadians(deg) {
  return deg * Math.PI / 180;
}

export function toDegrees(rad) {
  return rad * 180 / Math.PI;
}

export function bounded(a, min, max) {
  return Math.max(min, Math.min(max, a));
}

export function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap with current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function pointToString({x, y}) {
  return `${x},${y}`;
}

export function stringToPoint(str) {
  const [x, y] = str.split(',');
  return { x: parseInt(x, 10), y: parseInt(y, 10) };
}
