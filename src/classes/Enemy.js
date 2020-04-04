import C from '../utils/constants.js';
import D from '../data/GameData.js';
import Unit from './Unit.js';
import { fuzzyLocation, randomInt } from '../utils/helpers.js';

const typeData = {
  type: 'enemy',
  targetTypes: ['structure'],
  healthbarColor: 0xee4444,
};

export default class Enemy extends Unit {
  constructor(scene, name, waypoints, delay) {
    const unitData = D.Enemy[name];
    const spawn = fuzzyLocation(waypoints[0], 10);
    super(scene, spawn.x, spawn.y, unitData, typeData);

    this.state.renderdelay = delay;
    
    this.waypoints = waypoints;
    this.waypointIndex = 1;
    this.destination = fuzzyLocation(this.waypoints[this.waypointIndex], 10);
    this.destinationType = C.Destination.Waypoint;
    this.destinationChanged = false;
  }

  update(time, delta) {
    // Don't update if destroyed
    if (this.state.destroyed) return;
  
    // Don't update if pending spawn
    if (this.state.renderdelay > 0) {
      this.state.renderdelay -= delta;
      return;
    }

    // Render object if unrendered
    if (!this.state.rendered) {
      this.renderToScene();
    }
    
    // Check for target in range
    const target = this.getBasicAttackTarget();

    // Stop moving to attack
    if (target) {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    } else {
      // Check if we've reached current destination
      if (Math.abs(this.destination.x - this.x) < 5 && Math.abs(this.destination.y - this.y) < 5) {
        // If we reached a waypoint, target the next one
        if (this.destinationType === C.Destination.Waypoint) {
          this.waypointIndex += 1;

          if (this.waypointIndex < this.waypoints.length ) {
            this.destination = fuzzyLocation(this.waypoints[this.waypointIndex], 10);
            this.destinationType = C.Destination.Waypoint;
          } else {
            // Destroy if we've reached the end
            this.destroy();
            return;
          }
        }
      }

      this.scene.physics.moveTo(this, this.destination.x, this.destination.y, this.stats.movespeed);
      this.attackRange.x = this.x;
      this.attackRange.y = this.y;
    }

    // Update attack timer
    this.state.cooldowns.attack -= delta;

    // Attempt to fire basic attack if available
    if (target && this.state.cooldowns.attack <= 0) {
      this.basicAttack(target);
    }
    
    // Update healthbar
    this.updateHealthbar();
  }

  updateStats() {
    super.updateStats();
    this.stats.attackrange += randomInt(15);
  }
}
