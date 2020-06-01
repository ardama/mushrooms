import C from '../utils/constants.js';
import D from '../data/GameData.js';
import Unit from './Unit.js';

const typeData = {
  type: 'character',
  targetTypes: ['enemy'],
  healthbarColor: 0x00bb44,
};

export default class Character extends Unit {
  constructor(scene, x, y) {
    const unitData = { appearance: { key: 'tiles', hitbox: { width: 32 } } };
    super(scene, x, y, unitData, typeData);

    this.los = 250;
    this.attackRange = new Phaser.GameObjects.Zone(
      scene, x, y,
      this.los * 2,
      this.los * 2,
    );
    this.attackRange.owner = this;

    this.hitboxW = 24;
    this.hitboxH = 16;

    this.scene.add.existing(this.attackRange);
    this.scene.physics.add.existing(this.attackRange);
    this.attackRange.body.setCircle(this.los);
  }

  setInitialState() {
    super.setInitialState();

    this.state.moving = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    this.state.visionCycle = 0;

    this.state.destination = null;

    this.state.previousPositions = [...Array(10)];

    this.state.digging = {
      active: false,
      timer: 0,
      target: null,
      tile: null,
    };

    this.state.inventory = {};
  }

  update(time, delta) {
    const {
      destroyed,
      rendered,
    } = this.state;

    // Don't update if destroyed
    if (destroyed) return;

    // Render object if unrendered
    if (!rendered) {
      this.renderToScene();
    }

    // Compute movement
    const pointer = this.scene.input.mousePointer;
    if (pointer.rightButtonDown()) {
      // Update destination on initial click or after 250ms of RMB down
      if (!this.state.mouseDownDuration || this.state.mouseDownDuration > 250) {
        this.setDestination(this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y))
      }

      this.state.mouseDownDuration += delta;
    } else {
      this.state.mouseDownDuration = 0;
    }

    const { destination } = this.state;
    if (destination) {
      this.scene.physics.moveTo(this, destination.x, destination.y, 99);

      // Compute destination arrival
      const { velocity, center } = this.body;
      let arrivedHorizontal = (velocity.x > 0 && center.x >= destination.x) || (velocity.x < 0 && center.x <= destination.x);
      let arrivedVertical = (velocity.y > 0 && center.y >= destination.y) || (velocity.y < 0 && center.y <= destination.y);

      const oldPosition = this.state.previousPositions.shift()
      this.state.previousPositions.push({ x: center.x, y: center.y });
      if (oldPosition && Math.abs(oldPosition.x - center.x) < 1 && Math.abs(oldPosition.y - center.y) < 1) {
        arrivedVertical = true;
        arrivedHorizontal = true;
      }

      if (arrivedHorizontal && arrivedVertical) {
        this.halt();
        this.finishAnimation();
      } else {
        const vertical = Math.abs(velocity.y) > 1.5 * Math.abs(velocity.x);
        if (vertical && velocity.y < 0) {
          this.direction = C.Directions.Up;
          this.triggerAnimation('teemo-base-walk-up', -1);
        } else if (vertical && velocity.y > 0) {
          this.direction = C.Directions.Down;
          this.triggerAnimation('teemo-base-walk-down', -1);
        } else if (velocity.x < 0) {
          this.direction = C.Directions.Left;
          this.triggerAnimation('teemo-base-walk-left', -1);
        } else if (velocity.x > 0) {
          this.direction = C.Directions.Right;
          this.triggerAnimation('teemo-base-walk-right', -1);
        }
      }

    } else {
      const { moving } = this.state;

      let directionX = (moving.left ? -1 : 0) + (moving.right ? 1 : 0);
      let directionY = (moving.up ? -1 : 0) + (moving.down ? 1 : 0);

      let velocityX = directionX * 99;
      let velocityY = directionY * 99;
      if (directionX !== 0 && directionY !== 0) {
        velocityX /= C.Misc.Root2;
        velocityY /= C.Misc.Root2;
      }


      if (velocityX < 0) {
        this.direction = C.Directions.Up;
        this.triggerAnimation('teemo-base-walk-left', -1);
      } else if (velocityX > 0) {
        this.direction = C.Directions.Down;
        this.triggerAnimation('teemo-base-walk-right', -1);
      } else if (velocityY < 0) {
        this.direction = C.Directions.Left;
        this.triggerAnimation('teemo-base-walk-up', -1);
      } else if (velocityY > 0) {
        this.direction = C.Directions.Right;
        this.triggerAnimation('teemo-base-walk-down', -1);
      } else {
        this.finishAnimation();
      }

      this.body.velocity.x = velocityX;
      this.body.velocity.y = velocityY;
    }

    this.scene.physics.collide(this, this.scene.map.groundLayer);
    this.scene.physics.collide(this, this.scene.map.objectLayer);

    this.depth = Math.ceil(this.body.y + (this.body.height / 2));

    this.attackRange.x = this.x;
    this.attackRange.y = this.y;

    const { center, radius } = this.attackRange.body;

    if (this.state.visionCycle === 0) {
      const visibleTilesOuter = this.scene.map.fogLayer.getTilesWithinShape(new Phaser.Geom.Circle(center.x, center.y, radius));
      const visibleTilesInner = this.scene.map.fogLayer.getTilesWithinShape(new Phaser.Geom.Circle(center.x, center.y, (radius * 0.95)));
      this.scene.map.revealTiles(visibleTilesOuter, visibleTilesInner);
    }
    this.state.visionCycle += 1;
    this.state.visionCycle %= 8;

    let fill = 0
    if (this.state.digging.active) {
      this.state.digging.timer += delta;
      fill = Math.min(this.state.digging.timer / 1000, 1);
      if (this.state.digging.timer > 1000) {
        this.collectMushroom();
      }
    }

    const { x: cx, y: cy } = this._getCenter();
    // Update healthbar
    this.updateHealthbar(cx, cy - 24, fill, this.depth);
  }

  renderToScene() {
    super.renderToScene();
    this.body.setSize(this.hitboxW, this.hitboxH, false);
    this.body.setOffset((32 - this.hitboxW) / 2, 8 + (32 - this.hitboxH) / 2);
  }

  _getCenter() {
    return {
      x: this.body.x + this.hitboxW / 2,
      y: this.body.y + this.hitboxH / 2,
    }
  }

  setMoving(direction, value) {
    this.state.moving[direction] = value;

    if (value) {
      this.state.destination = null;
      this.setDigging(false);
    }
  };

  setDestination(point) {
    if (point) {
      if (!Phaser.Geom.Rectangle.ContainsPoint(this.body, point)) {
        this.state.destination = point;
        this.state.previousPositions = [...Array(10)];
        this.setDigging(false);
      }

      this.state.moving = {
        up: false,
        down: false,
        left: false,
        right: false,
      };
    } else {
      this.state.destination = null;
    }
  };

  halt() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    this.state.moving = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    this.state.destination = null;

    // set duration to 1 to force temporary stop
    this.state.mouseDownDuration = 1;
  }

  setDigging(value) {
    if (value === this.state.digging.active) { return; }

    if (value) {
      const c = this._getCenter();
      const currentTile = this.scene.map._getTileAtWorldCoords(c.x, c.y);
      const targetTile = this.scene.map._getAdjacentTile(currentTile, this.direction);
      const mushroom = targetTile && targetTile.getMushroom();
      if (!mushroom) {
        return;
      }
      this.state.digging.timer = 0;
      this.state.digging.target = mushroom;
      this.state.digging.tile = targetTile;
      this.halt();
    } else {
      this.state.digging.timer = 0;
      this.state.digging.target = null;
      this.state.digging.tile = null;
    }
    this.state.digging.active = value;
  }

  collectMushroom() {
    const { target, tile } = this.state.digging;
    tile.removeGameObject(target);
    this.state.inventory[target.id] = target;
    console.log("harvested a", target.name);
    this.setDigging(false);
  }
}
