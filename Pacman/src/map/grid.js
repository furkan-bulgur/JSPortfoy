class Grid{
    constructor(gridMatrix, levelSize){
        this.levelSize = levelSize;
        this.pacmanStartCell = null;
        this.emptyCells = [];
        this.foodManager = new FoodManager(this);
        this.cellMatrix = this.createCellMatrix(gridMatrix);
        this.initializeNeighborCellTypes();   
    }

    createEmptyCellMatrix(){
        let cellMatrix = []
        for(var i = 0; i < this.levelSize.height; i++) {
            cellMatrix[i] = [];
            for(var j = 0; j < this.levelSize.width; j++) {
                cellMatrix[i][j] = undefined;
            }
        }
        return cellMatrix;
    }

    createCellMatrix(gridMatrix){
        let cellMatrix = this.createEmptyCellMatrix();

        for (let i = 0; i < this.levelSize.height; i++) {
            const row = gridMatrix[i];
            for (let j = 0; j < this.levelSize.width; j++) {
                const cellStr = row[j];
                let cell;
                const coordinate = {
                    x: j,
                    y: i
                }

                switch (cellStr) {
                    case "#":
                        cell = new WallCell(coordinate);
                        break;
                    case "o":
                        cell = this.createEmptyCell(coordinate);
                        this.foodManager.addFood(cell);
                        break;
                    case " ":
                        cell = this.createEmptyCell(coordinate);
                        break;
                    case "p":
                        cell = this.createEmptyCell(coordinate);
                        this.pacmanStartCell = cell;
                        break;
                    default:
                        cell = this.createEmptyCell(coordinate);
                        break;
                }
                cellMatrix[i][j] = cell;
            }
        }
        return cellMatrix;
    }

    createEmptyCell(coordinate){
        let cell = new EmptyCell(coordinate);
        this.emptyCells.push(cell);
        return cell;
    }

    initializeNeighborCellTypes(){
        for(var i = 0; i < this.levelSize.height; i++) {
            for(var j = 0; j < this.levelSize.width; j++) {
                let neighborCells = {};
                let neighborCellTypes = {};

                neighborCells[Directions.Up] = i > 0 ? this.cellMatrix[i - 1][j] : null;
                neighborCells[Directions.Down] = i < this.levelSize.height - 1 ? this.cellMatrix[i + 1][j] : null;
                neighborCells[Directions.Right] = j < this.levelSize.width - 1 ? this.cellMatrix[i][j + 1] : null;
                neighborCells[Directions.Left] = j > 0 ? this.cellMatrix[i][j - 1] : null;

                neighborCellTypes[Directions.Up] = i > 0 ? this.cellMatrix[i - 1][j].type : CellTypes.None;
                neighborCellTypes[Directions.Down] = i < this.levelSize.height - 1 ? this.cellMatrix[i + 1][j].type : CellTypes.None;
                neighborCellTypes[Directions.Right] = j < this.levelSize.width - 1 ? this.cellMatrix[i][j + 1].type : CellTypes.None;
                neighborCellTypes[Directions.Left] = j > 0 ? this.cellMatrix[i][j - 1].type : CellTypes.None;

                this.cellMatrix[i][j].initializeNeighborCellTypes(neighborCells ,neighborCellTypes);
            }
        }
    }

    getCell(coordinate){
        return this.cellMatrix[coordinate.y][coordinate.x];
    }

    getCellFromPosition(position){
        const xCoor = Math.floor(position.x / Cell.size.width);
        const yCoor = Math.floor(position.y / Cell.size.height);
        return this.getCell({x: xCoor, y: yCoor});
    }

    resetCellColors(){
        this.cellMatrix.forEach(row => {
            row.forEach(cell => {
                cell.resetColor();
            })
        })
    }

    draw(){
        this.cellMatrix.forEach(row => {
            row.forEach(cell => {
                cell.drawCell();
            })
        })
    }
}