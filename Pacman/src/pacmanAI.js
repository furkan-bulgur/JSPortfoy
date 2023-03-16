class PacmanAIManager{
    constructor(pacman, type){
        this.pacman = pacman;
        this.type = type;
        this.movementController = null;
        this.inputControler = createInputManager(this.getMoveFuncWithDirection());
        
        this.setController();
    }
    
    setController(){
        if(this.type == PacmanAITypes.User){
            this.movementController = null;
            this.inputControler.isActive = true;
        }
        else{
            this.inputControler.isActive = false;
            this.movementController = new PacmanAI(this.pacman, this.type);
        }
    }

    getMoveFuncWithDirection(){
        return (pacman => direction => pacman.move(direction))(this.pacman);
    }

    getMoveFuncWithTargetCell(){
        const moveToCell = (pacman, targetCell) => {
            const pacmanCell = pacman.currentCell;
            Object.keys(pacmanCell.neighborCells).forEach(direction => {
                if(pacmanCell.neighborCells[direction] == targetCell){
                    pacman.move(direction);
                }
            })
        };
        return (pacman => targetCell => moveToCell(pacman, targetCell))(this.pacman);
    }

    update(){
        if(this.movementController != null){
            this.movementController.update();
        }
    }
}

class PacmanAI{
    static pacmanMoveWaitCount = 150 / gameLoopInterval;
    static visitedVisualizationWaitCount = 10 / gameLoopInterval;
    static visitedCellColor = "gray";
    static pathCellColor = "green";

    constructor(pacman, aiType){
        this.pacman = pacman;
        this.algorithm = null;
        this.path = [];
        this.visitedList = [];
        this.counter = 0;

        switch (aiType) {
            case PacmanAITypes.BFS:
                this.algorithm = new BFS();
                break;
            case PacmanAITypes.DFS:
                this.algorithm = new DFS();
                break;
            default:
                break;
        }

        this.calculatePath();
    }

    calculatePath(){
        const {path, visitedList} = this.algorithm.searchPathToFood(this.pacman.currentCell);
        this.path = path;
        this.visitedList = visitedList;
    }

    update(){
        if(!this.path.length){
            game.grid.resetCellColors();
            this.calculatePath();
        }

        if(gameParameters.visualizeCalculation && 
            this.visitedList.length > 0 && 
            this.counter % PacmanAI.visitedVisualizationWaitCount == 0){
            this.counter = 0;
            let visitedCell = this.visitedList.shift();
            visitedCell.setColor(PacmanAI.visitedCellColor);

            if(!this.visitedList.length){
                this.path.forEach(cell => cell.setColor(PacmanAI.pathCellColor))
            }
        }
        else if(this.path.length && this.counter % PacmanAI.pacmanMoveWaitCount == 0){
            let nextCell = this.path.pop();
            if(nextCell == this.pacman.currentCell){
                nextCell = this.path.pop();
            }
            this.movePacmanToCell(nextCell);
        }

        this.counter += 1;
    }

    movePacmanToCell(targetCell){
        const pacmanCell = this.pacman.currentCell;
        Object.keys(pacmanCell.neighborCells).forEach(direction => {
            if(pacmanCell.neighborCells[direction] == targetCell){
                this.pacman.move(direction);
            }
        })
    }
}

class SearchAlgorithm{
}

class BFS extends SearchAlgorithm{
    searchPathToFood(startCell){
        let frontier = [[null, startCell]];
        let visitedPathTree = new PathTree();
        let visitedVisualizationList = [];

        while(frontier.length > 0){
            let [parent, currentCell] = frontier.shift();

            if(visitedPathTree.has(currentCell)) continue;
            visitedPathTree.add(parent, currentCell);
            visitedVisualizationList.push(currentCell);

            if(currentCell.hasFood){
                return {
                    path: PathTreePathFinder.getPathFromRoot(visitedPathTree, currentCell),
                    visitedList: visitedVisualizationList,
                };
            }
            
            currentCell.getNeighborCellsWithType(CellTypes.Empty).forEach(cell => {
                if(!visitedPathTree.has(cell)) {
                    frontier.push([currentCell, cell]);
                }
            });
        }

        return {
            path: [],
            visitedList: visitedVisualizationList,
        };
    }
}

class DFS extends SearchAlgorithm{
    searchPathToFood(startCell){
        let frontier = [[null, startCell]];
        let visitedPathTree = new PathTree();
        let visitedVisualizationList = [];

        while(frontier.length > 0){
            let [parent, currentCell] = frontier.pop();

            if(visitedPathTree.has(currentCell)) continue;
            visitedPathTree.add(parent, currentCell);
            visitedVisualizationList.push(currentCell);

            if(currentCell.hasFood){
                return {
                    path: PathTreePathFinder.getPathFromRoot(visitedPathTree, currentCell),
                    visitedList: visitedVisualizationList,
                };
            }
            
            currentCell.getNeighborCellsWithType(CellTypes.Empty).forEach(cell => {
                if(!visitedPathTree.has(cell)) {
                    frontier.push([currentCell, cell]);
                }
            });
        }

        return {
            path: [],
            visitedList: visitedVisualizationList,
        };
    }
}

class InputManager{
    constructor(moveFunc){
        this.moveFunc = moveFunc;
        this.isActive = false;
    }

    keypress(event){
        if(!this.isActive){
            return;
        }
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
    let inputManager = new InputManager(moveFunc);
    window.addEventListener("keydown", (e) => inputManager.keypress(e));
    return inputManager;
}
