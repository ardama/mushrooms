import D from '../data/GameData.js';
import Projectile from './Projectile.js';
import Unit from './Unit.js';

const typeData = {
  type: 'structure',
  targetTypes: ['enemy'],
  healthbarColor: 0x00bb44,
};

export default class Structure extends Unit {
  constructor(scene, name, x, y) {
    const unitData = D.Structure[name];
    super(scene, x, y, unitData, typeData);
  }

  update(time, delta) {
    // Don't update if destroyed
    if (this.state.destroyed) return;

    // Render object if unrendered
    if (!this.state.rendered) {
      this.renderToScene();
    }

    if (this.attackRange) {
      // Update attack timer
      this.state.cooldowns.attack -= delta;
      
      // Attempt to fire basic attack if available
      if (this.state.cooldowns.attack <= 0) {
        const target = this.getBasicAttackTarget();
        if (target) {
          this.basicAttack(target);
        }
      }
    }

    this.updateHealthbar();
  }
};
