import { randomInt, shuffle, pointToString, stringToPoint, bounded, toRadians, arrayToGrid, rotateGrid, createGrid } from '../utils/helpers.js';
import C from '../utils/constants.js';
import M from '../data/MushroomData.js';
import MapQuadrantData from '../data/MapQuadrants.js';
import MapShapeData from '../data/MapShapes.js';
import MapChunkData from '../data/MapChunks.js';
import Modifier from './Modifier.js';
import Mushroom from './Mushroom.js';
import Prop from './Prop.js';

export default class Map {
  constructor(scene) {
    this.scene = scene;

    this.rows = 200;
    this.columns = 200;
    this.borderWidth = 4;

    this.tilesize = 32;
    this.chunksize = 24;


    this.tilemap = this.scene.make.tilemap({
      tileWidth: this.tilesize,
      tileHeight: this.tilesize,
      width: this.columns,
      height: this.rows,
    });

    this.tilesets = {
      terrain: this.tilemap.addTilesetImage("terrain-extended-all", "terrain-extended-all", this.tilesize, this.tilesize, 1, 2),
      foliage: this.tilemap.addTilesetImage("foliage", "foliage", this.tilesize, this.tilesize, 0, 0),
    };

    this.tilesheets = {
      terrain: {
        [C.Map.Terrain.Water]: 0,
        [C.Map.Terrain.Rock]: 1,
        [C.Map.Terrain.Sand]: 2,
        [C.Map.Terrain.Grass]: 3,
        [C.Map.Terrain.Dirt]: 4,
        [C.Map.Terrain.Blank]: 5,
      },
      foliage: {

      },
    }

    this.revealedTiles = [];
    this.visibleTiles = [];
    this.visibleTilesSet = new Set();

    this._generateMapData();
    this._buildGroundLayer();
    this._buildObjectLayer();
    this._buildFogLayer();

    this.width = this.columns * this.tilesize;
    this.height = this.rows * this.tilesize;

    this.state = {
      visibleFrameCounter: 0,
    };
  }

  update(time, delta) {
    this._updateCollectibleLayer(time, delta);

    this.state.visibleFrameCounter += 1;
    this.state.visibleFrameCounter %= 4;
    if (this.state.visibleFrameCounter === 0) {
      const { x, y, width, height } = this.scene.cameras.main.worldView;
      const visibleTiles = this.objectLayer.getTilesWithinWorldXY(x - 100, y - 100, width + 200, height + 200);
      this.setVisibleTiles(visibleTiles);
    }
  }

  _generateMapData() {
    this._initializeMapTiles();
    this._buildMapFeatures();
    this._buildEdges(this.borderWidth, this.borderWidth);
    // this._buildMapFeatures();
    this._addObjects();
  };

  _initializeMapTiles() {
    this.tiles = createGrid(this.rows, this.columns, (r, c) => {
      return new MapTile(this, c, r);
    }, true);
  };

  _buildMapFeatures() {
    this.quadrants = [
      new MapQuadrant(this, this.borderWidth, this.borderWidth),
      new MapQuadrant(this, this.borderWidth, this.rows / 2),
      new MapQuadrant(this, this.columns / 2, this.borderWidth),
      new MapQuadrant(this, this.columns / 2, this.rows / 2),
    ];
  };

  // _buildMapFeatures() {
  //   this._generateMapFeatureData();
  //   this._generateMapFeatureOrigins();
  //
  //   this._buildEdges(this.borderWidth, this.borderWidth);
  //   this._buildTowns();
  //   this._buildForests();
  //   this._buildRivers();
  //   this._buildLakes();
  //
  // };

  // _generateMapFeatureData() {
  //   this.mapFeatureData = {
  //     town: {
  //       count: 1,
  //     },
  //     forests: {
  //       count: randomInt(12, 16),
  //       minWidth: 20,
  //       maxWidth: 32,
  //       growthRate: 0.7,
  //       roots: {
  //         count: 5,
  //         angle: {
  //           min: -120,
  //           max: 120,
  //         },
  //         length: {
  //           min: 16,
  //           max: 20,
  //         },
  //       },
  //     },
  //     lakes: {
  //       count: randomInt(4, 6),
  //       minWidth: 24,
  //       maxWidth: 32,
  //       growthRate: 0.8,
  //       roots: {
  //         count: 3,
  //         angle: {
  //           min: -150,
  //           max: 150,
  //         },
  //         length: {
  //           min: 8,
  //           max: 10,
  //         },
  //       },
  //     },
  //     rivers: {
  //       count: randomInt(2, 3),
  //       minWidth: 9,
  //       maxWidth: 12,
  //       growthRate: 1.0,
  //       roots: {
  //         count: 14,
  //         angle: {
  //           min: -45,
  //           max: 45,
  //         },
  //         length: {
  //           min: 4,
  //           max: 8,
  //         },
  //       },
  //     },
  //   }
  // };
  //
  // _generateMapFeatureOrigins() {
  //   this.mapFeatureOrigins = {
  //     town: [],
  //     forests: [],
  //     lakes: [],
  //     rivers: [],
  //   };
  //   const mapFeatureCounts = {};
  //
  //   // Sum features counts to get total origin tiles needed
  //   const originCount = Object.entries(this.mapFeatureData).reduce((output, [feature, featureData]) => {
  //     mapFeatureCounts[feature] = featureData.count;
  //     return output + (featureData.count || 0);
  //   }, 0);
  //
  //   // Compute baseline origin grid size (27 origins --> 5x5 grid; 32 origins --> 6x6 grid)
  //   const originGridSize = Math.round(originCount ** 0.5);
  //   const originGridCounts = [...Array(originGridSize)].map(() => originGridSize);
  //
  //   // Add/remove origins from each row to account for excess/deficit from baseline grin
  //   let excessOrigins = originCount - (originGridSize ** 2);
  //   while (excessOrigins !== 0) {
  //     const originGridIndex = randomInt(originGridSize - 1);
  //     if (originGridCounts[originGridIndex] === originGridSize) {
  //       originGridCounts[originGridIndex] += excessOrigins > 0 ? 1 : -1;
  //       excessOrigins -= excessOrigins > 0 ? 1 : -1;
  //     }
  //   }
  //
  //   // Assign semi-random tile coords for each origin
  //   originGridCounts.forEach((gridWidth, gridY) => {
  //     // Compute tileY index for this row of origins
  //     const deltaY = this.rows / originGridSize;
  //     const tileY = Math.floor((gridY + 0.5) * deltaY);
  //     const originGridRow = [...Array(gridWidth)].forEach((_, gridX) => {
  //       // Compute tileX index for this origin
  //       const deltaX = this.columns / gridWidth;
  //       const tileX = Math.floor((gridX + 0.5) * deltaX);
  //
  //       // Compute origin coords fuzziness
  //       const fuzzyX = Math.floor(deltaX);
  //       const fuzzyY = Math.floor(deltaY);
  //
  //       // Assign this origin a feature type
  //       const availableOriginFeatures = Object.entries(mapFeatureCounts).reduce((output, [feature, count]) => {
  //         if (count) {
  //           output.push(feature);
  //         }
  //         return output;
  //       }, []);
  //       // Choose a random feature type still in need of origins
  //       const feature = availableOriginFeatures[randomInt(0, availableOriginFeatures.length - 1)];
  //       mapFeatureCounts[feature] -= 1;
  //
  //       // Create/push final origin coords
  //       this.mapFeatureOrigins[feature].push({
  //         x: bounded(tileX + randomInt(-fuzzyX, fuzzyX), 0, this.columns - 1),
  //         y: bounded(tileY + randomInt(-fuzzyY, fuzzyY), 0, this.rows - 1),
  //       });
  //     });
  //   });
  //
  //   // Randomize origin order
  //   Object.entries(this.mapFeatureOrigins).forEach(([feature, origins]) => {
  //     this.mapFeatureOrigins[feature] = shuffle(origins);
  //   });
  // }

  _buildEdges(minWidth, maxWidth) {
    let topWidth = randomInt(minWidth, maxWidth);
    let bottomWidth = randomInt(minWidth, maxWidth);
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < topWidth; y++) {
        const tile = this._getTileAt(x, y);
        tile.setEdge(true);
        tile.setTerrain('forest');
      }
      topWidth = bounded(topWidth + randomInt(-1, 1), minWidth, maxWidth);

      for (let y = 0; y < bottomWidth; y++) {
        const tile = this._getTileAt(x, this.rows - 1 - y);
        tile.setEdge(true);
        tile.setTerrain('forest');
      }
      bottomWidth = bounded(bottomWidth + randomInt(-1, 1), minWidth, maxWidth);
    }

    let leftWidth = randomInt(minWidth, maxWidth);
    let rightWidth = randomInt(minWidth, maxWidth);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < leftWidth; x++) {
        const tile = this._getTileAt(x, y);
        tile.setEdge(true);
        tile.setTerrain('forest');
      }
      leftWidth = bounded(leftWidth + randomInt(-1, 1), minWidth, maxWidth);

      for (let x = 0; x < rightWidth; x++) {
        const tile = this._getTileAt(this.columns - 1 - x, y);
        tile.setEdge(true);
        tile.setTerrain('forest');
      }
      rightWidth = bounded(rightWidth + randomInt(-1, 1), minWidth, maxWidth);
    }
  };

  // _buildTowns() {
  //   this._buildRoads();
  //   this._buildBuildings();
  // };
  // _buildRoads() {};
  // _buildBuildings() {};
  //
  // _buildForests() {
  //   this.mapFeatureOrigins.forests.forEach((origin, forestIndex) => {
  //     const forestTileCoords = this._getFeatureTileCoords(origin, this.mapFeatureData.forests);
  //     forestTileCoords.forEach(({x, y}) => {
  //       if (this._isValidTileCoords(x, y)) {
  //         this._getTileAt(x, y).data.forest = true;
  //       }
  //     });
  //   })
  // };
  //
  // _buildLakes() {
  //   this.mapFeatureOrigins.lakes.forEach((origin, lakeIndex) => {
  //     const lakeTileCoords = this._getFeatureTileCoords(origin, this.mapFeatureData.lakes);
  //
  //     lakeTileCoords.forEach(({x, y}) => {
  //       if (this._isValidTileCoords(x, y)) {
  //         this._getTileAt(x, y).data.lake = true;
  //       }
  //     });
  //   })
  // };
  //
  // _buildRivers() {
  //   this.mapFeatureOrigins.rivers.forEach((origin, riverIndex) => {
  //     const riverTileCoords = this._getFeatureTileCoords(origin, this.mapFeatureData.rivers);
  //
  //     riverTileCoords.forEach(({x, y}) => {
  //       if (this._isValidTileCoords(x, y)) {
  //         this._getTileAt(x, y).data.river = true;
  //       }
  //     });
  //   })
  // };
  //
  // _getFeatureTileCoords(origin, config) {
  //   // Generate root segments. Map features will be grown off of roots growth points
  //   const roots = [];
  //   let previousEndpoint = origin;
  //   let previousAngle = null;
  //   while(roots.length < config.roots.count) {
  //     const root = this._createFeatureRoot(previousEndpoint, previousAngle, config)
  //     roots.push(root);
  //     previousEndpoint = root.endpoint;
  //     previousAngle = root.angle;
  //   }
  //
  //   // Get list of viable growth points
  //   const unfilteredGrowthPoints = [origin];
  //   roots.forEach((root) => {
  //     unfilteredGrowthPoints.push(...root.points);
  //   })
  //   const growthPoints = unfilteredGrowthPoints.filter((point) => this._isValidTileCoords(point.x, point.y));
  //
  //   // Compute size of feature (in # of tiles)
  //   const rootsLength = roots.reduce((output, root) => { return output + root.distance; }, 0);
  //   const size = randomInt(config.minWidth, config.maxWidth) * rootsLength * 0.8;
  //
  //   const coordsMap = {};
  //   let coordsCount = 0;
  //   let candidates = {};
  //
  //   // Add growth points to feature coords
  //   growthPoints.forEach((point) => {
  //     const coordsStr = pointToString(point);
  //     coordsMap[coordsStr] = {
  //       x: point.x,
  //       y: point.y,
  //       checkNeighbors: true,
  //     };
  //     coordsCount++;
  //   });
  //
  //   if (coordsCount === 0) {
  //     throw new Error('No Root Coords');
  //   }
  //
  //   while(coordsCount < size) {
  //     // Update list of candidates tiles
  //     Object.entries(coordsMap).forEach(([coordStr, coord]) => {
  //       const { x: tileX, y: tileY, checkNeighbors } = coord;
  //       if (checkNeighbors) {
  //         // Compute neighboring tile coordinates
  //         const neighbors = [
  //           { x: tileX + 1, y: tileY },
  //           { x: tileX - 1, y: tileY },
  //           { x: tileX, y: tileY + 1 },
  //           { x: tileX, y: tileY - 1 },
  //         ];
  //
  //         // Identify which neighbors are viable candidates
  //         neighbors.forEach((neighbor) => {
  //           const neighborStr = pointToString(neighbor);
  //           if (coordsMap[neighborStr]) {
  //             return;
  //           }
  //           if (candidates[neighborStr]) {
  //             return;
  //           }
  //
  //           candidates[neighborStr] = {
  //             x: neighbor.x,
  //             y: neighbor.y,
  //             chance: config.growthRate,
  //             checkNeighbors: true,
  //           };
  //         });
  //
  //         // Avoid re-checking neighbors
  //         coord.checkNeighbors = false;
  //       }
  //     });
  //
  //     if (Object.entries(candidates).length === 0) {
  //       throw new Error('No Candidates Left');
  //     }
  //
  //     shuffle(Object.entries(candidates)).forEach(([candidateStr, candidate]) => {
  //       if (coordsCount < size) {
  //         // Random chance to add candidate to final set of coords
  //         if (Math.random() <= candidate.chance) {
  //           coordsMap[candidateStr] = candidate;
  //           coordsCount++;
  //           delete candidates[candidateStr];
  //         }
  //       }
  //     });
  //   }
  //
  //   // Strip out unneeded data; randomize order
  //   return shuffle(Object.values(coordsMap)).map((coord) => ({ x: coord.x, y: coord.y }));
  // }
  //
  // _createFeatureRoot(previousEndpoint, previousAngle, config) {
  //   // Initialize new feature root
  //   const root = {
  //     points: [],
  //     endpoint: previousEndpoint,
  //
  //     // Randomize angle
  //     angle: (previousAngle || randomInt(0, 359)) + randomInt(config.roots.angle.min, config.roots.angle.max),
  //     // Randomize distance
  //     distance: randomInt(config.roots.length.min, config.roots.length.max),
  //   }
  //
  //   // Create growth point every 3 tiles along root
  //   const stepDistance = 3;
  //   const verticalStepDistance = stepDistance * this.tilesize * Math.sin(toRadians(root.angle));
  //   const horizontalStepDistance = stepDistance * this.tilesize * Math.cos(toRadians(root.angle));
  //
  //   const currentWorldCoords = this._toWorldCoords(previousEndpoint.x, previousEndpoint.y);
  //   let currentDistance = 0;
  //   while (currentDistance < root.distance) {
  //     currentWorldCoords.x += horizontalStepDistance;
  //     currentWorldCoords.y += verticalStepDistance;
  //
  //     const point = this._toTileCoords(currentWorldCoords.x, currentWorldCoords.y);
  //     root.points.push(point);
  //     root.endpoint = point;
  //     currentDistance += stepDistance;
  //   };
  //
  //   return root;
  // };

  _addObjects() {
    this._forEachTile((tile, x, y) => {
      const r = Math.random();

      if (tile.state.edge) {
        if (r < 0.2) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.L1_A;
        } else if (r < 0.6) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.L1_B;
        } else if (r < 0.7) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.L1M1_A;
        } else if (r < 0.8) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.M2_A;
        } else if (r < 0.9) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.M2_B;
        } else {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.M3_A;
        }
      } else if (tile.state.terrain === 'river') {
        return;
      } else if (tile.state.terrain === 'lake') {
        return;
      } else if (tile.state.terrain === 'forest') {
        if (r < 0.02) {
          // tile.state.foliage.image = C.Map.Foliage.Bush;
        } else if (r < 0.04) {
          // tile.state.foliage.image = C.Map.Foliage.Rock;
        } else if (r < 0.06) {
          // tile.state.foliage.image = C.Map.Foliage.Stump;
        } else if (r < 0.10) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.L1_A;
        } else if (r < 0.18) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.L1_B;
        } else if (r < 0.20) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.L1M1_A;
        } else if (r < 0.22) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.M2_A;
        } else if (r < 0.24) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.M2_B;
        } else if (r < 0.26) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.M3_A;
        }
      } else {
        if (r < 0.005) {
          // tile.state.foliage.image = C.Map.Foliage.Bush;
        } else if (r < 0.01) {
          // tile.state.foliage.image = C.Map.Foliage.Rock;
        } else if (r < 0.012) {
          // tile.state.foliage.image = C.Map.Foliage.Stump;
        } else if (r < 0.018) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.L1_A;
        } else if (r < 0.028) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.L1_B;
        } else if (r < 0.031) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.L1M1_A;
        } else if (r < 0.034) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.M2_A;
        } else if (r < 0.037) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.M2_B;
        } else if (r < 0.040) {
          tile.state.foliage.image = C.Map.Foliage.Tree.Pine.M3_A;
        }
      }
    });
  }

  _spawnCollectible(tile, time, delta) {
    if (Object.keys(tile.state.gameObjects).length) {
      return null;
    }

    let spawned = false;
    const timeElapsed = tile.state.collectible.modified ? time - tile.state.collectible.modified : (60 * 1000);
    const timeFactor = timeElapsed / (20 * 1000);
    const r = Math.random() / timeFactor;

    const mushroomChance = this._computeMushroomChance(tile)
    if (r < mushroomChance) {
      return this._spawnMushroom(tile);
    }

    tile.state.collectible.modified = time;
    return null;
  }

  _computeMushroomChance(tile) {
    return tile.stats.mushroomSpawnRate;
  }

  _spawnMushroom(tile) {
    const odds = [];

    const mushrooms = Object.entries(M);
    const denominator = mushrooms.reduce((d, [name, data]) => {
      if (data.rarity <= 10) {
        return d + (2 ** data.rarity);
      }
    }, 0);

    mushrooms.reduce((sum, [name, data], index) => {
      const chance = (2 ** data.rarity) / denominator;
      const threshold = sum + chance;
      odds[index] = {
        name,
        threshold,
      };
      return threshold;
    }, 0);

    const r = Math.random();
    const { name: mushroom } = odds.find(({ name, threshold }) => {
      return r < threshold;
    });

    return mushroom;
  }

  _buildGroundLayer() {
    this.groundLayer = this.tilemap.createBlankDynamicLayer("ground", this.tilesets.terrain);
    this.groundLayer.setCollision([this.tilesheets.terrain[C.Map.Terrain.Water]]);
    this.groundLayer.depth = 0;

    this._forEachTile((tile, x, y) => {
      if (this._isValidTileCoords(x, y)) {
        this.groundLayer.putTileAt(this._getTerrainTile(tile), x, y);
      }
    })
  }

  _buildObjectLayer() {
    this.objectLayer = this.tilemap.createBlankDynamicLayer("object", this.tilesets.foliage);
    this.objectLayer.setCollision([18]);

    this._forEachTile((tile, x, y) => {
      if (this._isValidTileCoords(x, y)) {
        const tileBelow = this._isValidTileCoords(x, y + 1) ? this._getTileAt(x, y + 1) : null;
        const key = tile.state.foliage.image;

        if (key) {
          const propX = x * this.tilesize + this.tilesize / 2;
          const propY = y * this.tilesize;
          const prop = new Prop(this.scene, propX, propY, key);
          prop.setVisible(false);

          tile.state.gameObjects[prop.id] = prop;
          this.objectLayer.putTileAt(18, x, y);
        }
      }
    });
  };

  _updateObjectLayer() {

  }

  _updateCollectibleLayer(time) {
    let elapsedTime;
    if (this.collectiblesModifiedTime) {
      elapsedTime = time - this.collectiblesModifiedTime;
    };

    // Check once every 10 frames
    if (elapsedTime > 10 * (1 / 60)) {
      this._forEachTile((tile, x, y) => {
        // if (Math.random() > .1) return;
        const key = this._spawnCollectible(tile, time);
        if (key) {
          const origin = this._toWorldCoords(x, y);
          const mushroom = new Mushroom(this.scene, origin.x, origin.y, key);
          tile.state.gameObjects[mushroom.id] = mushroom;
          this.objectLayer.putTileAt(18, x, y);

          const center = mushroom.getCenter();
          const nearbyTiles = this.objectLayer.getTilesWithinShape(new Phaser.Geom.Circle(center.x, center.y, 400));

          const nearbySpawnModifier = new Modifier(
            this.scene,
            C.Modifiers.Type.MapTile.NearbySpawn,
            mushroom,
            {
              multiplier: (x, y) => {
                const d = Phaser.Math.Distance.Between(x, y, origin.x, origin.y);
                const f = (d / 400) ** 2;
                return bounded(0.04 + (0.96 * f), 0.04, 1);
              }
            },
          );
          nearbyTiles.forEach((t) => {
            const vt = this._getTileAt(t.x, t.y);
            vt.addModifier(nearbySpawnModifier);
          });
        }
      }, () => Math.random() < 0.1, () => Math.random() < 0.1);
    }
    this.collectiblesModifiedTime = time;
  };

  _buildFogLayer() {
    this.fogLayer = this.tilemap.createBlankDynamicLayer("vision", this.tilesets.terrain);
    this.fogLayer.depth = 10000;

    this.fogLayer.fill(this.tilesheets.terrain[C.Map.Terrain.Blank]);

    this.fogLayer.forEachTile((tile) => {
      tile.setAlpha(1);
    });
  };

  _getTerrainTile(tile) {
    if (tile.state.edge) return this.tilesheets.terrain[C.Map.Terrain.Dirt];
    if (tile.state.terrain === 'lake') return this.tilesheets.terrain[C.Map.Terrain.Water];
    if (tile.state.terrain === 'river') return this.tilesheets.terrain[C.Map.Terrain.Rock];
    if (tile.state.terrain === 'forest') return this.tilesheets.terrain[C.Map.Terrain.Dirt];

    const neighbors = createGrid(3, 3, (r, c) => {
      return this._getTileAt(tile.x - 1 + c, tile.y - 1 + r).state.terrain;
    });

    const t = neighbors[0][1] === 'forest';
    const l = neighbors[1][0] === 'forest';
    const r = neighbors[1][2] === 'forest';
    const b = neighbors[2][1] === 'forest';

    if (t && l && r && b) return 27;
    if (t && l && r) return 9;
    if (t && l && b) return 24;
    if (t && r && b) return 26;
    if (l && r && b) return 21;
    if (t && l) return 6;
    if (t && r) return 8;
    if (t && b) return 25;
    if (l && r) return 15;
    if (l && b) return 18;
    if (r && b) return 20;
    if (t) return 7;
    if (l) return 12;
    if (r) return 14;
    if (b) return 19;


    return this.tilesheets.terrain[C.Map.Terrain.Grass];
  };

  _getCollectibleTile(tile) {
    if (tile.state.collectible.tile === C.Map.Foliage.Mushroom) {
      return -1;
    } else if (tile.state.collectible.tile === C.Map.Foliage.Mushrooms) {
      return -1;
    }
    return -1;
  }

  _forEachTile(callback, xFilter, yFilter) {
    this.tiles.forEach((row, r) => {
      if (!yFilter || yFilter(r)) {
        row.forEach((tile, c) => {
          if (!xFilter || xFilter(c)) {
            callback(tile, c, r);
          }
        });
      }
    });
  }

  _getTileAt(x, y) {
    return this.tiles[y][x];
  }

  _getTileAtWorldCoords(x, y) {
    const { x: tx, y: ty} = this._toTileCoords(x, y);
    if (this._isValidTileCoords(tx, ty)) {
      return this._getTileAt(tx, ty);
    }
    return null;
  }

  _getAdjacentTile(tile, direction) {
    let x = tile.x;
    let y = tile.y;
    switch(direction) {
      case C.Directions.Up:
        y -= 1;
        break;
      case C.Directions.Down:
        y += 1;
        break;
      case C.Directions.Left:
        x -= 1;
        break;
      case C.Directions.Right:
        x += 1;
        break;
      default:
        break;
    }
    return this._isValidTileCoords(x, y) ? this._getTileAt(x, y) : null;
  }

  _toWorldCoords(x, y) {
    const half = this.tilesize / 2;
    return { x: half + x * this.tilesize, y: half + y * this.tilesize };
  }

  _toTileCoords(x, y) {
    return { x: Math.floor(x / this.tilesize), y: Math.floor(y / this.tilesize) };
  }

  _isValidTileCoords(x, y) {
    return x >= 0 && x < this.columns && y >= 0 && y < this.rows;
  }

  revealTiles(revealedTilesOuter, revealedTilesInner) {
    // Create set for easier tile lookup
    const revealedOuterSet = new Set();
    revealedTilesOuter.forEach((tile) => {
      revealedOuterSet.add(pointToString(tile));
    });

    // Hide old revealed tiles
    if (this.revealedTiles) {
      this.revealedTiles.forEach((tile) => {
        if (!revealedOuterSet.has(pointToString(tile))) {
          tile.setAlpha(0.7);
        }
      });
    }

    // Reveal new revealed tiles
    revealedTilesOuter.forEach((tile) => {
      tile.setAlpha(.2);

      const tileData = this._getTileAt(tile.x, tile.y);
      Object.values(tileData.state.gameObjects).forEach((obj) => {
        const discovered = obj.setDiscovered && obj.setDiscovered(true);
        if (discovered) {
          obj.setVisible(true);
        }
      });
    });
    revealedTilesInner.forEach((tile) => {
      tile.setAlpha(0);
    });

    // Update cached revealed tiles
    this.revealedTiles = revealedTilesOuter;
  }

  setVisibleTiles(visibleTiles) {
    // Create set for easier tile lookup
    const visibleSet = new Set();
    visibleTiles.forEach((tile) => {
      visibleSet.add(pointToString(tile));
    });

    // Hide objects on tiles no longer in view
    if (this.visibleTiles) {
      [...this.visibleTiles].forEach((tile) => {
        if (!visibleSet.has(pointToString(tile))) {
          const tileData = this._getTileAt(tile.x, tile.y);
          Object.values(tileData.state.gameObjects).forEach((obj) => {
            obj.setVisible(false);
          });
        }
      });
    }

    // Show objects on newly entered tiles
    visibleTiles.forEach((tile) => {
      if (!this.visibleTilesSet.has(pointToString(tile))) {
        const tileData = this._getTileAt(tile.x, tile.y);
        Object.values(tileData.state.gameObjects).forEach((obj) => {
          obj.setVisible(true);
        });
      }
    });

    // Update cached tile collections
    this.visibleTiles = visibleTiles;
    this.visibleTilesSet = visibleSet;
  }
};


class MapTile {
  constructor(map, x, y) {
    this.map = map;
    this.scene = map.scene;

    this.state = {
      gameObjects: {},
      foliage: {},
      collectible: {
        mushroom: {
        },
      },
      modifiers: {}
    };

    this.basestats = {
      mushroomSpawnRate: 0.01,
    };

    this.stats = {};


    this.x = x;
    this.y = y;

    const worldCoords = this.map._toWorldCoords(x, y);
    this.worldX = worldCoords.x;
    this.worldY = worldCoords.y;


    this.groundLayerTileIndex = 4;
    this.objectLayerTileIndex = -1;

    this.computeStats();
  }

  setEdge(v) {
    this.state.edge = v;
    this.computeStats();
  };

  setTerrain(terrain) {
    this.state.terrain = terrain;
    this.computeStats();
  }

  addModifier(modifier) {
    this.state.modifiers[modifier.id] = modifier;
    this.computeStats(true);
  }

  computeStats() {
    const stats = Object.assign({}, this.basestats);
    if (this.state.edge || this.state.terrain === 'river' || this.state.terrain === 'lake') {
      stats.mushroomSpawnRate = 0;
    } else if (this.state.terrain === 'forest') {
      stats.mushroomSpawnRate *= 3;
    }

    const entries = Object.entries(this.state.modifiers);
    entries.forEach(([_, modifier]) => {
      const { type, data, active } = modifier;
      if (!active) { return; }

      switch(type) {
        case C.Modifiers.Type.MapTile.NearbySpawn: {
          const { multiplier } = data;
          stats.mushroomSpawnRate *= multiplier(this.worldX, this.worldY);
          break;
        }
        default: {}
      }
    });
    this.stats = stats;
  }

  getMushroom() {
    return Object.values(this.state.gameObjects).find((obj) => obj.class && obj.class === C.Classes.Mushroom);
  }

  removeGameObject(obj) {
    obj.setVisible(false);
    delete this.state.gameObjects[obj.id];

    Object.values(obj.ownedModifiers).forEach((modifier) => {
      modifier.active = false;
    });

    if (Object.keys(this.state.gameObjects).length === 0) {
      this.map.objectLayer.putTileAt(-1, this.x, this.y);
    }
  }
};

class MapQuadrant {
  constructor(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.size = 4;

    this.init();
  }

  init() {
    // Get random quandrant layout
    const shapeIndex = randomInt(MapQuadrantData.length - 1);
    this.shapes = MapQuadrantData[shapeIndex].shapes

    // Initialize chunk grid (4x4)
    this.chunks = [...Array(this.size)].map((row) => {
      return [...Array(this.size)];
    });

    this.rotations = randomInt(0, 3);

    // Add each shape to chunk grid
    this.shapes.forEach((shape) => {
      // Choose random variant for this shape
      const variants = MapShapeData[shape.key].variants;
      const variant = variants[randomInt(variants.length - 1)];

      this._addShapeToGrid(shape, variant, this.rotations);
    });

    this._apply();
  }

  _apply() {
    // Iterate over each chunk
    this.chunks.forEach((chunkRow, chunkY) => {
      chunkRow.forEach((chunk, chunkX) => {
        const { tiles } = chunk;

        // Iterate over each tile
        tiles.forEach((tileRow, tileY) => {
          tileRow.forEach((tile, tileX) => {
            // Compute map coordinate of each tile
            const mapX = this.x + chunkX * this.map.chunksize + tileX;
            const mapY = this.y + chunkY * this.map.chunksize + tileY;

            // Set ground type of matching MapTile
            const mapTile = this.map._getTileAt(mapX, mapY);
            const tileIndex = tile - 1;

            switch(tileIndex) {
              case this.map.tilesheets.terrain[C.Map.Terrain.Water]:
                mapTile.setTerrain('lake');
                break;
              case this.map.tilesheets.terrain[C.Map.Terrain.Rock]:
                break;
              case this.map.tilesheets.terrain[C.Map.Terrain.Sand]:
                break;
              case this.map.tilesheets.terrain[C.Map.Terrain.Grass]:
                break;
              case this.map.tilesheets.terrain[C.Map.Terrain.Dirt]:
                mapTile.setTerrain('forest');
                break;
              case this.map.tilesheets.terrain[C.Map.Terrain.Blank]:
                break;
              default:
                break;
            }
            // mapTile.groundLayerTileIndex = tile;
          });
        });
      });
    });
  };

  _addShapeToGrid(shape, variant, quadrantRotations) {
    const { key, origin, rotations: shapeRotations, mirrored } = shape;
    const { chunks, rotations: variantRotations} = variant
    const { coordinates } = MapShapeData[key];

    coordinates.forEach((coord, index) => {
      // Copy base chunk coords
      let transformed = { x: coord.x, y: coord.y };

      // Mirror across shape vertical axis if necessary
      if (mirrored) {
        transformed.x = -transformed.x;
      }

      // Rotate around shape origin if necessary
      transformed = [...Array(shapeRotations)].reduce((t) => {
        const rotatedY = t.x;
        const rotatedX = -t.y;
        return { x: rotatedX, y: rotatedY };
      }, transformed);

      // Translate based on location of origin
      transformed = {
        x: transformed.x + origin.x,
        y: transformed.y + origin.y,
      };

      // Fetch corresponding tile data for this variant/chunk
      const { x: chunkDataX, y: chunkDataY } = chunks[index];
      const { data: tileData } = MapChunkData[chunkDataY][chunkDataX];
      let tiles = arrayToGrid(tileData, this.map.chunksize, this.map.chunksize);

      // Mirror across chunk vertical axis if necessary
      if (mirrored) {
        tiles.forEach((row) => {
          row.reverse();
        });
      }

      // Rotate chunks around quadrant center if necessary
      transformed = [...Array(quadrantRotations)].reduce((t) => {
        const rotatedY = t.x;
        const rotatedX = this.size - t.y - 1;
        return { x: rotatedX, y: rotatedY };
      }, transformed);

      // Rotate around chunk center if necessary
      const tileRotations = (quadrantRotations + shapeRotations + variantRotations) % 4;
      tiles = [...Array(tileRotations)].reduce((t) => {
        return rotateGrid(tiles);
      }, tiles);

      // Assign computed chunk tiles to chunk grid
      this.chunks[transformed.y][transformed.x] = {
        tiles,
      };
    });
  };
};
