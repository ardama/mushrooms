import C from '../utils/constants.js';

const {
  Size4: {
    _4, _2_2
  },
  Size6: {
    _4_2, _2_2_2
  }
} = C.Map.Shapes;

const MapShapes = {
  _4: {
    coordinates: [      //   _
      { x: 0, y: 0 },   //  |_|
      { x: 0, y: 1 },   //  |_|
      { x: 0, y: 2 },   //  |_|
      { x: 0, y: 3 },   //  |_|
    ],
    symmetry: {
      vertical: true,
      horizontal: true,
    },
    variants: [
      {
        rotations: 0,
        chunks: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 0, y: 4 },
          { x: 0, y: 5 },
          { x: 0, y: 6 },
          { x: 0, y: 7 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 0, y: 8 },
          { x: 0, y: 9 },
          { x: 0, y: 10 },
          { x: 0, y: 11 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 1, y: 3 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 1, y: 4 },
          { x: 1, y: 5 },
          { x: 1, y: 6 },
          { x: 1, y: 7 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 1, y: 8 },
          { x: 1, y: 9 },
          { x: 1, y: 10 },
          { x: 1, y: 11 },
        ],
      },
    ]
  },
  _2_2: {
    coordinates: [      //   _ _
      { x: 0, y: 0 },   //  |_|_|
      { x: 0, y: 1 },   //  |_|_|
      { x: 1, y: 0 },   //
      { x: 1, y: 1 },   //
    ],
    symmetry: {
      vertical: true,
      horizontal: true,
    },
    variants: [
      {
        rotations: 0,
        chunks: [
          { x: 2, y: 0 },
          { x: 2, y: 1 },
          { x: 3, y: 0 },
          { x: 3, y: 1 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 2, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 2 },
          { x: 3, y: 3 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 2, y: 4 },
          { x: 2, y: 5 },
          { x: 3, y: 4 },
          { x: 3, y: 5 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 2, y: 6 },
          { x: 2, y: 7 },
          { x: 3, y: 6 },
          { x: 3, y: 7 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 2, y: 8 },
          { x: 2, y: 9 },
          { x: 3, y: 8 },
          { x: 3, y: 9 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 2, y: 10 },
          { x: 2, y: 11 },
          { x: 3, y: 10 },
          { x: 3, y: 11 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 4, y: 0 },
          { x: 4, y: 1 },
          { x: 5, y: 0 },
          { x: 5, y: 1 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 4, y: 2 },
          { x: 4, y: 3 },
          { x: 5, y: 2 },
          { x: 5, y: 3 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 4, y: 4 },
          { x: 4, y: 5 },
          { x: 5, y: 4 },
          { x: 5, y: 5 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 4, y: 6 },
          { x: 4, y: 7 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 4, y: 8 },
          { x: 4, y: 9 },
          { x: 5, y: 8 },
          { x: 5, y: 9 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 4, y: 10 },
          { x: 4, y: 11 },
          { x: 5, y: 10 },
          { x: 5, y: 11 },
        ],
      },
    ],
  },
  _4_2: {
    coordinates: [      //   _
      { x: 0, y: 0 },   //  |_|
      { x: 0, y: 1 },   //  |_|_
      { x: 0, y: 2 },   //  |_|_|
      { x: 0, y: 3 },   //  |_|_|
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ],
    symmetry: {
      vertical: false,
      horizontal: false,
    },
    variants: [
      {
        rotations: 0,
        chunks: [
          { x: 12, y: 2 },
          { x: 12, y: 3 },
          { x: 12, y: 4 },
          { x: 12, y: 5 },
          { x: 13, y: 4 },
          { x: 13, y: 5 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 12, y: 8 },
          { x: 12, y: 9 },
          { x: 12, y: 10 },
          { x: 12, y: 11 },
          { x: 13, y: 10 },
          { x: 13, y: 11 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 14, y: 2 },
          { x: 14, y: 3 },
          { x: 14, y: 4 },
          { x: 14, y: 5 },
          { x: 15, y: 4 },
          { x: 15, y: 5 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 14, y: 8 },
          { x: 14, y: 9 },
          { x: 14, y: 10 },
          { x: 14, y: 11 },
          { x: 15, y: 10 },
          { x: 15, y: 11 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 16, y: 2 },
          { x: 16, y: 3 },
          { x: 16, y: 4 },
          { x: 16, y: 5 },
          { x: 17, y: 4 },
          { x: 17, y: 5 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 16, y: 8 },
          { x: 16, y: 9 },
          { x: 16, y: 10 },
          { x: 16, y: 11 },
          { x: 17, y: 10 },
          { x: 17, y: 11 },
        ],
      },
      {
        rotations: 2,
        chunks: [
          { x: 13, y: 3 },
          { x: 13, y: 2 },
          { x: 13, y: 1 },
          { x: 13, y: 0 },
          { x: 12, y: 1 },
          { x: 12, y: 0 },
        ],
      },
      {
        rotations: 2,
        chunks: [
          { x: 13, y: 9 },
          { x: 13, y: 8 },
          { x: 13, y: 7 },
          { x: 13, y: 6 },
          { x: 12, y: 7 },
          { x: 12, y: 6 },
        ],
      },
      {
        rotations: 2,
        chunks: [
          { x: 15, y: 3 },
          { x: 15, y: 2 },
          { x: 15, y: 1 },
          { x: 15, y: 0 },
          { x: 14, y: 1 },
          { x: 14, y: 0 },
        ],
      },
      {
        rotations: 2,
        chunks: [
          { x: 15, y: 9 },
          { x: 15, y: 8 },
          { x: 15, y: 7 },
          { x: 15, y: 6 },
          { x: 14, y: 7 },
          { x: 14, y: 6 },
        ],
      },
      {
        rotations: 2,
        chunks: [
          { x: 17, y: 3 },
          { x: 17, y: 2 },
          { x: 17, y: 1 },
          { x: 17, y: 0 },
          { x: 16, y: 1 },
          { x: 16, y: 0 },
        ],
      },
      {
        rotations: 2,
        chunks: [
          { x: 17, y: 9 },
          { x: 17, y: 8 },
          { x: 17, y: 7 },
          { x: 17, y: 6 },
          { x: 16, y: 7 },
          { x: 16, y: 6 },
        ],
      },
    ],
  },
  _2_2_2: {
    coordinates: [      //   _ _
      { x: 0, y: 0 },   //  |_|_|
      { x: 0, y: 1 },   //  |_|_|
      { x: 1, y: 0 },   //  |_|_|
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
    ],
    symmetry: {
      vertical: true,
      horizontal: true,
    },
    variants: [
      {
        rotations: 0,
        chunks: [
          { x: 6, y: 0 },
          { x: 6, y: 1 },
          { x: 7, y: 0 },
          { x: 7, y: 1 },
          { x: 8, y: 0 },
          { x: 8, y: 1 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 6, y: 2 },
          { x: 6, y: 3 },
          { x: 7, y: 2 },
          { x: 7, y: 3 },
          { x: 8, y: 2 },
          { x: 8, y: 3 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 6, y: 4 },
          { x: 6, y: 5 },
          { x: 7, y: 4 },
          { x: 7, y: 5 },
          { x: 8, y: 4 },
          { x: 8, y: 5 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 6, y: 6 },
          { x: 6, y: 7 },
          { x: 7, y: 6 },
          { x: 7, y: 7 },
          { x: 8, y: 6 },
          { x: 8, y: 7 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 6, y: 8 },
          { x: 6, y: 9 },
          { x: 7, y: 8 },
          { x: 7, y: 9 },
          { x: 8, y: 8 },
          { x: 8, y: 9 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 6, y: 10 },
          { x: 6, y: 11 },
          { x: 7, y: 10 },
          { x: 7, y: 11 },
          { x: 8, y: 10 },
          { x: 8, y: 11 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 9, y: 0 },
          { x: 9, y: 1 },
          { x: 10, y: 0 },
          { x: 10, y: 1 },
          { x: 11, y: 0 },
          { x: 11, y: 1 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 9, y: 2 },
          { x: 9, y: 3 },
          { x: 10, y: 2 },
          { x: 10, y: 3 },
          { x: 11, y: 2 },
          { x: 11, y: 3 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 9, y: 4 },
          { x: 9, y: 5 },
          { x: 10, y: 4 },
          { x: 10, y: 5 },
          { x: 11, y: 4 },
          { x: 11, y: 5 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 9, y: 6 },
          { x: 9, y: 7 },
          { x: 10, y: 6 },
          { x: 10, y: 7 },
          { x: 11, y: 6 },
          { x: 11, y: 7 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 9, y: 8 },
          { x: 9, y: 9 },
          { x: 10, y: 8 },
          { x: 10, y: 9 },
          { x: 11, y: 8 },
          { x: 11, y: 9 },
        ],
      },
      {
        rotations: 0,
        chunks: [
          { x: 9, y: 10 },
          { x: 9, y: 11 },
          { x: 10, y: 10 },
          { x: 10, y: 11 },
          { x: 11, y: 10 },
          { x: 11, y: 11 },
        ],
      },
    ],
  },
};

export default MapShapes
