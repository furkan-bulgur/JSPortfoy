class Pacman{
    static radius = 10;
    static color = "yellow";

    constructor({startCell, startDirection}){
        this.currentCell = startCell;
        this.position = this.currentCell.getCenterPosition();
        this.direction = startDirection;
        this.pacmanAnimation = new PacmanAnimation(this);
    }

    update(){
        if(this.currentCell.hasFood){
            this.eat();
        }
    }

    move(direction){
        this.direction = direction;
        const nextCell = this.currentCell.neighborCells[direction];
        if(!nextCell || nextCell.type == CellTypes.Wall) return;

        const nextPosition = nextCell.getCenterPosition();
        this.position = nextPosition;
        this.currentCell = nextCell;

        game.scoreManager.changeScore(ScoreChangeReason.Move);
    }

    eat(){
        game.grid.foodManager.removeFood(this.currentCell);
        game.scoreManager.changeScore(ScoreChangeReason.Eat);
    }

    draw(){
        this.pacmanAnimation.animate();
    }
}

class PacmanAnimation{
    static switchTime = 100;

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
        ctx.arc(this.pacman.position.x, this.pacman.position.y, Pacman.radius, (1/8) * Math.PI + rotation, (9/8) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(this.pacman.position.x, this.pacman.position.y, Pacman.radius, (7/8) * Math.PI + rotation, (-1/8) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();
    }

    drawMouthLargeOpen(){
        const rotation = this.getRotation();

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(this.pacman.position.x, this.pacman.position.y, Pacman.radius, (1/4) * Math.PI + rotation, (5/4) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(this.pacman.position.x, this.pacman.position.y, Pacman.radius, (3/4) * Math.PI + rotation, (-1/4) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();
    }
}