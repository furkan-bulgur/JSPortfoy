const level = 
[
    ["#","#","#","#","#"],
    ["#"," "," "," ","#"],
    ["#"," ","#"," ","#"],
    ["#"," "," "," ","#"],
    ["#","#","#","#","#"]
];

const levelSize = {
    width: level[0].length,
    height: level.length
}

const cellModel = {
    color: "blue",
    width: 30,
    height: 30,
}

const canvasDimensions = {
    width: levelSize.width * cellModel.width,
    height: levelSize.height * cellModel.height,
}

const canvas = document.getElementById("grid");
canvas.width = canvasDimensions.width;
canvas.height = canvasDimensions.height;
const ctx = canvas.getContext("2d");

class Grid{
    constructor(gridMatrix){
        this.cellMatrix = this.createCellMatrix(gridMatrix);
    }

    createEmptyCellMatrix(){
        let cellMatrix = []
        for(var i = 0; i < levelSize.height; i++) {
            cellMatrix[i] = [];
            for(var j = 0; j < levelSize.width; j++) {
                cellMatrix[i][j] = undefined;
            }
        }
        return cellMatrix;
    }

    createCellMatrix(gridMatrix){
        let cellMatrix = this.createEmptyCellMatrix();

        for (let i = 0; i < levelSize.height; i++) {
            const row = gridMatrix[i];
            for (let j = 0; j < levelSize.width; j++) {
                const cellStr = row[j];
                let cell;
                const position = {
                    x: cellModel.width * j,
                    y: cellModel.height * i,
                };

                switch (cellStr) {
                    case "#":
                        cell = new WallCell(position);
                        break;
                    case " ":
                        cell = new EmptyCell(position);
                        break;
                    default:
                        cell = new EmptyCell(position);
                        break;
                }
                cellMatrix[i][j] = cell;
            }
        }
        return cellMatrix;
    }

    drawGrid(){
        this.cellMatrix.forEach(row => {
            row.forEach(cell => {
                cell.drawCell();
            })
        })
    }
}

class Cell{
    constructor(position){
        this.position = position;
    }
    drawCell(){}
}

class WallCell extends Cell{
    constructor(position){
        super(position);
    }

    drawCell(){
        ctx.beginPath();
        ctx.fillStyle = cellModel.color;
        ctx.rect(this.position.x, this.position.y, cellModel.width, cellModel.height);
        ctx.fill();
        ctx.closePath();
    }
}

class EmptyCell extends Cell{
    constructor(position){
        super(position);
    }
}

const grid = new Grid(level);

grid.drawGrid();