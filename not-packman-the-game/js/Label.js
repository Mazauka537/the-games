class Label extends UIElement {
    constructor(o) {
        super(o);
    }

    render() {
        if (super.render()) {
            ctx.shadowColor = 'none';
            ctx.shadowBlur = 0;
            ctx.fillStyle = this.color;
            ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.font}`;
            ctx.textAlign = this.textAlign;
            ctx.textBaseline = "middle";
            ctx.fillText(this.text, this.x, this.y);
        }
    }
}