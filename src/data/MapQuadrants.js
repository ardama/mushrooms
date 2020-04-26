import C from '../utils/constants.js';
import Shapes from './MapShapes.js';

const {
  Size4: {
    _4, _2_2
  },
  Size6: {
    _4_2, _2_2_2
  }
} = C.Map.Shapes;
const MapQuadrants = [
  {
    shapes: [
      {
        key: _4_2,
        origin: {
          x: 0,
          y: 0,
        },
        rotations: 0,
        mirrored: false,
      },
      {
        key: _2_2_2,
        origin: {
          x: 1,
          y: 0,
        },
        rotations: 0,
        mirrored: false,
      },
      {
        key: _2_2,
        origin: {
          x: 2,
          y: 2,
        },
        rotations: 0,
        mirrored: false,
      },
    ]
  },
  {
    shapes: [
      {
        key: _2_2_2,
        origin: {
          x: 0,
          y: 0,
        },
        rotations: 0,
        mirrored: false,
      },
      {
        key: _2_2,
        origin: {
          x: 0,
          y: 2,
        },
        rotations: 0,
        mirrored: false,
      },
      {
        key: _4_2,
        origin: {
          x: 3,
          y: 0,
        },
        rotations: 0,
        mirrored: true,
      },
    ]
  },
  {
    shapes: [
      {
        key: _4_2,
        origin: {
          x: 0,
          y: 0,
        },
        rotations: 0,
        mirrored: false,
      },
      {
        key: _2_2,
        origin: {
          x: 1,
          y: 0,
        },
        rotations: 0,
        mirrored: false,
      },
      {
        key: _4_2,
        origin: {
          x: 3,
          y: 0,
        },
        rotations: 0,
        mirrored: true,
      },
    ]
  },
  {
    shapes: [
      {
        key: _4_2,
        origin: {
          x: 0,
          y: 0,
        },
        rotations: 0,
        mirrored: false,
      },
      {
        key: _4_2,
        origin: {
          x: 2,
          y: 3,
        },
        rotations: 2,
        mirrored: false,
      },
      {
        key: _4,
        origin: {
          x: 3,
          y: 0,
        },
        rotations: 0,
        mirrored: false,
      },
    ]
  },
  {
    shapes: [
      {
        key: _4_2,
        origin: {
          x: 0,
          y: 3,
        },
        rotations: 2,
        mirrored: true,
      },
      {
        key: _4_2,
        origin: {
          x: 2,
          y: 0,
        },
        rotations: 0,
        mirrored: true,
      },
      {
        key: _4,
        origin: {
          x: 3,
          y: 0,
        },
        rotations: 0,
        mirrored: false,
      },
    ]
  },
  {
    shapes: [
      {
        key: _2_2_2,
        origin: {
          x: 0,
          y: 0,
        },
        rotations: 0,
        mirrored: false,
      },
      {
        key: _2_2_2,
        origin: {
          x: 0,
          y: 2,
        },
        rotations: 0,
        mirrored: false,
      },
      {
        key: _4,
        origin: {
          x: 3,
          y: 0,
        },
        rotations: 0,
        mirrored: false,
      },
    ]
  },
];

export default MapQuadrants;
