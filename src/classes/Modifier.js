export default class Modifier {
  constructor(scene, type, source, data) {
    this.id = scene.counter.next();
    this.type = type;
    this.source = source;
    this.source.addOwnedModifier(this);
    this.data = data;
    this.active = true;
  }
}
