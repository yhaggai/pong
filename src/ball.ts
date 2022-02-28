const INITIAL_SPEED = 0.025;
const ACCELERATION = 0.0001;

function randomNumberBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default class Ball {
  ballElem: HTMLElement
  direction: { x: number, y: number }
  speed: number
  constructor(ballElem: HTMLElement | null) {
    if (!ballElem) {
      throw new Error('invalid dom element')
    }
    this.ballElem = ballElem;
    this.direction = { x: 0, y: 0 }
    this.speed = INITIAL_SPEED;
    this.reset();
  }
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'));
  }
  set x(value: number) {
    this.ballElem.style.setProperty('--x', `${value}`);
  }
  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'));
  }
  set y(value: number) {
    this.ballElem.style.setProperty('--y', `${value}`);
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.speed = INITIAL_SPEED;
    this.direction = { x: 0, y: 0.0 };
    while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.speed = INITIAL_SPEED;
  }

  rect() {
    return this.ballElem.getBoundingClientRect();
  }
  update(delta: number, paddleRects: DOMRect[]) {
    this.x += this.direction.x * this.speed * delta;
    this.y += this.direction.y * this.speed * delta;
    this.speed += ACCELERATION;
    const rect = this.rect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      this.direction.y = -this.direction.y;
    }
    if (paddleRects.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function isCollision(ballRect: DOMRect, paddleRect: DOMRect) {
  return (
    ballRect.left <= paddleRect.right &&
    ballRect.right >= paddleRect.left &&
    ballRect.top <= paddleRect.bottom &&
    ballRect.bottom >= paddleRect.top
  );
}
