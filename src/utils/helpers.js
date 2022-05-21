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

export function arrayToGrid(arr, rows, columns) {
  const grid = [...Array(rows)].map((_, r) => {
    const row = [...Array(columns)].map((_, c) => {
      const index = r * columns + c;
      return arr[index];
    });
    return row;
  });
  return grid;
};

export function rotateGrid(grid) {
  const maxR = Math.floor(grid.length / 2);
  const maxC = grid.length - 1;
  for (let r = 0; r < maxR; r++) {
    for (let c = r; c < maxC - r; c++) {
      const first = grid[r][c];
      grid[r][c] = grid[maxC - c][r];
      grid[maxC - c][r] = grid[maxC - r][maxC - c];
      grid[maxC - r][maxC - c] = grid[c][maxC - r]
      grid[c][maxC - r] = first;
    }
  }
  return grid;
}

export function cloneGrid(grid) {
  return grid.map(r => r.map(c => c));
}

export function createGrid(rows, columns, defaultValue, seal) {
  const s = seal && !!Object.seal;
  const grid = [...Array(rows)].map((_, r) => {
      const row = [...Array(columns)].map((_, c) => {
        if (typeof defaultValue === 'function') {
          return defaultValue(r, c);
        }
        return defaultValue;
      });

      return seal ? Object.seal(row) : row;
  });
  return seal ? Object.seal(grid) : grid;
};

export function forEachGridCell(grid, callback, xFilter, yFilter) {
  grid.forEach((row, r) => {
    if (!yFilter || yFilter(r)) {
      row.forEach((tile, c) => {
        if (!xFilter || xFilter(c)) {
          callback(tile, c, r);
        }
      });
    }
  });
};

export function getGridCell(grid, x, y) {
  if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) {
    return null;
  }
  
  return grid[y][x];
}

export class Counter {
  constructor(start) {
    this.count = start || 0;
  };

  next = () => this.count++;
};
