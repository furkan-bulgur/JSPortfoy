class PacmanAI{
    constructor(pacman, aiType){
        this.pacman = pacman;
        this.algorithm = null;
        this.path = [];
        this.visitedList = [];
        this.visualizer = new PathVisualizer();

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

    calculatePath(){
        let searchResult;
        if(Game.instance.foodManager.foodAmount > 1){
            searchResult = this.algorithm.searchPathToAllFoods(this.pacman.currentCell);
        }
        else{
            searchResult = this.algorithm.searchPathToFood(this.pacman.currentCell);
            this.visitedList = searchResult.visitedList;
        }
        this.path = searchResult.path;
    }

    aiUpdate(){
        if(!this.path.length){
            this.visualizer.endVisualization();
            this.calculatePath();
            this.visualizer.tryStartVisualization(this.path, this.visitedList);
        }

        if(this.visualizer.isVisualizationFinished && this.path.length){
            let nextCell = this.path.pop();
            if(nextCell == this.pacman.currentCell){
                nextCell = this.path.pop();
            }
            this.movePacmanToCell(nextCell);
        }
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