

export default class Map {
  constructor(scene) {
    this.scene = scene;

    this.rows = 256;
    this.columns = 256;


    this.generateMapData();
    this.buildGroundLayer();
    this.buildObjectLayer();

    this.width = this.columns * 32;
    this.height = this.rows * 32;
  }

  update(time, delta) {



  }

  generateMapData() {
    this.initializeMapTiles();

    this.assignMapFeatures();



  };

  initializeMapTiles() {
    const seal = !!Object.seal;
    const rows = [...Array(this.rows)].map(() => {
      const row = [...Array(this.columns)].map(() => {
        return new MapTile(this);
      });

      return seal ? Object.seal(row) : row;
    });

    this.tiles = seal ? Object.seal(rows) : rows;
  };

  assignMapFeatures() {
    this.assignEdges(2);
    this.assignTown();
    this.assignForests();
    this.assignLakes();
    this.assignRivers();


  };

  assignEdges(width) {
    this.forEachTile((tile, x, y) => {
      if (
        x < width || this.rows - x <= width ||
        y < width || this.columns - y <= width
      ) {
        tile.edge = true;
        tile.groundLayerTileIndex = 3;
      }
    });
  };

  assignTown() {
    this.assignRoads();
    this.assignBuildings();
  };
  assignRoads() {};
  assignBuildings() {};

  assignForests() {

  };

  assignLakes() {

  };

  assignRivers() {

  };







  buildGroundLayer() {
    const map = this.scene.make.tilemap({
      tileWidth: 32,
      tileHeight: 32,
      width: this.columns,
      height: this.rows,
    });
    const tileset = map.addTilesetImage("terrain", "terrain", 32, 32, 0, 0);

    this.groundLayer = map.createBlankDynamicLayer("ground", tileset);

    this.forEachTile((tile, x, y) => {
      this.groundLayer.putTileAt(tile.groundLayerTileIndex, x, y);
    })

    // this.groundLayer.fill(3);
    // this.groundLayer.weightedRandomize(2, 2, 240, 240, [
    //   { index: 0, weight: 2 },
    //   { index: 1, weight: 2 },
    //   { index: 2, weight: 2 },
    //   { index: 3, weight: 2 },
    //   { index: 4, weight: 2 },
    // ]);
    // map.convertLayerToStatic(this.groundLayer);
  }

  buildObjectLayer() {

  }


  forEachTile(callback) {
    this.tiles.forEach((row, r) => {
      row.forEach((tile, c) => {
        callback(tile, r, c);
      });
    });
  }
};

class MapTile {
  constructor(map) {
    this.map = map;
    this.scene = map.scene;

    this.groundLayerTileIndex = -1;
    this.objectLayerTileIndex = -1;
  }
}

// class MapChunk {
//   constructor(map) {
//     this.map = map;
//     this.scene = map.scene;
//
//     this.tileMap = this.scene
//   }
//
//   update(time, delta) {
//
//   }
// }
