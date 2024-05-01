class Map {
    constructor(debugMode) {
        this.inf = 999;
        this.offset = 50;
        this.multiplier = 100;
        this.wayPoints = this.initializeWayPoints();

        this.mapVisible = true;
        this.wayPointsVisible = debugMode;
        this.wayPointsNumberVisible = debugMode;
        this.waysVisible = debugMode;
        this.waysCostVisible = debugMode;
        this.wayPointsAvailableTurnsVisible = debugMode;
    }

    getRoute(startWayPoint, endWayPoints) {
        let startPoint = startWayPoint.number;
        let visited = [];
        let distanceTo = [];
        let pathTo = [];
        let wayPoints = this.wayPoints;
        let inf = this.inf;

        for (let i = 0; i < this.wayPoints.length; i++) {
            visited[i] = false;
            distanceTo[i] = this.inf;
            pathTo[i] = '';
        }

        distanceTo[startPoint] = 0;

        //start recursive algorithm
        step(startPoint);

        let routes = [];
        for (let i = 0; i < this.wayPoints.length; i++) {
            let x = pathTo[i].split('-');
            x.pop();
            routes.push(x);
        }

        return {
            routeTo: routes,
            distanceTo: distanceTo,
        };

        function step(currentPoint) {
            for (let i = 0; i < wayPoints[currentPoint].ways.length; i++) {
                if (wayPoints[currentPoint].ways[i] !== inf && !visited[currentPoint]) {
                    if (distanceTo[currentPoint] + wayPoints[currentPoint].ways[i] < distanceTo[i]) {
                        distanceTo[i] = distanceTo[currentPoint] + wayPoints[currentPoint].ways[i];
                        pathTo[i] = pathTo[currentPoint] + i + '-';
                    }
                }
            }

            visited[currentPoint] = true;

            let min = inf;
            let nextPoint = null;

            for (let i = 0; i < distanceTo.length; i++) {
                if (!visited[i] && distanceTo[i] < min) {
                    min = distanceTo[i];
                    nextPoint = i;
                }
            }

            let finish = true;
            for (let i = 0; i < endWayPoints.length; i++) {
                if (!visited[endWayPoints[i].number]) {
                    finish = false;
                    break;
                }
            }

            if (nextPoint !== null && !finish) step(nextPoint);
        }
    }

    initializeWayPoints() {
        let wayPointsCount = 60;

        let wayPointsPositionTemplates = [
            [0, 2], //0
            [0, 0],
            [4, 0],
            [5, 0],
            [6, 0],
            [9, 0],
            [1, 1],
            [3, 1],
            [3, 2],
            [2, 2],
            [6, 2], //10
            [9, 1],
            [9, 2],
            [6, 3],
            [9, 3],
            [9, 4],
            [6, 4],
            [5, 4],
            [4, 3],
            [1, 3],
            [1, 4], //20
            [1, 5],
            [1, 6],
            [0, 6],
            [0, 8],
            [4, 8],
            [4, 6],
            [5, 5],
            [5, 8],
            [6, 8],
            [7, 8], //30
            [7, 6],
            [6, 5],
            [1, 2],
            [9, 5],
            [9, 6],
            [9, 8],
            [10, 0],
            [10, 1],
            [11, 0],
            [11, 1], //40
            [12, 0],
            [15, 0],
            [15, 1],
            [15, 2],
            [11, 2],
            [11, 3],
            [13, 3],
            [13, 4],
            [14, 3],
            [14, 5], //50
            [11, 5],
            [11, 6],
            [10, 6],
            [10, 8],
            [11, 7],
            [11, 8],
            [15, 8],
            [15, 7],
            [15, 6], //59
        ];

        if (wayPointsPositionTemplates.length !== wayPointsCount)
            throw new Error('wayPointsPositionTemplates is not correct');

        let left = 'left';
        let up = 'up';
        let right = 'right';
        let down = 'down';

        let wayPointsAvailableTurns = [
            {up: 1, right: 33, down: 23}, //0
            {right: 2, down: 0},
            {left: 1, right: 3, down: 18},
            {left: 2, right: 4, down: 17},
            {left: 3, right: 5, down: 10},
            {left: 4, down: 11},
            {right: 7, down: 33},
            {left: 6, down: 8},
            {left: 9, up: 7},
            {right: 8},
            {up: 4, right: 12, down: 13}, //10
            {up: 5, right: 38, down: 12},
            {left: 10, up: 11},
            {up: 10, right: 14},
            {left: 13, down: 15},
            {left: 16, up: 14, down: 34},
            {right: 15},
            {left: 20, up: 3},
            {left: 19, up: 2},
            {up: 33, right: 18, down: 20},
            {up: 19, right: 17, down: 21}, //20
            {up: 20, right: 27, down: 22},
            {left: 23, up: 21, right: 26},
            {up: 0, right: 22, down: 24},
            {up: 23, right: 25},
            {left: 24, up: 26},
            {left: 22, down: 25},
            {left: 21, down: 28},
            {up: 27, right: 29},
            {left: 28, up: 32, right: 30},
            {left: 29, up: 31, right: 36}, //30
            {right: 35, down: 30},
            {right: 34, down: 29},
            {left: 0, up: 6, down: 19},
            {left: 32, up: 15, down: 35},
            {left: 31, up: 34, right: 53, down: 36},
            {left: 30, up: 35},
            {right: 39, down: 38},
            {left: 11, up: 37, down: 53},
            {left: 37, down: 40},
            {up: 39, right: 43}, //40
            {right: 42},
            {left: 41, down: 43},
            {left: 40, up: 42, down: 44},
            {left: 45, up: 43, down: 59},
            {right: 44, down: 46},
            {up: 45, right: 47, down: 51},
            {left: 46, down: 48},
            {up: 47},
            {down: 50},
            {left: 51, up: 49}, //50
            {up: 46, right: 50, down: 52},
            {up: 51, right: 59},
            {left: 35, up: 38, down: 54},
            {up: 53, right: 56},
            {right: 58, down: 56},
            {left: 54, up: 55, right: 57},
            {left: 56},
            {left: 55, up: 59},
            {left: 52, up: 44, down: 58}, //59
        ];

        if (wayPointsAvailableTurns.length !== wayPointsCount)
            throw new Error('wayPointsAvailableTurns is not correct');

        let wayPointsWays = [];

        for (let i = 0; i < wayPointsCount; i++) {
            wayPointsWays[i] = [];
            for (let j = 0; j < wayPointsCount; j++)
                wayPointsWays[i][j] = this.inf;
        }

        {
            wayPointsWays[0][1] = 2;
            wayPointsWays[0][33] = 1;
            wayPointsWays[0][23] = 4;
            wayPointsWays[1][2] = 4;
            wayPointsWays[2][3] = 1;
            wayPointsWays[2][18] = 3;
            wayPointsWays[3][4] = 1;
            wayPointsWays[3][17] = 4;
            wayPointsWays[4][5] = 3;
            wayPointsWays[4][10] = 2;
            wayPointsWays[5][11] = 1;
            wayPointsWays[6][7] = 2;
            wayPointsWays[6][33] = 1;
            wayPointsWays[7][8] = 1;
            wayPointsWays[8][9] = 1;
            wayPointsWays[10][12] = 3;
            wayPointsWays[10][13] = 1;
            wayPointsWays[11][12] = 1;
            wayPointsWays[11][38] = 1;
            wayPointsWays[13][14] = 3;
            wayPointsWays[14][15] = 1;
            wayPointsWays[15][16] = 3;
            wayPointsWays[15][34] = 1;
            wayPointsWays[17][20] = 4;
            wayPointsWays[18][19] = 3;
            wayPointsWays[19][20] = 1;
            wayPointsWays[19][33] = 1;
            wayPointsWays[20][21] = 1;
            wayPointsWays[21][22] = 1;
            wayPointsWays[21][27] = 4;
            wayPointsWays[22][23] = 1;
            wayPointsWays[22][26] = 3;
            wayPointsWays[23][24] = 2;
            wayPointsWays[24][25] = 4;
            wayPointsWays[25][26] = 2;
            wayPointsWays[27][28] = 3;
            wayPointsWays[28][29] = 1;
            wayPointsWays[29][30] = 1;
            wayPointsWays[29][32] = 3;
            wayPointsWays[30][31] = 2;
            wayPointsWays[30][36] = 2;
            wayPointsWays[31][35] = 2;
            wayPointsWays[32][34] = 3;
            wayPointsWays[34][35] = 1;
            wayPointsWays[35][36] = 2;
            wayPointsWays[35][53] = 1;
            wayPointsWays[37][38] = 1;
            wayPointsWays[37][39] = 1;
            wayPointsWays[38][53] = 5;
            wayPointsWays[39][40] = 1;
            wayPointsWays[40][43] = 4;
            wayPointsWays[41][42] = 3;
            wayPointsWays[42][43] = 1;
            wayPointsWays[43][44] = 1;
            wayPointsWays[44][45] = 4;
            wayPointsWays[44][59] = 4;
            wayPointsWays[45][46] = 1;
            wayPointsWays[46][47] = 2;
            wayPointsWays[46][51] = 2;
            wayPointsWays[47][48] = 1;
            wayPointsWays[47][48] = 1;
            wayPointsWays[49][50] = 2;
            wayPointsWays[50][51] = 3;
            wayPointsWays[51][52] = 1;
            wayPointsWays[52][59] = 4;
            wayPointsWays[53][54] = 2;
            wayPointsWays[54][56] = 1;
            wayPointsWays[54][56] = 1;
            wayPointsWays[55][56] = 1;
            wayPointsWays[55][58] = 4;
            wayPointsWays[56][57] = 4;
            wayPointsWays[58][59] = 1;
        }

        for (let i = 0; i < wayPointsCount; i++)
            for (let j = 0; j < wayPointsCount; j++)
                if (wayPointsWays[i][j] !== this.inf)
                    wayPointsWays[j][i] = wayPointsWays[i][j];

        for (let i = 0; i < wayPointsCount; i++) {
            if (wayPointsWays[i] === undefined || wayPointsWays[i].length !== wayPointsCount)
                throw new Error('wayPointsWays is not correct');
        }

        let wayPoints = [];

        for (let i = 0; i < wayPointsCount; i++) {
            wayPoints.push(new WayPoint({
                number: i,
                x: (wayPointsPositionTemplates[i][0] + 1) * this.multiplier - this.offset,
                y: (wayPointsPositionTemplates[i][1] + 1) * this.multiplier - this.offset,
                fat: 10,
                availableTurns: wayPointsAvailableTurns[i],
                ways: wayPointsWays[i],
            }));
        }

        return wayPoints;
    }

    addNewActor(actorType, startWayPointNumber, speed, fat, color) {
        let ways = [];
        for (let i = 0; i < this.wayPoints.length + 1; i++) {
            ways[i] = this.inf;
        }

        let wayPoint;
        switch (actorType) {
            case 'target':
                wayPoint = new Target({map: this});
                break;
            case 'hunter':
                wayPoint = new Hunter({map: this});
                break;
            default:
                throw new Error('Unknown type of Actor');
        }

        wayPoint.number = this.wayPoints.length;
        wayPoint.x = this.wayPoints[startWayPointNumber].x;
        wayPoint.y = this.wayPoints[startWayPointNumber].y;
        wayPoint.speed = speed;
        wayPoint.fat = fat;
        wayPoint.color = color;
        wayPoint.availableTurns = this.wayPoints[startWayPointNumber].availableTurns;
        wayPoint.ways = ways;
        wayPoint.movingFrom = startWayPointNumber;
        wayPoint.movingTo = startWayPointNumber;

        wayPoint.ways[startWayPointNumber] = 0;

        for (let i = 0; i < this.wayPoints.length; i++) {
            this.wayPoints[i].ways.push(wayPoint.ways[i]);
        }

        this.wayPoints.push(wayPoint);

        return this.wayPoints[this.wayPoints.length - 1];
    }

    render() {
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (this.mapVisible) {
            ctx.beginPath();

            ctx.strokeStyle = '#eee';
            ctx.lineWidth = 50;
            ctx.lineCap = 'square';

            ctx.moveTo(0, 0);
            ctx.lineTo(canvas.width, 0);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(0, 0);

            ctx.moveTo(100, 600);
            ctx.lineTo(100, 300);

            ctx.moveTo(100, 200);
            ctx.lineTo(100, 100);
            ctx.lineTo(400, 100);
            ctx.lineTo(400, 300);
            ctx.lineTo(200, 300);
            ctx.lineTo(200, 200);
            ctx.lineTo(300, 200);

            ctx.moveTo(500, 100);
            ctx.lineTo(500, 400);
            ctx.lineTo(200, 400);

            ctx.moveTo(200, 500);
            ctx.lineTo(900, 500);

            ctx.moveTo(600, 100);
            ctx.lineTo(600, 800);

            ctx.moveTo(600, 400);
            ctx.lineTo(900, 400);

            ctx.moveTo(500, 900);
            ctx.lineTo(500, 600);
            ctx.lineTo(200, 600);

            ctx.moveTo(100, 800);
            ctx.lineTo(400, 800);
            ctx.lineTo(400, 700);
            ctx.lineTo(100, 700);
            ctx.lineTo(100, 800);

            ctx.moveTo(700, 800);
            ctx.lineTo(700, 600);
            ctx.lineTo(900, 600);

            ctx.moveTo(800, 800);
            ctx.lineTo(800, 700);
            ctx.lineTo(900, 700);
            ctx.lineTo(900, 800);
            ctx.lineTo(800, 800);

            ctx.moveTo(700, 100);
            ctx.lineTo(900, 100);
            ctx.lineTo(900, 200);
            ctx.lineTo(700, 200);
            ctx.lineTo(700, 100);

            ctx.moveTo(700, 300);
            ctx.lineTo(1000, 300);

            ctx.moveTo(1000, 0);
            ctx.lineTo(1000, 100);

            ctx.moveTo(1000, 200);
            ctx.lineTo(1000, 600);

            ctx.moveTo(1000, 700);
            ctx.lineTo(1000, 900);

            ctx.moveTo(1200, 0);
            ctx.lineTo(1200, 100);
            ctx.lineTo(1500, 100);

            ctx.moveTo(1100, 100);
            ctx.lineTo(1100, 800);

            ctx.moveTo(1100, 200);
            ctx.lineTo(1500, 200);

            ctx.moveTo(1100, 700);
            ctx.lineTo(1500, 700);

            ctx.moveTo(1200, 300);
            ctx.lineTo(1500, 300);
            ctx.lineTo(1500, 600);
            ctx.lineTo(1200, 600);

            ctx.moveTo(1400, 300);
            ctx.lineTo(1400, 500);
            ctx.lineTo(1200, 500);
            ctx.lineTo(1200, 400);
            ctx.lineTo(1300, 400);
            ctx.lineTo(1300, 500);

            ctx.moveTo(1200, 800);
            ctx.lineTo(1600, 800);

            ctx.stroke();
        }


        if (this.waysVisible) {
            ctx.beginPath();
            ctx.strokeStyle = 'gold';
            ctx.lineWidth = 2;

            for (let i = 0; i < this.wayPoints.length; i++) {
                for (let j = 0; j < this.wayPoints.length; j++) {
                    // if (i < j) {
                    if (this.wayPoints[i].ways[j] !== this.inf) {
                        ctx.moveTo(this.wayPoints[i].x, this.wayPoints[i].y);
                        ctx.lineTo(this.wayPoints[j].x, this.wayPoints[j].y);
                    }
                    // }
                }
            }

            ctx.stroke();
        }

        if (this.wayPointsVisible) {
            ctx.fillStyle = 'green';

            for (let i = 0; i < this.wayPoints.length; i++) {
                ctx.beginPath();
                ctx.arc(this.wayPoints[i].x, this.wayPoints[i].y, this.wayPoints[i].fat, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        if (this.waysCostVisible) {
            ctx.fillStyle = 'orange';
            ctx.font = 'normal 24px Consolas';
            ctx.textAlign = "left";
            ctx.textBaseline = "bottom";

            for (let i = 0; i < this.wayPoints.length; i++) {
                for (let j = 0; j < this.wayPoints.length; j++) {
                    // if (i < j) {
                    if (this.wayPoints[i].ways[j] !== this.inf) {
                        let x = (this.wayPoints[i].x + this.wayPoints[j].x) / 2 + 3;
                        let y = (this.wayPoints[i].y + this.wayPoints[j].y) / 2 + 3;
                        ctx.fillText(this.wayPoints[i].ways[j], x, y);
                    }
                    // }
                }
            }
        }

        if (this.wayPointsAvailableTurnsVisible) {
            ctx.fillStyle = 'green';

            for (let i = 0; i < this.wayPoints.length; i++) {
                ctx.beginPath();

                if (this.wayPoints[i].availableTurns.left !== undefined) {
                    ctx.moveTo(this.wayPoints[i].x - 25, this.wayPoints[i].y);
                    ctx.lineTo(this.wayPoints[i].x - 12, this.wayPoints[i].y - 7);
                    ctx.lineTo(this.wayPoints[i].x - 12, this.wayPoints[i].y + 7);
                }

                if (this.wayPoints[i].availableTurns.right !== undefined) {
                    ctx.moveTo(this.wayPoints[i].x + 25, this.wayPoints[i].y);
                    ctx.lineTo(this.wayPoints[i].x + 12, this.wayPoints[i].y - 7);
                    ctx.lineTo(this.wayPoints[i].x + 12, this.wayPoints[i].y + 7);
                }

                if (this.wayPoints[i].availableTurns.up !== undefined) {
                    ctx.moveTo(this.wayPoints[i].x, this.wayPoints[i].y - 25);
                    ctx.lineTo(this.wayPoints[i].x - 7, this.wayPoints[i].y - 12);
                    ctx.lineTo(this.wayPoints[i].x + 7, this.wayPoints[i].y - 12);
                }

                if (this.wayPoints[i].availableTurns.down !== undefined) {
                    ctx.moveTo(this.wayPoints[i].x, this.wayPoints[i].y + 25);
                    ctx.lineTo(this.wayPoints[i].x - 7, this.wayPoints[i].y + 12);
                    ctx.lineTo(this.wayPoints[i].x + 7, this.wayPoints[i].y + 12);
                }
                ctx.fill();
            }
        }

        if (this.wayPointsNumberVisible) {
            ctx.fillStyle = 'black';
            ctx.font = 'normal 16px Consolas';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            for (let i = 0; i < this.wayPoints.length; i++) {
                ctx.fillText(this.wayPoints[i].number, this.wayPoints[i].x, this.wayPoints[i].y);
            }
        }

    }
}