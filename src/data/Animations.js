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
      frames: scene.anims.generateFrameNumbers('teemo-base-walk-down', {start: 0, end: 11, first: 0}),
      frameRate: 15,
      repeat: -1,
      repeatDelay: 0,
    });
    scene.anims.create({
      key: 'teemo-base-walk-left',
      frames: scene.anims.generateFrameNumbers('teemo-base-walk-left', {start: 0, end: 11, first: 0}),
      frameRate: 15,
      repeat: -1,
      repeatDelay: 0,
    });
    scene.anims.create({
      key: 'teemo-base-walk-up',
      frames: scene.anims.generateFrameNumbers('teemo-base-walk-down', {start: 0, end: 11, first: 0}),
      frameRate: 15,
      repeat: -1,
      repeatDelay: 0,
    });
    scene.anims.create({
      key: 'teemo-base-walk-right',
      frames: scene.anims.generateFrameNumbers('teemo-base-walk-right', {start: 0, end: 11, first: 0}),
      frameRate: 15,
      repeat: -1,
      repeatDelay: 0,
    });
  };
};
