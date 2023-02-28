const level = 
[
    ["#","#","#","#","#","#","#","#","#","#"],
    ["#"," "," "," "," "," "," "," "," ","#"],
    ["#"," ","#","#","#"," ","#","#"," ","#"],
    ["#"," ","#","#","#"," "," "," "," ","#"],
    ["#"," "," "," "," "," ","#","#"," ","#"],
    ["#"," ","#","#","#"," ","#","#"," ","#"],
    ["#"," ","#","#","#"," ","#","#"," ","#"],
    ["#"," ","#","#","#"," "," "," "," ","#"],
    ["#"," ","#","#","#"," ","#","#"," ","#"],
    ["#"," "," "," "," "," "," "," "," ","#"],
    ["#","#","#","#","#","#","#","#","#","#"],
];

const levelSize = {
    width: level[0].length,
    height: level.length
}

const cellModel = {
    color: "blue",
    width: 30,
    height: 30,
    margin: 3
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
        console.log(this.cellMatrix);
        this.initializeNeighborCellTypes();
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
                const coordinate = {
                    x: j,
                    y: i
                }

                switch (cellStr) {
                    case "#":
                        cell = new WallCell(coordinate);
                        break;
                    case " ":
                        cell = new EmptyCell(coordinate);
                        break;
                    default:
                        cell = new EmptyCell(coordinate);
                        break;
                }
                cellMatrix[i][j] = cell;
            }
        }
        return cellMatrix;
    }

    initializeNeighborCellTypes(){
        for(var i = 0; i < levelSize.height; i++) {
            for(var j = 0; j < levelSize.width; j++) {
                let up, left, down, right;

                if(i == 0){
                    up = CellTypes.None;
                }
                else{
                    up = this.cellMatrix[i - 1][j].type;
                }

                if(i == levelSize.height - 1){
                    down = CellTypes.None;
                }
                else{
                    down = this.cellMatrix[i + 1][j].type;
                }

                if(j == levelSize.width - 1){
                    right = CellTypes.None;
                }
                else{
                    right = this.cellMatrix[i][j + 1].type;
                }

                if(j == 0){
                    left = CellTypes.None;
                }
                else{
                    left = this.cellMatrix[i][j - 1].type;
                }
                const neighborCellTypes = {
                    up: up,
                    down: down,
                    right: right,
                    left: left
                }

                this.cellMatrix[i][j].initializeNeighborCellTypes(neighborCellTypes);
            }
        }
    }

    drawGrid(){
        this.cellMatrix.forEach(row => {
            row.forEach(cell => {
                cell.drawCell();
            })
        })
    }
}

const CellTypes = {
    None: 0,
    Empty: 1,
    Wall: 2
}

class Cell{
    constructor(coordinate, type){
        this.coordinate = coordinate;
        this.size = {
            width: cellModel.width,
            height: cellModel.height
        }
        this.position = {
            x: this.size.width * coordinate.x,
            y: this.size.height * coordinate.y,
        };
        this.type = type;
    }

    initializeNeighborCellTypes(neighborCellTypes){
        this.neighborCellTypes = neighborCellTypes;
    }

    drawCell(){}
}

class WallCell extends Cell{
    constructor(coordinate){
        super(coordinate, CellTypes.Wall);
        this.wall = new Wall(this.position, this.size);
    }

    initializeNeighborCellTypes(neighborCellTypes){
        super.initializeNeighborCellTypes(neighborCellTypes);
        this.wall.updateWallProperties(neighborCellTypes);
    }

    drawCell(){
        this.wall.drawWall();
    }
}

class Wall{
    constructor(position, size){
        this.position = position;
        this.size = size;
    }

    updateWallProperties(neighborCellTypes){
        if(neighborCellTypes.left == CellTypes.Empty || neighborCellTypes.left == CellTypes.None){
            this.size.width -= cellModel.margin;
            this.position.x += cellModel.margin;
        }
        if(neighborCellTypes.right == CellTypes.Empty || neighborCellTypes.right == CellTypes.None){
            this.size.width -= cellModel.margin;
        }

        if(neighborCellTypes.up == CellTypes.Empty || neighborCellTypes.up == CellTypes.None){
            this.size.height -= cellModel.margin;
            this.position.y += cellModel.margin;
        }
        if(neighborCellTypes.down == CellTypes.Empty || neighborCellTypes.down == CellTypes.None){
            this.size.height -= cellModel.margin;
        }
    }

    drawWall(){
        ctx.beginPath();
        ctx.fillStyle = cellModel.color;
        ctx.rect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.fill();
        ctx.closePath();
    }
}

class EmptyCell extends Cell{
    constructor(coordinate){
        super(coordinate, CellTypes.Empty);
    }
}

const grid = new Grid(level);

grid.drawGrid();