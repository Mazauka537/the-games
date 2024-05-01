let canvas = document.getElementById('canvas');
let height = 900;
let width = 1600;
canvas.height = height;
canvas.width = width;
let ctx = canvas.getContext('2d');

let game = new Game();

function isHunterNearTarget() {
    return Math.pow(hunter.x - target.x, 2) + Math.pow(hunter.y - target.y, 2) <= hunter.speed * hunter.speed;
}
