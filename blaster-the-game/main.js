//------------------------------
// MAIN CODE -------------------
//------------------------------

addEventListener('keydown', keydown);
let game = new TheGame('game');
let timer;

startGame(game);

//------------------------------
// FUNCTIONS -------------------
//------------------------------

function startGame() {
    timer = setInterval(frameHandler, 15);
}

function stopGame() {
    clearInterval(timer);
}

function keydown(e) {
    switch (e.keyCode) {
        case 87: //w
            game.player.polygon[0].vectorY = -1;
            break;
        case 65: //a
            game.player.polygon[0].vectorX = -1;
            break;
        case 83: //s
            game.player.polygon[0].vectorY = 1;
            break;
        case 68: //d
            game.player.polygon[0].vectorX = 1;
            break;
    }
}

function frameHandler() {

    if (game.player.polygon[0].x + game.player.polygon[0].vectorX * game.player.polygon[0].speed < 0) {
        game.player.polygon[0].x = 0;
    } else if (game.player.polygon[0].x + game.player.polygon[0].vectorX * game.player.polygon[0].speed > game.layout.offsetWidth - game.player.polygon[0].width) {
        game.player.polygon[0].x = game.layout.offsetWidth - game.player.polygon[0].width;
    } else {
        game.player.polygon[0].x += game.player.polygon[0].vectorX * game.player.polygon[0].speed;
    }

    if (game.player.polygon[0].y + game.player.polygon[0].vectorY * game.player.polygon[0].speed < 0) {
        game.player.polygon[0].y = 0;
    } else if (game.player.polygon[0].y + game.player.polygon[0].vectorY * game.player.polygon[0].speed > game.layout.offsetHeight - game.player.polygon[0].height) {
        game.player.polygon[0].y = game.layout.offsetHeight - game.player.polygon[0].height;
    } else {
        game.player.polygon[0].y += game.player.polygon[0].vectorY * game.player.polygon[0].speed;
    }

    for(let i = 0; i < game.objs.length; i++) {
        game.objs[i].frameHandler();
    }

    if ((game.frameCount / 66 ^ 0) === game.frameCount / 66) {
        game.createNewBarrier();
    }

    if ((game.frameCount / 66 ^ 0) === game.frameCount / 66) {
        game.score++;
    }

    checkCollision();

    game.frameCount++;
}

function checkCollision() {
    for (let i = 0; i < game.objs.length; i++) {
        for (let j = 0; j < game.objs[i].polygon.length; j++) {
            if ((game.player.polygon[0].x + game.player.polygon[0].width > game.objs[i].polygon[j].x && game.player.polygon[0].x < game.objs[i].polygon[j].x + game.objs[i].polygon[j].width)
            && (game.player.polygon[0].y + game.player.polygon[0].height > game.objs[i].polygon[j].y && game.player.polygon[0].y < game.objs[i].polygon[j].y + game.objs[i].polygon[j].height)) {
                stopGame();
            }

        }

    }
}
