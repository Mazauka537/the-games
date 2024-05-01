class Hunter extends Actor {
    constructor(o) {
        super(o);
    }

    move(target) {
        if (this.movingTo === target.number && target.movingTo !== this.movingFrom) { //если у охотника точка назначения - таргет, и охотник движется в одну сторону с таргетом
            if (target.isNearWayPoint(this.map.wayPoints[target.movingFrom])) { //то если таргет достиг точки поворота, у охотника меняется точка назначения на эту точку поворота
                this.nullifyWays();

                this.movingTo = target.movingFrom;

                this.calculateWays();
            }
        }

        if (this.movingFrom === target.movingTo && this.movingTo === target.movingFrom) { //если тагрет входит в пределы пути охотника
            this.moveTo(this.map.wayPoints[target.number]); //то просто двигаемся к охотнику, не меняя при этом точки назначения и отправления
        } else {
            if (this.movingTo === target.number) {
                this.calculateWays();
            }

            let routeToTarget = this.map.getRoute(this, [target]).routeTo[target.number];

            if (this.ways[+routeToTarget[0]] === 0)
                routeToTarget.shift();

            if (+routeToTarget[0] === this.movingFrom) { //если следующая точка к которой нужно двигаться - точка от которой мы уже движимся
                //то необходимо развернуться, тоесть поменять точки отправления и назначения
                let x = this.movingFrom;
                this.movingFrom = this.movingTo;
                this.movingTo = x;
            }

            if (routeToTarget.length !== 0)
                this.movingTo = +routeToTarget[0]; //устанавливаем точку назначения

            this.moveTo(this.map.wayPoints[this.movingTo]); //двигаемся к точке назначения

            //обнуляем пути
            this.nullifyWays();

            if (this.isNearWayPoint(this.map.wayPoints[this.movingTo])) { //если приблизились к точке назначения
                if (this.movingTo !== target.number) { //если точка назначения не является таргетом
                    this.movingFrom = this.movingTo; //то делаем точку назначения точкой отправления
                    this.movingTo = +routeToTarget[1]; //а точкой назначения делаем точку следующую по порядку
                } else { //если точка назначения - таргет
                    this.movingFrom = target.movingFrom;
                    this.movingTo = target.number;
                }
            }

            //заного расчитываем расстояния путей к новым точкам назначения и отправления
            this.calculateWays();
        }
    }
}