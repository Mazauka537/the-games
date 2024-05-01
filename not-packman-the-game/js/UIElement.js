class UIElement {
    constructor(o) {
        this.x = o.x ?? 0;
        this.y = o.y ?? 0;
        this.background = o.background ?? '#fff';
        this.text = o.text ?? '';
        this.textAlign = o.textAlign ?? 'center';
        this.color = o.color ?? '#fff';
        this.font = o.font ?? 'Tahoma';
        this.fontWeight = o.fontWeight ?? 'normal';
        this.fontSize = o.fontSize ?? 24;
        this.width = o.width ?? 200;
        this.height = o.height ?? 75;
        this.onclick = o.onclick ?? function () {};
        this.visible = o.visible ?? true;
    }

    render() {
        return this.visible;
    }
}