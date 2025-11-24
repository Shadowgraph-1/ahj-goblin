export default class Cell {
  constructor(onCellClick) {
    this.el = null;
    this.goblinEl = null;
    this.index = null;
    this._clickedDuring = false;
    this.onCellClick = onCellClick;
  }

  render(container) {
    this.el = document.createElement('div');
    this.el.classList.add('cell');
    this.goblinEl = document.createElement('img');
    this.goblinEl.src = require('../assets/goblin.png');
    this.goblinEl.classList.add('goblin', 'hidden');
    this.el.appendChild(this.goblinEl);

    container.appendChild(this.el);
    this.index = Array.from(container.children).indexOf(this.el);

    this.el.addEventListener('click', () => {
      if (this.hasGoblin()) {
        this._clickedDuring = true; // clicked and will be hidden by board logic
        if (this.onCellClick) this.onCellClick(this.index, true);
      } else {
        // nothing
      }
    });
  }

  showGoblin() {
    this._clickedDuring = false;
    this.goblinEl.classList.remove('hidden');
  }

  hideGoblin() {
    this._clickedDuring = false;
    this.goblinEl.classList.add('hidden');
  }

  hasGoblin() {
    return !this.goblinEl.classList.contains('hidden');
  }

  reset() {
    this.hideGoblin();
  }
}
