export class Path {
  static Jungle = 'jungle';
  static Lane = 'lane';
  static River = 'river';

  static Start = 'start';
  static End = 'end';

  constructor(game, location, path, type) {
    this.scene = game;
    this.nextPaths = [];
    this.location = location;
    this.type = type;
    this.path = path;
  }

  update = () => {
    this.scene.graphics.lineStyle(1, 0xffffff, 1);
    this.path.draw(this.scene.graphics);
  }

}
