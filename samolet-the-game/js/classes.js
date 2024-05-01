class Obj {
  constructor(layout) {
    this.layout = layout;
  }
  create(type) {
    let elem = document.createElement('div');
    elem.classList.add('obj', type);
    elem.style.height = this.height + 'px';
    elem.style.width = this.width + 'px';
    elem.style.left = this.x + 'px';
    elem.style.top = this.y + 'px';
    this.layout.appendChild(elem);
    return elem;
  }
  outOfLayout() {
    if (this.x + this.width < 0 || this.y > this.layout.offsetHeight)
      return true;
    else
      return false;
  }
}

class Cloud extends Obj {
  constructor(layout) {
    super(layout);
    this.type = 'cloud';
    this.width = Math.round(Math.random() * 100 + 100);
    this.height = this.width * 706 / 1426;
    this.speed = this.width / 100;
    this.x = this.layout.offsetWidth + this.width;
    this.y = Math.round(Math.random() * (this.layout.offsetHeight - this.height));
    this.elem = this.create(this.type);
    this.elem.style.zIndex = this.width - 90;
  }

  move() {
    this.x -= this.speed;
    this.elem.style.left = this.x + 'px';
  }
}

class Star extends Obj {
  constructor(layout) {
    super(layout);
    this.speed = 2;
    this.type = 'star';
    this.width = 50;
    this.height = 50;
    this.x = this.layout.offsetWidth + this.width;
    this.y = Math.round(Math.random() * (this.layout.offsetHeight - this.height - 150) + 75);
    this.elem = this.create(this.type);
  }
  move() {
    this.x -= this.speed;
    this.elem.style.left = this.x + 'px';
    this.y += Math.sin(this.x / 60) * 2.1;
    this.elem.style.top = this.y + 'px';
  }
}

class Bird extends Obj {
  constructor(layout) {
    super(layout);
    this.speed = 3;
    this.type = 'bird';
    this.width = 85;
    this.height = 59;
    this.x = this.layout.offsetWidth + this.width;
    this.y = Math.round(Math.random() * (this.layout.offsetHeight - this.height));
    this.elem = this.create(this.type);
  }
  move() {
    this.x -= this.speed;
    this.elem.style.left = this.x + 'px';
  }
}

class Parash extends Obj {
  constructor(layout) {
    super(layout);
    this.speed = 2;
    this.type = 'parash';
    this.width = 100;
    this.height = 120;
    this.x = Math.round(Math.random() * (this.layout.offsetWidth - this.width));
    this.y = 0 - this.height;
    this.elem = this.create(this.type);
  }
  move() {
    this.y += this.speed;
    this.elem.style.top = this.y + 'px';
  }
}

class Player extends Obj {
  constructor(layout) {
    super(layout);
    this.speed = 4;
    this.type = 'player';
    this.height = 57;
    this.width = 125;
    this.x = 15;
    this.y = this.layout.offsetHeight / 2 - (this.height / 2);
    this.elem = this.create(this.type);
  }
  set X(val) {
    if (val < 0) val = 0;
    if (val > this.layout.offsetWidth - this.width) val = this.layout.offsetWidth - this.width;
    this.x = val;
    this.elem.style.left = this.x + 'px';
  }
  set Y(val) {
    if (val < 0) val = 0;
    if (val > this.layout.offsetHeight - this.height) val = this.layout.offsetHeight - this.height;
    this.y = val;
    this.elem.style.top = this.y + 'px';
  }

  checkCollision(objs) {
    for (let i = 0; i < objs.length; i++)
      if (objs[i].type != 'cloud')
        if (this.x + this.width - 20 > objs[i].x && this.y + this.height - 10 > objs[i].y && this.x + 20 < objs[i].x + objs[i].width && this.y + 20 < objs[i].y + objs[i].height) {
          return i;
        }

    return false;
  }
}