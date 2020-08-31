/* eslint-disable func-names */
const Player = require('../src/player');

describe('constructor function', () => {
  let player;
  let config;
  let sword;
  let trainingDummy;
  beforeEach(() => {
    trainingDummy = {
      name: 'Buster',
      health: 10,
      maxHealth: 10,
      _takeDamage: function (damage) {
        this.health -= damage;
      },
    };
    sword = {
      name: 'bronze sword',
      damage: 3,
      attackType: 'slashes',
    };
    config = {
      name: 'Hero',
      health: 10,
      maxHealth: 10,
      dialogue: 'Huzzah!',
    };
    player = new Player(config);
  });
  it('returns an object', () => {
    expect(player).toBeInstanceOf(Object);
  });
  it('inherits from character', () => {
    expect(player.name).toBe(config.name);
    expect(player.health).toBe(config.health);
    expect(player.maxHealth).toBe(config.maxHealth);
    expect(player.dialogue).toBe(config.dialogue);
  });
  it('has experience metrics defined', () => {
    expect(player.nextLevel).toBe(1000);
    expect(player.currentExperience).toBe(0);
  })
  it('has a weapon slot', () => {
    expect(player).toHaveProperty('equippedWeapon');
  });
  describe('equip', () => {
    it('can equip a weapon', () => {
      player.equip(sword);
      expect(player.equippedWeapon).toEqual(sword);
    });
  });
  describe('attack', () => {
    beforeEach(() => {
      player.equip(sword);
      player.attack(trainingDummy);
    });
    it('can attack with a weapon', () => {
      expect(trainingDummy.health).toBe(trainingDummy.maxHealth - sword.damage);
    });
    it('can describe its attack', () => {
      const attackLine = `${player.name} lets out a ${player.dialogue}, and hits ${trainingDummy.name} with ${sword.name} for ${sword.damage} damage!`;
      expect(player.attack(trainingDummy)).toBe(attackLine);
    });
    it('level up by one', () => {
      player.levelUp();
      expect(player.level).toBe(2);
    })
  });
});
