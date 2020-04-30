// import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';
import A from '../data/Animations.js';
import C from '../utils/constants.js';
import D from '../data/GameData.js';
import Character from '../classes/Character.js';
import Map from '../classes/Map.js';
import { Counter } from '../utils/helpers.js';

export default class GameScene extends Phaser.Scene {
  constructor(test) {
    super({ key: 'GameScene' });

    this.counter = new Counter(1);
  }

  preload() {
    // this.load.spritesheet('tiles', 'assets/images/super-mario.png', {
    //   frameWidth: 16,
    //   frameHeight: 16,
    //   spacing: 2,
    // });


    this.load.image("terrain", "assets/images/terrain.png");
    this.load.image("terrain-extended", "assets/images/terrain-extended.png");
    this.load.atlas("foliage_atlas", "assets/images/foliage4.png", "assets/json/foliage4.json");
    this.load.image("foliage", "assets/images/foliage3.png");
    this.load.spritesheet("teemo-base", "assets/images/animations/teemo-base.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.on('complete', () => {
      A.createAnimations(this);
    });

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
    this.createMap(time);
    this.createStructures();
    this.createEnemies();

    this.initializeInputs();

    this.physics.world.setBounds(0, 0, 200 * 32, 200 * 32);
    this.cameras.main.setBounds(0, 0, 200 * 32, 200 * 32);
    this.cameras.main.startFollow(this.character);
    //
    // this.visibleBounds = new Phaser.GameObjects.Rectangle(this, 0, 0, 0, 0);
    // this.add.existing(this.visibleBounds);
    // this.physics.add.existing(this.visibleBounds
  }

  update(time, delta) {
    this.graphics.clear();

    this.updateCharacter(time, delta);
    this.updateMap(time, delta);
    this.updateStructures(time, delta);
    this.updateEnemies(time, delta);
    this.updateCollectibles(time, delta);
  }

  createGroups = () => {
    // Structure Groups
    this.structures = this.add.group()

    // Enemy Groups
    this.enemies = this.add.group();
    this.enemyHitboxes = this.add.group()
    this.enemyRanges = this.add.group();

    // Other Groups
    this.propsGroup = this.add.group();
    this.collectiblesGroup = this.add.group();
  };

  createCharacter = () => {
    this.character = new Character(this, this.cameras.main.centerX, this.cameras.main.centerY);
  };

  createMap = (time) => {
    this.map = new Map(this, this.cameras.main.displayWidth, this.cameras.main.displayHeight, time);
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
      C.Keycodes.S,
      C.Keycodes.ONE,
      C.Keycodes.TWO,
      C.Keycodes.THREE,
      C.Keycodes.FOUR,
      C.Keycodes.SEVEN,
      C.Keycodes.EIGHT,
      C.Keycodes.NINE,
      C.Keycodes.ZERO,
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
    this.keys[C.Keycodes.S].on('down', () => {
      this.character.halt();
    });
    this.keys[C.Keycodes.ONE].on('down', () => {
      this.character.setDigging(true);
    });
    this.keys[C.Keycodes.ONE].on('up', () => {
      this.character.setDigging(false);
    });
    this.keys[C.Keycodes.SEVEN].on('down', () => {
      this.character.setDigging(true);
    });
    this.keys[C.Keycodes.SEVEN].on('up', () => {
      this.character.setDigging(false);
    });


    this.input.mouse.disableContextMenu();
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

  updateCollectibles = (time, delta) => {
    this.collectiblesGroup.getChildren().forEach((collectible) => {
      collectible.update(time, delta);
    });
  }
}
