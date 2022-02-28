const SPEED = 0.008;

export default class Paddle {
  paddleElem: HTMLElement
  constructor(paddleElem: HTMLElement | null) {
    if (!paddleElem) {
      throw new Error('invalid dom elemnt')
    }
    this.paddleElem = paddleElem;
    this.reset();
  }
  get position() {
    return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue('--position'));
  }
  set position(value: number) {
    this.paddleElem.style.setProperty('--position', `${value}`);
  }

  update(delta: number, ballHeight: number) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }
}
