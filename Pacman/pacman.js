class Pacman{
    static speed = 20;
    static radius = 10;
    static hitRadius = 9;
    static color = "yellow";

    constructor({startCell, startDirection}){
        this.currentCell = startCell;
        this.position = this.currentCell.getCenterPosition();
        this.direction = startDirection;
        inputManager.pacman = this;

        this.pacmanAnimation = new PacmanAnimation(this);
    }

    move(direction){
        this.direction = direction;
        console.log(`move: ${this.direction}`);
        const nextPosition = this.getNextPosition();
        const hitPosition = this.getHitPosition(nextPosition);
        const hitCell = grid.getCellFromPosition(hitPosition);

        if(hitCell.type == CellTypes.Wall) return;

        this.position = nextPosition;
        this.updateCurrentCell();
    }

    getNextPosition(){
        const newPosition = {
            x: this.position.x,
            y: this.position.y
        }

        if(this.direction == Directions.Left){
            newPosition.x -= Pacman.speed;
        }
        else if(this.direction == Directions.Right){
            newPosition.x += Pacman.speed;
        }
        else if(this.direction == Directions.Up){
            newPosition.y -= Pacman.speed;
        }
        else if(this.direction == Directions.Down){
            newPosition.y += Pacman.speed;
        }

        return newPosition;
    }

    getHitPosition(position){
        const hitPosition = {
            x: position.x,
            y: position.y
        }

        if(this.direction == Directions.Left){
            hitPosition.x = hitPosition.x - Pacman.hitRadius;
        }
        else if(this.direction == Directions.Right){
            hitPosition.x = hitPosition.x + Pacman.hitRadius;
        }
        else if(this.direction == Directions.Up){
            hitPosition.y = hitPosition.y - Pacman.hitRadius;
        }
        else if(this.direction == Directions.Down){
            hitPosition.y = hitPosition.y + Pacman.hitRadius;
        }

        return hitPosition;
    }

    updateCurrentCell(){
        this.currentCell = grid.getCellFromPosition(this.position);
    }

    draw(){
        this.pacmanAnimation.animate();
    }
}

class PacmanAnimation{
    static switchTime = 200;

    constructor(pacman){
        this.pacman = pacman;
        this.counter = 0;
        this.frequency = PacmanAnimation.switchTime / gameLoopInterval;
    }

    animate(){
        if(Math.floor(this.counter / this.frequency) % 2 == 0){
            this.drawMouthLargeOpen();
        }else{
            this.drawMouthSmallOpen();
        }
        this.counter += 1;
    }

    getRotation(){
        if(this.pacman.direction == Directions.Right){
            return 0;
        }
        else if(this.pacman.direction == Directions.Down){
            return Math.PI / 2;
        }
        else if(this.pacman.direction == Directions.Left){
            return Math.PI;
        }
        else if(this.pacman.direction == Directions.Up){
            return -Math.PI / 2;
        }
    }

    drawMouthSmallOpen(){
        const rotation = this.getRotation();

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(pacman.position.x, pacman.position.y, Pacman.radius, (1/8) * Math.PI + rotation, (9/8) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(pacman.position.x, pacman.position.y, Pacman.radius, (7/8) * Math.PI + rotation, (-1/8) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();
    }

    drawMouthLargeOpen(){
        const rotation = this.getRotation();

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(pacman.position.x, pacman.position.y, Pacman.radius, (1/4) * Math.PI + rotation, (5/4) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(pacman.position.x, pacman.position.y, Pacman.radius, (3/4) * Math.PI + rotation, (-1/4) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();
    }
}

class InputManager{
    constructor(){
        this.pacman = null;
    }

    keypress(event){
        if(this.pacman == null) return;

        console.log("tik");

        switch (event.keyCode){
            case 37:
            case 65:
                this.pacman.move(Directions.Left);
            break;
            case 38:
            case 87:
                this.pacman.move(Directions.Up);
            break;
            case 39:
            case 68:
                this.pacman.move(Directions.Right);
            break;
            case 40:
            case 83:
                this.pacman.move(Directions.Down);
            break;
         }
    }
}

const inputManager = new InputManager();
window.addEventListener("keydown", (e) => inputManager.keypress(e))