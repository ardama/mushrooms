import C from '../utils/constants.js';
import M from '../data/MushroomData.js';

export default class Mushroom extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    const data = M[key];
    const { image } = data;
    super(scene, x, y, 'foliage_atlas', image);

    this.id = scene.counter.next();
    this.class = C.Classes.Mushroom;
    this.name = `Mushroom of ${key}`;
    this.data = data;
    this.state = {
      rendered: false,
      destroyed: false,

      discovered: false,
    };

    this.ownedModifiers = {};

    this.scene.collectiblesGroup.add(this);
  }

  setInitialState() {};

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
};
