class Earth {
  constructor(layout) {
    this.layout = layout;
    this.container = document.getElementById('earth');
    this.blocks = [new EarthBlock(this.container), new EarthBlock(this.container)];
    this.blocks[0].left = 0;
    this.blocks[1].left = this.blocks[0].width;
  }
  
  move(speed) {
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].left -= speed;
    }
    
    if (this.blocks[1].left <= 0) {
      this.blocks[0].left = this.blocks[1].left + this.blocks[1].width;
      
      let x = this.blocks[0];
      this.blocks[0] = this.blocks[1];
      this.blocks[1] = x;
    }
  }
}