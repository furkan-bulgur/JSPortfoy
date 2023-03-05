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
    }

    move(direction){
        const nextPosition = this.getNextPosition(direction);
        const hitPosition = this.getHitPosition(nextPosition, direction);
        const hitCell = grid.getCellFromPosition(hitPosition);

        if(hitCell.type == CellTypes.Wall) return;

        this.position = nextPosition;
        this.direction = direction;
        this.updateCurrentCell();
    }

    getNextPosition(direction){
        const newPosition = {
            x: this.position.x,
            y: this.position.y
        }

        if(direction == Directions.Left){
            newPosition.x -= Pacman.speed;
        }
        else if(direction == Directions.Right){
            newPosition.x += Pacman.speed;
        }
        else if(direction == Directions.Up){
            newPosition.y -= Pacman.speed;
        }
        else if(direction == Directions.Down){
            newPosition.y += Pacman.speed;
        }

        return newPosition;
    }

    getHitPosition(position, direction){
        const hitPosition = {
            x: position.x,
            y: position.y
        }

        if(direction == Directions.Left){
            hitPosition.x = hitPosition.x - Pacman.hitRadius;
        }
        else if(direction == Directions.Right){
            hitPosition.x = hitPosition.x + Pacman.hitRadius;
        }
        else if(direction == Directions.Up){
            hitPosition.y = hitPosition.y - Pacman.hitRadius;
        }
        else if(direction == Directions.Down){
            hitPosition.y = hitPosition.y + Pacman.hitRadius;
        }

        return hitPosition;
    }

    updateCurrentCell(){
        this.currentCell = grid.getCellFromPosition(this.position);
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(this.position.x, this.position.y, Pacman.radius, 0, 2 * Math.PI);
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