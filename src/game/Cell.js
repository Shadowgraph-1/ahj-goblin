import goblinImg from '../assets/goblin.png';

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
    this.goblinEl.src = goblinImg;
    this.goblinEl.classList.add('goblin', 'hidden');
    this.goblinEl.alt = 'goblin';
    this.goblinEl.draggable = false;

    this.el.append(this.goblinEl);
    container.append(this.el);

    this.index = Array.from(container.children).indexOf(this.el);

    this.el.addEventListener('click', () => {
      if (this.hasGoblin()) {
        this._clickedDuring = true;
        if (this.onCellClick) {
          this.onCellClick(this.index, true);
        }
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