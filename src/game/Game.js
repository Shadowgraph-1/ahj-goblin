import Scoreboard from './Scoreboard';
import Board from './Board';
import hammerImg from '../assets/hammer.png';

const MAX_MISSES = 5;

export default class Game {
  constructor(container) {
    this.container = container;
    this.scoreboard = new Scoreboard();
    this.board = new Board(
      this.onMiss.bind(this),
      this.onHit.bind(this)
    );
    this.rootEl = null;
    this.hammerEl = null;
    this._onMouseMove = this._onMouseMove.bind(this);
  }

  init() {
    this._render();
    this.board.init(document.querySelector('.board'));
    this.scoreboard.init(
      document.querySelector('.score-el'),
      document.querySelector('.misses-el')
    );
    this.board.start();

    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mousedown', () => {
      if (this.hammerEl) {
        this.hammerEl.classList.add('hit');
      }
    });
    document.addEventListener('mouseup', () => {
      if (this.hammerEl) {
        this.hammerEl.classList.remove('hit');
      }
    });
  }

  _render() {
    const appDiv = document.createElement('div');
    appDiv.classList.add('app');
    appDiv.innerHTML = `
      <div class="header">
        <div class="title">Гоблины!</div>
        <div class="controls">
          <div class="score">Score: <span class="score-el">0</span></div>
          <div class="misses" style="margin-left:12px;">Misses: <span class="misses-el">0</span></div>
          <button class="button restart">Restart</button>
        </div>
      </div>
      <div class="board"></div>
      <div class="footer">Попробуйте поймать гоблинов – пропустите ${MAX_MISSES} и игра закончится.</div>
    `;

    this.container.append(appDiv);
    this.rootEl = appDiv;

    this.rootEl.querySelector('.restart').addEventListener('click', () => {
      this.restart();
    });

    // Создаем элемент молотка
    this.hammerEl = document.createElement('img');
    this.hammerEl.src = hammerImg;
    this.hammerEl.alt = 'hammer';
    this.hammerEl.classList.add('hammer');
    this.hammerEl.style.display = 'none';
    document.body.append(this.hammerEl);

    // Показываем/скрываем молоток при входе/выходе из приложения
    this.rootEl.addEventListener('mouseenter', () => {
      this.hammerEl.style.display = 'block';
    });

    this.rootEl.addEventListener('mouseleave', () => {
      this.hammerEl.style.display = 'none';
    });
  }

  _onMouseMove(event) {
    if (this.hammerEl) {
      this.hammerEl.style.left = `${event.clientX}px`;
      this.hammerEl.style.top = `${event.clientY}px`;
    }
  }

  onHit() {
    this.scoreboard.incrementScore();
  }

  onMiss() {
    const missCount = this.scoreboard.incrementMisses();
    if (missCount >= MAX_MISSES) {
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