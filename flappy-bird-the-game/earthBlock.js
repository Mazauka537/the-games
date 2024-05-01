 class EarthBlock {
   constructor(container) {
     this.container = container;
     this._left = 0;
     this.width = this.container.offsetWidth + 40;
     this.width = 24 * Math.floor(this.width / 24);
     this.elem = this.createEarthBlock();
   }
   
   createEarthBlock() {
     let block = document.createElement('div');
     block.classList.add('earthBlock');
     block.style.width = this.width + 'px';
     block.style.left = this._left + 'px';
     this.container.append(block);
     return block;
   }
   
   get left() {
     return this._left;
   }
   
   set left(value) {
     this._left = value;
     this.elem.style.left = value + 'px';
   }
 }