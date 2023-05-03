class GhostAI{
    constructor(ghost){
        this.ghost = ghost;
        this.state = this.createAIState();
    }

    createAIState(){
        return null;
    }

    createAIStateCopy(){
        return null;
    }

    aiUpdate(){
        this.ghost.move(this.state.getNextDirection()); 
    }
}

class NoneGhostAI extends GhostAI{
    
}

class VerticalGhostAI extends GhostAI{
    createAIState(){
        return new VerticalGhostAIState(this.ghost);
    }

    createAIStateCopy(){
        return new VerticalGhostAIState(this.ghost.getCharacterState());
    }
}

class HorizontalGhostAI extends GhostAI{
    createAIState(){
        return new HorizontalGhostAIState(this.ghost);
    }

    createAIStateCopy(){
        return new HorizontalGhostAIState(this.ghost.getCharacterState());
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