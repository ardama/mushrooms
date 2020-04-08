// import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';
import C from '../utils/constants.js';
import D from '../data/GameData.js';
import Character from '../classes/Character.js';
import Map from '../classes/Map.js';
// import makeAnimations from '../utils/animations';


export default class GameScene extends Phaser.Scene {
  constructor(test) {
    super({ key: 'GameScene' });
  }

  preload() {
    // this.load.atlas('mario-sprites', 'assets/mario-sprites.png', 'assets/mario-sprites.json');
    // this.load.spritesheet('tiles', 'assets/images/super-mario.png', {
    //   frameWidth: 16,
    //   frameHeight: 16,
    //   spacing: 2,
    // });

    // this.load.on('complete', () => {
    //   makeAnimations(this);
    // });

    this.load.image("terrain", "assets/images/terrain.png");

    this.physics.world.enable(this);
  }

  create(time, delta) {
    this.graphics = this.add.graphics({
      lineStyle: {
        width: 5,
        color: 0xdddddd,
      },
      fillStyle: {
        color: 0x888888,
      },
    });

    this.createGroups();
  
    this.createCharacter();
    this.createMap();
    this.createStructures();
    this.createEnemies();

    this.initializeInputs();
    
    this.cameras.main.startFollow(this.character);
  }

  update(time, delta) {
    this.graphics.clear();

    this.updateCharacter(time, delta);
    this.updateMap(time, delta);
    this.updateStructures(time, delta);
    this.updateEnemies(time, delta);
  }

  createGroups = () => {
    // Structure Groups
    this.structures = this.add.group()

    // Enemy Groups
    this.enemies = this.add.group();
    this.enemyHitboxes = this.add.group()
    this.enemyRanges = this.add.group();

    // Other Groups

  };
  
  createCharacter = () => {
    this.character = new Character(this, this.cameras.main.centerX, this.cameras.main.centerY);
  };
  
  createMap = () => {
    this.map = new Map(this, this.cameras.main.displayWidth, this.cameras.main.displayHeight);
  };

  createStructures = () => {
  };

  createEnemies = () => {
  };

  initializeInputs = () => {
    const keylist = [
      C.Keycodes.ESC,
      C.Keycodes.UP,
      C.Keycodes.DOWN,
      C.Keycodes.LEFT,
      C.Keycodes.RIGHT,
    ];

    this.keys = {};
    keylist.forEach((keycode) => {
      this.keys[keycode] = this.input.keyboard.addKey(keycode);
    })

    this.keys[C.Keycodes.ESC].on('down', () => {
      this.scene.launch('InGameMenuScene');
      this.scene.pause();
    })
    
    
    this.keys[C.Keycodes.UP].on('down', () => {
      this.character.setMoving('up', true);
    });
    this.keys[C.Keycodes.UP].on('up', () => {
      this.character.setMoving('up', false);
    });
    this.keys[C.Keycodes.DOWN].on('down', () => {
      this.character.setMoving('down', true);
    });
    this.keys[C.Keycodes.DOWN].on('up', () => {
      this.character.setMoving('down', false);
    });
    this.keys[C.Keycodes.LEFT].on('down', () => {
      this.character.setMoving('left', true);
    });
    this.keys[C.Keycodes.LEFT].on('up', () => {
      this.character.setMoving('left', false);
    });
    this.keys[C.Keycodes.RIGHT].on('down', () => {
      this.character.setMoving('right', true);
    });
    this.keys[C.Keycodes.RIGHT].on('up', () => {
      this.character.setMoving('right', false);
    });

  };
  
  updateCharacter = (time, delta) => {
    this.character.update(time, delta);
  };
  
  updateMap = (time, delta) => {
    this.map.update(time, delta);
  };

  updateStructures = (time, delta) => {
    for (const structure of this.structures.getChildren()) {
      structure.update(time, delta);
    }
  };

  updateEnemies = (time, delta) => {
    for (const enemy of this.enemies.getChildren()) {
      enemy.update(time, delta);
    }
  };
}
