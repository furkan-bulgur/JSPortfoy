const CellTypes = {
    None: 0,
    Empty: 1,
    Wall: 2
}

class Grid{
    constructor(gridMatrix){
        this.cellMatrix = this.createCellMatrix(gridMatrix);
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
                let top, left, bottom, right;

                top = i > 0 ? this.cellMatrix[i - 1][j].type : CellTypes.None;
                bottom = i < levelSize.height - 1 ? this.cellMatrix[i + 1][j].type : CellTypes.None;
                right = j < levelSize.width - 1 ? this.cellMatrix[i][j + 1].type : CellTypes.None;
                left = j > 0 ? this.cellMatrix[i][j - 1].type : CellTypes.None;

                const neighborCellTypes = {
                    top: top,
                    bottom: bottom,
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

class Cell{
    static size = {
        width: 20,
        height: 20
    }

    constructor(coordinate, type){
        this.coordinate = coordinate;
        this.position = {
            x: Cell.size.width * coordinate.x,
            y: Cell.size.height * coordinate.y,
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
        this.wall = new Wall(this.position, Cell.size);
    }

    initializeNeighborCellTypes(neighborCellTypes){
        super.initializeNeighborCellTypes(neighborCellTypes);

        this.wall.initializeInWallExtensions({
            top: this.neighborCellTypes.top == CellTypes.Wall ? true : false,
            left: this.neighborCellTypes.left == CellTypes.Wall ? true : false,
            bottom: this.neighborCellTypes.bottom == CellTypes.Wall ? true : false,
            right: this.neighborCellTypes.right == CellTypes.Wall ? true : false,
        })
    }

    drawCell(){
        this.wall.drawWall();
    }
}

class Wall{
    static color = "blue";
    static inColor = "black";
    static thickness = 3;

    constructor(position, size){
        this.position = position;
        this.size = size;
        this.inWallPosition = {
            x: this.position.x + Wall.thickness,
            y: this.position.y + Wall.thickness
        }
        this.inWallSize = {
            width: this.size.width - 2 * Wall.thickness,
            height: this.size.height - 2 * Wall.thickness,
        }
    }

    initializeInWallExtensions(extensions){
        this.extensions = extensions;
        console.log(extensions);
    }

    drawWall(){
        ctx.beginPath();
        ctx.fillStyle = Wall.color;
        ctx.rect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.fill();
        ctx.closePath();

        this.drawInWall();
    }

    drawInWall(){
        ctx.beginPath();
        ctx.fillStyle = Wall.inColor;
        ctx.rect(this.inWallPosition.x, this.inWallPosition.y, this.inWallSize.width , this.inWallSize.height);
        
        if(this.extensions.top){
            ctx.rect(this.inWallPosition.x, this.inWallPosition.y - Wall.thickness, this.inWallSize.width , Wall.thickness);
        }
        if(this.extensions.bottom){
            ctx.rect(this.inWallPosition.x, this.inWallPosition.y + this.inWallSize.height, this.inWallSize.width , Wall.thickness);
        }
        if(this.extensions.left){
            ctx.rect(this.inWallPosition.x - Wall.thickness, this.inWallPosition.y, Wall.thickness, this.inWallSize.height);
        }
        if(this.extensions.right){
            ctx.rect(this.inWallPosition.x + this.inWallSize.width, this.inWallPosition.y, Wall.thickness, this.inWallSize.height);
        }

        ctx.fill();
        ctx.closePath();
    }
}

class EmptyCell extends Cell{
    constructor(coordinate){
        super(coordinate, CellTypes.Empty);
    }
}
