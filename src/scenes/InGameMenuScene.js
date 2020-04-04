import C from '../utils/constants.js';

class InGameMenuScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'InGameMenuScene',
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
    this.scene.resume('GameScene');
    this.scene.stop();
  };

  restartGame = () => {
    this.scene.stop('GameScene');
    this.scene.launch('GameScene');
    this.scene.stop();
  };
}

export default InGameMenuScene;
