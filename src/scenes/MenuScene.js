import C from '../utils/constants.js';

export default class MenuScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'MenuScene',
    });
  }
  
  preload() {}
  
  create() {
    this.scene.bringToTop();

    this.initializeInputs();
  }

  update(time, delta) {}

  initializeInputs = () => {
    const keylist = [
      C.Keycodes.ESC,
      C.Keycodes.R,
    ];
    
    this.keys = {};
    keylist.forEach((keycode) => {
      this.keys[keycode] = this.input.keyboard.addKey(keycode);
    })
    
    this.keys[C.Keycodes.ESC].on('down', this.resumeGame);
    this.keys[C.Keycodes.R].on('down', this.restartGame);
  };

  resumeGame = () => {
    console.log('game unpaused')
    this.scene.resume('GameScene');
    this.scene.stop();
  };

  restartGame = () => {
    console.log('game restarted')
    this.scene.stop('GameScene');
    this.scene.launch('GameScene');
    this.scene.stop();
  };
}
