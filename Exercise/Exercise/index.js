const canvasDimensions = {
    width: 300,
    height: 300
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
        super("orange")
        this.position = position;
        this.rad = rad;
    }
}

class BallFactory{
    create(ballModel){
        const ball = new Ball(ballModel.position, ballModel.rad)
        const ballDrawer = new BallDrawer(ball);
        drawerManager.add(ballDrawer);
        return ball;
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
        ctx.arc(this.ball.position.x, this.ball.position.y, this.ball.rad, 0, Math.PI*2);
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

const ballModel = {
    position:{
        x: 50,
        y: 50
    },
    rad: 10
}

const drawerManager = new DrawerManager();

const ballFactory = new BallFactory();

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    if(x < canvasDimensions.width && y < canvasDimensions.height){
        const ball = ballFactory.create(ballModel);
    }
}

canvas.addEventListener("mousedown", function(e)
{
    getMousePosition(canvas, e);
});

setInterval(() => {
    drawerManager.draw();
}, 25);
