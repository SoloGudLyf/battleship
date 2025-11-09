export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitTimes = 0;
  }

  isHit() {
    if (this.hitTimes < this.length) return this.hitTimes++;
    return;
  }

  isSunk() {
    if (this.hitTimes === this.length) return true;
    return false;
  }
}