/* eslint-disable func-names */
function Character(config) {
  this.name = config.name;
  this.health = config.health;
  this.maxHealth = config.maxHealth;
  this.dialogue = config.dialogue;
  this.level = config.level || 1;
  this.baseAttack = config.baseAttack || 0;
  this.baseDefense = config.baseDefense || 0;
}

Character.prototype = {
  get isAlive() {
    return this.health > 0;
  },
  _takeDamage: function (damage) {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
  },
  get attackTotal() {
    return this.baseAttack + this.level;
  },
  get defenseTotal() {
    return this.baseDefense + this.level;
  },
  _heal: function (health) {
    this.health += health;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  },
  speak: function () {
    return this.dialogue;
  },
};

module.exports = Character;
