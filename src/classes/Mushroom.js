import { bounded } from '../utils/helpers.js';
import C from '../utils/constants.js';
import M from '../data/MushroomData.js';
import Modifier from './Modifier.js';

export default class Mushroom extends Phaser.GameObjects.Sprite {
  constructor(map, x, y, key) {
    const data = M[key];
    const { image } = data;
    super(map.scene, x, y, 'foliage-atlas', image);

    this.map = map;
    this.id = this.scene.counter.next();
    this.class = C.Classes.Mushroom;
    this.name = `Mushroom of ${key}`;
    this.data = data;
    this.state = {
      rendered: false,
      destroyed: false,

      discovered: true,
    };

    this.ownedModifiers = {};

    this.scene.collectiblesGroup.add(this);
    
    this._createNearbySpawnModifier();
  }

  update(time, delta) {
    const { rendered, destroyed } = this.state;

    if (!rendered) {
      this.renderToScene();
    }

    this.depth = this.y + (this.height / 2);
  }

  renderToScene() {
    this.scene.add.existing(this);
    this.setVisible(this.state.discovered);
    this.state.rendered = true;
  }

  addOwnedModifier(modifier) {
    this.ownedModifiers[modifier.id] = modifier;
  }

  setVisible(v) {
    const visible = v && this.state.discovered;
    return super.setVisible(visible);
  }

  setDiscovered(d) {
    this.state.discovered = d;
    return d;
  }
  
  _createNearbySpawnModifier = () => {
    const { x: cx, y: cy } = this.getCenter();
    const nearbyTiles = this.map.layers.object.getTilesWithinShape(new Phaser.Geom.Circle(cx, cy, 400));

    const modifier = new Modifier(
      this.scene,
      C.Modifiers.Type.MapTile.NearbySpawn,
      this,
      {
        multiplier: (targetX, targetY) => {
          const d = Phaser.Math.Distance.Between(targetX, targetY, this.x, this.y);
          const f = (d / 400) ** 2;
          return bounded(0.04 + (0.96 * f), 0, 1);
        }
      },
    );
    nearbyTiles.forEach(({ x, y }) => {
      const mapTile = this.map.getMapTile(x, y);
      mapTile.addModifier(modifier);
    });
  }
};
