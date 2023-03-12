class PacmanAIManager{
    constructor(pacman, type){
        this.pacman = pacman;
        this.type = type;
        this.inputControler = null;
        this.movementController = null; 

        if(type == PacmanAITypes.User){
            this.inputControler = createInputManager(this.getMoveFuncWithDirection());
        }
        else{
            this.movementController = new PacmanAI(this.getMoveFuncWithTargetCell(), this.pacman.currentCell, type);
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
    static waitCount = 250 / gameLoopInterval;

    constructor(moveToCellFunc, startCell, aiType){
        this.moveToCellFunc = moveToCellFunc;
        this.startCell = startCell;
        this.algorithm = null;
        this.counter = 0;

        switch (aiType) {
            case PacmanAITypes.BFS:
                this.algorithm = new BFS();
                break;
            default:
                break;
        }

        this.start();
    }

    start(){
        this.path = this.algorithm.searchCellForFood(this.startCell);
        this.path.pop //Remove the cell that pacman stays
    }

    update(){
        if(this.counter % PacmanAI.waitCount == 0){
            this.counter = 0;
            const nextCell = this.path.pop();
            this.moveToCellFunc(nextCell);
        }
        this.counter += 1;
    }
}

class SearchAlgorithm{
}

class BFS extends SearchAlgorithm{
    searchCellForFood(startCell){
        let frontier = [[null, startCell]];
        let visitedPathTree = new PathTree();

        while(frontier.length > 0){
            let [parent, currentCell] = frontier.shift();

            if(visitedPathTree.has(currentCell)) continue;
            visitedPathTree.add(parent, currentCell);

            if(currentCell.hasFood){
                return PathTreePathFinder.getPathFromRoot(visitedPathTree, currentCell);
            }
            
            currentCell.getNeighborCellsWithType(CellTypes.Empty).forEach(cell => {
                if(!visitedPathTree.has(cell)) {
                    frontier.push([currentCell, cell]);
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