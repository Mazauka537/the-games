class WayPoint {
    constructor(o) {
        this.number = o.number ?? undefined;
        this.x = o.x ?? 10;
        this.y = o.y ?? 10;
        this.fat = o.fat ?? 4;
        this.color = o.color ?? 'green';
        this.availableTurns = o.availableTurns ?? {};
        this.ways = o.ways ?? [];
    }

    render() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.fat, 0, Math.PI * 2);
        ctx.fill();
    }
}