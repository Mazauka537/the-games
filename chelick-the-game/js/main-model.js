const _gameSpeed = 99;
const _levelSpeed = 2;
const _playerSpeed = 5;
const _rockCount = 3;
const _bananCount = 2;
const _grapeCount = 2;
const _grassCount = 4;

let gameSpeed = 1000 - (_gameSpeed * 10);
let levelSpeed = _levelSpeed;
let playerSpeed = _playerSpeed;
let rockCount = _rockCount;
let bananCount = _bananCount;
let grapeCount = _grapeCount;
let grassCount = _grassCount;

let vectorX = 0;
let vectorY = 0;
let score = 0;
let scoreArr = [];
let gameStatus = 'none';
let mute = false;
let music = new Audio();
let levelsPanel = document.getElementById('levels');
let levels = [];
let player = { player: document.getElementById('player'), x: 40, y: levelsPanel.offsetHeight / 2 }
let scorePanel = document.getElementById('score');
let timer;
let alert = document.getElementById('alert');

function pauseGame() {
  gameStatus = 'paused';
  clearInterval(timer);
  document.getElementById('alert-text').innerHTML = 'Пауза!';
  document.getElementById('btn-start').innerHTML = 'Возобновить';
  document.getElementById('btn-start').onclick = resumeGame;
  alert.style.display = 'block';
  document.getElementById('btn-pause').style.backgroundImage = "url('images/right.png')";
}

function resumeGame() {
  gameStatus = 'active';
  alert.style.display = 'none';
  document.getElementById('btn-start').onclick = startGame;
  timer = setInterval(go, gameSpeed);
  document.getElementById('btn-pause').style.backgroundImage = "url('images/pause.png')";
}

function startGame() {
  gameStatus = 'active';
  playMusic('music/stage.mp3');
  alert.style.display = 'none';
  score = 0;
  levelsPanel.innerHTML = '';
  scorePanel.innerHTML = 0;
  player.x = 40;
  player.y = levelsPanel.offsetHeight / 2;
  player.player.style.left = player.x + 'px';
  player.player.style.top = player.y + 'px';

  for (let i = 0; i < 3; i++) {
    if (i == 0)
      levels[i] = new Level({
        height: levelsPanel.offsetHeight,
        width: levelsPanel.offsetWidth,
        top: i * -levelsPanel.offsetHeight,
        rockCount: rockCount,
        bananCount: bananCount,
        grapeCount: grapeCount,
        grassCount: grassCount,
        withoutItems: true
      });
    else
      levels[i] = new Level({
        height: levelsPanel.offsetHeight,
        width: levelsPanel.offsetWidth,
        top: i * -levelsPanel.offsetHeight,
        rockCount: rockCount,
        bananCount: bananCount,
        grapeCount: grapeCount,
        grassCount: grassCount
      });
    levelsPanel.appendChild(levels[i].level);
  }

  timer = setInterval(go, gameSpeed);
}

function go() {
  //update levels
  for (let i = 0; i < levels.length; i++) {
    levels[i].Top = levels[i].Top + levelSpeed;
  }

  if (levels[0].top >= levelsPanel.offsetHeight) {
    levels[0] = levels[1];
    levels[1] = levels[2];
    levels[2] = new Level({
      height: levelsPanel.offsetHeight,
      width: levelsPanel.offsetWidth,
      top: 2 * -levelsPanel.offsetHeight,
      rockCount: rockCount,
      bananCount: bananCount,
      grapeCount: grapeCount,
      grassCount: grassCount
    });
    levelsPanel.appendChild(levels[2].level);
  }

  //move player
  player.x += vectorX;
  player.y += vectorY;

  if (player.x < 0)
    player.x = 0;
  if (player.x > levelsPanel.offsetWidth - player.player.offsetWidth)
    player.x = levelsPanel.offsetWidth - player.player.offsetWidth;
  if (player.y < 0)
    player.y = 0;
  if (player.y > levelsPanel.offsetHeight - player.player.offsetHeight)
    player.y = levelsPanel.offsetHeight - player.player.offsetHeight;

  player.player.style.left = player.x + 'px';
  player.player.style.top = player.y + 'px';

  //check collision
  checkCollision(levels[0], player);
  checkCollision(levels[1], player);
}

function checkCollision(level, player) {
  let px = player.x;
  let py = player.y;
  let ph = player.player.offsetHeight;
  let pw = player.player.offsetWidth;
  for (let i = 0; i < level.items.length; i++) {
    let ix = level.items[i].x;
    let iy = level.items[i].y + level.Top;
    let ih = level.items[i].height;
    let iw = level.items[i].width;
    if (level.items[i].type == 'rock') {
      ix += 7;
      iy += 10;
      ih -= 20;
      iw -= 14;
    }
    if ((px + pw > ix && px < ix + iw) && (py + ph > iy && py < iy + ih)) {
      if (level.items[i].type == 'rock') {
        stopGame();
        playMusic('music/end.mp3');
        return false;
      } else {
        score++;
        scorePanel.innerHTML = score;
        if (!mute) playSound('music/star.mp3')
      }
      level.items.splice(i, 1);
      level.level.removeChild(level.level.children[i]);
      i -= 1;
    }
  }
}

function stopGame() {
  gameStatus = 'none';
  clearInterval(timer);
  scoreArr.push(score);
  document.getElementById('alert-text').innerHTML = 'Game over<br>Ваш результат: ' + score + '<br>Лучший результат: ' + Math.max(...scoreArr);
  document.getElementById('btn-start').innerHTML = 'Попробовать ещё раз';
  alert.style.display = 'block';
}

function movePlayer(e) {
  let animated = true;
  switch (e.keyCode) {
    case 38:
      vectorY = -playerSpeed;
      break;
    case 40:
      vectorY = playerSpeed + levelSpeed;
      break;
    case 37:
      vectorX = -playerSpeed;
      player.player.classList.add('h-flip');
      break;
    case 39:
      vectorX = playerSpeed;
      player.player.classList.remove('h-flip');
      break;
    default:
      animated = false;
      break;
  }
  if (animated)
    player.player.classList.add('animation-move');
}

function stopPlayer(e) {
  switch (e.keyCode) {
    case 38:
      if (vectorY == -playerSpeed)
        vectorY = 0;
      break;
    case 40:
      if (vectorY == playerSpeed + levelSpeed)
        vectorY = 0;
      break;
    case 37:
      if (vectorX == -playerSpeed)
        vectorX = 0
      break;
    case 39:
      if (vectorX == playerSpeed)
        vectorX = 0
      break;
  }
  if (vectorX == 0 && vectorY == 0)
    player.player.classList.remove('animation-move', 'h-flip');
}

function pressKey(e) {
  switch (e.keyCode) {
    case 13:
      if (gameStatus == 'none')
        startGame();
      if (gameStatus == 'paused')
        resumeGame();
      break;
    case 32:
      if (gameStatus == 'active')
        pauseGame();
      break;
  }
}

function Mute() {
  mute = !mute;
  if (mute == true) {
    music.volume = 0;
    document.getElementById('btn-mute').style.backgroundImage = "url('images/sound_off.png')";
  }
  else {
    music.volume = 0.1;
    document.getElementById('btn-mute').style.backgroundImage = "url('images/sound_on.png')";
    music.play();
  }
}

function playMusic(url) {
  music.pause();
  music = new Audio();
  music.src = url;
  music.loop = true;
  music.volume = 0.1;
  if (mute) music.volume = 0;
  music.play();
}

function playSound(url) {
  var sound = new Audio();
  sound.src = url;
  sound.volume = 0.2;
  sound.play();
}

function moveLeft() {
  vectorX = -playerSpeed;
}
function moveRight() {
  vectorX = playerSpeed;
}
function moveUp() {
  vectorY = -playerSpeed;
}
function moveDown() {
  vectorY = playerSpeed + levelSpeed;
}
function stopMove() {
  vectorX = 0;
  vectorY = 0;
}