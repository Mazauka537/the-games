class TheGame {
    constructor(id) {
        this.frameCount = 0;
        this._score = 0;
        this.layout = document.getElementById(id);
        this.player = new Player();
        this.objs = [];
        this.layout.appendChild(this.player.polygon[0].dom);
    }

    createNewBarrier() {
        this.objs.push(new Barrier(this));
    }

    set score(value) {
        this._score = value;
        document.getElementById('score').innerHTML = this._score;
    }

    get score() {
        return this._score;
    }
}