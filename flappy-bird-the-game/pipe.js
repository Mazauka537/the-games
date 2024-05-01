class Pipe {
  constructor(layout) {
    this.layout = layout;
    this._width = 50;
    this.minHeight = 60;
    this._height = this.minHeight;
    this._right = -2 - this._width;
    this.elem = this.createPipe();
  }
  
  createPipe() {
    let pipe = document.createElement('div');
    pipe.classList.add('pipe');
    pipe.style.height = this.layout.offsetHeight / 2 + 'px';
    pipe.style.width = this._width + 'px';
    pipe.style.right = this._right + 'px';
    
    let cap = document.createElement('div');
    cap.classList.add('cap');
    cap.style.width = +(this._width + 4) + 'px';
    pipe.append(cap);
    
    this.layout.append(pipe);
    return pipe;
  }
  
  get right() {
    return this._right;
  }
  
  set right(value) {
    this._right = value;
    this.elem.style.right = value + 'px';
  }
  
  get width() {
    return this._width;
  }
  
  set width(value) {
    this._width = value;
    this.elem.style.width = value + 'px';
  }
  
  get height() {
    return this._height;
  }
  
  set height(value) {
    this._height = value;
    this.elem.style.height = value + 'px';
  }
}