class PairPipes {
  constructor(layout) {
    this.layout = layout;
    this.pipeDistance = 140; //px
    this.upPipe = new UpPipe(layout);
    this.downPipe = new DownPipe(layout);
    this.setPipesHeight();
  }
  
  setPipesHeight() {
    let min = this.upPipe.minHeight;
    let max = this.layout.offsetHeight - this.pipeDistance - min;
    let upHeight = Math.random() * (max - min) + min;
    let downHeight = this.layout. offsetHeight- this.pipeDistance - upHeight;
    
    this.upPipe.height = upHeight;
    this.downPipe.height = downHeight;
  }
  
  destroy() {
    this.layout.removeChild(this.upPipe.elem);
    this.layout.removeChild(this.downPipe.elem);
  }
  
  move(speed) {
    this.upPipe.right += speed;
    this.downPipe.right += speed;
  }
}