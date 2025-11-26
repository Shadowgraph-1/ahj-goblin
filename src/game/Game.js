import Board from './Board';
import Scoreboard from './Scoreboard';
import hammerSrc from '../assets/hammer.png';

export default class Game {
  constructor(container) {
    this.container = container;
    this.scoreboard = new Scoreboard();
    this.board = new Board(this.onMiss.bind(this), this.onHit.bind(this));
    this.rootEl = null;
    this.hammerEl = null;
    this._onMouseMove = this._onMouseMove.bind(this);
  }

  init() {
    this._render();
    this.board.init(document.querySelector('.board'));
    this.scoreboard.init(document.querySelector('.score-el'), document.querySelector('.misses-el'));
    this.board.start();

    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mousedown', () => { if (this.hammerEl) this.hammerEl.classList.add('hit'); });
    document.addEventListener('mouseup', () => { if (this.hammerEl) this.hammerEl.classList.remove('hit'); });
  }

  _render() {
    const el = document.createElement('div');
    el.classList.add('app');
    el.innerHTML = `
      <div class="header">
        <div class="title">Гоблины!</div>
        <div class="controls">
          <div class="score">Score: <span class="score-el">0</span></div>
          <div class="misses" style="margin-left:12px;">Misses: <span class="misses-el">0</span></div>
          <button class="button restart">Restart</button>
        </div>
      </div>
      <div class="board"></div>
      <div class="footer">Попробуйте поймать гоблинов — пропустите 5 и игра закончится.</div>
    `;

    this.container.append(el);
    this.rootEl = el;

    this.rootEl.querySelector('.restart').addEventListener('click', () => this.restart());

    // Hammer cursor
    this.hammerEl = document.createElement('img');
    this.hammerEl.src = hammerSrc;
    this.hammerEl.alt = 'hammer';
    this.hammerEl.classList.add('hammer');
    this.hammerEl.style.display = 'none';
    document.body.append(this.hammerEl);
    // show/hide hammer only when cursor inside game area
    this.rootEl.addEventListener('mouseenter', () => { this.hammerEl.style.display = 'block'; });
    this.rootEl.addEventListener('mouseleave', () => { this.hammerEl.style.display = 'none'; });
  }

  _onMouseMove(e) {
    if (!this.hammerEl) return;
    this.hammerEl.style.left = `${e.clientX}px`;
    this.hammerEl.style.top = `${e.clientY}px`;
  }

  onHit() {
    this.scoreboard.incrementScore();
  }

  onMiss() {
    const misses = this.scoreboard.incrementMisses();
    if (misses >= 5) {
      this.endGame();
    }
  }

  endGame() {
    this.board.stop();
    const overlay = document.createElement('div');
    overlay.classList.add('overlay-gameover');
    overlay.innerHTML = `
      <div class="popup">
        <strong>Game Over!</strong>
        <div>Score: <span class="score-el">${this.scoreboard.score}</span></div>
        <button class="button restart">Restart</button>
      </div>
    `;
    document.body.append(overlay);
    overlay.querySelector('.restart').addEventListener('click', () => {
      overlay.remove();
      this.restart();
    });
  }

  restart() {
    this.scoreboard.reset();
    this.board.reset();
    this.board.start();
  }
}
