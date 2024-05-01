class obj {
  constructor(o) {
    this.layout = o.layout;
  }

  set X(val) {
    this.x = val;
    this.elem.style.left = this.x + 'px';
  }

  create() {
    let div = document.createElement('div');
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    return div;
  }
}

class cloud extends obj {
  constructor(o) {
    super(o);
    this.type = 'cloud';
    this.width = 140;
    this.height = 80;
    this.x = o.layout.offsetWidth + this.width;
    this.y = Math.round(Math.random() * (o.layout.offsetHeight - this.height));
    this.elem = this.create();
    this.elem.classList.add('obj-cloud');
  }
}

class bird extends obj {
  constructor(o) {
    super(o);
    this.type = 'bird';
    this.width = 80;
    this.height = 60;
    this.x = o.layout.offsetWidth + this.width;
    this.y = Math.round(Math.random() * (o.layout.offsetHeight - this.height));
    this.elem = this.create();
    this.elem.classList.add('obj-bird');
  }
}

class ufo extends obj {
  constructor(o) {
    super(o);
    this.type = 'ufo';
    this.width = 110;
    this.height = 48;
    this.x = o.layout.offsetWidth + this.width;
    this.y = Math.round(Math.random() * (o.layout.offsetHeight - (this.height * 4)) + (this.height * 1.5));
    this.elem = this.create();
    this.elem.classList.add('obj-ufo');
  }
  set Y(val) {
    this.y = val;
    this.elem.style.top = this.y + 'px';
  }
}

class Player extends obj {
  constructor(o) {
    super(o);
    this.width = 120;
    this.height = 100;
    this.x = 50;
    this.y = o.layout.offsetHeight / 2 - (this.height / 2);
    this.elem = this.create();
    this.elem.classList.add('obj-player');
  }

  set Y(val) {
    this.y = val;
    if (this.y < 0) this.y = 0;
    if (this.y > this.layout.offsetHeight - this.height) this.y = this.layout.offsetHeight - this.height;
    this.elem.style.top = this.y + 'px';
  }

  set X(val) {
    this.x = val;
    if (this.x < 0) this.x = 0;
    if (this.x > this.layout.offsetWidth - this.width) this.x = this.layout.offsetWidth - this.width;
    this.elem.style.left = this.x + 'px';
  }

  checkCollision(objs) {
    let t = false;
    let pt = -25;
    let pr = -20;
    let pb = 20;
    let pl = 25;
    for (let i = 0; i < objs.length; i++) {
      if (objs[i].type != 'cloud')
        if (this.x + this.width + pr > objs[i].x && this.y + this.height + pt > objs[i].y && this.x + pl < objs[i].x + objs[i].width && this.y + pb < objs[i].y + objs[i].height)
          t = true;
    }
    return t;
  }
}

class bullet extends obj {
  constructor(o) {
    super(o);
    this.width = 20;
    this.height = 12;
    this.x = o.player.x + o.player.width - 20;
    this.y = o.player.y + (o.player.height / 2) + 21;
    this.elem = this.create();
    this.elem.classList.add('obj-bullet');
  }
  checkCollision(objs) {
    let shootedObjs = {};
    let t = false;
    for (let i = 0; i < objs.length; i++) {
      if (objs[i].type != 'cloud')
        if (this.x + this.width + 10 > objs[i].x && this.y + this.height > objs[i].y && this.x < objs[i].x + objs[i].width && this.y < objs[i].y + objs[i].height) {
          shootedObjs[i] = objs[i];
          t = true;
        }
    }
    if (t == false)
      return false;
    else
      return shootedObjs;
  }
}
