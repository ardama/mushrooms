import Enemy from './Enemy.js';
import C from '../utils/constants.js';
import D from '../data/GameData.js';

export default class Wave {
  constructor(scene, origin, type) {
    this.scene = scene;
    this.type = type;
    this.data = D.Wave[type];


    this.waypoints = [];
    this.createWaypoints(origin);

    this.enemies = [];
    this.createEnemies();
  }

  createEnemies = () => {
    const { data: { enemies, delay } } = this;
    for (let i = 0; i < enemies.length; i++) {
      const enemy = new Enemy(
        this.scene,
        enemies[i],
        this.waypoints,
        i * delay,
      );

      this.enemies.push(enemy);
      this.scene.enemies.add(enemy);
    }
  }

  createWaypoints = (origin) => {
    const route = this.scene.routes[origin]
    if (route) this.waypoints = route;
  }
};
