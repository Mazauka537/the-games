class LabeledButton extends UIElement {
    constructor(o) {
        super(o);
        this.label = new Label({
            text: o.labelText,
            color: this.color,
            background: this.background,
            textAlign: 'left',
            y: this.y,
            x: this.x - this.width / 2,
        });
        this.btn = new Label({
            y: this.y,
            x: this.x + this.width / 2,
            text: o.btnText,
            color: this.color,
            background: this.background,
            textAlign: 'right',
            fontWeight: 'bold',
            fontSize: 26,
        });
    }

    set btnText(value) {
        this.btn.text = value;
    }

    click() {
        this.onclick();
    }

    render(option = 'none') {
        if (option === 'selected') {
            ctx.beginPath();
            ctx.rect(this.x - this.width / 2 - 10, this.y - this.height / 2, this.width + 20, this.height);
            ctx.fillStyle = "#222";
            ctx.shadowColor = "#fff";
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 20;
            ctx.fill();
        }
        this.btn.render();
        this.label.render();
    }

}