class Button extends UIElement {
    constructor(o) {
        super(o);
    }

    click() {
        this.onclick();
    }

    render(option = 'none') {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.background;
        ctx.fill();

        ctx.shadowColor = this.background;
        if (option === 'selected') {
            ctx.shadowBlur = 40;
            ctx.fill();
            ctx.shadowBlur = 20;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        ctx.fillStyle = this.color;
        ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

}