import C from '../utils/constants.js';
import D from '../data/GameData.js';
import Unit from './Unit.js';

const typeData = {
  type: 'champion',
  targetTypes: ['enemy'],
  healthbarColor: 0x0044bb,
};

export default class Champion extends Unit {
  constructor(scene, name, x, y) {
    const unitData = D.Champion[name];
    super(scene, x, y, unitData, typeData);
  }
  
  update(time, delta) {
    // Don't update if destroyed
    if (this.state.destroyed) return;

    // Render object if unrendered
    if (!this.state.rendered) {
      this.renderToScene();
    }

    // Update attack timer
    this.state.cooldowns.attack -= delta;

    // Attempt to fire basic attack if available
    if (this.state.cooldowns.attack <= 0) {
      const target = this.getBasicAttackTarget();
      if (target) {
        this.basicAttack(target);
      }
    }
    // Update healthbar
    this.updateHealthbar();
  }
}
