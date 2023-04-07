class PacmanAI{
    constructor(pacman, aiType){
        this.pacman = pacman;
        this.algorithm = null;

        switch (aiType) {
            case PacmanAITypes.BFS:
                this.algorithm = new BFS();
                break;
            case PacmanAITypes.AStar:
                this.algorithm = new AStar();
                break;
            case PacmanAITypes.Minimax:
                this.algorithm = new Minimax();
                break;
            default:
                break;
        }
    }

    aiUpdate(){
        const direction = this.algorithm.getMovementDirection(this.pacman);
        if(direction) this.pacman.move(direction);
    }
}

class PacmanUser{
    constructor(pacman){
        this.pacman = pacman;
        inputManager.addListener(this);
    }

    keypress(keyCode){
        switch (keyCode){
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