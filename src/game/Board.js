import Cell from './Cell';

export default class Board {
  constructor(onMiss, onHit) {
    this.onMiss = onMiss;
    this.onHit = onHit;
    this.cells = [];
    this.interval = null;
    this._timer = null;
    this._activeCell = null;
    this._stopped = true;
  }

  init(el) {
    this.el = el;
    // create 3x3 grid
    for (let i = 0; i < 9; i++) {
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
    const freeCells = this.cells.filter(c => !c.hasGoblin());
    if (freeCells.length === 0) return;
    const idx = Math.floor(Math.random() * freeCells.length);
    const cell = freeCells[idx];

    // find index
    const cellIndex = this.cells.indexOf(cell);

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
