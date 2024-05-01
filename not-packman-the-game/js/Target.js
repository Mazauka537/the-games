class Target extends Actor {
    constructor(o) {
        super(o);

        this.direction = 'none';
        this.nextDirection = 'none';
    }
    
    move() {
        if (this.direction !== 'none') {

            if (this.map.wayPoints[this.movingFrom].availableTurns[this.direction] !== undefined) {//если напровление от точки отправления доступно
                this.moveTo(this.map.wayPoints[this.movingTo]); //то двигаемся к точке, находящейся в этом направлении
            } else { //если мы не можем двигаться в текущем направлении
                this.x = this.map.wayPoints[this.movingFrom].x; //то стоим на точке отправления
                this.y = this.map.wayPoints[this.movingFrom].y;
            }

            //убираем существующие пути
            this.nullifyWays();

            if (this.isNearWayPoint(this.map.wayPoints[this.movingTo])) { //когда приблизились к точке назначения

                this.movingFrom = this.movingTo; //делаем точкой отправления ту точку к которой приблизились

                if (this.availableTurns[this.nextDirection] !== undefined) { //если от точки к которой приблизились можно повернуть в задуманном направлении
                    this.direction = this.nextDirection; //то делаем задуманное направление текущим
                }

                if (this.availableTurns[this.direction] !== undefined) { //если от точки к которой приблизились можно повернуть в текущем направлении
                    this.movingTo = this.availableTurns[this.direction]; //то делаем точку в текущем направлении точкой назначения
                }

                this.availableTurns = this.map.wayPoints[this.movingTo].availableTurns; //меняем доступные направления на направления точки назначения
            }

            //заного расчитываем расстояние путей до точек назначения и отправления
            this.calculateWays();
        }
    }
}