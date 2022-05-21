import { createGrid, pointToString, stringToPoint, forEachGridCell, cloneGrid, getGridCell, shuffle, randomInt } from '../utils/helpers.js';
import C from '../utils/constants.js';
import ProceduralMapTile from './ProceduralMapTile.js';

export default class ProceduralMap {
  constructor(scene, time) {
    this.scene = scene;
    
    this.tileW = 192;
    this.tileH = 192;
    
    this.borderTileWidth = 2;
    
    this.tilesize = 16;
    
    
    this.tilemap = this.scene.make.tilemap({
      tileWidth: this.tilesize,
      tileHeight: this.tilesize,
      width: this.tileW,
      height: this.tileH,
    });

    this.tilesets = {
      terrain: this.tilemap.addTilesetImage("terrain-extended-18", "terrain-extended-18", this.tilesize, this.tilesize, 1, 2),
      // terrain: this.tilemap.addTilesetImage("terrain-extended-all", "terrain-extended-all", this.tilesize, this.tilesize, 1, 2),
      foliage: this.tilemap.addTilesetImage("foliage", "foliage", this.tilesize, this.tilesize, 0, 0),
    };
    
    this.pixelW = this.tileW * this.tilesize;
    this.pixelH = this.tileH * this.tilesize;
    
    this.state = {
      revealedTiles: [],
      visibleTiles: [],
      visibleTilesSet: new Set(),
      visibleTilesTimer: 1000,
      dirtyTilesSet: new Set(),
      updateCollectiblesTimer: 1000,
    }
    
    this._initializeMap(time);
  };
  
  _initializeMap = (time) => {
    this._initializeMapTiles();
    this._initializeLayers();
    
    this._generateTerrain(0.45, 14, 4, this.borderTileWidth);
    this._generateFoliage();
    this._generateCollectibles(time);
  };
  
  _initializeMapTiles = () => {
    this.mapTiles = createGrid(this.tileH, this.tileW, (y, x) => {
      const mapTile = new ProceduralMapTile(this, x, y);
      if (x < this.borderTileWidth || x >= this.tileW - this.borderTileWidth || y < this.borderTileWidth || y >= this.tileH - this.borderTileWidth) {
        mapTile.isEdge = true;
      }
      return mapTile;
    }, true);
    
    forEachGridCell(this.mapTiles, (mapTile, x, y) => {
      const neighbors = [
        getGridCell(this.mapTiles, x - 1, y - 1),
        getGridCell(this.mapTiles, x - 1, y),
        getGridCell(this.mapTiles, x - 1, y + 1),
        getGridCell(this.mapTiles, x, y - 1),
        getGridCell(this.mapTiles, x, y + 1),
        getGridCell(this.mapTiles, x + 1, y - 1),
        getGridCell(this.mapTiles, x + 1, y),
        getGridCell(this.mapTiles, x + 1, y + 1),
      ];
      mapTile.setNeighbors(neighbors);
    });
  };
  
  _initializeLayers = () => {
    this.layers = {};
    this._initializeTerrainLayer();
    this._initializeObjectLayer();
    this._initializeVisionLayer();
  }
  
  _initializeTerrainLayer = () => {
    this.layers.terrain = this.tilemap.createBlankDynamicLayer("terrain", this.tilesets.terrain);
    this.layers.terrain.depth = 0;
    // TODO: set terrain collision
    // this.layers.terrain.setCollision([this.tilesheets.terrain[C.Map.Terrain.Water]]);
  };
  
  _initializeObjectLayer = () => {
    this.layers.object = this.tilemap.createBlankDynamicLayer("object", this.tilesets.terrain);
    this.layers.object.setCollision([999]);
  };
  
  
  _initializeVisionLayer = () => {
    this.layers.vision = this.tilemap.createBlankDynamicLayer("vision", this.tilesets.terrain);
    this.layers.vision.depth = 10000;

    // Set layer as black tiles - adjust alpha as vision state changes
    // this.layers.vision.fill(10);
    // this.layers.vision.forEachTile((tile) => {
    //   // TODO: temp value
    //   tile.setAlpha(0.5);
    // });
  };
  
  _generateTerrain = (initialRatio, iterations, neighborCount, borderWidth) => {
    const FOREST = 1;
    const PLAINS = 0;
    var terrain = createGrid(this.tileW, this.tileH, () => Math.random() <= initialRatio ? FOREST : PLAINS);
    forEachGridCell(terrain, (_, x, y) => {
      // Force edges to be ground
      if (x < borderWidth || x >= this.tileW - borderWidth || y < borderWidth || y >= this.tileH - borderWidth) {
        terrain[y][x] = FOREST;
      }
    });
    
    for (var i = 0; i < iterations; i++) {
      // Iterate over tiles at random
      const order = shuffle([...Array(this.tileH * this.tileW)].map((_, index) => index));
      order.forEach((index) => {
        const y = Math.floor(index / this.tileW);
        const x = index % this.tileW;
        
        const neighbors = [
          getGridCell(terrain, x - 1, y - 1) === 0 ? 0 : 1,
          getGridCell(terrain, x - 1, y) === 0 ? 0 : 1,
          getGridCell(terrain, x - 1, y + 1) === 0 ? 0 : 1,
          getGridCell(terrain, x, y - 1) === 0 ? 0 : 1,
          getGridCell(terrain, x, y + 1) === 0 ? 0 : 1,
          getGridCell(terrain, x + 1, y - 1) === 0 ? 0 : 1,
          getGridCell(terrain, x + 1, y) === 0 ? 0 : 1,
          getGridCell(terrain, x + 1, y + 1) === 0 ? 0 : 1,
        ];
        
        const neighborGroundCount = neighbors.reduce((sum, n) => sum + n, 0);
        if (neighborGroundCount > neighborCount) {
          terrain[y][x] = FOREST;
        } else if (neighborGroundCount < neighborCount) {
          terrain[y][x] = PLAINS;
        }      
      });
    }
    
    forEachGridCell(terrain, (terrainTile, tileX, tileY) => {
      this.getMapTile(tileX, tileY).setTerrain(terrainTile === FOREST ? C.Map.Terrain.Forest : C.Map.Terrain.Plains);
    });
  };
  
  _generateFoliage = () => {
    forEachGridCell(this.mapTiles, (mapTile) => {
      mapTile.addFoliage();
    });
  }
  
  _generateCollectibles = (time) => {
    const order = shuffle([...Array(this.tileH * this.tileW)].map((_, index) => index));
    order.forEach((index) => {
      const tileY = Math.floor(index / this.tileW);
      const tileX = index % this.tileW;
      const mapTile = this.getMapTile(tileX, tileY);
      mapTile.addCollectible(time);
    });
  }
  
  update(time, delta) {
    this._updateVisibleTiles(time, delta);
    this._updateCollectibleLayer(time, delta);
    
    [...this.state.dirtyTilesSet].forEach((location) => {
      const coords = stringToPoint(location);
      const mapTile = this.getMapTile(coords.x, coords.y);
      mapTile.render();
    })
  };
  
  _updateVisibleTiles = (time, delta) => {
    // Limit visible tile update to once every 250ms (4 checks/second)
    this.state.visibleTilesTimer += delta;
    if (this.state.visibleTilesTimer > 250) {
      // Get tiles within camera view (+100px buffer)
      const { x, y, width, height } = this.scene.cameras.main.worldView;
      const visibleTiles = this.layers.object.getTilesWithinWorldXY(x - 100, y - 100, width + 200, height + 200);

      // Create set for easier tile lookup
      const visibleSet = new Set();
      visibleTiles.forEach((tile) => {
        visibleSet.add(pointToString(tile));
      });

      // Hide objects on tiles no longer in view
      this.state.visibleTiles.forEach((tile) => {
        if (!visibleSet.has(pointToString(tile))) {
          const mapTile = this.getMapTile(tile.x, tile.y);
          mapTile.showGameObjects(false);
        }
      });

      // Show objects on newly entered tiles
      visibleTiles.forEach((tile) => {
        if (!this.state.visibleTilesSet.has(pointToString(tile))) {
          const mapTile = this.getMapTile(tile.x, tile.y);
          mapTile.showGameObjects(true);
        }
      });

      // Update cached tile collections
      this.state.visibleTiles = visibleTiles;
      this.state.visibleTilesSet = visibleSet;
      this.state.visibleTilesTimer = 0;
    }
  };
  
  _updateCollectibleLayer = (time, delta) => {
    // Limit visible tile update to once every 200ms (5 checks/second)
    this.state.updateCollectiblesTimer += delta;
    if (this.state.updateCollectiblesTimer > 200) {
      const percentage = 0.04;
      const count = Math.ceil(this.tileH * this.tileW * percentage);
      const order = shuffle([...Array(count)].map(() => randomInt(0, this.tileH * this.tileW - 1)));
      order.forEach((index) => {
        const tileY = Math.floor(index / this.tileW);
        const tileX = index % this.tileW;
        const mapTile = this.getMapTile(tileX, tileY);
        mapTile.addCollectible(time);
      });
      
      this.state.updateCollectiblesTimer = 0;
    }
  };
  
  addDirtyMapTile = (mapTile) => {
    this.state.dirtyTilesSet.add(pointToString(mapTile));
  };
  
  removeDirtyMapTile = (mapTile) => {
    this.state.dirtyTilesSet.delete(pointToString(mapTile));
  };
  
  getMapTile = (tileX, tileY, worldX, worldY) => {
    if (this.isValidTileCoords(tileX, tileY)) {
      return this.mapTiles[tileY][tileX];
    } else {
      const tileCoords = this.toTileCoords(worldX, worldY);
      if (this.isValidTileCoords(tileCoords.x, tileCoords.y)) {
        return this.mapTiles[tileCoords.y][tileCoords.x];
      }
    }
    return null;
  };
  
  placeTile = (layer, key, x, y) => {
    this.layers[layer].putTileAt(key, x, y);
  };
  
  toWorldCoords = (x, y) => {
    const half = this.tilesize / 2;
    return { x: half + x * this.tilesize, y: half + y * this.tilesize };
  }

  toTileCoords = (x, y) => {
    return { x: Math.floor(x / this.tilesize), y: Math.floor(y / this.tilesize) };
  }

  isValidTileCoords = (x, y) => {
    return x >= 0 && x < this.tileW && y >= 0 && y < this.tileH;
  }
  
}
