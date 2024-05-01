class Barrier extends Obj {
    constructor(game) {
        super();
        this.game = game;
        this.position = Math.round(Math.random() * 3);
        this.timeToRemove = 0;
        this.polygon = [];
        switch (this.position) {
            case 0: //top
                this.polygon.push(new Polygon({
                    width: 30,
                    height: 60,
                    y: -60,
                    x: Math.round(Math.random() * (game.layout.offsetWidth - 30)),
                    vectorY: 1,
                    vectorX: 0,
                    bg: "url('images/lazer-gun-top.png')",
                }));
                break;
            case 1: //right
                this.polygon.push(new Polygon({
                    width: 60,
                    height: 30,
                    y: Math.round(Math.random() * (game.layout.offsetHeight - 30)),
                    x: game.layout.offsetWidth,
                    vectorY: 0,
                    vectorX: -1,
                    bg: "url('images/lazer-gun-right.png')",
                }));
                break;
            case 2: //bottom
                this.polygon.push(new Polygon({
                    width: 30,
                    height: 60,
                    y: game.layout.offsetHeight,
                    x: Math.round(Math.random() * (game.layout.offsetWidth - 30)),
                    vectorY: -1,
                    vectorX: 0,
                    bg: "url('images/lazer-gun-bottom.png')",
                }));
                break;
            case 3: //left
                this.polygon.push(new Polygon({
                    width: 60,
                    height: 30,
                    y: Math.round(Math.random() * (game.layout.offsetHeight - 30)),
                    x: -60,
                    vectorY: 0,
                    vectorX: 1,
                    bg: "url('images/lazer-gun-left.png')",
                }));
                break;
        }
        game.layout.appendChild(this.polygon[0].dom);
        this.phase = 0;
        this.sound1 = new Audio('sounds/lazer.mp3');
        this.sound2 = new Audio('sounds/pre-lazer.mp3');
    }

    frameHandler() {
        switch (this.phase) {
            case 0:
                this.fase0();
                break;
            case 1:
                this.fase1();
                break;
            case 2:
                this.fase2();
                break;
            case 3:
                this.fase3();
                break;
        }
    }

    fase0() {
        this.polygon[0].x += this.polygon[0].vectorX * this.polygon[0].speed;
        this.polygon[0].y += this.polygon[0].vectorY * this.polygon[0].speed;
        let nextPhase = false;
        switch (this.position) {
            case 0: //top
                if (this.polygon[0].y >= 0) {
                    nextPhase = true;
                }
                break;
            case 1: //right
                if (this.polygon[0].x <= this.game.layout.offsetWidth - this.polygon[0].width) {
                    nextPhase = true;
                }
                break;
            case 2: //bottom
                if (this.polygon[0].y <= this.game.layout.offsetHeight - this.polygon[0].height) {
                    nextPhase = true;
                }
                break;
            case 3: //left
                if (this.polygon[0].x >= 0) {
                    nextPhase = true;
                }
                break;
        }

        if (nextPhase) {
            this.phase = 1;
            this.sound2.play();
        }
    }

    fase1() {
        let nextPhase = false;
        switch (this.position) {
            case 0: //top
                this.polygon[0].scaleX += 0.01;
                if (this.polygon[0].scaleX >= 1.3) {
                    this.polygon[0].scaleX = 1;
                    this.phase = 2;
                    this.polygon[1] = new Polygon({
                        x: this.polygon[0].x,
                        y: this.polygon[0].y + this.polygon[0].height,
                        width: this.polygon[0].width,
                        height: game.layout.offsetHeight,
                        vectorY: 0,
                        vectorX: 0,
                        speed: 0,
                        bg: "url('images/lazer.gif')",
                        bgsize: 'cover',
                    });

                    nextPhase = true;
                }
                break;
            case 1: //right
                this.polygon[0].scaleY += 0.01;
                if (this.polygon[0].scaleY >= 1.3) {
                    this.polygon[0].scaleY = 1;
                    this.phase = 2;
                    this.polygon[1] = new Polygon({
                        x: 0,
                        y: this.polygon[0].y,
                        width: this.game.layout.offsetWidth - this.polygon[0].width,
                        height: this.polygon[0].height,
                        vectorY: 0,
                        vectorX: 0,
                        speed: 0,
                        bg: "url('images/lazer.gif')",
                        bgsize: 'cover',
                    });

                    nextPhase = true;
                }
                break;
            case 2: //bottom
                this.polygon[0].scaleX += 0.01;
                if (this.polygon[0].scaleX >= 1.3) {
                    this.polygon[0].scaleX = 1;
                    this.phase = 2;
                    this.polygon[1] = new Polygon({
                        x: this.polygon[0].x,
                        y: 0,
                        width: this.polygon[0].width,
                        height: game.layout.offsetHeight - this.polygon[0].height,
                        vectorY: 0,
                        vectorX: 0,
                        speed: 0,
                        bg: "url('images/lazer.gif')",
                        bgsize: 'cover',
                    });

                    nextPhase = true;
                }
                break;
            case 3: //left
                this.polygon[0].scaleY += 0.01;
                if (this.polygon[0].scaleY >= 1.3) {
                    this.polygon[0].scaleY = 1;
                    this.phase = 2;
                    this.polygon[1] = new Polygon({
                        x: this.polygon[0].width,
                        y: this.polygon[0].y,
                        width: this.game.layout.offsetWidth - this.polygon[0].width,
                        height: this.polygon[0].height,
                        vectorY: 0,
                        vectorX: 0,
                        speed: 0,
                        bg: "url('images/lazer.gif')",
                        bgsize: 'cover',
                    });

                    nextPhase = true;
                }
                break;
        }

        if (nextPhase) {
            this.sound2.pause();
            this.sound1.play();
            this.game.layout.appendChild(this.polygon[1].dom);
        }
    }

    fase2() {
        this.timeToRemove++;
        if (this.timeToRemove >= 50) {
            this.game.layout.removeChild(this.polygon[1].dom);
            this.polygon.splice(1, 1);
            this.phase++;
            this.sound1.pause();
        }
    }

    fase3() {
        let nextPhase = false;
        this.polygon[0].x -= this.polygon[0].vectorX * this.polygon[0].speed;
        this.polygon[0].y -= this.polygon[0].vectorY * this.polygon[0].speed;
        switch (this.position) {
            case 0: //top
                if (this.polygon[0].y < -this.polygon[0].height) {
                    nextPhase = true;
                }
                break;
            case 1: //right
                if (this.polygon[0].x > this.game.layout.offsetWidth) {
                    nextPhase = true;
                }
                break;
            case 2: //bottom
                if (this.polygon[0].y > this.game.layout.offsetHeight) {
                    nextPhase = true;
                }
                break;
            case 3: //left
                if (this.polygon[0].x < -this.polygon[0].width) {
                    nextPhase = true;
                }
                break;
        }

        if (nextPhase) {
            this.game.layout.removeChild(this.polygon[0].dom);
            this.polygon.splice(0, 1);
            for (let i = 0; i < this.game.objs.length; i++) {
                if (this.game.objs[i] === this) {
                    this.game.objs.splice(i, 1);
                    break;
                }
            }
        }
    }
}