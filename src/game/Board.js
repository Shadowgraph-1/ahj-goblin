import Cell from './Cell';
import { GRID_SIZE } from '../config';

export default class Board {
  constructor(onMiss, onHit) {
    this.onMiss = onMiss;
    this.onHit = onHit;
    this.cells = [];
    this.interval = null;
    this._timer = null;
    this._activeCell = null;
    this._stopped = true;
    this._lastIndex = null; // last active cell index to avoid immediate repeat
  }

  init(el) {
    this.el = el;
    // set dynamic grid columns and create GRID_SIZE x GRID_SIZE grid
    this.el.style.setProperty('--grid-columns', GRID_SIZE);
    const total = GRID_SIZE * GRID_SIZE;
    for (let i = 0; i < total; i++) {
      const cell = new Cell(this._cellClickHandler.bind(this));
      cell.render(this.el);
      this.cells.push(cell);
    }
  }

  _cellClickHandler(cellIndex, wasGoblin) {
    if (!wasGoblin) return;
    // hide goblin from cell and call onHit
    this.cells[cellIndex].hideGoblin();
    if (this.onHit) this.onHit();
  }

  start() {
    // Start spawn chain: spawn 1 goblin at a time for exactly 1 second
    if (this._stopped === false) return;
    this._stopped = false;
    this.spawn();
  }

  spawn() {
    // choose random cell that is not active
    // choose random index in all cells, skip the last selected nor occupied ones
    const len = this.cells.length;
    if (len === 0) return;
    let cellIndex;
    let attempts = 0;
    do {
      cellIndex = Math.floor(Math.random() * len);
      attempts += 1;
      if (attempts > 20) break; // safety
    } while (this.cells[cellIndex].hasGoblin() || cellIndex === this._lastIndex);
    const cell = this.cells[cellIndex];
    this._lastIndex = cellIndex;

    cell.showGoblin();
    // schedule hide after 1 second
    const timeout = setTimeout(() => {
      // if still visible -> it's a miss
      if (cell.hasGoblin()) {
        cell.hideGoblin();
        if (this.onMiss) this.onMiss();
      }
      // continue chain if not stopped
      if (!this._stopped) this.spawn();
    }, 1000);
    this._timer = timeout;
  }

  stop() {
    this._stopped = true;
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    // hide all goblins
    this.cells.forEach(c => c.hideGoblin());
  }

  reset() {
    this.stop();
    this.cells.forEach(c => c.reset());
  }
}
