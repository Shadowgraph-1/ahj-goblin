export default class Scoreboard {
  constructor() {
    this.score = 0;
    this.misses = 0;
    this.scoreEl = null;
    this.missesEl = null;
  }

  init(scoreElement, missesElement) {
    this.scoreEl = scoreElement;
    this.missesEl = missesElement;
    this.render();
  }

  render() {
    if (this.scoreEl) {
      this.scoreEl.textContent = this.score;
    }
    if (this.missesEl) {
      this.missesEl.textContent = this.misses;
    }
  }

  incrementScore() {
    this.score += 1;
    this.render();
    return this.score;
  }

  incrementMisses() {
    this.misses += 1;
    this.render();
    return this.misses;
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.render();
  }
}