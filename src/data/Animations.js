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
      frames: scene.anims.generateFrameNumbers('teemo-base', {start: 0, end: 11, first: 0}),
      frameRate: 15,
      repeat: -1,
      repeatDelay: 0,
    });
    scene.anims.create({
      key: 'teemo-base-walk-up',
      frames: scene.anims.generateFrameNumbers('teemo-base', {start: 12, end: 23, first: 12}),
      frameRate: 15,
      repeat: -1,
      repeatDelay: 0,
    });
    scene.anims.create({
      key: 'teemo-base-walk-right',
      frames: scene.anims.generateFrameNumbers('teemo-base', {start: 24, end: 35, first: 24}),
      frameRate: 15,
      repeat: -1,
      repeatDelay: 0,
    });
    scene.anims.create({
      key: 'teemo-base-walk-left',
      frames: scene.anims.generateFrameNumbers('teemo-base', {start: 36, end: 47, first: 36}),
      frameRate: 15,
      repeat: -1,
      repeatDelay: 0,
    });
  };
};
