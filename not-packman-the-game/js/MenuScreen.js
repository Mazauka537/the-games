class MenuScreen {
    constructor(game) {
        this.game = game;

        this.status = 'main';

        this.title = new Label({
            text: 'Name of the game',
            x: canvas.width / 2,
            y: 170,
            fontSize: 90
        });

        this.labelControlP1 = new Label({
            text: 'player 1 control:',
            x: canvas.width / 2,
            y: 350,
            color: '#aaa',
            visible: false,
            fontSize: 20,
        });
        this.labelControlP2 = new Label({
            text: 'player 2 control:',
            x: canvas.width / 2,
            y: 600,
            color: '#aaa',
            visible: false,
            fontSize: 20,
        });

        this.labelSaveAndBack = new Label({
            text: 'Backspace / Esc - save and go back',
            x: canvas.width - 20,
            y: canvas.height - 75,
            textAlign: 'right',
            fontSize: 14,
            visible: false,
            color: '#aaa',
        });
        this.labelMoveSelection = new Label({
            text: '↑ / ↓ - move selection',
            x: canvas.width - 20,
            y: canvas.height - 50,
            textAlign: 'right',
            fontSize: 14,
            color: '#aaa',
        });
        this.labelSelect = new Label({
            text: 'Space / Enter - click the selection',
            x: canvas.width - 20,
            y: canvas.height - 25,
            textAlign: 'right',
            fontSize: 14,
            color: '#aaa',
        });
        this.labelSetOption = new Label({
            text: 'Press any key to set new option',
            x: canvas.width - 20,
            y: canvas.height - 25,
            textAlign: 'right',
            fontSize: 14,
            visible: false,
            color: '#aaa',
        });

        this.mainButtons = [
            this.createMainButton('Play solo', 300, () => this.btnPlaySoloClick()),
            this.createMainButton('Play duo', 450, () => this.btnPlayDouClick()),
            this.createMainButton('Settings', 600, () => this.btnSettingsClick()),
        ];
        this.settingsButtons = [
            this.createSettingsButton('difficulty', this.game.difficultyText[this.game.settings.difficulty], 250, () => this.btnDifficultyClick()),
            this.createSettingsButton('debug mode', this.game.debugMode ? 'Yes' : 'No', 300, () => this.btnDebugModeClick()),
            this.createSettingsButton('left', this.game.settings.p1Control.left, 400, () => this.btnControlChangeClick(2, 'p1Control', 'left')),
            this.createSettingsButton('right', this.game.settings.p1Control.right, 450, () => this.btnControlChangeClick(3, 'p1Control', 'right')),
            this.createSettingsButton('up', this.game.settings.p1Control.up, 500, () => this.btnControlChangeClick(4, 'p1Control', 'up')),
            this.createSettingsButton('down', this.game.settings.p1Control.down, 550, () => this.btnControlChangeClick(5, 'p1Control', 'down')),
            this.createSettingsButton('left', this.game.settings.p2Control.left, 650, () => this.btnControlChangeClick(6, 'p2Control', 'left')),
            this.createSettingsButton('right', this.game.settings.p2Control.right, 700, () => this.btnControlChangeClick(7, 'p2Control', 'right')),
            this.createSettingsButton('up', this.game.settings.p2Control.up, 750, () => this.btnControlChangeClick(8, 'p2Control', 'up')),
            this.createSettingsButton('down', this.game.settings.p2Control.down, 800, () => this.btnControlChangeClick(9, 'p2Control', 'down')),
        ];
        this.buttons = this.mainButtons;
        this.selectedButton = 0;

        this.changingBtnIndex = 1;
        this.changingPlayer = 'p1Control';
        this.changingDirection = 'left';

        document.onkeydown = (e) => this.keyDown(e);
    }

    btnDifficultyClick() {
        this.game.settings.difficulty++;
        if (this.game.settings.difficulty >= 3)
            this.game.settings.difficulty = 0;
        this.settingsButtons[0].btnText = this.game.difficultyText[this.game.settings.difficulty];
    }

    btnDebugModeClick() {
        this.game.debugMode = !this.game.debugMode
        this.settingsButtons[1].btnText = this.game.debugMode ? 'Yes' : 'No';
    }

    btnControlChangeClick(i, changingPlayer, changingDirection) {
        this.settingsButtons[i].btnText = '_';
        this.changingBtnIndex = i;
        this.changingPlayer = changingPlayer;
        this.changingDirection = changingDirection;

        this.labelSelect.visible = false;
        this.labelMoveSelection.visible = false;
        this.labelSaveAndBack.visible = false;
        this.labelSetOption.visible = true;

        this.status = 'controlChanging';
    }

    btnPlaySoloClick() {
        this.game.screen = new PlayScreen(this.game, 'solo');
    }

    btnPlayDouClick() {
        this.game.screen = new PlayScreen(this.game, 'duo');
    }

    btnSettingsClick() {
        this.status = 'settings';
        this.buttons = this.settingsButtons;
        this.title.text = 'Settings';
        this.title.y = 120;
        this.selectedButton = 0;
        this.labelControlP1.visible = true;
        this.labelControlP2.visible = true;
        this.labelSaveAndBack.visible = true;
    }

    createSettingsButton(labelText, btnText, height, onclick) {
        return new LabeledButton({
            btnText: btnText,
            labelText: labelText,
            width: 400,
            height: 40,
            x: canvas.width / 2,
            y: height,
            background: 'transparent',
            onclick: onclick,
            color: '#fff',
        });
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

    }

    render() {
        this.title.render();
        this.labelMoveSelection.render();
        this.labelSelect.render();
        this.labelSaveAndBack.render();
        this.labelControlP1.render();
        this.labelControlP2.render();
        this.labelSetOption.render();
        for (let i = 0; i < this.buttons.length; i++) {
            if (this.selectedButton === i) {
                this.buttons[i].render('selected');
            } else {
                this.buttons[i].render();
            }
        }
    }

    keyDown(e) {
        if (this.status === 'controlChanging') {
            if (e.key !== 'Backspace' && e.key !== 'Escape') {
                this.game.settings[this.changingPlayer][this.changingDirection] = e.code;
                this.settingsButtons[this.changingBtnIndex].btnText = this.game.settings[this.changingPlayer][this.changingDirection];
                this.labelSelect.visible = true;
                this.labelMoveSelection.visible = true;
                this.labelSaveAndBack.visible = true;
                this.labelSetOption.visible = false;
                this.status = 'settings';
            }
        }

        if (this.status === 'main' || this.status === 'settings') {
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

        if (this.status === 'settings') {
            if (e.keyCode === 8 || e.keyCode === 27) { //backspace / esc
                this.status = 'main';
                this.buttons = this.mainButtons;
                this.title.text = 'Name of the game';
                this.title.y = 170;
                this.selectedButton = 0;
                this.labelControlP1.visible = false;
                this.labelControlP2.visible = false;
                this.labelSaveAndBack.visible = false;
            }
        }
    }

    destroy() {
        // document.onkeydown = null;
    }
}