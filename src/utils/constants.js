const Constants = {
  Keycodes: Phaser.Input.Keyboard.KeyCodes,
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
          "L1_A": "tree__pine__L1__A",
          "L1_B": "tree__pine__L1__B",
          "L1M1_A": "tree__pine__L1M1__A",
          "M2_A": "tree__pine__M2__A",
          "M2_B": "tree__pine__M2__B",
          "M3_A": "tree__pine__M3__A",
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
  Mushrooms: {
    Composted: {
      Proliferation: 'Proliferation',
      Enlargement: 'Enlargement',
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
