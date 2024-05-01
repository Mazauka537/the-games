class Snake {
    constructor(game) {
        this.game = game;
        this.vector = 'top';
        this.lastStep = 'none';
        this.crashHeadColor = 0;
        this.colorChangeSpeed = 1;
        this.segments = [{
            x: Math.round(this.game.cellsCountX / 2),
            y: Math.round(this.game.cellsCountY / 2)
        }];
        this.lastSegment = this.segments[this.segments.length - 1];

        this.kickSound = new buzz.sound('sounds/kick', {
            formats: ["wav"]
        })
    }

    move() {
        let segmentsCopy = [];
        for (let i = 0; i < this.segments.length; i++) {
            segmentsCopy.push({
                x: this.segments[i].x,
                y: this.segments[i].y
            });
        }

        this.lastSegment = {
            x: this.segments[this.segments.length - 1].x,
            y: this.segments[this.segments.length - 1].y,
        };
        for (let i = this.segments.length - 1; i > 0; i--) {
            this.segments[i].x = this.segments[i - 1].x;
            this.segments[i].y = this.segments[i - 1].y;
        }
        switch (this.vector) {
            case 'top':
                this.segments[0].y--;
                break;
            case 'right':
                this.segments[0].x++;
                break;
            case 'bottom':
                this.segments[0].y++;
                break;
            case 'left':
                this.segments[0].x--;
                break;
        }

        this.lastStep = this.vector;

        if (this.checkForSnack()) {
            this.segments.push(this.lastSegment);
            this.game.generateNewSnack();
        }

        if (this.checkForCrash()) {
            this.segments = segmentsCopy;

            return false;
        }

        return true;
    }

    checkForCrash() {
        if (this.segments.length > 4)
            for (let i = 4; i < this.segments.length; i++) {
                if (this.segments[0].x === this.segments[i].x && this.segments[0].y === this.segments[i].y) {
                    return true;
                }
            }

        return this.segments[0].y < 0
            || this.segments[0].y >= this.game.cellsCountY
            || this.segments[0].x < 0
            || this.segments[0].x >= this.game.cellsCountX;
    }

    checkForSnack() {
        return (this.segments[0].x === this.game.snack.x) && (this.segments[0].y === this.game.snack.y);
    }

    calculateVector(snack) {
        let diffX = this.segments[0].x - snack.x;
        let diffY = this.segments[0].y - snack.y;

        if (Math.abs(diffY) > Math.abs(diffX)) {
            this.vector = diffY < 0 ? 'bottom' : 'top';
        } else {
            this.vector = diffX < 0 ? 'right' : 'left';
        }

        if (this.vector === 'top' && this.lastStep === 'bottom') this.vector = 'bottom';
        if (this.vector === 'bottom' && this.lastStep === 'top') this.vector = 'top';
        if (this.vector === 'left' && this.lastStep === 'right') this.vector = 'right';
        if (this.vector === 'right' && this.lastStep === 'left') this.vector = 'left';
    }

    render() {
        this.game.ctx.fillStyle = "#fff";
        for (let i = 0; i < this.segments.length; i++) {
            this.game.ctx.fillRect(this.segments[i].x * this.game.cellSizeX, this.segments[i].y * this.game.cellSizeY, this.game.cellSizeX, this.game.cellSizeY);
        }

        if (this.game.status === 'crashed') {
            this.crashHeadColor += this.colorChangeSpeed;
            if (this.crashHeadColor >= 70) this.colorChangeSpeed = -1;
            if (this.crashHeadColor <= 10) this.colorChangeSpeed = 1;
            let gb = 255 - this.crashHeadColor;
            this.game.ctx.fillStyle = "rgb(255, " + gb + ", " + gb + ")";
            this.game.ctx.fillRect(this.segments[0].x * this.game.cellSizeX, this.segments[0].y * this.game.cellSizeY, this.game.cellSizeX, this.game.cellSizeY);
        }

        this.game.ctx.fillStyle = "#242424";
        let eyePadding = 4;
        let minSide = this.game.cellSizeX < this.game.cellsCountY ? this.game.cellSizeX : this.game.cellSizeY;
        let eyeSize = minSide / 2 - (eyePadding * 3);
        let x1, x2, y1, y2;
        switch (this.vector) {
            case "top":
                x1 = this.segments[0].x * this.game.cellSizeX + eyePadding;
                y1 = this.segments[0].y * this.game.cellSizeY + eyePadding;
                x2 = this.segments[0].x * this.game.cellSizeX + this.game.cellSizeX - eyePadding - eyeSize;
                y2 = this.segments[0].y * this.game.cellSizeY + eyePadding;
                break;
            case "right":
                x1 = this.segments[0].x * this.game.cellSizeX + this.game.cellSizeX - eyePadding - eyeSize;
                y1 = this.segments[0].y * this.game.cellSizeY + eyePadding;
                x2 = this.segments[0].x * this.game.cellSizeX + this.game.cellSizeX - eyePadding - eyeSize;
                y2 = this.segments[0].y * this.game.cellSizeY + this.game.cellSizeY - eyePadding - eyeSize;
                break;
            case "bottom":
                x1 = this.segments[0].x * this.game.cellSizeX + this.game.cellSizeX - eyePadding - eyeSize;
                y1 = this.segments[0].y * this.game.cellSizeY + this.game.cellSizeY - eyePadding - eyeSize;
                x2 = this.segments[0].x * this.game.cellSizeX + eyePadding;
                y2 = this.segments[0].y * this.game.cellSizeY + this.game.cellSizeY - eyePadding - eyeSize;
                break;
            case "left":
                x1 = this.segments[0].x * this.game.cellSizeX + eyePadding;
                y1 = this.segments[0].y * this.game.cellSizeY + this.game.cellSizeY - eyePadding - eyeSize;
                x2 = this.segments[0].x * this.game.cellSizeX + eyePadding;
                y2 = this.segments[0].y * this.game.cellSizeY + eyePadding;
                break;
        }
        this.game.ctx.fillRect(x1, y1, eyeSize, eyeSize);
        this.game.ctx.fillRect(x2, y2, eyeSize, eyeSize);
    }
}