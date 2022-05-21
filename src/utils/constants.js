const Constants = {
  Keycodes: Phaser.Input.Keyboard.KeyCodes,
  Classes: {
    Mushroom: 'Mushroom',
    Prop: 'Prop',
  },
  Directions: {
    N: 'N',
    S: 'S',
    E: 'E',
    W: 'W',
    NE: 'NE',
    NW: 'NW',
    SE: 'SE',
    SW: 'SW',
  },
  Map: {
    Terrain: {
      Forest: 'forest',
      Jungle: 'jungle',
      Plains: 'plains',
      River: 'river',
      Lake: 'lake',
      Beach: 'beach',
      Mountain: 'mountain',
      Town: 'town',
      Path: 'path',
      
      // Deprecated
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
          // "L1_A": "tree__pine__L1__A",
          // "L1_B": "tree__pine__L1__B",
          // "L1M1_A": "tree__pine__L1M1__A",
          // "M2_A": "tree__pine__M2__A",
          // "M2_B": "tree__pine__M2__B",
          // "M3_A": "tree__pine__M3__A",
          "L1S1_A": "tree__pine__L1S1__A",
          "L1S1_B": "tree__pine__L1S1__B",
          "M1S1_A": "tree__pine__M1S1__A",
          "M1S2_A": "tree__pine__M1S2__A",
          "M1S2_B": "tree__pine__M1S2__B",
        }
      },
      Mushroom: 'mushroom',
      Mushrooms: 'mushrooms',
      Stump: 'stump',
      Bush: 'bush',
      BushAutumn: 'bush_autumn',
      Rock: 'rock',
    },
    Shapes: {
      Size4: {
        _4: '_4',
        _2_2: '_2_2',
      },
      Size6: {
        _4_2: '_4_2',
        _2_2_2: '_2_2_2',
      },
    },
  },
  Misc: {
    Root2: Math.pow(2, 0.5),
  },
  Modifiers: {
    Type: {
      MapTile: {
        NearbySpawn: 'NearbySpawn',
      },
    }
  },
  Mushrooms: {
    Composted: {
      Proliferation: 'Proliferation',
      Growth: 'Growth',
      Quality: 'Quality',
      Consumption: 'Consumption',
      Utility: 'Utility',
      Fertilization: 'Fertilization',
      Chance: 'Chance',
    },
    Planted: {
      Observation: 'Observation',
      Vigilance: 'Vigilance',
      Exploration: 'Exploration',
    },
    Consumed: {
      Quickness: 'Quickness',
      Vision: 'Vision',
      Dexterity: 'Dexterity',
      Harvesting: 'Harvesting',
      Agility: 'Agility',

      PermanentHealth: 'PermanentHealth',
      PermanentStamina: 'PermanentStamina',
      PermanentQuickness: 'PermanentQuickness',
      PermanentVision: 'PermanentVision',
      PermanentDexterity: 'PermanentDexterity',
      PermanentHarvesting: 'PermanentHarvesting',
      PermanentAgility: 'PermanentAgility',
    },
    Actions: {
      Composted: "Composted",
      Planted: "Planted",
      Consumed: "Consumed",
    },
    Images: {
      _0: "mushroom__0",
      _1: "mushroom__1",
      _2: "mushroom__2",
      _3: "mushroom__3",
      _4: "mushroom__4",
      _5: "mushroom__5",
      _6: "mushroom__6",
      _7: "mushroom__7",
      _8: "mushroom__8",
      _9: "mushroom__9",
      _10: "mushroom__10",
      _11: "mushroom__11",
      _12: "mushroom__12",
      _13: "mushroom__13",
      _14: "mushroom__14",

      
      Red: {
        _2_A: "mushroom__red__2__A",
        _2_B: "mushroom__red__2__B",
        _3_A: "mushroom__red__3__A",
      },
      Orange: {
        _3_A: "mushroom__orange__3__A",
        _4_A: "mushroom__orange__4__A",
      },
      Yellow: {
        _3_A: "mushroom__yellow__3__A",
        _3_B: "mushroom__yellow__3__B",
      },
      Green: {
        _1_A: "mushroom__green__1__A",
        _2_A: "mushroom__green__2__A",
        _3_A: "mushroom__green__3__A",
      },
      Blue: {
        _2_A: "mushroom__blue__2__A",
        _2_B: "mushroom__blue__2__B",
      },
      Indigo: {
        _2_A: "mushroom__indigo__2__A",
        _3_A: "mushroom__indigo__3__A",
        _4_A: "mushroom__indigo__4__A",
      },
      Violet: {
        _2_A: "mushroom__violet__2__A",
      },
    }
  }
};

export default Constants;
