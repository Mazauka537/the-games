//param
let createObjsDelay = 800;
let chanceCloud = 4;  //4
let chanceStar = 3;   //3
let chanceBird = 2;   //2
let chanceParash = 2; //2

let maxSoundValue = 100;

//perem
let timerGameFrame;
let timerCreateObjects;
let layout = document.getElementById('layout');
let scoreField = document.getElementById('score');
let fuelField = document.getElementById('fuel');
let mainWindow = document.getElementById('window');
let player = new Player(layout);
let vectorX = 0;
let vectorY = 0;
let objs = [];
let fuel = 100;
let score = 0;
let gameStatus = 'none'; //active paused none
let soundValue = maxSoundValue;

//events
document.onkeydown = keyDown;
document.onkeyup = keyUp;
document.onkeypress = keyPress;
document.getElementById('btn-main').onclick = startGame;

document.getElementById('btn-mute').onclick = btnMuteClick;

//functions
function startGame() {
  if (gameStatus == 'none') {
    gameStatus = 'active';
    vectorX = 0;
    vectorY = 0;
    objs = [];
    layout.innerHTML = '';
    player = new Player(layout);
    fuel = 100;
    score = 0;
    scoreField.innerHTML = score;
    fuelField.style.width = (fuel * 2) + 'px';
    mainWindow.style.display = 'none';
    timerGameFrame = setInterval(gameFrame, 10);
    timerCreateObjects = setInterval(createObjs, createObjsDelay);
  }
}

function stopGame() {
  if (gameStatus == 'active') {
    gameStatus = 'none';
    mainWindow.firstElementChild.firstElementChild.innerHTML = 'GAME OVER<br>your score: ' + score;
    mainWindow.firstElementChild.children[1].style.display = 'none';
    mainWindow.firstElementChild.lastElementChild.value = 'Restart';
    mainWindow.firstElementChild.lastElementChild.onclick = startGame;
    mainWindow.style.display = 'block';
    clearInterval(timerGameFrame);
    clearInterval(timerCreateObjects);
  }
}

function pauseGame() {
  if (gameStatus == 'active') {
    gameStatus = 'paused';
    mainWindow.firstElementChild.firstElementChild.innerHTML = 'Paused!';
    mainWindow.firstElementChild.children[1].style.display = 'none';
    mainWindow.firstElementChild.lastElementChild.value = 'Resume';
    mainWindow.firstElementChild.lastElementChild.onclick = resumeGame;
    mainWindow.style.display = 'block';
    clearInterval(timerGameFrame);
    clearInterval(timerCreateObjects);
  }
}

function resumeGame() {
  if (gameStatus == 'paused') {
    gameStatus = 'active';
    mainWindow.style.display = 'none';
    timerGameFrame = setInterval(gameFrame, 10);
    timerCreateObjects = setInterval(createObjs, createObjsDelay);
  }
}

function gameFrame() {
  //move objects
  player.X = player.x + vectorX;
  player.Y = player.y + vectorY;
  for (let i = 0; i < objs.length; i++) {
    objs[i].move();
    if (objs[i].outOfLayout()) {
      layout.removeChild(objs[i].elem);
      objs.splice(i, 1);
    }
  }
  //change fuel
  fuel -= 0.03;
  fuelField.style.width = (fuel * 2) + 'px';
  //check collision
  let i = player.checkCollision(objs);
  if (i !== false) {
    switch (objs[i].type) {
      case 'star':
        score++;
        scoreField.innerHTML = score;
        layout.removeChild(objs[i].elem);
        objs.splice(i, 1);
        break;
      case 'bird':
        stopGame();
        break;
      case 'parash':
        fuel = 100;
        fuelField.style.width = (fuel * 2) + 'px';
        layout.removeChild(objs[i].elem);
        objs.splice(i, 1);
        break;
    }
  }
}

function createObjs() {
  let chanceSum = chanceCloud + chanceStar + chanceBird + chanceParash;
  let chanceVal = Math.random() * chanceSum;
  let obj;
  if (chanceVal <= chanceCloud)
    obj = new Cloud(layout);
  else if (chanceVal > chanceCloud && chanceVal <= chanceCloud + chanceStar)
    obj = new Star(layout);
  else if (chanceVal > chanceCloud + chanceStar && chanceVal <= chanceCloud + chanceStar + chanceBird)
    obj = new Bird(layout);
  else if (chanceVal > chanceCloud + chanceStar + chanceBird && chanceVal <= chanceCloud + chanceStar + chanceBird + chanceParash)
    obj = new Parash(layout);
  objs.push(obj);
}

let key_left = false;
let key_right = false;
let key_up = false;
let key_down = false;

function keyDown(e) {
  switch (e.keyCode) {
    case 37: //left
      vectorX = -player.speed;
      key_left = true;
      break;
    case 38: //up
      vectorY = -player.speed;
      key_up = true;
      break;
    case 39: //right
      vectorX = player.speed;
      key_right = true;
      break;
    case 40: //down
      vectorY = player.speed;
      key_down = true;
      break;
  }
}

function keyUp(e) {
  switch (e.keyCode) {
    case 37: //left
      key_left = false;
      vectorX = key_right ? player.speed : 0;
      break;
    case 38: //up
      key_up = false;
      vectorY = key_down ? player.speed : 0;
      break;
    case 39: //right
      key_right = false;
      vectorX = key_left ? -player.speed : 0;
      break;
    case 40: //down
      key_down = false;
      vectorY = key_up ? -player.speed : 0;
      break;
  }
}

function keyPress(e) {
  switch (e.keyCode) {
    case 32:
      pauseGame();
      break;
    case 13:
      document.getElementById('btn-main').click();
      break;
  }
}

function btnMuteClick() {
  if (soundValue == 0) {
    soundValue = maxSoundValue;
    this.classList.remove('mute-active');
  } else if (soundValue == maxSoundValue) {
    soundValue = 0;
    this.classList.add('mute-active');
  } 
}