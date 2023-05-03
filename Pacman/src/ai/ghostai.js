class GhostAI{
    constructor(ghost){
        this.ghost = ghost;
        this.state = this.createAIState(this.ghost);
    }

    createAIState(ghost){
        return null;
    }

    aiUpdate(){
        this.ghost.move(this.state.getNextDirection()); 
    }
}

class NoneGhostAI extends GhostAI{
    
}

class VerticalGhostAI extends GhostAI{
    createAIState(ghost){
        return new VerticalGhostAIState(ghost);
    }
}

class HorizontalGhostAI extends GhostAI{
    createAIState(ghost){
        return new HorizontalGhostAIState(ghost);
    }
}

class GhostAIState{
    constructor(ghost){
        this.ghost = ghost;
    }

    getNextDirection() { }

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

class LinearGhostAIState extends GhostAIState{
    constructor(ghost){
        super(ghost);
        this.direction = this.getStartDirection();
    }

    getStartDirection(){
        return Directions.Down;
    }

    getNextDirection(){
        this.direction = this.ghost.canMove(this.direction) ? this.direction : this.getOppositeDirection(this.direction);
        return this.direction;
    }
}

class VerticalGhostAIState extends LinearGhostAIState{
    getStartDirection(){
        return Directions.Up;
    }
}

class HorizontalGhostAIState extends LinearGhostAIState{
    getStartDirection(){
        return Directions.Right;
    }
}