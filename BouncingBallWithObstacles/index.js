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
    movement: "movement"
}

class CanvasObject{
    constructor(){
        this.components = {};
    }

    addComponent(componentType, component){
        switch (componentType) {
            case ComponentTypes.shape:
                this.components.shape = component;
                component.attachParent(this);
                break;
            case ComponentTypes.collider:
                this.components.collider = component;
                component.attachParent(this);
                break;
            case ComponentTypes.movement:
                this.components.movement = component;
                component.attachParent(this);
                break;
            default:
                break;
        }
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
    constructor(){
        this.parent = null;
    }

    attachParent(parent){
        this.parent = parent;
    }
}

class ShapeComponent extends CanvasObjectComponent{
    constructor(color, position){
        super();
        this.color = color;
        this.position = position;
    }

    updatePosition(deltaPosition){
        this.position.x += deltaPosition.x;
        this.position.y += deltaPosition.y;

        let collider = this.parent.getComponent(ComponentTypes.collider);
        if(collider != null){
            collider.updateCenterPosition(deltaPosition);
        }
    }
}

class CircularShapeComponent extends ShapeComponent{
    constructor(color, position, rad){
        super(color, position);
        this.rad = rad;
        
        this.drawer = new CircularDrawer(this);
    }

    attachParent(parent){
        super.attachParent(parent);
        drawerManager.add(this.drawer);
    }
}

class RectangularShapeComponent extends ShapeComponent{
    constructor(color, position, size){
        super(color, position);
        this.size = size;

        this.drawer = new RectangularDrawer(this);
    }

    attachParent(parent){
        super.attachParent(parent);
        drawerManager.add(this.drawer);
    }
}

class ColliderComponent extends CanvasObjectComponent{
    constructor(position){
        super();
        this.center = position;
    }

    updateCenterPosition(deltaPosition){
        this.center.x += deltaPosition.x;
        this.center.y += deltaPosition.y;
    }
}

class CircularColliderComponent extends ColliderComponent{
    constructor(position, rad){
        super(position);
        this.rad = rad;
        this.center = this.calculateCenterPosition(position);

        console.log(this.center);
    }

    calculateCenterPosition(position){
        console.log(this.rad);
        return {
            x: position.x + this.rad/2,
            y: position.y + this.rad/2
        }
    }

    getEdgePositions(){
        return {
            leftX: this.center.x - this.rad/2,
            rightX: this.center.x + this.rad/2,
            topY: this.center.y - this.rad/2,
            bottomY: this.center.y + this.rad/2,
        };
    }
}

class RectangularColliderComponent extends ColliderComponent{
    constructor(position, size){
        super(position);
        this.size = size;
        this.center = this.calculateCenterPosition(position);
    }

    calculateCenterPosition(position){
        return {
            x: position.x + this.size.width/2,
            y: position.y + this.size.height/2
        }
    }

    getEdgePositions(){
        return {
            leftX: this.center.x - this.width/2,
            rightX: this.center.x + this.width/2,
            topY: this.center.y - this.height/2,
            bottomY: this.center.y + this.height/2,
        };
    }
}

class MovementComponenet extends CanvasObjectComponent{
    constructor(){
        super();
    }

    attachParent(parent){
        super.attachParent(parent);
        movementManager.add(this);
    }

}

class DirectionalMovementComponent extends MovementComponenet{
    constructor(speed, angle){
        super();
        this.speed = speed;
        this.angle = angle;
    }

    update(){
        let shape = this.parent.getComponent(ComponentTypes.shape);

        this.updateAngle();
        const deltaPosition = this.getDeltaPosition();

        shape.updatePosition(deltaPosition);
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
        let collider = this.parent.getComponent(ComponentTypes.collider);
        if(collider === null) return;

        const edgePositions = collider.getEdgePositions();

        if (edgePositions.rightX >= canvasDimensions.width || edgePositions.leftX <= 0){
            this.angle = 180 - this.angle;
        }
        if (edgePositions.bottomY >= canvasDimensions.height || edgePositions.topY <= 0){
            this.angle = -this.angle;
        }
    }
}

class Ball extends CanvasObject{
}

class Obstacle extends CanvasObject{
}

class BallFactory{
    create(ballModel){
        const ballShape = new CircularShapeComponent(ballModel.color, ballModel.position, ballModel.rad)
        const ballCollider = new CircularColliderComponent(ballModel.position, ballModel.rad);
        const ballMovement = new DirectionalMovementComponent(ballModel.movement.speed, ballModel.movement.angle);
        const ball = new Ball();

        ball.addComponent(ComponentTypes.shape, ballShape);
        ball.addComponent(ComponentTypes.collider, ballCollider);
        ball.addComponent(ComponentTypes.movement, ballMovement);

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