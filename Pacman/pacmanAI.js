class PacmanAIManager{
    constructor(pacman, type){
        this.pacman = pacman;
        this.type = type;
        this.movementController = null; 

        switch(type){
            case PacmanAITypes.User:
                this.movementController = createInputManager(this.getMoveFunc());
                break;
            case PacmanAITypes.BFS:
                this.bfs = new BFS(this.getMoveFunc(), this.pacman.currentCell);
                break;
        }
    }

    getMoveFunc(){
        return (pacman => direction => pacman.move(direction))(this.pacman);
    }
}

class PacmanAI{
    static waitCount = 1000 / gameLoopInterval;

    constructor(pacman){
        this.pacman = pacman;
    }
}

class SearchAlgorithm{
    constructor(moveFunc){
        this.moveFunc = moveFunc;
    }

    searchFood(startCell){
        return null;
    }

    getNeighborEmptyCells(cell){
        return Object.values(cell.neighborCells).filter(
            cell => cell.type == CellTypes.Empty
        );
    }
}

class BFS extends SearchAlgorithm{
    constructor(moveFunc, startCell){
        super(moveFunc);
        this.searchFood(startCell);
    }

    searchFood(startCell){
        let frontier = [startCell];
        let visited = new Set();
    }
}

class InputManager{
    constructor(moveFunc){
        this.moveFunc = moveFunc;
    }

    keypress(event){
        switch (event.keyCode){
            case 37:
            case 65:
                this.moveFunc(Directions.Left);
            break;
            case 38:
            case 87:
                this.moveFunc(Directions.Up);
            break;
            case 39:
            case 68:
                this.moveFunc(Directions.Right);
            break;
            case 40:
            case 83:
                this.moveFunc(Directions.Down);
            break;
         }
    }
}

function createInputManager(moveFunc){
    const inputManager = new InputManager(moveFunc);
    window.addEventListener("keydown", (e) => inputManager.keypress(e));
    return inputManager;
}