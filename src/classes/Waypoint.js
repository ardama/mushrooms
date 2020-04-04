export default class Waypoint extends Phaser.Geom.Point {
  constructor(scene, x, y, end) {
    super(x, y);

    this.scene = scene;
    this.end = !!end;
    this.waypoints = [];
  }

  update = () => {
    this.scene.graphics.fillPointShape(this);
  }
}
