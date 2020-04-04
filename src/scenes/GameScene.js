import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';
import Waypoint from '../classes/Waypoint.js';
import Wave from '../classes/Wave.js';
import Champion from '../classes/Champion.js';
import Structure from '../classes/Structure.js';
import C from '../utils/constants.js';
import D from '../data/GameData.js';
import makeAnimations from '../utils/animations';


export default class GameScene extends Phaser.Scene {
  constructor(test) {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.atlas('mario-sprites', 'assets/mario-sprites.png', 'assets/mario-sprites.json');
    this.load.spritesheet('tiles', 'assets/images/super-mario.png', {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 2,
    });

    this.load.on('complete', () => {
      makeAnimations(this);
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
    this.createStructures();
    this.createWaypoints();
    this.createEnemies();

    this.initializeInputs();
  }

  update(time, delta) {
    this.graphics.clear();

    this.updateStructures(time, delta);
    this.updateChampions(time, delta);
    this.updateWaypoints(time, delta);
    this.updateEnemies(time, delta);
    this.updateProjectiles(time, delta);
  }

  createGroups = () => {
    // Structure Groups
    this.structures = this.add.group()
    this.structureHitboxes = this.add.group()
    this.structureRanges = this.add.group();

    // Enemy Groups
    this.enemies = this.add.group();
    this.enemyHitboxes = this.add.group()
    this.enemyRanges = this.add.group();

    // Champion Groups
    this.champions = this.add.group();
    this.championHitboxes = this.add.group();
    this.championRanges = this.add.group();

    // Other Groups
    this.projectiles = this.add.group();

    // Non-GameObject Groups
    this.towers = { top: [], mid: [], bot: [] }
    this.inhibitors = {};
    this.waypoints = [];
    this.spawnpoints = [];
    this.waves = [];
  };

  createStructures = () => {
    // Top lane Towers
    const topOuter = new Structure(this, C.Structure.Tower, 80, 240);
    const topInner = new Structure(this, C.Structure.Tower, 120, 500);
    const topInhib = new Structure(this, C.Structure.Tower, 100, 720);
    const topNexus = new Structure(this, C.Structure.Tower, 120, 840);
    this.structures.add(topOuter);
    this.structures.add(topInner);
    this.structures.add(topInhib);
    this.structures.add(topNexus);
    this.towers.top.push(topOuter, topInner, topInhib, topNexus);

    // Mid lane Towers
    const midOuter = new Structure(this, C.Structure.Tower, 420, 540);
    const midInner = new Structure(this, C.Structure.Tower, 360, 680);
    const midInhib = new Structure(this, C.Structure.Tower, 240, 760);
    this.structures.add(midOuter);
    this.structures.add(midInner);
    this.structures.add(midInhib);
    this.towers.mid.push(midOuter, midInner, midInhib);

    // Bot lane Towers
    const botOuter = new Structure(this, C.Structure.Tower, 760, 920);
    const botInner = new Structure(this, C.Structure.Tower, 500, 880);
    const botInhib = new Structure(this, C.Structure.Tower, 280, 900);
    const botNexus = new Structure(this, C.Structure.Tower, 160, 880);
    this.structures.add(botOuter);
    this.structures.add(botInner);
    this.structures.add(botInhib);
    this.structures.add(botNexus);
    this.towers.bot.push(botOuter, botInner, botInhib, botNexus);

    // Inhibitors
    const topInhibitor = new Structure(this, C.Structure.Inhibitor, 100, 760);
    const midInhibitor = new Structure(this, C.Structure.Inhibitor, 210, 790);
    const botInhibitor = new Structure(this, C.Structure.Inhibitor, 240, 900);
    this.structures.add(topInhibitor);
    this.structures.add(midInhibitor);
    this.structures.add(botInhibitor);
    this.inhibitors = { top: topInhibitor, mid: midInhibitor, bot: botInhibitor };

    // Nexus
    const nexus = new Structure(this, C.Structure.Nexus, 110, 890);
    this.structures.add(nexus);
    this.nexus = nexus;
  };


  createWaypoints = () => {
    // Create Waypoints
    const toplane_0 = new Waypoint(this, 850, 100);
    const toplane_1 = new Waypoint(this, 500, 100);
    const toplane_2 = new Waypoint(this, 100, 100);

    const midlane_0 = new Waypoint(this, 875, 125);
    const midlane_1 = new Waypoint(this, 500, 500);

    const botlane_0 = new Waypoint(this, 900, 150);
    const botlane_1 = new Waypoint(this, 900, 500);
    const botlane_2 = new Waypoint(this, 900, 900);

    const nexus = new Waypoint(this, 100, 900, true);

    // Add Routes
    this.routes = {
      [C.Lane.Top]: [toplane_0, toplane_1, toplane_2, nexus],
      [C.Lane.Mid]: [midlane_0, midlane_1, nexus],
      [C.Lane.Bot]: [botlane_0, botlane_1, botlane_2, nexus],
    }

    // Add to scene data
    this.waypoints.push(
      toplane_0, toplane_1, toplane_2,
      midlane_0, midlane_1,
      botlane_0, botlane_1, botlane_2,
      nexus,
    );
    this.spawnpoints.push(toplane_0, midlane_0, botlane_0);
  };

  createEnemies = () => {
    this.nextWaveTime = C.Game.FirstWaveTime;
  };

  initializeInputs = () => {
    const keylist = [
      C.Keycodes.ESC
    ];

    this.keys = {};
    keylist.forEach((keycode) => {
      this.keys[keycode] = this.input.keyboard.addKey(keycode);
    })

    this.keys[C.Keycodes.ESC].on('down', () => {
      this.scene.launch('InGameMenuScene');
      this.scene.pause();
    })

    this.input.on('pointerdown', (pointer) => {
      const champion = new Champion(this, C.Champion.Vayne, pointer.x, pointer.y);
      this.champions.add(champion)
    })
  };

  updateStructures = (time, delta) => {
    for (const structure of this.structures.getChildren()) {
      structure.update(time, delta);
    }
  };

  updateChampions = (time, delta) => {
    for (const champion of this.champions.getChildren()) {
      champion.update(time, delta);
    }
  };

  updateWaypoints = (time, delta) => {
    for (const waypoint of this.waypoints) {
      waypoint.update(time, delta);
    }
  };

  updateEnemies = (time, delta) => {
    this.nextWaveTime -= delta;

    if (this.nextWaveTime <= 0) {
      this.createNextWave();
      this.nextWaveTime = C.Game.WaveTime;
    }

    for (const enemy of this.enemies.getChildren()) {
      enemy.update(time, delta);
    }
  };

  updateProjectiles = (time, delta) => {
    for (const projectile of this.projectiles.getChildren()) {
      projectile.update(time, delta);
    }
  };

  createNextWave = () => {
    const waveTop = new Wave(this, C.Lane.Top, C.Wave.MinionBasic);
    const waveMid = new Wave(this, C.Lane.Mid, C.Wave.MinionBasic);
    const waveBot = new Wave(this, C.Lane.Bot, C.Wave.MinionBasic);
    this.waves.push(waveTop, waveMid, waveBot);
  };
}
