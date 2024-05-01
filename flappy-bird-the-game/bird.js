class Bird {
  constructor(layout) {
    this.layout = layout;
    this.height = 24;
    this.width = 34;
    this.left = 75;
    this._bottom = this.layout.offsetHeight / 2;
    this._rotate = 0;

    this.speed = 0;
    this.a = 0.35;
    this.maxSpeed = 7;

    this.elem = this.createBird();
  }

  createBird() {
    let div = document.createElement('div');
    div.classList.add('bird');
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.left = this.left + 'px';
    div.style.bottom = this.bottom + 'px';
    div.style.transform = 'rotateZ(0deg)';
    this.layout.append(div);
    return div;
  }

  move() {
    this.bottom -= this.speed;
    if (this.bottom > 0) {
      if (this.bottom > this.layout.offsetHeight) {
        this.speed = 0.5;
      }
      this.speed += this.a;
      if (this.speed > this.maxSpeed)
        this.speed = this.maxSpeed;

      let minRotate = -15;
      let maxRotate = 90;
      let rotate = this.speed * 16 - 50;
      if (rotate < minRotate) rotate = minRotate;
      if (rotate > maxRotate) rotate = maxRotate;
      this.rotate = rotate;
    } else {
      this.speed = 0;
    }
  }

  get bottom() {
    return this._bottom;
  }

  set bottom(value) {
    this._bottom = value;
    this.elem.style.bottom = value + 'px';
  }

  get rotate() {
    return this._rotate;
  }

  set rotate(value) {
    this._rotate = value;
    this.elem.style.transform = 'rotateZ(' + value + 'deg)';
  }
}