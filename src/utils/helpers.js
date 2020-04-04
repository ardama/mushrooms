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
