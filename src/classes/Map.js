

export default class Map {
  constructor(scene, width, height) {
    this.scene = scene;
    
    this.chunks = []
    
    const map = this.scene.make.tilemap({
      tileWidth: 32,
      tileHeight: 32,
      width: 200,
      height: 200,
    });
    const tileset = map.addTilesetImage("terrain", "terrain", 32, 32, 0, 0);
    
    this.groundLayer = map.createBlankDynamicLayer("ground", tileset);

    this.groundLayer.weightedRandomize(0, 0, 1000, 1000, [
      { index: 0, weight: 2 },
      { index: 1, weight: 2 },
      { index: 2, weight: 2 },
      { index: 3, weight: 2 },
      { index: 4, weight: 2 },
    ]);
  }
  
  update(time, delta) {
    
    
    
    this.chunks.forEach((c) => { c.update(time, delta); });
  }
};

class MapChunk {
  constructor(map) {
    this.map = map;
    this.scene = map.scene;
    
    this.tileMap = this.scene
  }
  
  update(time, delta) {
    
  }
}
