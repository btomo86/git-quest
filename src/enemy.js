/* eslint-disable func-names */
const Character = require('./character');

function Enemy(config) {
  Character.call(this, config);
}

Enemy.prototype = Object.create(Character.prototype);

Object.defineProperty(Enemy.prototype, 'constructor', {
  value: Enemy,
  enumerable: false,
  writable: true,
});

Enemy.prototype._describeAttack = function (target) {
  return `${this.name} lets out a ${this.dialogue}, and hits ${target.name} for ${this.attackTotal} damage!`;
};

Enemy.prototype.attack = function (target) {
  target._takeDamage(this.attackTotal);
  return this._describeAttack(target);
};

module.exports = Enemy;
