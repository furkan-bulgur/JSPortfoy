class PathVisualizer{
    static visitedVisualizationWaitCount = 10 / gameLoopInterval;

    static visitedCellColor = "gray";
    static pathCellColor = "green";

    constructor(){
        this.shouldEnd = false;
        this.isVisualizationFinished = true;
        this.counter = 0;
    }

    tryStartVisualization(path, visitedList){
        if(gameParameters.visualizeCalculation && path && path.length){
            this.startVisualization(path, visitedList);
        }
    }

    startVisualization(path, visitedList){
        this.path = path;
        this.visitedList = visitedList;
        this.isVisualizationFinished = false;
        Game.instance.addUpdateListener(this);
    }

    endVisualization(){
        Game.instance.grid.resetCellColors();
        Game.instance.removeUpdateListener(this);
        this.isVisualizationFinished = true;
        this.counter = 0;
        this.path = null;
        this.visitedList = null;
    }

    update(){
        if(!gameParameters.visualizeCalculation){
            this.endVisualization();
        }

        if(this.counter % PathVisualizer.visitedVisualizationWaitCount == 0){
            this.counter = 0;
            if(this.visitedList.length > 0){
                let visitedCell = this.visitedList.shift();
                visitedCell.setColor(PathVisualizer.visitedCellColor);
            }

            if(this.visitedList && !this.visitedList.length){
                this.path.forEach(cell => cell.setColor(PathVisualizer.pathCellColor))
                this.isVisualizationFinished = true;
            }
        }

        this.counter += 1;
    }
}