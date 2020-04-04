import Projectile from './Projectile.js';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, unitData, typeData) {
    super(scene, x, y, unitData.appearance.key);

    this.unitData = unitData || {};
    this.typeData = typeData || {};

    this.state = {};
    this.setInitialState();
    this.updateStats();
    this.initializeHealthbar();

    // Create attack range zone
    if (this.stats.attackrange) {
      this.attackRange = new Phaser.GameObjects.Zone(
        scene, x, y,
        this.stats.attackrange * 2,
        this.stats.attackrange * 2,
      );
      this.attackRange.owner = this;
    }
  };

  setInitialState() {
      this.state.rendered = false;
      this.state.destroyed = false;

      this.state.level = 1;
      
      this.state.missinghealth = 0;

      this.state.cooldowns = {
        attack: 0,
      };
      this.state.buffs = [];
  };

  updateStats() {
    const { level } = this.state;
    const { base = {}, scaling = {} } = this.unitData;

    this.stats = {
      attackdamage: base.attackdamage + scaling.attackdamage * level,
      attackrange: base.attackrange,
      attackspeed: base.attackspeed * (1 + scaling.attackspeed * level),
      movespeed: base.movespeed,
      criticalchance: 0,
      maxhealth: base.maxhealth + scaling.maxhealth * level,
      healthregen: base.healthregen + scaling.healthregen * level,
      armor: base.armor + scaling.armor * level,
      magicresist: base.magicresist + scaling.magicresist * level,
    };
  };
  
  initializeHealthbar() {
    const healthbarCoordinates = this.getHealthbarCoordinates();
    const { healthbarColor } = this.typeData;
    
    this.healthbar = new Phaser.GameObjects.Rectangle(
      this.scene, healthbarCoordinates.x, healthbarCoordinates.y, 30, 2, 0x333333,
    );
    
    this.healthbarFill = new Phaser.GameObjects.Rectangle(
      this.scene, healthbarCoordinates.x, healthbarCoordinates.y, 30, 2, healthbarColor,
    );
  };
  
  updateHealthbar() {
    // Update healthbar
    const healthbarCoordinates = this.getHealthbarCoordinates();
    this.healthbar.x = healthbarCoordinates.x;
    this.healthbar.y = healthbarCoordinates.y;
    this.healthbarFill.x = healthbarCoordinates.x;
    this.healthbarFill.y = healthbarCoordinates.y;
    this.healthbarFill.width = 30 * (1 - this.state.missinghealth / this.stats.maxhealth);
  }

  update(time, delta) {
  };
  
  renderToScene() {
    const {
      appearance: {
        hitbox,
        scaleX = 1,
        scaleY = 1,
        animation = 'goomba',
      }
    } = this.unitData;
    const { type } = this.typeData;
    
    // Add to scene
    this.scene.add.existing(this);
    this.play(animation);
    this.scaleX = scaleX;
    this.scaleY = scaleY;

    // Add self to physics
    if (hitbox) {
      this.scene.physics.add.existing(this);
      this.body.isCircle = true;
      this.body.width = hitbox.width;
      this.scene[`${type}Hitboxes`].add(this);
    }
  
    // Add attack range to scene/physics
    if (this.attackRange) {
      this.scene.add.existing(this.attackRange);
      this.scene.physics.add.existing(this.attackRange);
      this.attackRange.body.setCircle(this.stats.attackrange);
      this.scene[`${type}Ranges`].add(this.attackRange);
    }

    // Add healthbar
    this.scene.add.existing(this.healthbar);
    this.scene.add.existing(this.healthbarFill);

    // Update rendered state
    this.state.rendered = true;
  };
  
  getHealthbarCoordinates() {
    return {
      x: this.x,
      y: this.y - 15,
    };
  };
  
  getBasicAttackTarget() {
    // Get list of Enemies in range
    const candidates = [];
    (this.typeData.targetTypes || []).forEach((type) => {
      this.scene.physics.overlap(this.attackRange, this.scene[`${type}Hitboxes`], (range, target) => {
        candidates.push(target);
      });
    })

    // Select first one
    return candidates.length ? candidates[0] : null;
  }

  basicAttack(target) {
    // Create Projectile onHit callback
    const damage = this.stats.attackdamage;
    const onHit = (projectile) => {
      projectile.target.receiveDamage(damage);
    }

    const projectile = new Projectile(this, target, onHit);
    this.scene.projectiles.add(projectile);
    this.state.cooldowns.attack = 1000 / this.stats.attackspeed;
  };
  
  receiveDamage(damage) {
    this.state.missinghealth += damage;

    // Destroy if health reaches 0
    if (this.state.missinghealth >= this.stats.maxhealth) {
      this.destroy();
    }
  }
  
  destroy() {
    this.state.destroyed = true;
    if (this.attackRange) { this.attackRange.destroy(); }
    if (this.healthbar) { this.healthbar.destroy(); }
    if (this.healthbarFill) { this.healthbarFill.destroy(); }
    super.destroy();
  }
};
