import Ball from './ball';
import Paddle from './paddle';

const ball = new Ball(document.getElementById('ball'));
const player = new Paddle(document.getElementById('player-paddle'));
const computer = new Paddle(document.getElementById('opponent-paddle'));
const playerScoreElem = document.getElementById('player-score') as HTMLElement;
const opponentScoreElem = document.getElementById('opponent-score') as HTMLElement;

let lastTime: number;
function update(time: number) {
  if (!lastTime) {
    lastTime = time;
  }
  const delta = time - lastTime;
  lastTime = time;
  const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue')) as number;
  document.documentElement.style.setProperty('--hue', `${hue + delta * 0.01}`);
  ball.update(delta, [player.rect(), computer.rect()]);
  computer.update(delta, ball.y);
  window.requestAnimationFrame(update);
  if (isGameOver()) {
    handleGameOver();
    ball.reset();
  }
}

function handleGameOver() {
  const rect = ball.rect();
  if (rect.left <= 0) {
    opponentScoreElem.textContent = `${parseInt(opponentScoreElem.textContent || '0') + 1}`;
  } else {
    playerScoreElem.textContent = `${parseInt(playerScoreElem.textContent || '0') + 1}`;
  }
}

function isGameOver() {
  const rect = ball.rect();
  return rect.left <= 0 || rect.right >= window.innerWidth;
}
document.addEventListener('mousemove', (event) => {
  player.position = (event.y / window.innerHeight) * 100;
});
window.requestAnimationFrame(update);
