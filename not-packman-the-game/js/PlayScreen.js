class PlayScreen {
    constructor(game, mode) {
        this.game = game;
        this.mode = mode;
        this.status = 'pre-start';
        this.time = {
            seconds: 0,
            minutes: 0,
        };
        this.timer = null;

        this.map = new Map(game.debugMode);

        this.targets = [];
        this.targets.push(this.map.addNewActor('target', 4, 5.1, 10, '#bbbbff')); //60
        if (this.mode === 'duo') {
            this.targets.push(this.map.addNewActor('target', 1, 5.1, 10, '#bbffbb')); //61
        }

        this.hunters = [];
        if (this.game.settings.difficulty === 2) {
            this.hunters.push(this.map.addNewActor('hunter', 36, 5, 8, 'red'));
            this.hunters.push(this.map.addNewActor('hunter', 27, 4, 8, 'red'));
            this.hunters.push(this.map.addNewActor('hunter', 49, 3, 8, 'red'));
            this.hunters.push(this.map.addNewActor('hunter', 20, 2, 8, 'red'));
        }
        if (this.game.settings.difficulty === 1) {
            this.hunters.push(this.map.addNewActor('hunter', 36, 5, 8, 'red'));
            this.hunters.push(this.map.addNewActor('hunter', 27, 4, 8, 'red'));
            this.hunters.push(this.map.addNewActor('hunter', 49, 2, 8, 'red'));
        }
        if (this.game.settings.difficulty === 0) {
            this.hunters.push(this.map.addNewActor('hunter', 36, 4, 8, 'red'));
            this.hunters.push(this.map.addNewActor('hunter', 49, 3, 8, 'red'));
            this.hunters.push(this.map.addNewActor('hunter', 20, 1.5, 8, 'red'));
        }

        this.title = new Label({
            text: 'GAME OVER!',
            x: canvas.width / 2,
            y: 170,
            fontSize: 90
        });

        this.labelMoveSelection = new Label({
            text: '↑ / ↓ - move selection',
            x: canvas.width - 20,
            y: canvas.height - 50,
            textAlign: 'right',
            fontSize: 14,
            color: '#ccc',
        });
        this.labelSelect = new Label({
            text: 'Space / Enter - click the selection',
            x: canvas.width - 20,
            y: canvas.height - 25,
            textAlign: 'right',
            fontSize: 14,
            color: '#ccc',
        });

        this.labelMoveToStart = new Label({
            text: 'Move to start the game',
            x: canvas.width - 20,
            y: canvas.height - 12,
            textAlign: 'right',
            fontSize: 14,
            color: '#444',
        });

        this.buttons = [
            this.createMainButton('Restart', 300, () => this.btnRestartClick()),
            this.createMainButton('Go to main menu', 450, () => this.btnGoToMainMenuClick()),
        ];

        this.selectedButton = 0;

        document.onkeydown = (e) => this.keyDown(e);
    }

    btnRestartClick() {
        this.game.screen = new PlayScreen(this.game, this.mode);
    }

    btnGoToMainMenuClick() {
        this.game.screen = new MenuScreen(this.game);
    }

    createMainButton(text, height, onclick) {
        return new Button({
            text: text,
            width: 400,
            height: 100,
            x: canvas.width / 2 - 200,
            y: height,
            onclick: onclick,
            color: '#222',
            fontSize: 36,
            fontWeight: 'normal',
        });
    }

    frame() {
        if (this.status === 'playing') {
            for (let i = 0; i < this.targets.length; i++) {
                this.targets[i].move();
            }

            for (let i = 0; i < this.hunters.length; i++) {
                //вычисляем дистанцию от охотника до всех таргетов и двигаем охотника к таргету с минимальной дистанцией
                let paths = this.map.getRoute(this.hunters[i], this.targets);
                let minTargetIndexByDistance = 0;
                for (let j = 1; j < this.targets.length; j++) {
                    if (paths.distanceTo[this.targets[j].number] < paths.distanceTo[this.targets[minTargetIndexByDistance].number]) {
                        minTargetIndexByDistance = j;
                    }
                }
                this.hunters[i].move(this.targets[minTargetIndexByDistance]);

                if (this.hunters[i].isNearWayPoint(this.targets[minTargetIndexByDistance])) {
                    this.status = 'caught';
                    this.selectedButton = 0;
                    clearInterval(this.timer);
                    this.hunters[i].x = this.targets[minTargetIndexByDistance].x;
                    this.hunters[i].y = this.targets[minTargetIndexByDistance].y;
                    break;
                }
            }
        }
    }

    render() {
        this.map.render();
        for (let i = 0; i < this.targets.length; i++) {
            this.targets[i].render();
        }
        for (let i = 0; i < this.hunters.length; i++) {
            this.hunters[i].render();
        }

        if (this.status === 'caught') {
            ctx.fillStyle = 'rgba(60, 60, 60, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.title.render();
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.selectedButton === i) {
                    this.buttons[i].render('selected');
                } else {
                    this.buttons[i].render();
                }
            }

            this.labelMoveSelection.render();
            this.labelSelect.render();
        }

        ctx.beginPath();
        ctx.fillStyle = '#444';
        if (this.status === 'caught') ctx.fillStyle = '#ccc';
        ctx.font = `normal 20px Consolas`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let sec = this.time.seconds < 10 ? '0' + this.time.seconds : this.time.seconds;
        let min = this.time.minutes < 10 ? '0' + this.time.minutes : this.time.minutes;
        ctx.fillText(`${min}:${sec}`, canvas.width / 2, 13);

        if (this.status === 'pre-start') {
            this.labelMoveToStart.render();
        }
    }

    keyDown(e) {
        if (this.status === 'caught') {
            if (e.keyCode === 13 || e.keyCode === 32) { //enter / space
                this.buttons[this.selectedButton].click();
            }
            if (e.keyCode === 38) { //up
                if (this.selectedButton > 0) {
                    this.selectedButton--;
                } else {
                    this.selectedButton = this.buttons.length - 1;
                }
            }
            if (e.keyCode === 40) { //down
                if (this.selectedButton < this.buttons.length - 1) {
                    this.selectedButton++;
                } else {
                    this.selectedButton = 0;
                }
            }
        }

        if (this.status === 'playing' || this.status === 'pre-start') {
            if (e.code === this.game.settings.p1Control.left || e.code === this.game.settings.p2Control.left) { //left
                this.keyDownDefault(e, 'left', 'right');
            }
            if (e.code === this.game.settings.p1Control.up || e.code === this.game.settings.p2Control.up) { //up
                this.keyDownDefault(e, 'up', 'down');
            }
            if (e.code === this.game.settings.p1Control.right || e.code === this.game.settings.p2Control.right) { //right
                this.keyDownDefault(e, 'right', 'left')
            }
            if (e.code === this.game.settings.p1Control.down || e.code === this.game.settings.p2Control.down) { //down
                this.keyDownDefault(e, 'down', 'up');
            }
        }
    }

    timerHandler() {
        this.time.seconds++;
        if (this.time.seconds >= 60) {
            this.time.minutes++;
            this.time.seconds = 0;
        }
    }

    keyDownDefault(e, direction, reverseDirection) {
        if (this.status === 'pre-start') {
            this.status = 'playing';
            this.timer = setInterval(() => this.timerHandler(), 1000);
        }

        let targetIndex = 0;
        if (this.mode === 'duo' && e.code === this.game.settings.p2Control[direction]) {
            targetIndex = 1;
        }
        this.targets[targetIndex].nextDirection = direction;

        //задаем начальное направление если таргет ещё не двигался
        if (this.targets[targetIndex].direction === 'none' && this.targets[targetIndex].availableTurns[direction] !== undefined) {
            this.targets[targetIndex].movingTo = this.targets[targetIndex].availableTurns[direction];
            this.targets[targetIndex].availableTurns = this.map.wayPoints[this.targets[targetIndex].movingTo].availableTurns;
            this.targets[targetIndex].direction = direction;
        }
        //разварачиваем таргет
        if (this.targets[targetIndex].direction === reverseDirection) {
            let x = this.targets[targetIndex].movingFrom;
            this.targets[targetIndex].movingFrom = this.targets[targetIndex].movingTo;
            this.targets[targetIndex].movingTo = x;
            this.targets[targetIndex].availableTurns = this.map.wayPoints[this.targets[targetIndex].movingTo].availableTurns;
            this.targets[targetIndex].direction = direction;
        }
    }

    destroy() {

    }
}