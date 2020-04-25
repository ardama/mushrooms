import C from '../utils/constants.js';
import Shapes from './MapShapes.js';

const {
  Size4: {
    _4, _2_2
  },
  Size6: {
    _4_2, _3_3
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
        key: _3_3,
        origin: {
          x: 1,
          y: 0,
        },
        rotations: 3,
        mirrored: true,
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
  }
];

export default MapQuadrants;
