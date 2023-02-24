const canvasDimensions = {
    width: 300,
    height: 300,
}

const canvas = document.getElementById("ball-canvas");
canvas.width = canvasDimensions.width;
canvas.height = canvasDimensions.height;
const ctx = canvas.getContext("2d");

class InputManager{
    constructor(movement){
        this.movement = movement
    }
    keypress(event){
        switch (event.keyCode){
            case 37:
                movement.moveLeft();
            break;
            case 38:
                movement.moveUp();
            break;
            case 39:
                movement.moveRight();
            break;
            case 40:
                movement.moveDown();
            break;
         }
    }
}

class Movement{
    constructor(square){
        this.square = square;
    }
    moveLeft(){
        let newXPosition = this.square.position.x-3;
        if(newXPosition < 0){
            newXPosition = 0;
        }
        this.square.position.x = newXPosition;
    }
    moveUp(){
        let newYPosition = this.square.position.y-3;
        if(newYPosition < 0){
            newYPosition = 0;
        }
        this.square.position.y = newYPosition;
    }
    moveRight(){
        let newXPosition = this.square.position.x+3;
        if(newXPosition > canvasDimensions.width-this.square.size){
            newXPosition = canvasDimensions.width-this.square.size;
        }
        this.square.position.x = newXPosition;
    }
    moveDown(){
        let newYPosition = this.square.position.y+3;
        if(newYPosition > canvasDimensions.height-this.square.size){
            newYPosition = canvasDimensions.height-this.square.size;
        }
        this.square.position.y = newYPosition;
    }
}

class SquareFactory{
    startPosition = {
        x: 50,
        y: 50
    }

    create(size){
        const square = new Square(this.startPosition, size);
        const drawer = new SquareDrawer(square);
        drawerManager.addDrawer(drawer);
        return square;
    }
}

class Square{
    color = "blue";
    constructor(position, size){
        this.position = position;
        this.size = size;
    }
}

class SquareDrawer{
    constructor(square){
        this.square = square
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.square.color;
        ctx.rect(this.square.position.x, this.square.position.y, this.square.size, this.square.size);
        ctx.fill();
        ctx.closePath();
    }
}

class DrawerManager{
    constructor(){
        this.drawers = []
    }
    addDrawer(drawer){
        this.drawers.push(drawer)
    }
    draw(){
        ctx.clearRect(0,0,canvasDimensions.width, canvasDimensions.height)
        this.drawers.forEach(drawer => {
            drawer.draw()
        });
    }
}

const drawerManager = new DrawerManager();

const squareFactory = new SquareFactory();
const square = squareFactory.create(15);

const movement = new Movement(square);
const inputManager = new InputManager(movement);
window.addEventListener("keydown", (e) => inputManager.keypress(e))

setInterval(() => drawerManager.draw(), 100);