export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(owner, target, onHit) {
    super(owner.scene, owner.x, owner.y, 'tiles');

    // Save owner, target
    this.owner = owner;
    this.target = target;
    this.onHit = onHit;

    // Set base stats
    this.stats = {
      speed: 300,
    };

    // Set initial state
    this.state = {
      rendered: false,
      destroyed: false,
    };

    // Set target destination
    this.destination = {
      x: target.x,
      y: target.y,
    };

    // Render to scene
    this.renderToScene();
  }

  update(time, delta) {
    if (this.state.destroyed) {
      return;
    }
    if (this.target && this.target.body) {
      // Update destination
      this.destination = {
        x: this.target.x,
        y: this.target.y,
      };

      // Check if Projectile has hit its target, return early if so
      const overlap = this.scene.physics.overlap(this, this.target, this.handleTargetHit);
      if (overlap) return;
    } else if (
      Math.abs(this.destination.x - this.x) <= 10 &&
      Math.abs(this.destination.y - this.y) <= 10
    ) {
      // If no target, check if Projectile reached last set destination
      this.state.destroyed = true,
      this.destroy();
      return;
    }

    this.scene.physics.moveTo(this, this.destination.x, this.destination.y, this.stats.speed);
  }

  renderToScene = () => {
    // Add to scene
    this.scene.add.existing(this);
    this.play('fireFly');

    // Add to physics
    this.scene.physics.add.existing(this);

    // Add to scene groups
    this.scene.projectiles.add(this);

    // Update rendered state
    this.state.rendered = true;
  }

  handleTargetHit = () => {
    // Call onHit callback
    this.onHit(this);

    // Destroy object
    this.state.destroyed = true;
    this.destroy();
  }



}
