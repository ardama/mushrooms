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
    const unitData = { appearance: { key: 'tiles', hitbox: { width: 32 } } };
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

    this.state.destination = null;
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
      this.scene.physics.moveTo(this, destination.x, destination.y, 100);

      // Compute destination arrival
      const { velocity, center } = this.body;
      const arrivedHorizontal = (velocity.x > 0 && center.x >= destination.x) || (velocity.x < 0 && center.x <= destination.x);
      const arrivedVertical = (velocity.y > 0 && center.y >= destination.y) || (velocity.y < 0 && center.y <= destination.y);

      // Stop
      if (arrivedHorizontal && arrivedVertical) {
        this.halt();
      }

    } else {
      const { moving } = this.state;

      let directionX = (moving.left ? -1 : 0) + (moving.right ? 1 : 0);
      let directionY = (moving.up ? -1 : 0) + (moving.down ? 1 : 0);

      let velocityX = directionX * 100;
      let velocityY = directionY * 100;
      if (directionX !== 0 && directionY !== 0) {
        velocityX /= C.Misc.Root2;
        velocityY /= C.Misc.Root2;
      }

      this.body.velocity.x = velocityX;
      this.body.velocity.y = velocityY;
    }

    // Update healthbar
    this.updateHealthbar();
  }

  setMoving(direction, value) {
    this.state.moving[direction] = value;

    if (value) {
      this.state.destination = null;
    }
  };

  setDestination(point) {
    if (point) {
      if (!Phaser.Geom.Rectangle.ContainsPoint(this.body, point)) {
        this.state.destination = point;
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
    this.state.destination = null;
    this.state.moving = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }
}
