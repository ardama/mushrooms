import C from '../utils/constants.js';

export default class Prop extends Phaser.GameObjects.Image {
  constructor(scene, x, y, key) {
    super(scene, x, y, 'foliage_atlas', key);

    this.id = scene.counter.next();
    this.class = C.Classes.Prop;

    this.scene.add.existing(this);
    this.scene.propsGroup.add(this);

    this.depth = this.y + (this.height / 2);
  }
}
