import 'phaser';
import GameScene from './scenes/GameScene';
import InGameMenuScene from './scenes/InGameMenuScene';

const config = {
  // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
  type: Phaser.AUTO,
  pixelArt: true,
  roundPixels: true,
  parent: 'content',
  scale: {
    mode: Phaser.Scale.RESIZE
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  scene: [
    GameScene,
    InGameMenuScene,
  ],
};

console.log('MAIN');
const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
