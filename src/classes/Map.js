

export default class Map {
  constructor(scene, width, height) {
    this.scene = scene;

    this.generate();
  }

  update(time, delta) {



  }

  generate() {
    const map = this.scene.make.tilemap({
      tileWidth: 32,
      tileHeight: 32,
      width: 242,
      height: 242,
    });
    const tileset = map.addTilesetImage("terrain", "terrain", 32, 32, 0, 0);

    this.groundLayer = map.createBlankDynamicLayer("ground", tileset);

    this.groundLayer.fill(3);
    this.groundLayer.weightedRandomize(2, 2, 240, 240, [
      { index: 0, weight: 2 },
      { index: 1, weight: 2 },
      { index: 2, weight: 2 },
      { index: 3, weight: 2 },
      { index: 4, weight: 2 },
    ]);
    // map.convertLayerToStatic(this.groundLayer);
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
