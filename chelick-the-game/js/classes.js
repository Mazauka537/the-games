class Level {
  constructor(options) {
    this.height = options.height;
    this.width = options.width;
    this.top = options.top;
    this.rockCount = options.rockCount;
    this.bananCount = options.bananCount;
    this.grapeCount = options.grapeCount;
    this.grassCount = options.grassCount;
    this.items = options.withoutItems ? [] : this.createItems(this.rockCount, this.bananCount, this.grapeCount);
    this.decor = this.createDecore(this.grassCount);
    this.level = this.create();
  }

  get Top() {
    return this.top;
  }
  set Top(value) {
    this.top = value;
    this.level.style.top = this.top + 'px';
  }

  createItems(rockCount = 0, bananCount = 0, grapeCount = 0) {
    let items = [];
    for (let i = 0; i < bananCount; i++) {
      let item = new Banan({ level: this });
      item.checkCollisionWithAnotherItems(items);
      items.push(item);
    }
    for (let i = 0; i < grapeCount; i++) {
      let item = new Grape({ level: this });
      item.checkCollisionWithAnotherItems(items);
      items.push(item);
    }
    for (let i = 0; i < rockCount; i++) {
      let item = new Rock({ level: this });
      item.checkCollisionWithAnotherItems(items);
      items.push(item);
    }
    return items;
  }

  createDecore(grassCount = 0) {
    let items = [];
    for (let i = 0; i < grassCount; i++) {
      let item = new Grass({ level: this });
      item.checkCollisionWithAnotherItems(items);
      items.push(item);
    }
    return items;
  }

  create() {
    let level = document.createElement('div');
    level.classList.add('level');
    level.style.top = this.top + 'px';
    level.style.width = this.width + 'px';
    level.style.height = this.height + 'px';
    for (let i = 0; i < this.items.length; i++) {
      let item = document.createElement('div');
      item.classList.add('item', this.items[i].type);
      item.style.top = this.items[i].y + 'px';
      item.style.left = this.items[i].x + 'px';
      item.style.width = this.items[i].width + 'px';
      // item.style.width = this.width * this.items[i].width / 1000 + 'px'; 
      item.style.height = this.items[i].height + 'px';
      level.appendChild(item);
    }
    for (let i = 0; i < this.decor.length; i++) {
      let item = document.createElement('div');
      item.classList.add('item', this.decor[i].type);
      item.style.top = this.decor[i].y + 'px';
      item.style.left = this.decor[i].x + 'px';
      item.style.width = this.decor[i].width + 'px';
      item.style.height = this.decor[i].height + 'px';
      level.appendChild(item);
    }
    return level;
  }
}

class Item {
  constructor(options) {
    this.level = options.level;
  }

  checkCollisionWithAnotherItems(items) {
    for (let i = 0; i < items.length; i++)
      if ((this.x + this.width > items[i].x && this.x < items[i].x + items[i].width) && (this.y + this.height > items[i].y && this.y < items[i].y + items[i].height)) {
        this.x = Math.floor(Math.random() * (this.level.width - this.width - this.width) + this.width);
        this.y = Math.floor(Math.random() * (this.level.height - this.height - this.height) + this.height);
        this.checkCollisionWithAnotherItems(items);
      }
  }
}

class Rock extends Item {
  constructor(options) {
    super(options);
    this.type = 'rock';
    this.width = 60 * this.level.width / 1000;
    this.height = this.width - (this.width / 6);
    this.x = Math.floor(Math.random() * (this.level.width - this.width - this.width) + this.width);
    this.y = Math.floor(Math.random() * (this.level.height - this.height - this.height) + this.height);
    console.log(this.width + ' ' + this.height);
    
  }
}

class Banan extends Item {
  constructor(options) {
    super(options);
    this.type = 'banan';
    this.width = 40 * this.level.width / 1000;
    this.height = this.width * 2;
    this.x = Math.floor(Math.random() * (this.level.width - this.width - this.width) + this.width);
    this.y = Math.floor(Math.random() * (this.level.height - this.height - this.height) + this.height);
  }
}

class Grape extends Item {
  constructor(options) {
    super(options);
    this.type = 'grape';
    this.width = 70 * this.level.width / 1000;
    this.height = this.width;
    this.x = Math.floor(Math.random() * (this.level.width - this.width - this.width) + this.width);
    this.y = Math.floor(Math.random() * (this.level.height - this.height - this.height) + this.height);
  }
}

class Grass extends Item {
  constructor(options) {
    super(options);
    this.type = 'grass';
    this.width = 110  * this.level.width / 1000;
    this.height = this.width + 2;
    this.x = Math.floor(Math.random() * (this.level.width - this.width - this.width) + this.width);
    this.y = Math.floor(Math.random() * (this.level.height - this.height - this.height) + this.height);
  }
}
