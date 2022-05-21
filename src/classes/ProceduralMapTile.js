import C from '../utils/constants.js';
import M from '../data/MushroomData.js';
import { randomInt } from '../utils/helpers.js';

import Modifier from './Modifier.js';
import Mushroom from './Mushroom.js';
import Prop from './Prop.js';

export default class ProceduralMapTile {
  constructor(map, x, y) {
    this.map = map;
    this.scene = map.scene;
    
    this.x = x;
    this.y = y;
    this.tileX = x;
    this.tileY = y;
    this.isEdge = false;
    
    const worldCoords = this.map.toWorldCoords(x, y);
    this.worldX = worldCoords.x;
    this.worldY = worldCoords.y;

    this.state = {
      layers: {
        terrain: undefined,
        object: undefined,
      },
      dirty: {
        terrain: false,
        object: false,
      },
      modifiers: {},
      
      
    };

    this.basestats = {
      mushroomSpawnRate: 0.01,
    };

    this.stats = {};
  };
  
  render = () => {
    if (this.state.dirty.terrain) {
      this._renderTerrain();
    }
    if (this.state.dirty.object) {
      this._renderObject();
    }
    this._setDirty();
  };
  
  _renderTerrain = () => {
    const terrainKey = this._getTerrainTile();
    this.map.placeTile('terrain', terrainKey, this.x, this.y);
  };
  
  _getTerrainTile = () => {
    if (this.state.layers.terrain === C.Map.Terrain.Forest) return randomInt(3, 5);

    const t = this.neighbors[3] && this.neighbors[3].getTerrain() === C.Map.Terrain.Forest;
    const l = this.neighbors[1] && this.neighbors[1].getTerrain() === C.Map.Terrain.Forest;
    const r = this.neighbors[6] && this.neighbors[6].getTerrain() === C.Map.Terrain.Forest;
    const b = this.neighbors[4] && this.neighbors[4].getTerrain() === C.Map.Terrain.Forest;

    if (t && l && r && b) return 33;
    if (t && l && r) return 15;
    if (t && l && b) return 30;
    if (t && r && b) return 32;
    if (l && r && b) return 27;
    if (t && l) return 12;
    if (t && r) return 14;
    if (t && b) return 31;
    if (l && r) return 21;
    if (l && b) return 24;
    if (r && b) return 26;
    if (t) return 13;
    if (l) return 18;
    if (r) return 20;
    if (b) return 25;


    return randomInt(0, 2);
  }
  
  
  _renderObject = () => {
    if (this.state.layers.object) {
      this.map.placeTile('object', 999, this.x, this.y);
    } else {
      this.map.placeTile('object', -1, this.x, this.y);
    }
  };

  _computeStats = () => {
    const { layers: { terrain }, modifiers } = this.state;
    const stats = Object.assign({}, this.basestats);
    
    if (terrain === 'river' || terrain === 'lake') {
      stats.mushroomSpawnRate = 0;
    } else if (terrain === 'forest') {
      stats.mushroomSpawnRate *= 3;
    }

    Object.entries(modifiers).forEach(([_, modifier]) => {
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
  };
  
  setNeighbors = (neighbors) => {
    this.neighbors = neighbors;
  };
  
  getNeighbor = (direction) => {
    switch(direction) {
      case C.Directions.N:
        return this.neighbors[3];
        break;
      case C.Directions.S:
        return this.neighbors[4];
        break;
      case C.Directions.E:
        return this.neighbors[6];
        break;
      case C.Directions.W:
        return this.neighbors[1];
        break;
      case C.Directions.NE:
        return this.neighbors[5];
        break;
      case C.Directions.NW:
        return this.neighbors[0];
        break;
      case C.Directions.SE:
        return this.neighbors[7];
        break;
      case C.Directions.SW:
        return this.neighbors[2];
        break;
      default:
        break;
    }
  };

  setTerrain = (terrain) => {
    if (this.state.layers.terrain !== terrain) {
      this._computeStats();
      this.state.layers.terrain = terrain;
      this._setDirty('terrain');
    }
  };
  
  getTerrain = () => {
    return this.state.layers.terrain;
  };
  
  addFoliage = () => {
    const r = Math.random();
    let key;

    if (this.isEdge) {
      if (r < 0.2) {
        key = C.Map.Foliage.Tree.Pine.L1S1_A;
      } else if (r < 0.4) {
        key = C.Map.Foliage.Tree.Pine.L1S1_B;
      } else if (r < 0.6) {
        key = C.Map.Foliage.Tree.Pine.M1S1_A;
      } else if (r < 0.8) {
        key = C.Map.Foliage.Tree.Pine.M1S2_A;
      } else {
        key = C.Map.Foliage.Tree.Pine.M1S2_B;
      }
    } else if (this.state.layers.terrain === 'forest') {
      if (r < 0.05) {
        key = C.Map.Foliage.Tree.Pine.L1S1_A;
      } else if (r < 0.10) {
        key = C.Map.Foliage.Tree.Pine.L1S1_B;
      } else if (r < 0.15) {
        key = C.Map.Foliage.Tree.Pine.M1S1_A;
      } else if (r < 0.20) {
        key = C.Map.Foliage.Tree.Pine.M1S2_A;
      } else if (r < 0.25) {
        key = C.Map.Foliage.Tree.Pine.M1S2_B;
      }
    } else {
      if (r < 0.01) {
        key = C.Map.Foliage.Tree.Pine.L1S1_A;
      } else if (r < 0.02) {
        key = C.Map.Foliage.Tree.Pine.L1S1_B;
      } else if (r < 0.03) {
        key = C.Map.Foliage.Tree.Pine.M1S1_A;
      } else if (r < 0.04) {
        key = C.Map.Foliage.Tree.Pine.M1S2_A;
      } else if (r < 0.05) {
        key = C.Map.Foliage.Tree.Pine.M1S2_B;
      }
    }
    
    if (key) {
      const propX = this.x * this.map.tilesize + this.map.tilesize / 2;
      const propY = this.y * this.map.tilesize;
      const prop = new Prop(this.map, propX, propY, key);
      prop.setVisible(false);

      this.state.layers.object = prop;
      this._setDirty('object');
    }
  };
  
  addCollectible = (time) => {
    if (this.state.layers.object) {
      return;
    }
    
    const timeElapsed = this.state.modified ? time - this.state.modified : (60 * 1000);
    const timeFactor = timeElapsed / (60 * 1000);
    const r = Math.random() / timeFactor;
    
    // Check if mushroom should spawn
    if (r < this.stats.mushroomSpawnRate) {
      const key = this._selectMushroom();
      
      if (key) {
        const mushroomX = this.x * this.map.tilesize + this.map.tilesize / 2;
        const mushroomY = this.y * this.map.tilesize + this.map.tilesize / 2;
        const mushroom = new Mushroom(this.map, mushroomX, mushroomY, key);
        mushroom.setVisible(false);
        
        this.state.layers.object = mushroom;
        this._setDirty('object');
      }
    }

    this.state.modified = time;
  };
  
  _selectMushroom = () => {
    const rarityBase = 3; // larger base means lower chance of rare spawns
    const mushroomEntries = Object.entries(M);
    
    // Compute relative odds for each mushroom type
    const relativeOdds = {};
    let relativeOddsTotal = 0;
    mushroomEntries.forEach(([key, data]) => {
      const odds = 1 / (rarityBase ** data.rarity);
      relativeOdds[key] = odds;
      relativeOddsTotal += odds;
    });
    
    // Compute normalized thresholds for each mushroom type
    const thresholds = [];
    mushroomEntries.reduce((previous, [key, _], i) => {
      const odds = relativeOdds[key];
      const normalizedOdds = odds / relativeOddsTotal;
      const next = previous + normalizedOdds;
      thresholds[i] = {
        key,
        threshold: next,
      };
      return next;
    }, 0);

    const r = Math.random();
    const { key } = thresholds.find(({ key, threshold }) => {
      return r <= threshold;
    });

    return key;
  }
  

  addModifier = (modifier) => {
    this.state.modifiers[modifier.id] = modifier;
    this._computeStats();
  };

  getMushroom = () => {
    const { object } = this.state.layers;
    return object && object.class == C.Classes.Mushroom ? object : null;
  };

  removeGameObject = (obj) => {
    this.state.layers.object = null;
    this._setDirty('object');
  };
  
  showGameObjects = (visible) => {
    if (this.state.layers.object) {
      this.state.layers.object.setVisible(visible);
    }
  };
  
  _setDirty = (layer) => {
    if (layer) {
      this.map.addDirtyMapTile(this);
      this.state.dirty[layer] = true;
    } else {
      this.map.removeDirtyMapTile(this);
      this.state.dirty = { terrain: false, object: false };
    }
  }

};
