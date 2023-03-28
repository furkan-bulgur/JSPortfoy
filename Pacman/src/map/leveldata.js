class LevelData{
    constructor(rawGridMatrix, levelSize){
        this.rawGridMatrix = rawGridMatrix;
        this.levelSize = levelSize;
        this.pacmanCoor = null;
        this.ghostCoor = null;
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
                        this.pacmanCoor = {x: j, y: i};
                        break;
                    case "g":
                        cellType = CellTypes.Empty;
                        this.ghostCoor = {x: j, y: i};
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