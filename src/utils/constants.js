const Constants = {
  Keycodes: Phaser.Input.Keyboard.KeyCodes,
  Misc: {
    Root2: Math.pow(2, 0.5),
  },
  Map: {
    Terrain: {
      Water: 'water',
      Rock: 'rock',
      Sand: 'sand',
      Grass: 'grass',
      Dirt: 'dirt',
      Blank: 'blank',
    },
    Foliage: {
      Tree: 'tree',
      TreeAutumn: 'tree_autumn',
      Mushroom: 'mushroom',
      Mushrooms: 'mushrooms',
      Stump: 'stump',
      Bush: 'bush',
      BushAutumn: 'bush_autumn',
      Rock: 'rock',
    }
  }
};

export default Constants;
