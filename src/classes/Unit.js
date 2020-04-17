// import Projectile from './Projectile.js';
import C from '../utils/constants.js';

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
    // if (this.stats.attackrange) {
    //   this.attackRange = new Phaser.GameObjects.Zone(
    //     scene, x, y,
    //     this.stats.attackrange * 2,
    //     this.stats.attackrange * 2,
    //   );
    //   this.attackRange.owner = this;
    // }
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
    // const { level } = this.state;
    // const { base = {}, scaling = {} } = this.unitData;
    //
    // this.stats = {
    //   attackdamage: base.attackdamage + scaling.attackdamage * level,
    //   attackrange: base.attackrange,
    //   attackspeed: base.attackspeed * (1 + scaling.attackspeed * level),
    //   movespeed: base.movespeed,
    //   criticalchance: 0,
    //   maxhealth: base.maxhealth + scaling.maxhealth * level,
    //   healthregen: base.healthregen + scaling.healthregen * level,
    //   armor: base.armor + scaling.armor * level,
    //   magicresist: base.magicresist + scaling.magicresist * level,
    // };
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

  updateHealthbar(x, y) {
    let coords = { x, y };
    if (x === undefined && y === undefined) {
      coords = this.getHealthbarCoordinates();
    }
    // Update healthbar
    this.healthbar.x = coords.x;
    this.healthbar.y = coords.y;
    this.healthbarFill.x = coords.x;
    this.healthbarFill.y = coords.y;
    // this.healthbarFill.width = 30 * (1 - this.state.missinghealth / this.stats.maxhealth);
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
    // this.play(animation);
    this.scaleX = scaleX;
    this.scaleY = scaleY;

    // Add self to physics
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    if (hitbox) {
      this.body.isCircle = true;
      this.body.width = hitbox.width;
      // this.scene[`${type}Hitboxes`].add(this);
    }

    // Add attack range to scene/physics
    // if (this.attackRange) {
    //   this.scene.add.existing(this.attackRange);
    //   this.scene.physics.add.existing(this.attackRange);
    //   this.attackRange.body.setCircle(this.stats.attackrange);
    //   // this.scene[`${type}Ranges`].add(this.attackRange);
    // }

    // Add healthbar
    this.scene.add.existing(this.healthbar);
    this.scene.add.existing(this.healthbarFill);

    // Update rendered state
    this.state.rendered = true;
  };

  triggerAnimation(anim, repeat) {
    if (anim && anim !== this.animation) {
      if (repeat !== undefined) {
        this.anims.setRepeat(repeat);
      }
      this.anims.play(anim);
      this.animation = anim;
    }
  }

  finishAnimation() {
    if (this.animation) {
      this.anims.setRepeat(0);
      this.animation = null;
    }
  }

  getHealthbarCoordinates() {
    const coords = this.body ? this.body.center : this;
    return {
      x: coords.x,
      y: coords.y - 20,
    };
  };

  getBasicAttackTarget() {

  }

  basicAttack(target) {

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
