const canvasDimensions = {
    width: 300,
    height: 300,
}

const canvas = document.getElementById("ball-canvas");
canvas.width = canvasDimensions.width;
canvas.height = canvasDimensions.height;
const ctx = canvas.getContext("2d");

class InputManager{
    keypress(event){
        switch (event.keyCode) {
            case 37:
               console.log('Left key');
            break;
            case 38:
                console.log('Up key');
            break;
            case 39:
                console.log('Right key');
            break;
            case 40:
                console.log('Down key');
            break;
         }
    }
}

const inputManager = new InputManager();
window.addEventListener("keydown", (e) => inputManager.keypress(e))

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class SquareFactory{
    startPosition = new Point(50, 50)

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

setInterval(() => drawerManager.draw(), 100);