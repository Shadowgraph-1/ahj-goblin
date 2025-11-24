import './styles/main.scss';
import Game from './game/Game';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const game = new Game(app);
  game.init();
});
