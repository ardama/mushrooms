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
      Tree: {
        Pine: {
          "L1": "Pine_L1",
          "M1": "Pine_M1",
          "M2": "Pine_M2", 
        }
      },
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
