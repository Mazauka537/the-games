//game settings
let cloudSpeed = 1.5;
let birdSpeed = 2;
let playerSpeed = 3;
let bulletSpeed = 5;
let ufoSpeed = 1;
let spawnObjInterval = 1000;
let chanceSpawnCloud = 40;
let chanceSpawnBird = 20;
let chanceSpawnUfo = 40;
let playerSpeedOnTablet = 16;
let maxAmmo = 5;
let reloadDelay = 1500;
let maxHealth = 3;

//params
let objs = [];
let layout = document.getElementById('layout');
let player = new Player({ layout });
layout.appendChild(player.elem);
let vectorY = 0;
let vectorX = 0;
let gameTimerMain;
let gameTimerSpawnObj;
let mainWindow = document.getElementById('main-window');
let score = 0;
let bullets = [];
let bulletDelay = false;
let scoreField = document.getElementById('score-field');
let ammo = 0;
let health = 3;
let ammoBox = document.getElementById('ammo');
let isReloading = false;
let gameStatus = 'none';
let healthBox = document.getElementById('health');
reloadAmmo(0);
reloadHealth();

//set events
document.onkeydown = keyDown;
document.onkeyup = keyUp;
document.getElementById('start-btn').onclick = startGame;
document.onkeypress = keyPress;
document.getElementById('stick').ontouchstart = touchMoveStick;
document.getElementById('stick').ontouchmove = touchMoveStick;
document.getElementById('stick').ontouchend = touchEndStick;
document.getElementById('btn-shoot').onclick = btnShootClick;
document.getElementById('btn-reload').onclick = function () {
  reloadAmmo(reloadDelay);
};
document.getElementById('btn-pause').onclick = pauseGame;

//functions
function touchMoveStick(e) {
  let handle = document.getElementById('stick-handle');
  let touchX = e.touches[0].clientX - this.getBoundingClientRect().x - (this.offsetWidth / 2);
  let touchY = e.touches[0].clientY - this.getBoundingClientRect().y - (this.offsetHeight / 2);

  let touchR = Math.sqrt(touchX * touchX + touchY * touchY);
  let r = this.offsetWidth / 2;
  let a = Math.acos(touchX / touchR) / Math.PI * 180;

  if (touchX < -r) touchX = -r;
  if (touchX > r) touchX = r;
  if (touchY < -r) touchY = -r;
  if (touchY > r) touchY = r;

  vectorX = touchX / playerSpeedOnTablet;
  vectorY = touchY / playerSpeedOnTablet;

  if (touchR < r) {
    handle.style.left = touchX + r + 'px';
    handle.style.top = touchY + r + 'px';
  } else {
    if (touchY < 0) a *= -1;
    let rad = a / 180 * Math.PI;
    let x = r * Math.cos(rad);
    let y = r * Math.sin(rad);

    handle.style.left = x + r + 'px';
    handle.style.top = y + r + 'px';
  }
}

function touchEndStick() {
  let handle = document.getElementById('stick-handle');

  vectorX = 0;
  vectorY = 0;

  handle.style.left = '';
  handle.style.top = '';
  handle.style.left = '';
}

function startGame() {
  if (gameStatus == 'none') {
    gameStatus = 'active';
    layout.innerHTML = '';
    objs = [];
    bullets = [];
    reloadAmmo(0);
    reloadHealth();
    score = 0;
    scoreField.innerHTML = score;
    player = new Player({ layout });
    layout.appendChild(player.elem);
    mainWindow.style.display = 'none';
    gameTimerMain = setInterval(gameFrame, 10);
    gameTimerSpawnObj = setInterval(spawnObj, spawnObjInterval);
  }
}

function stopGame() {
  if (gameStatus == 'active') {
    gameStatus = 'none';
    clearInterval(gameTimerMain);
    clearInterval(gameTimerSpawnObj);
    mainWindow.style.display = 'block';
    mainWindow.firstElementChild.innerHTML = 'GAME OVER<br>score: ' + score;
    mainWindow.lastElementChild.innerHTML = 'Ещё раз';
    mainWindow.lastElementChild.onclick = startGame;
  }
}

function pauseGame() {
  if (gameStatus == 'active') {
    gameStatus = 'paused';
    clearInterval(gameTimerMain);
    clearInterval(gameTimerSpawnObj);
    mainWindow.style.display = 'block';
    mainWindow.firstElementChild.innerHTML = 'Пауза!';
    mainWindow.lastElementChild.innerHTML = 'Продолжить';
    mainWindow.lastElementChild.onclick = resumeGame;
  }
}

function resumeGame() {
  if (gameStatus == 'paused') {
    gameStatus = 'active';
    mainWindow.style.display = 'none';
    gameTimerMain = setInterval(gameFrame, 10);
    gameTimerSpawnObj = setInterval(spawnObj, spawnObjInterval);
  }
}

function gameFrame() {
  //move objs
  let speed = 1;
  for (let i = 0; i < objs.length; i++) {
    if (objs[i].type == 'bird')
      speed = birdSpeed;
    else if (objs[i].type == 'cloud')
      speed = cloudSpeed;
    else if (objs[i].type == 'ufo')
      speed = ufoSpeed;
    objs[i].X = objs[i].x - speed;

    if (objs[i].type == 'ufo') {
      objs[i].Y = objs[i].y + Math.sin(objs[i].x / objs[i].height);
    }

    if (objs[i].x < 0 - objs[i].width - 10) {
      if (objs[i].type == 'ufo') {
        health--;
        healthBox.removeChild(healthBox.lastElementChild);
      }

      layout.removeChild(objs[i].elem);
      objs.splice(i, 1);

      if (health <= 0)
        stopGame();
    }
  }
  //move player
  player.Y = player.y + vectorY;
  player.X = player.x + vectorX;
  //move bullets
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].X = bullets[i].x + bulletSpeed;
    if (bullets[i].x > layout.offsetWidth + 10) {
      layout.removeChild(bullets[i].elem);
      bullets.splice(i, 1);
    }
  }
  //check collision
  if (player.checkCollision(objs) == true)
    stopGame();
  for (let i = 0; i < bullets.length; i++) {
    let shootedObjs = bullets[i].checkCollision(objs);
    if (shootedObjs != false) {
      layout.removeChild(bullets[i].elem);
      bullets.splice(i, 1);
      for (let prop in shootedObjs) {
        if (shootedObjs[prop].type == 'bird')
          score--;
        else
          score++;
        layout.removeChild(objs[prop].elem);
        objs.splice(prop, 1);
        scoreField.innerHTML = score;
      }
    }
  }
}

function spawnObj() {
  let randParam = Math.random() * (chanceSpawnUfo + chanceSpawnBird + chanceSpawnCloud);
  let newObj;
  if (randParam <= chanceSpawnCloud)
    newObj = new cloud({ layout });
  else if (randParam > chanceSpawnCloud && randParam <= chanceSpawnBird + chanceSpawnCloud)
    newObj = new bird({ layout });
  else if (randParam > chanceSpawnBird + chanceSpawnCloud && randParam <= chanceSpawnBird + chanceSpawnCloud + chanceSpawnUfo)
    newObj = new ufo({ layout });
  layout.appendChild(newObj.elem);
  objs.push(newObj);

}

function keyDown(e) {
  switch (e.keyCode) {
    case 38:
      vectorY = -playerSpeed;
      break;
    case 40:
      vectorY = playerSpeed;
      break;
    case 37:
      vectorX = -playerSpeed;
      break;
    case 39:
      vectorX = playerSpeed;
      break;
  }
}

function keyUp(e) {
  switch (e.keyCode) {
    case 38:
      if (vectorY == -playerSpeed)
        vectorY = 0;
      break;
    case 40:
      if (vectorY == playerSpeed)
        vectorY = 0;
      break;
    case 37:
      if (vectorX == -playerSpeed)
        vectorX = 0;
      break;
    case 39:
      if (vectorX == playerSpeed)
        vectorX = 0;
      break;
  }
}

function keyPress(e) {
  switch (e.keyCode) {
    case 32:
      btnShootClick();
      break;
    case 114:
      reloadAmmo(reloadDelay);
      break;
    case 1082:
      reloadAmmo(reloadDelay);
      break;
    case 112:
      pauseGame();
      break;
    case 1079:
      pauseGame();
      break;
    case 13:
      mainWindow.lastElementChild.click();
      break;
  }
}

function btnShootClick() {
  if (ammo > 0 && isReloading == false && gameStatus == 'active') {
    let newBullet = new bullet({ layout, player });
    bullets.push(newBullet);
    layout.appendChild(newBullet.elem);
    ammo--;
    ammoBox.removeChild(ammoBox.lastElementChild);
  }
}

function reloadAmmo(rDelay) {
  if (isReloading == false && ammo != maxAmmo && gameStatus == 'active') {
    isReloading = true;
    ammo = maxAmmo;
    ammoBox.innerHTML = '';
    for (let i = 0; i < maxAmmo; i++) {
      setTimeout(() => {
        let div = document.createElement('div');
        div.classList.add('ammo-bullet');
        div.style.left = (i * 15) + 'px';
        ammoBox.appendChild(div);
      }, Math.floor(rDelay / maxAmmo) * i);
    }
    setTimeout(() => {
      isReloading = false;
    }, rDelay);
  }
}

function reloadHealth() {
  health = maxHealth;
  healthBox.innerHTML = '';
  for (let i = 0; i < maxHealth; i++) {
    let div = document.createElement('div');
    div.classList.add('health-heal');
    div.style.left = (i * 25) + 'px';
    healthBox.appendChild(div);
  }
}
///////
