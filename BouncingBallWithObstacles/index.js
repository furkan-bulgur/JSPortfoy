const canvasDimensions = {
    width: 300,
    height: 300,
}

const canvas = document.getElementById("ball-canvas");
canvas.width = canvasDimensions.width;
canvas.height = canvasDimensions.height;
const ctx = canvas.getContext("2d");

class CanvasObject{
    constructor(color){
        this.color = color;
    }
}

class Ball extends CanvasObject{
    constructor(position, rad){
        super("orange");
        this.position = position;
        this.rad = rad;
    }
}

class Obstacle extends CanvasObject{
    constructor(position, size){
        super("red");
        this.position = position;
        this.size = size;
    }
}

class BallFactory{
    create(position, rad){
        const ball = new Ball(position, rad);
        const drawer = new BallDrawer(ball);
        drawerManager.add(drawer);
        return ball;
    }
}

class ObstacleFactory{
    create(position, size){
        const obstacle = new Obstacle(position, size);
        const drawer = new ObstacleDrawer(obstacle);
        drawerManager.add(drawer);
        return obstacle;
    }
}

class Drawer{
    constructor(canvasObject){
        this.canvasObject = canvasObject;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.canvasObject.color;
        this.drawShape();
        ctx.fill();
        ctx.closePath();
    }
}

class BallDrawer extends Drawer{
    constructor(ball){
        super(ball);
        this.ball = ball;
    }

    drawShape(){
        ctx.arc(this.ball.position.x, this.ball.position.y, this.ball.rad, 0, Math.PI * 2);
    }
}

class ObstacleDrawer extends Drawer{
    constructor(obstacle){
        super(obstacle);
        this.obstacle = obstacle;
    }

    drawShape(){
        ctx.rect(this.obstacle.position.x, this.obstacle.position.y, this.obstacle.size.width, this.obstacle.size.height);
    }
}

class DrawerManager{
    constructor(){
        this.drawers = [];
    }

    add(drawer){
        this.drawers.push(drawer);
    }

    remove(drawer){
        this.drawers = this.drawers.filter(d => d !== drawer);
    }

    draw(){
        ctx.clearRect(0,0,canvasDimensions.width, canvasDimensions.height);
        this.drawers.forEach(drawer => {
            drawer.draw();
        });
    }
}

class MovementManager{
    constructor(){
        this.movements = [];
    }

    add(movement){
        this.movements.push(movement);
    }

    remove(movement){
        this.movements = this.movements.filter(m => m !== movement);
    }

    update(){
        this.movements.forEach(movement => {
            movement.update();
        });
    }
}

const ballInitialValues = {
    position:{
        x: 50,
        y: 50
    },
    rad: 10
}

const obstacleInitialValues = {
    position:{
        x: 150,
        y: 150
    },
    size:{
        width: 50,
        height: 50
    }
}

const drawerManager = new DrawerManager();

const ballFactory = new BallFactory();
const obstacleFactory = new ObstacleFactory();

ballFactory.create(ballInitialValues.position, ballInitialValues.rad);
obstacleFactory.create(obstacleInitialValues.position, obstacleInitialValues.size);

setInterval(() => drawerManager.draw(), 100);