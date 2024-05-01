class Player extends Obj {
    constructor() {
        super();
        this.polygon[0] = new Polygon({
            width: 80,
            height: 80,
            y: 200,
            x: 200,
            vectorY: 0,
            vectorX: 0,
            speed: 6,
            bg: 'orange',
        });
    }
}