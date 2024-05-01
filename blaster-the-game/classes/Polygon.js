class Polygon {
    constructor(o) {
        this._x = o.x ?? 10;
        this._y = o.y ?? 10;
        this._height = o.height ?? 10;
        this._width = o.width ?? 10;
        this._vectorX = o.vectorX ?? 0;
        this._vectorY = o.vectorY ?? 0;
        this._speed = o.speed ?? 1;
        this._bg = o.bg ?? 'red';
        this._scaleX = o.scaleX ?? 1;
        this._scaleY = o.scaleY ?? 1;
        this._bgsize = o.bgsize ?? 'contain';
        this._dom = this.initDom();
    }

    initDom() {
        let div = document.createElement('div');
        div.style.left = this._x + 'px';
        div.style.top = this._y + 'px';
        div.style.height = this._height + 'px';
        div.style.width = this._width + 'px';
        div.style.background = this._bg;
        div.style.backgroundSize = this._bgsize;
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundPosition = 'center, center';
        return div;
    }

    set scaleX(value) {
        this._scaleX = value;
        this.dom.style.transform = 'scaleX(' + this._scaleX + ')';
    }

    get scaleX() {
        return this._scaleX;
    }

    set scaleY(value) {
        this._scaleY = value;
        this.dom.style.transform = 'scaleY(' + this._scaleY + ')';
    }

    get scaleY() {
        return this._scaleY;
    }

    set speed(value) {
        this._speed = value;
    }

    get speed() {
        return this._speed;
    }

    set x(value) {
        this._x = value;
        this._dom.style.left = this._x + 'px';
    }

    get x() {
        return this._x;
    }

    set y(value) {
        this._y = value;
        this._dom.style.top = this._y + 'px';
    }

    get y() {
        return this._y;
    }

    set vectorY(value) {
        this._vectorY = value;
    }

    get vectorY() {
        return this._vectorY;
    }

    set vectorX(value) {
        this._vectorX = value;
    }

    get vectorX() {
        return this._vectorX;
    }

    set height(value) {
        this._height = value;
        this._dom.style.height = this._height + 'px';
    }

    get height() {
        return this._height;
    }

    set width(value) {
        this._width = value;
        this._dom.style.width = this._width + 'px';
    }

    get width() {
        return this._width;
    }

    get dom() {
        return this._dom;
    }
}