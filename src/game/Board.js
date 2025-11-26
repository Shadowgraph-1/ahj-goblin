import Cell from './Cell';

const GRID_SIZE = 4;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE; // 16
const GOBLIN_DISPLAY_TIME = 1000; // 1 секунда

export default class Board {
  constructor(onMiss, onHit) {
    this.el = null;
    this.onMiss = onMiss;
    this.onHit = onHit;
    this.cells = [];
    this.interval = null;
    this._timer = null;
    this._activeCell = null;
    this._stopped = true;
    this._lastIndex = null;
  }

  init(container) {
    this.el = container;
    this.el.style.setProperty('--grid-columns', GRID_SIZE);

    for (let i = 0; i < TOTAL_CELLS; i++) {
      const cell = new Cell(this._cellClickHandler.bind(this));
      cell.render(this.el);
      this.cells.push(cell);
    }
  }

  _cellClickHandler(cellIndex, wasClicked) {
    if (wasClicked) {
      this.cells[cellIndex].hideGoblin();
      if (this.onHit) {
        this.onHit();
      }
    }
  }

  start() {
    if (this._stopped !== false) {
      this._stopped = false;
      this.spawn();
    }
  }

  /**
   * Генерирует индекс ячейки, отличный от предыдущего
   * @returns {number} индекс ячейки
   */
  _getRandomCellIndex() {
    let randomIndex;
    let attempts = 0;
    const maxAttempts = 20;

    do {
      randomIndex = Math.floor(Math.random() * TOTAL_CELLS);
      attempts += 1;
    } while (randomIndex === this._lastIndex && attempts < maxAttempts);

    return randomIndex;
  }

  spawn() {
    const cellIndex = this._getRandomCellIndex();
    const cell = this.cells[cellIndex];

    this._lastIndex = cellIndex;
    cell.showGoblin();

    const timeoutId = setTimeout(() => {
      if (cell.hasGoblin()) {
        cell.hideGoblin();
        if (this.onMiss) {
          this.onMiss();
        }
      }
      if (!this._stopped) {
        this.spawn();
      }
    }, GOBLIN_DISPLAY_TIME);

    this._timer = timeoutId;
  }

  stop() {
    this._stopped = true;
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    this.cells.forEach((cell) => cell.hideGoblin());
  }

  reset() {
    this.stop();
    this.cells.forEach((cell) => cell.reset());
  }
}