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