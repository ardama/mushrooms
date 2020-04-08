import C from '../utils/constants.js';
import D from '../data/GameData.js';
import Unit from './Unit.js';

const typeData = {
  type: 'character',
  targetTypes: ['enemy'],
  healthbarColor: 0x0044bb,
};

export default class Champion extends Unit {
  constructor(scene, x, y) {
    const unitData = { appearance: { key: 'tiles' } };
    super(scene, x, y, unitData, typeData);
  }
  
  setInitialState() {
    super.setInitialState();
    
    this.state.moving = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }
  
  update(time, delta) {
    // Don't update if destroyed
    if (this.state.destroyed) return;

    // Render object if unrendered
    if (!this.state.rendered) {
      this.renderToScene();
    }
    
    let directionX = (this.state.moving.left ? -1 : 0) + (this.state.moving.right ? 1 : 0);
    let directionY = (this.state.moving.up ? -1 : 0) + (this.state.moving.down ? 1 : 0);
    
    let velocityX = directionX * 175;
    let velocityY = directionY * 175;
    if (directionX !== 0 && directionY !== 0) {
      velocityX /= C.Misc.Root2;
      velocityY /= C.Misc.Root2;
    }
    
    this.x += velocityX * delta/1000;
    this.y += velocityY * delta/1000;

    // // Update attack timer
    // this.state.cooldowns.attack -= delta;
    // 
    // // Attempt to fire basic attack if available
    // if (this.state.cooldowns.attack <= 0) {
    //   const target = this.getBasicAttackTarget();
    //   if (target) {
    //     this.basicAttack(target);
    //   }
    // }
    // Update healthbar
    this.updateHealthbar();
  }
  
  setMoving(direction, value) {
    this.state.moving[direction] = value;
  }
}
