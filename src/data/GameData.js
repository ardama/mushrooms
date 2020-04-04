import C from '../utils/constants.js';

const GameData = {
  Champion: _getChampionGameData(),
  Enemy: _getEnemyGameData(),
  Structure: _getStructureGameData(),
  Item: _getItemGameData(),
  Wave: _getWaveGameData(),
  Difficulty: _getDifficultyGameData(),
};

function _getChampionGameData() {
  return {
    [C.Champion.Anivia]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Alistar]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Cassiopeia]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Janna]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.JarvanIV]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Karthus]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Leona]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Nami]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Ornn]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Twitch]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.TwistedFate]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Vayne]: {
      appearance: {
        key: 'tiles',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Ziggs]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },

    [C.Champion.Zilean]: {
      appearance: {
        key: '',
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 100,
        movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        // attackrange: 100,
        // movespeed: 1,
        // maxhealth: 100,
        // healthregen: 1,
        // armor: 10,
        // magicresist: 10,
      },
      unlocked: () => {},

    },
  };
};

function _getEnemyGameData() {
  return {
    [C.Enemy.CasterMinion]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 10,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.MeleeMinion]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.SiegeMinion]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.SuperMinion]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.Raptor]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.SmallRaptor]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.Wolf]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.SmallWolf]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.Krug]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.MediumKrug]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.SmallKrug]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.Gromp]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.RedGolem]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.BlueGolem]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
    [C.Enemy.RiftHerald]: {
      appearance: {
        key: 'tiles',
        hitbox: {
          width: 20,
        },
      },
      base: {
        attackdamage: 1,
        attackspeed: 1,
        attackrange: 50,
        movespeed: 100,
        maxhealth: 100,
        healthregen: 1,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 20,
        gold: 100,
      },
      scaling: {
        attackdamage: 1,
        attackspeed: 0.05,
        maxhealth: 10,
        healthregen: 1,
        armor: 1,
        magicresist: 1,
        xp: 2,
      },
    },
  };
}

function _getStructureGameData() {
  return {
    [C.Structure.Tower]: {
      appearance: {
        key: 'tiles',
        hitbox: 30,
        animation: 'brickTile',
      },
      base: {
        attackdamage: 40,
        attackspeed: 3.5,
        attackrange: 100,
        movespeed: 0,
        maxhealth: 1000,
        healthregen: 0,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 0,
        gold: 0,
      },
      scaling: {
        attackdamage: 0,
        attackspeed: 0,
        attackrange: 0,
        movespeed: 0,
        maxhealth: 0,
        healthregen: 0,
        armor: 0,
        magicresist: 0,
        tenacity: 0,
        xp: 0,
        gold: 0,
      },
    },
    [C.Structure.Inhibitor]: {
      appearance: {
        key: 'tiles',
        hitbox: 30,
        animation: 'broken',
      },
      base: {
        attackdamage: 0,
        attackspeed: 0,
        attackrange: 0,
        movespeed: 0,
        maxhealth: 3000,
        healthregen: 0,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 0,
        gold: 0,
      },
      scaling: {
        attackdamage: 0,
        attackspeed: 0,
        attackrange: 0,
        movespeed: 0,
        maxhealth: 0,
        healthregen: 0,
        armor: 0,
        magicresist: 0,
        tenacity: 0,
        xp: 0,
        gold: 0,
      },
    },
    [C.Structure.Nexus]: {
      appearance: {
        key: 'tiles',
        hitbox: 60,
        animation: 'blockTile',
        scaleX: 2,
        scaleY: 2,
      },
      base: {
        attackdamage: 0,
        attackspeed: 0,
        attackrange: 0,
        movespeed: 0,
        maxhealth: 4000,
        healthregen: 0,
        armor: 10,
        magicresist: 10,
        tenacity: 0,
        xp: 0,
        gold: 0,
      },
      scaling: {
        attackdamage: 0,
        attackspeed: 0,
        attackrange: 0,
        movespeed: 0,
        maxhealth: 0,
        healthregen: 0,
        armor: 0,
        magicresist: 0,
        tenacity: 0,
        xp: 0,
        gold: 0,
      },
    },
  };
}

function _getItemGameData() {
  return {

  };
}

function _getWaveGameData() {
  return {
    [C.Wave.MinionBasic]: {
      delay: C.Wave.Delay.Medium,
      enemies: [
        C.Enemy.MeleeMinion,
        C.Enemy.MeleeMinion,
        C.Enemy.MeleeMinion,
        C.Enemy.CasterMinion,
        C.Enemy.CasterMinion,
        C.Enemy.CasterMinion,
      ],
    },
    [C.Wave.MinionSiege]: {
      delay: C.Wave.Delay.Medium,
      enemies: [
        C.Enemy.MeleeMinion,
        C.Enemy.MeleeMinion,
        C.Enemy.MeleeMinion,
        C.Enemy.SiegeMinion,
        C.Enemy.CasterMinion,
        C.Enemy.CasterMinion,
        C.Enemy.CasterMinion,
      ],
    },
    [C.Wave.MinionSuper]: {
      delay: C.Wave.Delay.Medium,
      enemies: [
        C.Enemy.MeleeMinion,
        C.Enemy.MeleeMinion,
        C.Enemy.MeleeMinion,
        C.Enemy.SuperMinion,
        C.Enemy.CasterMinion,
        C.Enemy.CasterMinion,
        C.Enemy.CasterMinion,
      ],
    },
    [C.Wave.Raptor]: {
      delay: C.Wave.Delay.Medium,
      enemies: [
        C.Enemy.SmallRaptor,
        C.Enemy.SmallRaptor,
        C.Enemy.SmallRaptor,
        C.Enemy.Raptor,
        C.Enemy.SmallRaptor,
        C.Enemy.SmallRaptor,
      ],
    },
    [C.Wave.Wolf]: {
      delay: C.Wave.Delay.Medium,
      enemies: [
        C.Enemy.SmallWolf,
        C.Enemy.Wolf,
        C.Enemy.SmallWolf,
      ],
    },
    [C.Wave.Krug]: {
      delay: C.Wave.Delay.Medium,
      enemies: [
        C.Enemy.Krug,
        C.Enemy.MediumKrug,
      ],
    },
    [C.Wave.Gromp]: {
      delay: C.Wave.Delay.Medium,
      enemies: [
        C.Enemy.Gromp,
      ],
    },
    [C.Wave.Blue]: {
      delay: C.Wave.Delay.Medium,
      enemies: [
        C.Enemy.BlueGolem,
        C.Enemy.MediumKrug,
      ],
    },
    [C.Wave.Red]: {
      delay: C.Wave.Delay.Medium,
      enemies: [
        C.Enemy.RedGolem,
      ],
    },
    [C.Wave.RiftHerald]: {
      delay: C.Wave.Delay.Medium,
      enemies: [
        C.Enemy.RiftHerald,
      ],
    },

  };
}

function _getDifficultyGameData() {
  return {


  };
}

export default GameData;
