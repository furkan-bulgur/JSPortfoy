class Grid{
    constructor(levelData){
        this.levelSize = levelData.levelSize;
        this.emptyCells = [];
        this.cellMatrix = this.createCellMatrix(levelData.gridMatrix);
        this.initializeNeighborCellTypes();   
        Game.instance.addDrawListener(this);
    }

    createCellMatrix(gridMatrix){
        let cellMatrix = [];

        for (let i = 0; i < this.levelSize.height; i++) {
            const row = gridMatrix[i];
            const cellRow = [];
            for (let j = 0; j < this.levelSize.width; j++) {
                const cellType = row[j];
                let cell;
                const coordinate = {
                    x: j,
                    y: i
                }

                switch (cellType) {
                    case CellTypes.Wall:
                        cell = new WallCell(coordinate);
                        break;
                    case CellTypes.Empty:
                        cell = this.createEmptyCell(coordinate);
                        break;
                    default:
                        cell = this.createEmptyCell(coordinate);
                        break;
                }
                cellRow.push(cell);
            }
            cellMatrix.push(cellRow);
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