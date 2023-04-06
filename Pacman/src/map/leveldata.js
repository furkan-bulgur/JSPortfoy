class LevelData{
    constructor(rawGridMatrix, levelSize){
        this.rawGridMatrix = rawGridMatrix;
        this.levelSize = levelSize;
        this.pacmanCoordinate = null;
        this.ghosts = [];
        this.gridMatrix = [];
        this.initialize();
    }

    initialize(){
        for (let i = 0; i < this.levelSize.height; i++) {
            const row = this.rawGridMatrix[i];
            const cellRow = [];
            for (let j = 0; j < this.levelSize.width; j++) {
                const cellStr = row[j];
                let cellType;

                switch (cellStr) {
                    case "#":
                        cellType = CellTypes.Wall;
                        break;
                    case " ":
                        cellType = CellTypes.Empty;
                        break;
                    case "p":
                        cellType = CellTypes.Empty;
                        this.pacmanCoordinate = {x: j, y: i};
                        break;
                    case "g":
                        cellType = CellTypes.Empty;
                        this.ghosts.push([{x: j, y: i}, GhostAITypes.None]);
                        break;
                    case "v":
                        cellType = CellTypes.Empty;
                        this.ghosts.push([{x: j, y: i}, GhostAITypes.Vertical]);
                        break;
                    case "h":
                        cellType = CellTypes.Empty;
                        this.ghosts.push([{x: j, y: i}, GhostAITypes.Horizontal]);
                        break;
                    default:
                        cellType = CellTypes.Empty;
                        break;
                }
                cellRow.push(cellType);
            }
            this.gridMatrix.push(cellRow);
        }
    }
}