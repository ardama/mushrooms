import { randomInt, shuffle, pointToString, stringToPoint, bounded, toRadians, toDegress } from '../utils/helpers.js';

export default class Map {
  constructor(scene) {
    this.scene = scene;

    this.rows = 256;
    this.columns = 256;


    this._generateMapData();
    this._buildGroundLayer();
    this._buildObjectLayer();

    this.width = this.columns * 32;
    this.height = this.rows * 32;
  }

  update(time, delta) {
  }

  _generateMapData() {
    this._initializeMapTiles();
    this._buildMapFeatures();
  };

  _initializeMapTiles() {
    const seal = !!Object.seal;
    const rows = [...Array(this.rows)].map(() => {
      const row = [...Array(this.columns)].map(() => {
        return new MapTile(this);
      });

      return seal ? Object.seal(row) : row;
    });

    this.tiles = seal ? Object.seal(rows) : rows;
  };

  _buildMapFeatures() {
    this._generateMapFeatureData();
    this._generateMapFeatureOrigins();

    this._buildEdges(2, 6);
    this._buildTowns();
    this._buildForests();
    this._buildLakes();
    this._buildRivers();


  };

  _generateMapFeatureData() {
    this.mapFeatureData = {
      town: {
        count: 1,
      },
      forests: {
        count: randomInt(12, 16),
        minWidth: 20,
        maxWidth: 32,
        growthRate: 0.7,
        roots: {
          count: 5,
          angle: {
            min: -120,
            max: 120,
          },
          length: {
            min: 16,
            max: 20,
          },
        },
      },
      lakes: {
        count: randomInt(4, 6),
        minWidth: 24,
        maxWidth: 32,
        growthRate: 0.8,
        roots: {
          count: 3,
          angle: {
            min: -150,
            max: 150,
          },
          length: {
            min: 8,
            max: 10,
          },
        },
      },
      rivers: {
        count: randomInt(2, 3),
        minWidth: 9,
        maxWidth: 12,
        growthRate: 0.8,
        roots: {
          count: 8,
          angle: {
            min: -45,
            max: 45,
          },
          length: {
            min: 8,
            max: 12,
          },
        },
      },
    }
  };

  _generateMapFeatureOrigins() {
    this.mapFeatureOrigins = {
      town: [],
      forests: [],
      lakes: [],
      rivers: [],
    };
    const mapFeatureCounts = {};

    // Sum features counts to get total origin tiles needed
    const originCount = Object.entries(this.mapFeatureData).reduce((output, [feature, featureData]) => {
      mapFeatureCounts[feature] = featureData.count;
      return output + (featureData.count || 0);
    }, 0);

    // Compute baseline origin grid size (27 origins --> 5x5 grid; 32 origins --> 6x6 grid)
    const originGridSize = Math.round(originCount ** 0.5);
    const originGridCounts = [...Array(originGridSize)].map(() => originGridSize);

    // Add/remove origins from each row to account for excess/deficit from baseline grin
    let excessOrigins = originCount - (originGridSize ** 2);
    while (excessOrigins !== 0) {
      const originGridIndex = randomInt(originGridSize - 1);
      if (originGridCounts[originGridIndex] === originGridSize) {
        originGridCounts[originGridIndex] += excessOrigins > 0 ? 1 : -1;
        excessOrigins -= excessOrigins > 0 ? 1 : -1;
      }
    }

    // Assign semi-random tile coords for each origin
    originGridCounts.forEach((gridWidth, gridY) => {
      // Compute tileY index for this row of origins
      const deltaY = this.rows / originGridSize;
      const tileY = Math.floor((gridY + 0.5) * deltaY);
      const originGridRow = [...Array(gridWidth)].forEach((_, gridX) => {
        // Compute tileX index for this origin
        const deltaX = this.columns / gridWidth;
        const tileX = Math.floor((gridX + 0.5) * deltaX);

        // Compute origin coords fuzziness
        const fuzzyX = Math.floor(deltaX);
        const fuzzyY = Math.floor(deltaY);

        // Assign this origin a feature type
        const availableOriginFeatures = Object.entries(mapFeatureCounts).reduce((output, [feature, count]) => {
          if (count) {
            output.push(feature);
          }
          return output;
        }, []);
        // Choose a random feature type still in need of origins
        const feature = availableOriginFeatures[randomInt(0, availableOriginFeatures.length - 1)];
        mapFeatureCounts[feature] -= 1;

        // Create/push final origin coords
        this.mapFeatureOrigins[feature].push({
          x: bounded(tileX + randomInt(-fuzzyX, fuzzyX), 0, this.columns - 1),
          y: bounded(tileY + randomInt(-fuzzyY, fuzzyY), 0, this.rows - 1),
        });
      });
    });

    // Randomize origin order
    Object.entries(this.mapFeatureOrigins).forEach(([feature, origins]) => {
      this.mapFeatureOrigins[feature] = shuffle(origins);
    });
  }

  _buildEdges(minWidth, maxWidth) {
    let topWidth = randomInt(minWidth, maxWidth);
    let bottomWidth = randomInt(minWidth, maxWidth);
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < topWidth; y++) {
        const tile = this._getTileAt(x, y);
        tile.edge = true;
        tile.groundLayerTileIndex = 4;
      }
      topWidth = bounded(topWidth + randomInt(-1, 1), minWidth, maxWidth);

      for (let y = 0; y < bottomWidth; y++) {
        const tile = this._getTileAt(x, this.rows - 1 - y);
        tile.edge = true;
        tile.groundLayerTileIndex = 4;
      }
      bottomWidth = bounded(bottomWidth + randomInt(-1, 1), minWidth, maxWidth);
    }

    let leftWidth = randomInt(minWidth, maxWidth);
    let rightWidth = randomInt(minWidth, maxWidth);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < leftWidth; x++) {
        const tile = this._getTileAt(x, y);
        tile.edge = true;
        tile.groundLayerTileIndex = 4;
      }
      leftWidth = bounded(leftWidth + randomInt(-1, 1), minWidth, maxWidth);

      for (let x = 0; x < rightWidth; x++) {
        const tile = this._getTileAt(this.columns - 1 - x, y);
        tile.edge = true;
        tile.groundLayerTileIndex = 4;
      }
      rightWidth = bounded(rightWidth + randomInt(-1, 1), minWidth, maxWidth);
    }
  };

  _buildTowns() {
    this._buildRoads();
    this._buildBuildings();
  };
  _buildRoads() {};
  _buildBuildings() {};

  _buildForests() {
    this.mapFeatureOrigins.forests.forEach((origin, forestIndex) => {
      const forestTileCoords = this._getFeatureTileCoords(origin, this.mapFeatureData.forests);
      forestTileCoords.forEach(({x, y}) => {
        this._getTileAt(x, y).groundLayerTileIndex = 4;
      })
    })
  };

  _buildLakes() {
    this.mapFeatureOrigins.forests.forEach((origin, lakeIndex) => {
      const lakeTileCoords = this._getFeatureTileCoords(origin, this.mapFeatureData.lakes);

      lakeTileCoords.forEach(({x, y}) => {
        this._getTileAt(x, y).groundLayerTileIndex = 0;
      })
    })
  };

  _buildRivers() {
    this.mapFeatureOrigins.forests.forEach((origin, riverIndex) => {
      const riverTileCoords = this._getFeatureTileCoords(origin, this.mapFeatureData.rivers);

      riverTileCoords.forEach(({x, y}) => {
        this._getTileAt(x, y).groundLayerTileIndex = 0;
      })
    })
  };

  _getFeatureTileCoords(origin, config) {
    const segments = [];
    let previousEndpoint = origin;
    let previousAngle = null;
    while(segments.length < config.roots.count) {
      const segment = this._createFeatureRootSegment(previousEndpoint, previousAngle, config)
      segments.push(segment);
      previousEndpoint = segment.endpoint;
      previousAngle = segment.angle;
    }

    const unfilteredRootCoords = [origin];
    segments.forEach((segment) => {
      unfilteredRootCoords.push(...segment.points);
    })
    const rootCoords = unfilteredRootCoords.filter((coord) => this._isValidTileCoords(coord.x, coord.y));
    const rootLength = segments.reduce((output, segment) => { return output + segment.distance; }, 0);
    const size = randomInt(config.minWidth, config.maxWidth) * rootLength;

    const coordsMap = {};
    const candidates = {};
    rootCoords.forEach((coords) => {
      coordsMap[pointToString(coords)] = {
        x: coords.x,
        y: coords.y,
        checkNeighbors: true,
      };
    });

    if (Object.entries(coordsMap).length === 0) {
      throw new Error('No Root Coords');
    }

    while(Object.keys(coordsMap).length < size) {
      Object.entries(coordsMap).forEach(([coordStr, coord]) => {
        const { x: tileX, y: tileY, checkNeighbors } = coord;
        if (checkNeighbors) {
          const neighbors = [
            { x: tileX + 1, y: tileY },
            { x: tileX - 1, y: tileY },
            { x: tileX, y: tileY + 1 },
            { x: tileX, y: tileY - 1 },
          ];

          neighbors.forEach((neighbor) => {
            const neighborStr = pointToString(neighbor);
            if (coordsMap[neighborStr]) {
              return;
            }
            if (candidates[neighborStr]) {
              return;
            }
            if (neighbor.x < 0 || neighbor.x >= this.columns) {
              return;
            }
            if (neighbor.y < 0 || neighbor.y >= this.rows) {
              return;
            }

            candidates[neighborStr] = {
              x: neighbor.x,
              y: neighbor.y,
              chance: config.growthRate,
            };
          });
          coord.checkNeighbors = false;
        }
      });

      if (Object.entries(candidates).length === 0) {
        throw new Error('No Candidates Left');
      }

      shuffle(Object.entries(candidates)).forEach(([candidateStr, candidate]) => {
        if (Object.keys(coordsMap).length < size) {
          if (Math.random() <= candidate.chance) {
            coordsMap[candidateStr] = {
              x: candidate.x,
              y: candidate.y,
              checkNeighbors: true,
            };
            delete candidates[candidateStr];
          }
        }
      });
    }
    return shuffle(Object.values(coordsMap)).map((coord) => ({ x: coord.x, y: coord.y }));
  }

  _createFeatureRootSegment(previousEndpoint, previousAngle, config) {
    const segment = {
      points: [],
      angle: (previousAngle || randomInt(0, 359)) + randomInt(config.roots.angle.min, config.roots.angle.max),
      endpoint: previousEndpoint,
      distance: randomInt(config.roots.length.min, config.roots.length.max),
    }

    const stepDistance = 3;
    const verticalStepDistance = stepDistance * 32 * Math.sin(toRadians(segment.angle));
    const horizontalStepDistance = stepDistance * 32 * Math.cos(toRadians(segment.angle));

    const currentWorldCoords = this._toWorldCoords(previousEndpoint.x, previousEndpoint.y);
    let currentDistance = 0;
    while (currentDistance < segment.distance) {
      currentWorldCoords.x += horizontalStepDistance;
      currentWorldCoords.y += verticalStepDistance;

      const point = this._toTileCoords(currentWorldCoords.x, currentWorldCoords.y);
      segment.points.push(point);
      segment.endpoint = point;
      currentDistance += stepDistance;
    };

    return segment;
  };

  _buildGroundLayer() {
    const map = this.scene.make.tilemap({
      tileWidth: 32,
      tileHeight: 32,
      width: this.columns,
      height: this.rows,
    });
    const tileset = map.addTilesetImage("terrain", "terrain", 32, 32, 0, 0);

    this.groundLayer = map.createBlankDynamicLayer("ground", tileset);

    this._forEachTile((tile, x, y) => {
      this.groundLayer.putTileAt(tile.groundLayerTileIndex, x, y);
    })
  }

  _buildObjectLayer() {

  }


  _forEachTile(callback) {
    this.tiles.forEach((row, r) => {
      row.forEach((tile, c) => {
        callback(tile, c, r);
      });
    });
  }

  _getTileAt(x, y) {
    return this.tiles[y][x];
  }

  _toWorldCoords(x, y) {
    return { x: 16 + x * 32, y: 16 + y * 32 };
  }

  _toTileCoords(x, y) {
    return { x: Math.floor(x / 32), y: Math.floor(y / 32) };
  }

  _isValidTileCoords(x, y) {
    return x >= 0 && x < this.columns && y >= 0 && y < this.rows;
  }
};

class MapTile {
  constructor(map) {
    this.map = map;
    this.scene = map.scene;

    this.groundLayerTileIndex = 3;
    this.objectLayerTileIndex = -1;
  }
};
