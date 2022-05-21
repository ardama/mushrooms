import C from '../utils/constants.js';

export default class Prop extends Phaser.GameObjects.Image {
  constructor(map, x, y, key) {
    super(map.scene, x, y, 'foliage-atlas', key);

    this.map = map;
    this.id = this.scene.counter.next();
    this.class = C.Classes.Prop;

    this.scene.add.existing(this);
    this.scene.propsGroup.add(this);

    this.depth = this.y + (this.height / 2);
  }
}
