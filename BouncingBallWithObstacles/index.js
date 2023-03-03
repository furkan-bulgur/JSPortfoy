const canvasDimensions = {
    width: 300,
    height: 300,
}

const canvas = document.getElementById("ball-canvas");
canvas.width = canvasDimensions.width;
canvas.height = canvasDimensions.height;
const ctx = canvas.getContext("2d");

const ComponentTypes = {
    shape: "shape",
    collider: "collider",
    movement: "movement",
    transform: "transform"
}

class CanvasObject{
    constructor(){
        this.components = {};
    }

    getComponent(componentType){
        if(Object.hasOwn(this.components, componentType)){
            return this.components[componentType];
        }else{
            return null;
        }
    }
}

class CanvasObjectComponent{
    constructor(parent, componentType){
        this.parent = parent;
        this.parent.components[componentType] = this;
    }
}

//#region TRANSFORM COMPONENT

class TransformComponent extends CanvasObjectComponent{
    constructor(parent, position){
        super(parent, ComponentTypes.transform);

        this.position = position;
    }

    updatePosition(deltaPosition){
        this.position.x += deltaPosition.x;
        this.position.y += deltaPosition.y;
    }
}

//#endregion

//#region SHAPE COMPONENTS

class ShapeComponent extends CanvasObjectComponent{
    constructor(parent, color){
        super(parent, ComponentTypes.shape);
        this.color = color;

        this.transform = this.parent.getComponent(ComponentTypes.transform);
    }
}

class CircularShapeComponent extends ShapeComponent{
    constructor(parent, color, rad){
        super(parent, color);
        this.rad = rad;
        
        this.drawer = new CircularDrawer(this.transform, this);
        drawerManager.add(this.drawer);
    }
}

class RectangularShapeComponent extends ShapeComponent{
    constructor(parent, color, size){
        super(parent, color);
        this.size = size;

        this.drawer = new RectangularDrawer(this.transform, this);
        drawerManager.add(this.drawer);
    }
}

//#endregion

//#region COLLIDER COMPONENTS

class ColliderComponent extends CanvasObjectComponent{
    constructor(parent){
        super(parent, ComponentTypes.collider);
        this.transform = this.parent.getComponent(ComponentTypes.transform);
    }
}

class CircularColliderComponent extends ColliderComponent{
    constructor(parent, rad){
        super(parent);
        this.rad = rad;

        // drawerManager.add(new ColliderDrawer(this.transform, this, "blue"))
    }

    getEdgePositions(){
        const x = this.transform.position.x;
        const y = this.transform.position.y;
        return {
            leftX: x - this.rad,
            rightX: x + this.rad,
            topY: y - this.rad,
            bottomY: y + this.rad,
        };
    }
}

class RectangularColliderComponent extends ColliderComponent{
    constructor(parent, size){
        super(parent);
        this.size = size;
    }

    getEdgePositions(){
        const x = this.transform.position.x;
        const y = this.transform.position.y;
        return {
            leftX: x - this.width/2,
            rightX: x + this.width/2,
            topY: y - this.height/2,
            bottomY: y + this.height/2,
        };
    }
}

//#endregion

//#region MOVEMENT COMPONENTS

class MovementComponent extends CanvasObjectComponent{
    constructor(parent){
        super(parent, ComponentTypes.movement);
    }
}

class DirectionalMovementComponent extends MovementComponent{
    constructor(parent, speed, angle){
        super(parent);
        this.speed = speed;
        this.angle = angle;

        this.transform = this.parent.getComponent(ComponentTypes.transform);
        this.collider = this.parent.getComponent(ComponentTypes.collider);

        movementManager.add(this);
    }

    update(){
        this.updateAngle();
        const deltaPosition = this.getDeltaPosition();
        this.transform.updatePosition(deltaPosition);
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
        if(this.collider === null) return;

        const edgePositions = this.collider.getEdgePositions();

        if (edgePositions.rightX >= canvasDimensions.width || edgePositions.leftX <= 0){
            this.angle = 180 - this.angle;
        }
        if (edgePositions.bottomY >= canvasDimensions.height || edgePositions.topY <= 0){
            this.angle = -this.angle;
        }
    }
}

//#endregion

//#region OBJECTS

class Ball extends CanvasObject{
}

class Obstacle extends CanvasObject{
}

//#endregion

//#region FACTORIES

class BallFactory{
    create(ballModel){
        const ball = new Ball();
        new TransformComponent(ball, ballModel.position);
        new CircularShapeComponent(ball, ballModel.color, ballModel.rad);
        new CircularColliderComponent(ball, ballModel.rad);
        new DirectionalMovementComponent(ball, ballModel.movement.speed, ballModel.movement.angle);

        return ball;
    }
}

class ObstacleFactory{
    create(obstacleModel){
        let obstacle;
        switch(obstacleModel.type){
            case "circular":
                obstacle = new Obstacle();
                new TransformComponent(obstacle, obstacleModel.position);
                new CircularShapeComponent(obstacle, obstacleModel.color, obstacleModel.rad);
                break;
            case "rectangular":
                obstacle = new Obstacle();
                new TransformComponent(obstacle, obstacleModel.position);
                new RectangularShapeComponent(obstacle, obstacleModel.color, obstacleModel.size);
                break;
        }
        return obstacle;
    }
}

//#endregion

//#region DRAWER

class ColliderDrawer{
    constructor(transform, collider, color){
        this.transform = transform;
        this.collider = collider;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.transform.position.x, this.transform.position.y, this.collider.rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

class Drawer{
    constructor(transform, shape){
        this.transform = transform
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
        ctx.arc(this.transform.position.x, this.transform.position.y, this.shape.rad, 0, Math.PI * 2);
    }
}

class RectangularDrawer extends Drawer{
    drawShape(){
        const x = this.transform.position.x - this.shape.size.width / 2;
        const y = this.transform.position.y - this.shape.size.height / 2;
        ctx.rect(x, y, this.shape.size.width, this.shape.size.height);
    }
}
//#endregion

//#region MANAGERS

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

//#endregion

//#region MODELS

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

const obstacleModel3 = {
    type: "circular",
    color: "yellow",
    position:{
        x: 0,
        y: 0
    },
    rad: 30
}

const obstacleModel4 = {
    type: "rectangular",
    color: "magenta",
    position:{
        x: 0,
        y: 0
    },
    size:{
        width: 50,
        height: 50
    }
}

//#endregion

const drawerManager = new DrawerManager();
const movementManager = new MovementManager();

const ballFactory = new BallFactory();
const obstacleFactory = new ObstacleFactory();

ballFactory.create(ballModel);
obstacleFactory.create(obstacleModel);
// obstacleFactory.create(obstacleModel2);
// obstacleFactory.create(obstacleModel3);
// obstacleFactory.create(obstacleModel4);

setInterval(() => {
    movementManager.update();
    drawerManager.draw();
}, 25);