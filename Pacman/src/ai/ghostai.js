class GhostAI{
    constructor(ghost){
        this.ghost = ghost;
    }

    aiUpdate(){

    }

    getOppositeDirection(direction){
        switch (direction){
            case Directions.Up:
                return Directions.Down;
            case Directions.Down:
                return Directions.Up;
            case Directions.Left:
                return Directions.Right;
            case Directions.Right:
                return Directions.Left;
        }
    }
}

class NoneGhostAI extends GhostAI{
    
}

class VerticalGhostAI extends GhostAI{
    direction = Directions.Up;
    aiUpdate(){
        this.direction = this.ghost.canMove(this.direction) ? this.direction : this.getOppositeDirection(this.direction);
        this.ghost.move(this.direction); 
    }
}

class HorizontalGhostAI extends GhostAI{
    direction = Directions.Right;
    aiUpdate(){
        this.direction = this.ghost.canMove(this.direction) ? this.direction : this.getOppositeDirection(this.direction);
        this.ghost.move(this.direction); 
    }
}