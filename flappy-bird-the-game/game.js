class Game {
  constructor(layout) {
    this.layout = layout;
    this.scoreField = document.getElementById('scoreField');
    this.interface = document.getElementById('interface');
    this.state = 'ready';
    this._score = 0;
    this.bestScore = 0;
    this.canGetPoint = true;
    this.pipes = [new PairPipes(layout)];
    this.pipesSpeed = 1.5; //px
    this.earth = new Earth(layout);
    this.horizontalPipeDispance = 160;
    this.bird = new Bird(layout);
    this.mute = true;
    document.getElementById('screen').onclick = () => this.click();
    this.deathDialog = document.getElementById('death-dialog-btn');
    this.deathDialog.ontouchstart = (e) => {
      this.deathDialog.style.transform = 'translateY(3px)';
    }
    this.deathDialog.ontouchend = (e) => {
      this.deathDialog.style.transform = 'translateY(0px)';
    }
    this.deathDialog.onclick = (e) => {
      e.stopPropagation();
      this.reload();
    }
    this.timer = setInterval(() => {
      this.frame();
    }, 15);
  }

  start() {
    this.state = 'play';
    this.bird.elem.style.animationName = 'none, bird-fly';
    this.bird.elem.style.animationDuration = '0.25s, 0.25s';
    document.getElementById('startDialog').style.display = 'none';
  }

  stop() {
    if (!this.mute) {
      new Audio('Assets/die.wav').play();
    }
    this.state = 'death';
    document.getElementById('death-flash').style.animationName = 'death-flash';
    this.bird.elem.style.animationName = 'none';

    let dialog = document.getElementById('deathDialog');

    let medal = 'none';
    if (this.score > 9) {
      medal = 'bronze';
    }
    if (this.score > 19) {
      medal = 'silver';
    }
    if (this.score > 29) {
      medal = 'gold';
    }
    if (this.score > 39) {
      medal = 'platinum';
    }
    let med = document.getElementById('medal');
    med.classList.remove('none', 'bronze', 'silver', 'gold', 'platinum');
    med.classList.add(medal);

    dialog.style.top = +(this.interface.offsetHeight * 2) + 'px';
    dialog.style.display = 'block';
    setTimeout(() => {
      dialog.style.top = 50 + '%';
    }, 200);
    this.showDeathDialog();
  }

  reload() {
    let dflash = document.getElementById('death-flash');
    dflash.style.animationName = 'none';
    dflash.style.background = '#000';
    dflash.style.opacity = 1;
    document.getElementById('deathDialog').style.zIndex = 199;

    setTimeout(() => {
      this.bird.elem.style.animationName = 'bird-ready-state, bird-fly';
      this.bird.elem.style.animationDuration = '0.25s, 0.5s';
      for (var i = 0; i < this.pipes.length; i++) {
        this.pipes[i].destroy();
      }
      this.pipes = [new PairPipes(this.layout)];

      document.getElementById('deathDialog').style.display = 'none';
      document.getElementById('deathDialog').style.zIndex = 201;
      document.getElementById('startDialog').style.display = 'block';

      this.state = 'ready';
      this.bird.bottom = this.layout.offsetHeight / 2;
      this.bird.rotate = 0;
      this.score = 0;
      dflash.style.opacity = 0;

      setTimeout(() => {
        dflash.style.background = '#fff';

      }, 300);
    }, 300);
  }

  showDeathDialog() {
    let deathDialog = document.getElementById('deathDialog');
    deathDialog.querySelector('#score-now').innerHTML = this.score;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
    }
    deathDialog.querySelector('#score-best').innerHTML = this.bestScore;
    deathDialog.style.display = 'block';
  }

  frame() {
    if (this.state == 'play') {
      for (var i = 0; i < this.pipes.length; i++) {
        this.pipes[i].move(this.pipesSpeed);
      }

      this.earth.move(this.pipesSpeed);

      if (this.pipes[this.pipes.length - 1].upPipe.right > this.horizontalPipeDispance) {
        this.createNewPipes();
      }

      if (this.pipes[0].upPipe.right > this.layout.offsetWidth) {
        this.pipes[0].destroy();
        this.pipes.shift();
      }
    }

    if (this.state == 'play' || this.state == 'death') {
      this.bird.move();
    }

    if (this.state == 'play') {
      this.checkCollision();
    }

    if (this.state == 'ready') {
      this.earth.move(this.pipesSpeed);
    }
  }

  checkCollision() {
    let left = this.layout.offsetWidth - this.pipes[0].upPipe.right - this.pipes[0].upPipe.width;

    if (left + this.pipes[0].upPipe.width > this.bird.left && left < this.bird.left + this.bird.width - 3) {
      if (this.bird.bottom < this.pipes[0].downPipe.height || this.layout.offsetHeight - this.bird.bottom - this.bird.height < this.pipes[0].upPipe.height) {
        this.stop();
      }
    }

    if (this.bird.bottom <= 0) {
      this.stop();
    }

    if (this.pipes[0].upPipe.right >= this.layout.offsetWidth - this.bird.left) {
      if (this.canGetPoint) {
        if (!this.mute) {
          new Audio('Assets/point.wav').play();
        }
        this.score++;
      }
      this.canGetPoint = false;
    } else {
      this.canGetPoint = true;
    }
  }

  click() {
    if (this.state == 'ready') {
      this.start();
    }
    if (this.state == 'play') {
      if (!this.mute) {
        new Audio('Assets/wing.wav').play();
      }
      this.bird.speed = -this.bird.maxSpeed;
    }
  }

  createNewPipes() {
    this.pipes.push(new PairPipes(this.layout));
  }

  get score() {
    return this._score;
  }

  set score(value) {
    this._score = value;
    this.scoreField.innerHTML = value;
  }
}