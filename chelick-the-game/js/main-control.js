document.onkeypress = pressKey;

document.onkeydown = movePlayer;
  
document.onkeyup = stopPlayer;
  
document.getElementById('btn-start').onclick = startGame;

document.getElementById('btn-pause').onclick = pauseGame;

document.getElementById('btn-mute').onclick = Mute;

document.getElementById('btn-left').onmousedown = moveLeft;
document.getElementById('btn-right').onmousedown = moveRight;
document.getElementById('btn-up').onmousedown = moveUp;
document.getElementById('btn-down').onmousedown = moveDown;

document.getElementById('btn-left').onmouseup = stopMove;
document.getElementById('btn-right').onmouseup = stopMove;
document.getElementById('btn-up').onmouseup = stopMove;
document.getElementById('btn-down').onmouseup = stopMove;

document.getElementById('btn-left').ontouchstart = moveLeft;
document.getElementById('btn-right').ontouchstart = moveRight;
document.getElementById('btn-up').ontouchstart = moveUp;
document.getElementById('btn-down').ontouchstart = moveDown;

document.getElementById('btn-left').ontouchend = stopMove;
document.getElementById('btn-right').ontouchend = stopMove;
document.getElementById('btn-up').ontouchend = stopMove;
document.getElementById('btn-down').ontouchend = stopMove;




