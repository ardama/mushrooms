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

    // this.createPaths();
    this.createWaypoints();
    this.createAllies();
    this.createEnemies();
  }

  update = () => {
    this.graphics.clear();
    this.frameTime = Date.now();
    this.frameDuration = this.frameTime - this.lastFrameTime;

    // this.updatePaths();
    this.updateWaypoints();
    this.updateAllies();
    this.updateEnemies();

    this.lastFrameTime = this.frameTime;
  }

  createPaths = () => {
    this.paths = [];
    this.startPaths = [];

    // TOP LANE
    const toplane_1 = new Phaser.Curves.Path(900, 100);
    toplane_1.lineTo(500, 100);
    const toplane_path_1 = new Path(this, Path.Lane, toplane_1, Path.Start);
    this.paths.push(toplane_path_1);
    this.startPaths.push(toplane_path_1);
    const toplane_2 = new Phaser.Curves.Path(500, 100);
    toplane_2.lineTo(100, 100);
    const toplane_path_2 = new Path(this, Path.Lane, toplane_2);
    this.paths.push(toplane_path_2);
    const toplane_3 = new Phaser.Curves.Path(100, 100);
    toplane_3.lineTo(100, 900);
    const toplane_path_3 = new Path(this, Path.Lane, toplane_3, Path.End);
    this.paths.push(toplane_path_3);

    // MIDDLE LANE
    const midlane_1 = new Phaser.Curves.Path(900, 100);
    midlane_1.lineTo(500, 500);
    const midlane_path_1 = new Path(this, Path.Lane, midlane_1, Path.Start);
    this.paths.push(midlane_path_1);
    this.startPaths.push(midlane_path_1);
    const midlane_2 = new Phaser.Curves.Path(500, 500);
    midlane_2.lineTo(100, 900);
    const midlane_path_2 = new Path(this, Path.Lane, midlane_2, Path.End);
    this.paths.push(midlane_path_2);

    // BOTTOM LANE
    const botlane_1 = new Phaser.Curves.Path(900, 100);
    botlane_1.lineTo(900, 500);
    const botlane_path_1 = new Path(this, Path.Lane, botlane_1, Path.Start);
    this.paths.push(botlane_path_1);
    this.startPaths.push(botlane_path_1);
    const botlane_2 = new Phaser.Curves.Path(900, 500);
    botlane_2.lineTo(900, 900);
    const botlane_path_2 = new Path(this, Path.Lane, botlane_2);
    this.paths.push(botlane_path_2);
    const botlane_3 = new Phaser.Curves.Path(900, 900);
    botlane_3.lineTo(100, 900);
    const botlane_path_3 = new Path(this, Path.Lane, botlane_3, Path.End);
    this.paths.push(botlane_path_3);

    // TOP JUNGLE
    const topjungle_1 = new Phaser.Curves.Path(500, 100);
    topjungle_1.lineTo(500, 500);
    const topjungle_path_1 = new Path(this, Path.Jungle, topjungle_1);
    this.paths.push(topjungle_path_1);

    // BOTTOM JUNGLE
    const botjungle_1 = new Phaser.Curves.Path(900, 500);
    botjungle_1.lineTo(500, 500);
    const botjungle_path_1 = new Path(this, Path.Jungle, botjungle_1);
    this.paths.push(botjungle_path_1);

    // TOP RIVER
    const topriver_1 = new Phaser.Curves.Path(100, 100);
    topriver_1.lineTo(500, 500);
    const topriver_path_1 = new Path(this, Path.Jungle, topriver_1);
    this.paths.push(topriver_path_1);
    const topriver_2 = new Phaser.Curves.Path(500, 500);
    topriver_2.lineTo(100, 100);
    const topriver_path_2 = new Path(this, Path.Jungle, topriver_2);
    this.paths.push(topriver_path_2);

    // BOTTOM RIVER
    const botriver_1 = new Phaser.Curves.Path(900, 900);
    botriver_1.lineTo(500, 500);
    const botriver_path_1 = new Path(this, Path.Jungle, botriver_1);
    this.paths.push(botriver_path_1);
    const botriver_2 = new Phaser.Curves.Path(500, 500);
    botriver_2.lineTo(900, 900);
    const botriver_path_2 = new Path(this, Path.Jungle, botriver_2);
    this.paths.push(botriver_path_2);

    toplane_path_1.nextPaths = [toplane_path_2, topjungle_path_1];
    toplane_path_2.nextPaths = [toplane_path_3, topriver_path_1];

    midlane_path_1.nextPaths = [midlane_path_2, topriver_path_2, botriver_path_2];

    botlane_path_1.nextPaths = [botlane_path_2, botjungle_path_1];
    botlane_path_2.nextPaths = [botlane_path_3, botriver_path_1];

    topjungle_path_1.nextPaths = [midlane_path_2];

    botjungle_path_1.nextPaths = [midlane_path_2];

    topriver_path_1.nextPaths = [midlane_path_2];
    topriver_path_2.nextPaths = [toplane_path_3];

    botriver_path_1.nextPaths = [midlane_path_2];
    botriver_path_2.nextPaths = [botlane_path_3];
  }

  createWaypoints = () => {
    const lane_start = new Waypoint(this, new Phaser.Geom.Point(900, 100));

    const toplane_1 = new Waypoint(this, new Phaser.Geom.Point(500, 100));
    const toplane_2 = new Waypoint(this, new Phaser.Geom.Point(100, 100));

    const midlane_1 = new Waypoint(this, new Phaser.Geom.Point(500, 500));

    const botlane_1 = new Waypoint(this, new Phaser.Geom.Point(900, 500));
    const botlane_2 = new Waypoint(this, new Phaser.Geom.Point(900, 900));

    const lane_end = new Waypoint(this, new Phaser.Geom.Point(100, 900), true);

    this.waypoints = [lane_start, toplane_1, toplane_2, midlane_1, botlane_1, botlane_2, lane_end];
    this.startWaypoints = [lane_start];

    lane_start.nextWaypoints = [toplane_1, midlane_1, botlane_1];
    toplane_1.nextWaypoints = [toplane_2, midlane_1];
    toplane_2.nextWaypoints = [lane_end, midlane_1];
    midlane_1.nextWaypoints = [lane_end, toplane_2, botlane_2]
    botlane_1.nextWaypoints = [botlane_2, midlane_1];
    botlane_2.nextWaypoints = [lane_end, midlane_1];
  }

  createAllies = () => {
  }

  createEnemies = () => {
    this.waves = [];
    this.nextWaveTime = C.Game.WaveTime;
  }

  updatePaths = () => {
    for (const path of this.paths) {
      path.update();
    }
  }

  updateWaypoints = () => {
    for (const waypoint of this.waypoints) {
      waypoint.update();
    }
  }

  updateAllies = () => {
  }

  updateEnemies = () => {
    this.nextWaveTime -= this.frameDuration;

    if (this.nextWaveTime <= 0) {
      this.createWave();
      this.nextWaveTime = C.Game.WaveTime;
    }

    for (const wave of this.waves) {
      wave.update();
    }
  }

  createWave = () => {
    const wave = new Wave(this);
    this.waves.push(wave);
  }
}
