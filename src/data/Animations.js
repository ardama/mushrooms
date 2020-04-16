export default class Animations {
  config = {

  };

  static createAnimations(scene) {
    const frames = scene.anims.generateFrameNumbers('teemo-base-walk-down', {start: 0, end: 9, first: 0});
    console.log(frames);
    scene.anims.create({
      key: 'teemo-base-walk-down',
      frames: frames,
      frameRate: 12,
      repeat: -1,
      repeatDelay: 0,
    });
  };
};
