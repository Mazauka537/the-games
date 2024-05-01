class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.height = 1000;
        this.width = 1000;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        this.startBtn = document.getElementById('start-btn');
        this.retryBtn = document.getElementById('retry-btn');
        this.settingsBtn = document.getElementById('settings-btn');
        this.confirmSettingsBtn = document.getElementById('confirm-settings-btn');
        this.difficultySettingBtn = document.getElementById('difficulty');
        this.muteSettingBtn = document.getElementById('mute');
        this.difficultySettingValue = document.getElementById('difficulty-value');
        this.muteSettingValue = document.getElementById('mute-value');
        this.interface = document.getElementById('interface');
        this.homeScreen = document.getElementById('home-screen');
        this.crashScreen = document.getElementById('crash-screen');
        this.settingsScreen = document.getElementById('settings-screen');
        this.darkScreen = document.getElementById('dark-screen');
        this.iDuration = 400;
        this.snakeSpeed = 7;
        this.difficulty = 2;
        this.mute = false;
        this.frameCounter = 0;
        this.cellsCountX = 20;
        this.cellsCountY = 20;
        this.cellSizeX = this.width / this.cellsCountX;
        this.cellSizeY = this.height / this.cellsCountY;
        this.snake = new Snake(this);
        this.snack = undefined;
        this.generateNewSnack();

        this.timer = setInterval(() => this.gameFrame(), 15);
        this.status = 'loaded';


        document.onkeydown = (e) => this.keyDown(e);
        this.startBtn.onclick = () => this.start();
        this.retryBtn.onclick = () => this.retry();
        this.settingsBtn.onclick = () => this.settings();
        this.confirmSettingsBtn.onclick = () => this.confirmSettings();
        this.difficultySettingBtn.onclick = () => this.changeDifficulty();
        this.muteSettingBtn.onclick = () => this.changeMuteSounds();

    }

    changeMuteSounds() {
        this.mute = !this.mute;

        this.muteSettingValue.innerHTML = this.mute ? 'OFF' : 'ON';
    }

    changeDifficulty() {
        this.difficulty--;
        if (this.difficulty < 1) this.difficulty = 3;

        switch (this.difficulty) {
            case 3:
                this.difficultySettingValue.innerHTML = 'Easy';
                break;
            case 2:
                this.difficultySettingValue.innerHTML = 'Medium';
                break;
            case 1:
                this.difficultySettingValue.innerHTML = 'Hard';
                break;
        }
    }

    generateNewSnack() {
        let t = true;
        let snack;
        while (t) {
            t = false;
            snack = {
                x: Math.round(Math.random() * (this.cellsCountX - 1)),
                y: Math.round(Math.random() * (this.cellsCountY - 1)),
            };
            for (let i = 0; i < this.snake.segments.length; i++) {
                if (this.snake.segments[i].x === snack.x && this.snake.segments[i].y === snack.y) {
                    t = true;
                    break;
                }
            }
        }
        this.snack = snack;
    }

    start() {
        this.flashScreenTo(() => {
            this.status = 'started';
            this.snake = new Snake(this);
            this.generateNewSnack();
        });
    }

    stop() {
        this.status = 'crashed';

        this.switchScreenTo('crash');
    }

    retry() {
        this.flashScreenTo(() => {
            this.status = 'loaded';
            this.snake = new Snake(this);
            this.generateNewSnack();
        }, 'home');
    }

    settings() {
        this.status = 'loaded';

        this.switchScreenTo('settings');
    }

    confirmSettings() {
        this.status = 'loaded';

        this.switchScreenTo('home');
    }


    flashScreenTo(action = null, screenName = null) {
        this.darkScreen.style.visibility = 'visible';
        this.darkScreen.style.opacity = '1';
        setTimeout(() => {
            this.interface.style.visibility = 'visible';
            this.interface.style.opacity = '1';
            this.homeScreen.style.display = 'none';
            this.crashScreen.style.display = 'none';
            this.settingsScreen.style.display = 'none';
            switch (screenName) {
                case 'home':
                    this.homeScreen.style.top = '0';
                    this.homeScreen.style.display = 'block';
                    break;
                case 'crash':
                    this.crashScreen.style.top = '0';
                    this.crashScreen.style.display = 'block';
                    break;
                case 'settings':
                    this.settingsScreen.style.top = '0';
                    this.settingsScreen.style.display = 'block';
                    break;
                case null:
                    this.interface.style.opacity = '0';
                    this.interface.style.visibility = 'hidden';
                    break;
            }
            if (action != null) action();
            setTimeout(() => {
                this.darkScreen.style.opacity = '0';
                this.darkScreen.style.visibility = 'hidden';
            }, 200);
        }, this.iDuration);
    }

    switchScreenTo(screenName) {
        this.interface.style.visibility = 'visible';
        this.interface.style.opacity = '1';

        this.homeScreen.style.top = '100%';
        this.crashScreen.style.top = '100%';
        this.settingsScreen.style.top = '100%';

        switch (screenName) {
            case 'home':
                this.homeScreen.style.display = 'none';
                this.homeScreen.style.top = '-100%';
                setTimeout(() => {
                    this.homeScreen.style.display = 'block';
                    setTimeout(() => {
                        this.homeScreen.style.top = '0';
                    }, 50);
                }, 50);
                break;
            case 'crash':
                this.crashScreen.style.display = 'none';
                this.crashScreen.style.top = '-100%';
                setTimeout(() => {
                    this.crashScreen.style.display = 'block';
                    setTimeout(() => {
                        this.crashScreen.style.top = '0';
                    }, 50);
                }, 50);
                break;
            case 'settings':
                this.settingsScreen.style.display = 'none';
                this.settingsScreen.style.top = '-100%';
                setTimeout(() => {
                    this.settingsScreen.style.display = 'block';
                    setTimeout(() => {
                        this.settingsScreen.style.top = '0';
                    }, 50);
                }, 50);
                break;
        }
    }

    gameFrame() {
        this.frameCounter++;

        switch (this.status) {
            case 'loaded':
                if (this.frameCounter % (this.snakeSpeed * this.difficulty) === 0) {
                    if (!this.snake.move()) {
                        this.snake = new Snake(this);
                        this.generateNewSnack();
                    }

                    this.snake.calculateVector(this.snack);
                }
                break;
            case 'started':

                break;
            case 'played':
                if (this.frameCounter % (this.snakeSpeed * this.difficulty) === 0) {
                    if (!this.snake.move()) {
                        this.stop();
                    }
                }
                break;
            case 'crashed':

                break;
        }

        this.ctx.fillStyle = "#242424";
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.snake.render();
        this.ctx.fillStyle = "#FFF";
        let padding = 4;
        this.ctx.fillRect(
            this.snack.x * this.cellSizeX + padding,
            this.snack.y * this.cellSizeY + padding,
            this.cellSizeX - padding * 2,
            this.cellSizeY - padding * 2
        );
    }

    keyDown(e) {
        if (this.status === 'started') {
            if (e.keyCode === 87 || e.keyCode === 68 || e.keyCode === 83 || e.keyCode === 65 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 37) {
                this.status = 'played';
            }
        }
        if (this.status === 'played') {
            switch (e.keyCode) {
                case 87: //w
                    if (this.snake.segments.length === 1)
                        this.snake.vector = 'top';
                    else if (this.snake.lastStep !== 'bottom')
                        this.snake.vector = 'top';
                    break;
                case 68: //d
                    if (this.snake.segments.length === 1)
                        this.snake.vector = 'right';
                    else if (this.snake.lastStep !== 'left')
                        this.snake.vector = 'right';
                    break;
                case 83: //s
                    if (this.snake.segments.length === 1)
                        this.snake.vector = 'bottom';
                    else if (this.snake.lastStep !== 'top')
                        this.snake.vector = 'bottom';
                    break;
                case 65: //a
                    if (this.snake.segments.length === 1)
                        this.snake.vector = 'left';
                    else if (this.snake.lastStep !== 'right')
                        this.snake.vector = 'left';
                    break;
                case 38: //arrowUp
                    if (this.snake.segments.length === 1)
                        this.snake.vector = 'top';
                    else if (this.snake.lastStep !== 'bottom')
                        this.snake.vector = 'top';
                    break;
                case 39: //arrowRight
                    if (this.snake.segments.length === 1)
                        this.snake.vector = 'right';
                    else if (this.snake.lastStep !== 'left')
                        this.snake.vector = 'right';
                    break;
                case 40: //arrowDown
                    if (this.snake.segments.length === 1)
                        this.snake.vector = 'bottom';
                    else if (this.snake.lastStep !== 'top')
                        this.snake.vector = 'bottom';
                    break;
                case 37: //arrowLeft
                    if (this.snake.segments.length === 1)
                        this.snake.vector = 'left';
                    else if (this.snake.lastStep !== 'right')
                        this.snake.vector = 'left';
                    break;
            }
        }
    }
}