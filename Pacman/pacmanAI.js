class PacmanAIManager{
    constructor(pacman, type){
        this.pacman = pacman;
        this.type = type;
        this.movementController = null; 

        switch(type){
            case PacmanAITypes.User:
                this.movementController = createInputManager(this.getMovePacmanFunc(this.pacman));
                break;
            case PacmanAITypes.BFS:
                break;
        }
    }

    getMovePacmanFunc(pacman){
        return direction => pacman.move(direction);
    }
}

class PacmanAI{
    static waitCount = 1000 / gameLoopInterval;

    constructor(pacman){
        this.pacman = pacman;
    }
}

class SearchAlgorithm{
    searchFood(startCell){
        return null;
    }

    getNeighborEmptyCells(cell){
        const neighborEmptyCells = cell.neighborCells.filter(cell => {
            return cell.type == CellTypes.Empty;
        });
        console.log(neighborEmptyCells);
        return neighborEmptyCells;
    }
}

class BFS extends SearchAlgorithm{
    searchFood(startCell){
        let frontier = [];
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