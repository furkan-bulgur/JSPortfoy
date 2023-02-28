const canvasDimensions = {
    width: 300,
    height: 300,
}

const canvas = document.getElementById("ball-canvas");
canvas.width = canvasDimensions.width;
canvas.height = canvasDimensions.height;
const ctx = canvas.getContext("2d");

const ComponentTypes = {
    shape: "shape"
}

class CanvasObject{
    constructor(){
        this.components = {};
    }

    addComponent(componentType, component){
        switch (componentType) {
            case ComponentTypes.shape:
                this.components.shape = component;
                component.parent = this;
                break;
            default:
                break;
        }
    }
}

class CanvasObjectComponent{
    constructor(){
        this.parent = null;
    }
}

class ShapeComponent extends CanvasObjectComponent{
    constructor(color, position){
        super();
        this.color = color;
        this.position = position;
    }
}

class CircularShapeComponent extends ShapeComponent{
    constructor(color, position, rad){
        super(color, position);
        this.rad = rad;
        
        this.drawer = new CircularDrawer(this);
        drawerManager.add(this.drawer);
    }
}

class RectangularShapeComponent extends ShapeComponent{
    constructor(color, position, size){
        super(color, position);
        this.size = size;

        this.drawer = new RectangularDrawer(this);
        drawerManager.add(this.drawer);
    }
}

class Ball extends CanvasObject{
}

class Obstacle extends CanvasObject{
}

class BallFactory{
    create(ballModel){
        const ballShape = new CircularShapeComponent(ballModel.color, ballModel.position, ballModel.rad)
        const ball = new Ball();
        ball.addComponent(ComponentTypes.shape, ballShape);

        const movement = new DirectionalMovement(ballShape, ballModel.movement.speed, ballModel.movement.angle)
        movementManager.add(movement)
        return ball;
    }
}

class ObstacleFactory{
    create(obstacleModel){
        let obstacle;
        let shape;
        switch(obstacleModel.type){
            case "circular":
                obstacle = new Obstacle();
                shape = new CircularShapeComponent(obstacleModel.color, obstacleModel.position, obstacleModel.rad);
                obstacle.addComponent(ComponentTypes.shape, shape);
                break;
            case "rectangular":
                obstacle = new Obstacle();
                shape = new RectangularShapeComponent(obstacleModel.color, obstacleModel.position, obstacleModel.size);
                obstacle.addComponent(ComponentTypes.shape, shape);
                break;
        }
        return obstacle;
    }
}

class Drawer{
    constructor(shape){
        this.shape = shape;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.shape.color;
        this.drawShape();
        ctx.fill();
        ctx.closePath();
    }
}

class CircularDrawer extends Drawer{
    drawShape(){
        ctx.arc(this.shape.position.x, this.shape.position.y, this.shape.rad, 0, Math.PI * 2);
    }
}

class RectangularDrawer extends Drawer{
    drawShape(){
        ctx.rect(this.shape.position.x, this.shape.position.y, this.shape.size.width, this.shape.size.height);
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

class DirectionalMovement{
    constructor(shape, speed, angle){
        this.shape = shape;
        this.speed = speed;
        this.angle = angle;
    }

    update(){
        this.updateAngle();
        const deltaPosition = this.getDeltaPosition();
        this.shape.position.x += deltaPosition.x;
        this.shape.position.y += deltaPosition.y;
    }

    getDeltaPosition(){
        const x = Math.cos(Math.PI * this.angle / 180) * this.speed;
        const y = Math.sin(Math.PI * this.angle / 180) * this.speed;

        return {
            x: x,
            y: y
        }
    }

    updateAngle(){
        if (this.shape.position.x + this.shape.rad >= canvasDimensions.width || this.shape.position.x - this.shape.rad <= 0){
            this.angle = 180 - this.angle;
        }
        if (this.shape.position.y + this.shape.rad >= canvasDimensions.height || this.shape.position.y - this.shape.rad <= 0){
            this.angle = -this.angle;
        }
    }
}

const ballModel = {
    color: "orange",
    position:{
        x: 50,
        y: 50
    },
    rad: 10,
    movement:{
        speed: 3,
        angle: 30
    }
}

const obstacleModel = {
    type: "circular",
    color: "red",
    position:{
        x: 150,
        y: 150
    },
    rad: 30
}

const obstacleModel2 = {
    type: "rectangular",
    color: "green",
    position:{
        x: 100,
        y: 100
    },
    size:{
        width: 40,
        height: 60
    }
}

const drawerManager = new DrawerManager();
const movementManager = new MovementManager();

const ballFactory = new BallFactory();
const obstacleFactory = new ObstacleFactory();

ballFactory.create(ballModel);
obstacleFactory.create(obstacleModel);
// obstacleFactory.create(obstacleModel2);

setInterval(() => {
    movementManager.update();
    drawerManager.draw();
}, 25);