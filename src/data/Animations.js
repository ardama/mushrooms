export default class Animations {
  config = {

  };

  static createAnimations(scene) {

    ////////////////////////////////
    // Teemo Base Skin Animations //
    ////////////////////////////////
    // Walking /////////
    scene.anims.create({
      key: 'teemo-base-walk-down',
      frames: scene.anims.generateFrameNumbers('teemo-base', {start: 0, end: 7}),
      frameRate: 12,
      repeat: -1,
      repeatDelay: 0,
    });
    scene.anims.create({
      key: 'teemo-base-walk-up',
      frames: scene.anims.generateFrameNumbers('teemo-base', {start: 8, end: 15}),
      frameRate: 12,
      repeat: -1,
      repeatDelay: 0,
    });
    scene.anims.create({
      key: 'teemo-base-walk-right',
      frames: scene.anims.generateFrameNumbers('teemo-base', {start: 16, end: 23}),
      frameRate: 12,
      repeat: -1,
      repeatDelay: 0,
    });
    scene.anims.create({
      key: 'teemo-base-walk-left',
      frames: scene.anims.generateFrameNumbers('teemo-base', {start: 24, end: 31}),
      frameRate: 12,
      repeat: -1,
      repeatDelay: 0,
    });
  };
};
