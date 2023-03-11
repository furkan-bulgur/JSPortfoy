class PacmanAIManager{
    constructor(pacman, type){
        this.pacman = pacman;
        this.type = type;
        this.movementController = null; 

        if(type == PacmanAITypes.User){
            this.movementController = createInputManager(this.getMoveFunc());
        }
        else{
            this.movementController = new PacmanAI(this.getMoveFunc(), this.pacman.currentCell, type);
        }
    }

    getMoveFunc(){
        return (pacman => direction => pacman.move(direction))(this.pacman);
    }
}

class PacmanAI{
    static waitCount = 1000 / gameLoopInterval;

    constructor(moveFunc, startCell, aiType){
        this.moveFunc = moveFunc;
        this.algorithm = null;

        switch (aiType) {
            case PacmanAITypes.BFS:
                this.algorithm = new BFS(startCell);
                break;
            default:
                break;
        }
    }
}

class SearchAlgorithm{
}

class BFS extends SearchAlgorithm{
    constructor(startCell){
        super();
        console.log(this.searchCellForFood(startCell));
    }

    searchCellForFood(startCell){
        let frontier = [startCell];
        let visited = new Set();

        while(frontier.length > 0){
            let currentCell = frontier.shift();

            if(visited.has(currentCell)) continue;
            visited.add(currentCell);

            if(currentCell.hasFood){
                return currentCell;
            }
            
            currentCell.getNeighborCellsWithType(CellTypes.Empty).forEach(cell => {
                if(!visited.has(cell)) {
                    frontier.push(cell);
                }
            });
        }

        return null;
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