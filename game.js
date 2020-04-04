import C from './constants.js';
import { Path, Wave, Waypoint } from './classes.js';

export const init = () => {
  const game = new Game();
}

class Game {
  constructor() {
    const self = this;

    const config = {
        type: Phaser.AUTO,
        parent: 'game',
        width: 1000,
        height: 1000,
        physics: {
          default: 'matter',
          matter: { debug: true }
        },
        scene: {
            key: 'main',
            preload: function() { self.preload(this); },
            create: function() { self.create(this); },
            update: function() { self.update(this); },
        }
    };

    this.game = new Phaser.Game(config);
  }

  preload = (phaser) => {
    this.phaser = phaser;
    this.matter = phaser.matter;
    this.graphics = phaser.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff00ff } });
  }

  create = () => {
    this.phaser.matter.world.setBounds().disableGravity();

    this.startTime = Date.now();
    this.lastFrameTime = this.startTime;

    this.createAllies();
    this.createEnemies();
  }

  update = () => {
    this.graphics.clear();
    this.frameTime = Date.now();
    this.frameDuration = this.frameTime - this.lastFrameTime;

    this.updateAllies();
    this.updateEnemies();

    this.lastFrameTime = this.frameTime;
  }
  

  createAllies = () => {
  }

  createEnemies = () => {
  }

  updateAllies = () => {
  }

  updateEnemies = () => {
  }
}
